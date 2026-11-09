/**
 * Nocturne - Calendar & Memory Archive Engine
 * Monthly calendar grid, mood aura tracker, timeline of memories, "On This Day",
 * and multi-criteria memory search.
 */

class NocturneCalendar {
  constructor() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth(); // 0-indexed
    this.entries = [];

    this.dom = {
      calendarGrid: document.getElementById('calendar-days-grid'),
      monthYearLabel: document.getElementById('calendar-month-year-label'),
      prevMonthBtn: document.getElementById('btn-prev-month'),
      nextMonthBtn: document.getElementById('btn-next-month'),
      todayBtn: document.getElementById('btn-calendar-today'),
      selectedDateTitle: document.getElementById('calendar-selected-date-title'),
      selectedDateEntriesList: document.getElementById('calendar-selected-date-entries'),
      onThisDayContainer: document.getElementById('on-this-day-card'),
      timelineList: document.getElementById('memories-timeline-list'),
      moodChartBreakdown: document.getElementById('mood-stats-breakdown'),
      searchInput: document.getElementById('memory-search-input'),
      moodFilterSelect: document.getElementById('memory-mood-filter'),
      tagFilterSelect: document.getElementById('memory-tag-filter')
    };

    this.initEventListeners();
  }

  async init() {
    await this.refreshEntries();
    this.renderCalendar();
    this.renderOnThisDay();
    this.renderTimeline();
    this.renderMoodBreakdown();
  }

  async refreshEntries() {
    if (window.nocturneDB) {
      this.entries = await window.nocturneDB.getAllEntries();
    }
  }

  initEventListeners() {
    if (this.dom.prevMonthBtn) {
      this.dom.prevMonthBtn.addEventListener('click', () => {
        this.currentMonth--;
        if (this.currentMonth < 0) {
          this.currentMonth = 11;
          this.currentYear--;
        }
        this.renderCalendar();
      });
    }

    if (this.dom.nextMonthBtn) {
      this.dom.nextMonthBtn.addEventListener('click', () => {
        this.currentMonth++;
        if (this.currentMonth > 11) {
          this.currentMonth = 0;
          this.currentYear++;
        }
        this.renderCalendar();
      });
    }

    if (this.dom.todayBtn) {
      this.dom.todayBtn.addEventListener('click', () => {
        const now = new Date();
        this.currentYear = now.getFullYear();
        this.currentMonth = now.getMonth();
        this.renderCalendar();
        this.selectDate(now.toISOString().split('T')[0]);
      });
    }

    // Search and Filters
    if (this.dom.searchInput) {
      this.dom.searchInput.addEventListener('input', () => this.filterMemories());
    }
    if (this.dom.moodFilterSelect) {
      this.dom.moodFilterSelect.addEventListener('change', () => this.filterMemories());
    }
    if (this.dom.tagFilterSelect) {
      this.dom.tagFilterSelect.addEventListener('change', () => this.filterMemories());
    }
  }

  renderCalendar() {
    if (!this.dom.calendarGrid) return;
    this.dom.calendarGrid.innerHTML = '';

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (this.dom.monthYearLabel) {
      this.dom.monthYearLabel.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
    }

    // First day of month & total days
    const firstDayIndex = new Date(this.currentYear, this.currentMonth, 1).getDay(); // 0 is Sun
    const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const prevMonthTotalDays = new Date(this.currentYear, this.currentMonth, 0).getDate();

    const todayStr = new Date().toISOString().split('T')[0];

    // Map entries by date for fast lookup
    const entriesByDate = {};
    this.entries.forEach(e => {
      if (e.date) {
        if (!entriesByDate[e.date]) entriesByDate[e.date] = [];
        entriesByDate[e.date].push(e);
      }
    });

    // 1. Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthTotalDays - i;
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell outside-month';
      cell.innerHTML = `<span class="day-number">${dayNum}</span>`;
      this.dom.calendarGrid.appendChild(cell);
    }

    // 2. Current month days
    for (let d = 1; d <= totalDays; d++) {
      const monthStr = String(this.currentMonth + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateKey = `${this.currentYear}-${monthStr}-${dayStr}`;
      const dayEntries = entriesByDate[dateKey] || [];

      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell current-month';
      if (dateKey === todayStr) cell.classList.add('is-today');
      if (dayEntries.length > 0) cell.classList.add('has-entries');

      let dotsHtml = '';
      if (dayEntries.length > 0) {
        dotsHtml = `
          <div class="day-entries-indicators">
            ${dayEntries.slice(0, 3).map(e => `<span class="entry-mood-dot mood-${e.mood || 'dreamy'}" title="${e.title}"></span>`).join('')}
            ${dayEntries.length > 3 ? `<span class="more-entries-count">+${dayEntries.length - 3}</span>` : ''}
          </div>
        `;
      }

      cell.innerHTML = `
        <span class="day-number">${d}</span>
        ${dotsHtml}
      `;

      cell.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected-day'));
        cell.classList.add('selected-day');
        this.selectDate(dateKey, dayEntries);
      });

      this.dom.calendarGrid.appendChild(cell);
    }

    // Update tags dropdown filter based on all available tags
    this.updateTagsFilterOptions();
  }

  selectDate(dateKey, dayEntries = null) {
    if (!dayEntries) {
      dayEntries = this.entries.filter(e => e.date === dateKey);
    }

    if (this.dom.selectedDateTitle) {
      const parts = dateKey.split('-');
      const dObj = new Date(parts[0], parts[1] - 1, parts[2]);
      this.dom.selectedDateTitle.textContent = dObj.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    if (!this.dom.selectedDateEntriesList) return;
    this.dom.selectedDateEntriesList.innerHTML = '';

    if (dayEntries.length === 0) {
      this.dom.selectedDateEntriesList.innerHTML = `
        <div class="empty-date-state">
          <p class="empty-text">No shadows recorded on this day.</p>
          <button class="gothic-btn btn-sm" id="btn-write-on-date">✦ Write for this date</button>
        </div>
      `;
      const writeBtn = document.getElementById('btn-write-on-date');
      if (writeBtn) {
        writeBtn.addEventListener('click', () => {
          if (window.nocturneApp && window.nocturneEditor) {
            window.nocturneApp.switchTab('editor');
            window.nocturneEditor.createNewEntry();
            if (window.nocturneEditor.dom.dateInput) {
              window.nocturneEditor.dom.dateInput.value = dateKey;
            }
          }
        });
      }
      return;
    }

    dayEntries.forEach(entry => {
      const card = document.createElement('div');
      card.className = 'selected-date-entry-card';
      const snippet = (entry.content || '').replace(/<[^>]+>/g, '').slice(0, 140) + '...';
      const moodIcon = this.getMoodIcon(entry.mood);

      card.innerHTML = `
        <div class="entry-card-header">
          <span class="entry-card-mood">${moodIcon} ${entry.mood || 'dreamy'}</span>
          <span class="entry-card-title">${entry.title}</span>
        </div>
        <p class="entry-card-snippet">${snippet}</p>
        <div class="entry-card-footer">
          <div class="entry-card-tags">
            ${(entry.tags || []).map(t => `<span class="entry-tag-pill">#${t}</span>`).join('')}
          </div>
          <button class="gothic-link-btn btn-read-entry">Open Journal Page →</button>
        </div>
      `;

      card.querySelector('.btn-read-entry').addEventListener('click', () => {
        if (window.nocturneApp && window.nocturneEditor) {
          window.nocturneApp.switchTab('editor');
          window.nocturneEditor.loadEntry(entry);
        }
      });

      this.dom.selectedDateEntriesList.appendChild(card);
    });
  }

  // --- "On This Day" Feature ---
  renderOnThisDay() {
    if (!this.dom.onThisDayContainer) return;
    const now = new Date();
    const curMonth = String(now.getMonth() + 1).padStart(2, '0');
    const curDay = String(now.getDate()).padStart(2, '0');
    const curYear = now.getFullYear();

    // Look for entries matching this month and day from past years or today
    const matches = this.entries.filter(e => {
      if (!e.date) return false;
      const parts = e.date.split('-');
      return parts[1] === curMonth && parts[2] === curDay;
    });

    if (matches.length > 0) {
      const item = matches[0];
      const yearsAgo = curYear - parseInt(item.date.split('-')[0], 10);
      const yearLabel = yearsAgo === 0 ? 'Today in the shadows' : `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago today`;

      this.dom.onThisDayContainer.innerHTML = `
        <div class="on-this-day-header">
          <span class="star-icon">✦</span>
          <span class="label">${yearLabel}</span>
          <span class="date">${item.date}</span>
        </div>
        <h4 class="on-this-day-title">“${item.title}”</h4>
        <p class="on-this-day-snippet">${(item.content || '').replace(/<[^>]+>/g, '').slice(0, 180)}...</p>
        <button class="gothic-btn btn-sm" id="btn-open-on-this-day">Revisit Memory 📖</button>
      `;

      const btn = document.getElementById('btn-open-on-this-day');
      if (btn) {
        btn.addEventListener('click', () => {
          if (window.nocturneApp && window.nocturneEditor) {
            window.nocturneApp.switchTab('editor');
            window.nocturneEditor.loadEntry(item);
          }
        });
      }
    } else {
      this.dom.onThisDayContainer.innerHTML = `
        <div class="on-this-day-empty">
          <span class="star-icon">✧</span>
          <p>No whispers from this exact day in previous years. Write today so your future self can remember.</p>
        </div>
      `;
    }
  }

  // --- Timeline of Memories ---
  renderTimeline(itemsToRender = null) {
    if (!this.dom.timelineList) return;
    this.dom.timelineList.innerHTML = '';

    const list = itemsToRender || this.entries;

    if (list.length === 0) {
      this.dom.timelineList.innerHTML = `
        <div class="empty-timeline-state">
          <p>No memories match your query in the archive.</p>
        </div>
      `;
      return;
    }

    list.forEach(entry => {
      const item = document.createElement('div');
      item.className = 'timeline-entry-item';
      const moodIcon = this.getMoodIcon(entry.mood);
      const snippet = (entry.content || '').replace(/<[^>]+>/g, '').slice(0, 160) + '...';

      item.innerHTML = `
        <div class="timeline-marker">
          <span class="marker-dot"></span>
          <span class="marker-mood">${moodIcon}</span>
        </div>
        <div class="timeline-content-card">
          <div class="timeline-card-header">
            <span class="timeline-date">${entry.date || 'Timeless'}</span>
            <span class="timeline-title">${entry.title}</span>
            ${entry.isPinned ? `<span class="pinned-badge" title="Pinned Memory">📌</span>` : ''}
          </div>
          <p class="timeline-snippet">${snippet}</p>
          <div class="timeline-card-footer">
            <div class="timeline-tags">
              ${(entry.tags || []).map(t => `<span class="tag-pill">#${t}</span>`).join('')}
            </div>
            <button class="gothic-link-btn btn-open-timeline-entry">Open Journal Page →</button>
          </div>
        </div>
      `;

      item.querySelector('.btn-open-timeline-entry').addEventListener('click', () => {
        if (window.nocturneApp && window.nocturneEditor) {
          window.nocturneApp.switchTab('editor');
          window.nocturneEditor.loadEntry(entry);
        }
      });

      this.dom.timelineList.appendChild(item);
    });
  }

  // --- Mood Breakdown & Aura Stats ---
  renderMoodBreakdown() {
    if (!this.dom.moodChartBreakdown) return;
    this.dom.moodChartBreakdown.innerHTML = '';

    const moodCounts = {};
    const moods = ['happy', 'sad', 'anxious', 'calm', 'angry', 'excited', 'exhausted', 'dreamy', 'confused', 'grateful'];
    moods.forEach(m => moodCounts[m] = 0);

    this.entries.forEach(e => {
      if (e.mood && moodCounts[e.mood] !== undefined) {
        moodCounts[e.mood]++;
      }
    });

    const total = this.entries.length || 1;

    moods.forEach(m => {
      const count = moodCounts[m];
      if (count === 0) return; // omit unused moods
      const percent = Math.round((count / total) * 100);
      const row = document.createElement('div');
      row.className = 'mood-stat-row';
      row.innerHTML = `
        <div class="mood-stat-label">
          <span>${this.getMoodIcon(m)} ${m}</span>
          <span class="mood-count">${count} (${percent}%)</span>
        </div>
        <div class="mood-stat-bar-track">
          <div class="mood-stat-bar-fill mood-${m}" style="width: ${percent}%;"></div>
        </div>
      `;
      this.dom.moodChartBreakdown.appendChild(row);
    });
  }

  filterMemories() {
    const query = this.dom.searchInput ? this.dom.searchInput.value.toLowerCase().trim() : '';
    const moodFilter = this.dom.moodFilterSelect ? this.dom.moodFilterSelect.value : 'all';
    const tagFilter = this.dom.tagFilterSelect ? this.dom.tagFilterSelect.value : 'all';

    const filtered = this.entries.filter(e => {
      const matchQuery = !query || 
        (e.title && e.title.toLowerCase().includes(query)) ||
        (e.content && e.content.toLowerCase().includes(query)) ||
        (e.tags && e.tags.some(t => t.toLowerCase().includes(query)));

      const matchMood = moodFilter === 'all' || e.mood === moodFilter;
      const matchTag = tagFilter === 'all' || (e.tags && e.tags.includes(tagFilter));

      return matchQuery && matchMood && matchTag;
    });

    this.renderTimeline(filtered);
  }

  updateTagsFilterOptions() {
    if (!this.dom.tagFilterSelect) return;
    const currentVal = this.dom.tagFilterSelect.value;
    const allTags = new Set();
    this.entries.forEach(e => {
      if (e.tags && Array.isArray(e.tags)) {
        e.tags.forEach(t => allTags.add(t));
      }
    });

    this.dom.tagFilterSelect.innerHTML = `<option value="all">All Tags</option>`;
    allTags.forEach(tag => {
      const opt = document.createElement('option');
      opt.value = tag;
      opt.textContent = '#' + tag;
      this.dom.tagFilterSelect.appendChild(opt);
    });
    this.dom.tagFilterSelect.value = currentVal || 'all';
  }

  getMoodIcon(mood) {
    const icons = {
      happy: '✦',
      sad: '💧',
      anxious: '⚡',
      calm: '🪻',
      angry: '🔥',
      excited: '✨',
      exhausted: '🥀',
      dreamy: '🌙',
      confused: '🕸️',
      grateful: '🖤'
    };
    return icons[mood] || '✦';
  }
}

window.nocturneCalendar = new NocturneCalendar();
