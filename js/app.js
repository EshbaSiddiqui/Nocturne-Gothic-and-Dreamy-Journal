/**
 * Nocturne - Main Application Controller
 * Handles view routing, sanctuary homepage widgets, bookshelf rendering,
 * gothic theme engine, floating particle canvas, app lock, and notifications.
 */

// ═══════════════════════════════════════════════════════════════
// EMERGENCY: Fix any corrupted lock state from previous sessions.
// This runs once synchronously before anything else.
// ═══════════════════════════════════════════════════════════════
(function emergencyLockFix() {
  try {
    // 1. Fix localStorage nocturne_settings
    const raw = localStorage.getItem('nocturne_settings');
    if (raw) {
      const cfg = JSON.parse(raw);
      // If passcode is enabled but PIN is empty or missing — clear the lock
      if (cfg && cfg.passcodeEnabled && !cfg.passcodePin) {
        cfg.passcodeEnabled = false;
        localStorage.setItem('nocturne_settings', JSON.stringify(cfg));
      }
    }
  } catch (e) { /* ignore */ }

  try {
    // 2. Make sure lock screen does NOT show on initial page load
    //    (the lock screen CSS default is display:none — this is just a safety belt)
    const lockEl = document.getElementById('app-passcode-lock-screen');
    if (lockEl) lockEl.classList.remove('active');
  } catch (e) { /* ignore */ }
})();

class NocturneApp {
  constructor() {
    this.currentView = 'sanctuary';
    this.userSettings = {
      nickname: 'Moonchild',
      avatar: 'bat-cameo',
      theme: 'royal-plum',
      font: 'cinzel',
      passcodeEnabled: false,
      passcodePin: '',
      particles: true,
      sound: 'off', // Ambient background sound OFF by default as requested
      volume: 0.4
    };

    this.quotes = [
      { text: "We are all wanderers in the dark, collecting fragments of moonlight to illuminate our fragile dreams.", author: "Nocturne" },
      { text: "There is a quiet majesty in shadows that the harsh glare of noon can never understand.", author: "Mary Shelley" },
      { text: "Every secret is an obsidian rose waiting for the right midnight to bloom.", author: "Gothic Proverb" },
      { text: "I have loved the stars too fondly to be fearful of the night.", author: "Sarah Williams" },
      { text: "Deep into that darkness peering, long I stood there wondering, fearing, doubting...", author: "Edgar Allan Poe" },
      { text: "In the depth of winter, I finally learned that within me there lay an invincible summer.", author: "Albert Camus" },
      { text: "Some hearts are forged in dark velvet and silver needles; delicate, yet impossible to break.", author: "Nocturne Musings" }
    ];

    this.prompts = [
      "What is a secret feeling you have never spoken out loud?",
      "If tonight was the last night of an old era in your life, what are you leaving behind?",
      "Describe a place in your memory that feels like an enchanted gothic castle.",
      "What small beauty did you discover today in an unexpected, shadowy corner?",
      "Write an unsent letter to someone who only exists in your past.",
      "What would your heart whisper if fear was forbidden from answering?"
    ];

    this.particleCanvas = null;
    this.particleCtx = null;
    this.particles = [];
  }

  async init() {
    // 1. Setup Navigation & UI FIRST (SYNCHRONOUSLY) so user clicks ALWAYS work immediately!
    this.initNavigation();
    this.initUserSanctuarySwitcher();
    this.initSanctuaryWidgets();
    this.initSettingsView();
    this.initParticles();

    // 2. Load user settings & themes
    try {
      await this.loadSettings();
    } catch (e) {
      console.warn("Could not load settings:", e);
    }

    // 3. Initialize Subsystems safely
    try {
      if (window.nocturneDB) await window.nocturneDB.ready;
    } catch (e) {
      console.warn("DB ready error:", e);
    }

    if (window.nocturneMoon) this.renderMoonWidget();
    if (window.nocturneScrapbook) await window.nocturneScrapbook.init().catch(console.warn);
    if (window.nocturneCalendar) await window.nocturneCalendar.init().catch(console.warn);
    if (window.nocturneFutureVault) await window.nocturneFutureVault.init().catch(console.warn);

    // 4. App Lock
    this.initAppLock();

    // 5. Render Sanctuary & Bookshelf
    await this.refreshSanctuary().catch(console.warn);

    // 6. Initial Ambient Sound
    if (window.nocturneAudio && this.userSettings.sound !== 'off') {
      window.nocturneAudio.setAmbient(this.userSettings.sound);
      window.nocturneAudio.setVolume(this.userSettings.volume);
    }
  }

  // --- Settings Persistence ---
  async loadSettings() {
    // First, try to load from localStorage (fast synchronous fallback)
    try {
      const raw = localStorage.getItem('nocturne_settings');
      if (raw) {
        const lsCfg = JSON.parse(raw);
        if (lsCfg) this.userSettings = Object.assign(this.userSettings, lsCfg);
      }
    } catch (e) { /* ignore */ }

    // Then try IndexedDB (authoritative, may overwrite)
    if (window.nocturneDB) {
      try {
        const saved = await window.nocturneDB.getSetting('userConfig', null);
        if (saved) this.userSettings = Object.assign(this.userSettings, saved);
      } catch (e) { /* ignore */ }
    }

    // Safety guard: never allow lock with an empty PIN
    if (!this.userSettings.passcodePin || this.userSettings.passcodePin.toString().trim() === '') {
      this.userSettings.passcodeEnabled = false;
    }

    this.applyTheme(this.userSettings.theme);
    this.updateUserGreeting();
  }

  async saveSettings() {
    // Write to localStorage synchronously for instant persistence
    try {
      localStorage.setItem('nocturne_settings', JSON.stringify(this.userSettings));
    } catch (e) { /* ignore */ }
    // Also write to IndexedDB
    if (window.nocturneDB) {
      await window.nocturneDB.setSetting('userConfig', this.userSettings).catch(() => {});
    }
  }

  applyTheme(theme) {
    document.body.className = `theme-${theme}`;
    const themeSelect = document.getElementById('settings-theme-select');
    if (themeSelect) themeSelect.value = theme;
  }

  updateUserGreeting() {
    const greetingEl = document.getElementById('sanctuary-user-greeting');
    if (greetingEl) {
      const greetings = [
        `Welcome back, ${this.userSettings.nickname}.`,
        `Your secrets live here, ${this.userSettings.nickname}.`,
        `The shadows welcome you, ${this.userSettings.nickname}.`
      ];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      greetingEl.textContent = randomGreeting;
    }
  }

  // --- View Routing ---

  // Multi-User Sanctuary Switcher
  initUserSanctuarySwitcher() {
    const btnOpen = document.getElementById('btn-open-user-switcher');
    const modal = document.getElementById('user-sanctuary-modal');
    const btnClose = document.getElementById('btn-close-user-modal');
    const usersListContainer = document.getElementById('sanctuary-users-list');
    const btnCreate = document.getElementById('btn-create-new-sanctuary');
    const nameInput = document.getElementById('new-sanctuary-name-input');
    const currentDisplay = document.getElementById('current-user-display');

    const updateDisplay = () => {
      const cur = window.nocturneDB ? window.nocturneDB.getCurrentUser() : 'Eshba';
      if (currentDisplay) currentDisplay.textContent = cur;
    };
    updateDisplay();

    const renderList = () => {
      if (!usersListContainer || !window.nocturneDB) return;
      usersListContainer.innerHTML = '';
      const list = window.nocturneDB.getUsersList();
      const current = window.nocturneDB.getCurrentUser();

      list.forEach(uname => {
        const row = document.createElement('div');
        row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: rgba(33, 17, 47, 0.7); border-radius: 8px; border: 1px solid ' + (uname === current ? 'var(--color-lavender)' : 'rgba(169, 147, 201, 0.2)') + ';';
        row.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.1rem;">${uname === 'Eshba' ? '👑' : '🌙'}</span>
            <span style="font-weight: ${uname === current ? 'bold' : 'normal'}; color: ${uname === current ? 'var(--color-moonlight)' : 'var(--text-secondary)'};">${uname}</span>
            ${uname === current ? '<span style="font-size: 0.7rem; color: #A993C9; background: rgba(84, 42, 128, 0.4); padding: 2px 6px; border-radius: 4px;">ACTIVE</span>' : ''}
          </div>
          <button class="gothic-btn btn-xs ${uname === current ? 'btn-outline' : ''}">${uname === current ? 'Current' : 'Enter ✦'}</button>
        `;

        if (uname !== current) {
          row.querySelector('button').addEventListener('click', async () => {
            window.nocturneDB.setCurrentUser(uname);
            modal.classList.remove('active');
            updateDisplay();
            this.showNotification('Entering ' + uname + "\'s Secret Sanctuary ✦");
            await this.refreshSanctuary();
            if (window.nocturneEditor) window.nocturneEditor.createNewEntry();
            if (window.nocturneScrapbook) await window.nocturneScrapbook.init();
          });
        }
        usersListContainer.appendChild(row);
      });
    };

    if (btnOpen && modal) {
      btnOpen.addEventListener('click', () => {
        renderList();
        modal.classList.add('active');
      });
    }

    if (btnClose && modal) {
      btnClose.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (btnCreate && nameInput) {
      btnCreate.addEventListener('click', async () => {
        const val = nameInput.value.trim();
        if (!val) return;
        window.nocturneDB.setCurrentUser(val);
        nameInput.value = '';
        modal.classList.remove('active');
        updateDisplay();
        this.showNotification('Sanctuary created for ' + val + ' ✦');
        await this.refreshSanctuary();
        if (window.nocturneEditor) window.nocturneEditor.createNewEntry();
        if (window.nocturneScrapbook) await window.nocturneScrapbook.init();
      });
    }

    // Global Typewriter Audio on EVERY text input / typing field in the entire diary
    document.addEventListener('keydown', (e) => {
      const target = e.target;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable || target.getAttribute('contenteditable') === 'true');
      if (!isInput || !window.nocturneAudio) return;

      if (e.key === 'Enter') {
        window.nocturneAudio.playCarriageBell();
      } else if (e.key === ' ') {
        window.nocturneAudio.playTypewriterKey('space');
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        window.nocturneAudio.playTypewriterKey('backspace');
      } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        window.nocturneAudio.playTypewriterKey('key');
      }
    });

    // Scrapbook toolbar buttons
    const btnAddSeal = document.getElementById('btn-add-scrap-seal');
    if (btnAddSeal) {
      btnAddSeal.addEventListener('click', () => {
        if (window.nocturneScrapbook) window.nocturneScrapbook.addWaxSealElement();
      });
    }

    const btnAddEnv = document.getElementById('btn-add-scrap-envelope');
    if (btnAddEnv) {
      btnAddEnv.addEventListener('click', () => {
        if (window.nocturneScrapbook) window.nocturneScrapbook.addEnvelopeElement();
      });
    }

    const noteThemeSelect = document.getElementById('scrapbook-note-theme-select');
    const btnAddNote = document.getElementById('btn-add-scrap-note');
    if (btnAddNote && noteThemeSelect) {
      btnAddNote.addEventListener('click', () => {
        if (window.nocturneScrapbook) window.nocturneScrapbook.addThemedNoteElement(noteThemeSelect.value);
      });
    }
  }

  initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        this.switchTab(view);
      });
    });

    // Mobile nav toggle
    const mobileMenuBtn = document.getElementById('btn-mobile-menu-toggle');
    const sidebar = document.querySelector('.sanctuary-sidebar');
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open-mobile');
      });
    }

    // Header buttons
    const btnNewEntryHeader = document.getElementById('btn-header-new-entry');
    if (btnNewEntryHeader) {
      btnNewEntryHeader.addEventListener('click', () => {
        this.switchTab('editor');
        if (window.nocturneEditor) window.nocturneEditor.createNewEntry();
      });
    }

    const btnRandomMemory = document.getElementById('btn-random-memory');
    if (btnRandomMemory) {
      btnRandomMemory.addEventListener('click', () => this.openRandomMemory());
    }

    // Audio ambient mute toggle button in header
    const audioToggleBtn = document.getElementById('btn-toggle-sound-mute');
    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        if (window.nocturneAudio) {
          const isMuted = window.nocturneAudio.toggleMute();
          audioToggleBtn.classList.toggle('muted', isMuted);
          audioToggleBtn.title = isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound';
          this.showNotification(isMuted ? 'Ambient silence summoned 🌙' : 'Nighttime ambience resumed ✦');
        }
      });
    }

    // Secret Drawer button
    const secretDrawerNav = document.getElementById('btn-secret-drawer-nav');
    if (secretDrawerNav) {
      secretDrawerNav.addEventListener('click', () => {
        if (window.nocturneFutureVault) {
          window.nocturneFutureVault.openSecretDrawer();
        }
      });
    }
  }

  switchTab(viewName) {
    this.currentView = viewName;

    // Update active nav links
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-view') === viewName);
    });

    // Close mobile sidebar
    const sidebar = document.querySelector('.sanctuary-sidebar');
    if (sidebar) sidebar.classList.remove('open-mobile');

    // Switch visible view panel
    document.querySelectorAll('.app-view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `view-${viewName}`);
    });

    // Sub-view triggers
    if (viewName === 'sanctuary') {
      this.refreshSanctuary();
    } else if (viewName === 'editor' && window.nocturneEditor) {
      if (!window.nocturneEditor.currentEntry) {
        window.nocturneEditor.createNewEntry();
      }
    } else if (viewName === 'calendar' && window.nocturneCalendar) {
      window.nocturneCalendar.init();
    } else if (viewName === 'scrapbook' && window.nocturneScrapbook) {
      window.nocturneScrapbook.init();
    } else if (viewName === 'future' && window.nocturneFutureVault) {
      window.nocturneFutureVault.refreshLetters();
    } else if (viewName === 'stickers') {
      this.renderFullStickersShowcase();
    } else if (viewName === 'memories') {
      this.renderMemoriesArchiveView();
    }
  }

  async renderMemoriesArchiveView() {
    const container = document.getElementById('standalone-memory-archive-container');
    if (!container || !window.nocturneDB) return;

    const entries = await window.nocturneDB.getAllEntries();
    container.innerHTML = `
      <div class="timeline-search-filter-bar" style="margin-bottom: 24px;">
        <input type="text" id="archive-search-box" class="memory-search-input" placeholder="Search secrets across all years..." />
        <select id="archive-filter-mood" class="toolbar-select">
          <option value="all">All Moods</option>
          <option value="happy">✦ Happy</option>
          <option value="sad">💧 Sad</option>
          <option value="anxious">⚡ Anxious</option>
          <option value="calm">🪻 Calm</option>
          <option value="angry">🔥 Angry</option>
          <option value="excited">✨ Excited</option>
          <option value="exhausted">🥀 Exhausted</option>
          <option value="dreamy">🌙 Dreamy</option>
          <option value="confused">🕸️ Confused</option>
          <option value="grateful">🖤 Grateful</option>
        </select>
      </div>
      <div id="archive-entries-grid" class="recent-mini-pages-grid"></div>
    `;

    const grid = document.getElementById('archive-entries-grid');
    const searchInput = document.getElementById('archive-search-box');
    const moodFilter = document.getElementById('archive-filter-mood');

    const renderItems = (items) => {
      grid.innerHTML = '';
      if (items.length === 0) {
        grid.innerHTML = '<div class="empty-recent-msg">No memories match your search in the archive.</div>';
        return;
      }
      items.forEach(entry => {
        const mini = document.createElement('div');
        mini.className = `mini-journal-page bg-${entry.pageBackground || 'purple-parchment'}`;
        const snippet = (entry.content || '').replace(/<[^>]+>/g, '').slice(0, 130) + '...';

        mini.innerHTML = `
          <div class="mini-page-header">
            <span class="mini-date">${entry.date || 'Timeless'}</span>
            <span class="mini-mood-dot mood-${entry.mood || 'dreamy'}"></span>
          </div>
          <h4 class="mini-title">${entry.title}</h4>
          <p class="mini-snippet">${snippet}</p>
          <div class="entry-card-tags" style="margin-top: 10px;">
            ${(entry.tags || []).map(t => `<span class="entry-tag-pill">#${t}</span>`).join('')}
          </div>
        `;

        mini.addEventListener('click', () => {
          this.switchTab('editor');
          if (window.nocturneEditor) window.nocturneEditor.loadEntry(entry);
        });

        grid.appendChild(mini);
      });
    };

    renderItems(entries);

    const onFilter = () => {
      const q = searchInput.value.toLowerCase().trim();
      const m = moodFilter.value;
      const filtered = entries.filter(e => {
        const matchQ = !q || (e.title && e.title.toLowerCase().includes(q)) || (e.content && e.content.toLowerCase().includes(q)) || (e.tags && e.tags.some(t => t.toLowerCase().includes(q)));
        const matchM = m === 'all' || e.mood === m;
        return matchQ && matchM;
      });
      renderItems(filtered);
    };

    searchInput.addEventListener('input', onFilter);
    moodFilter.addEventListener('change', onFilter);
  }

  // --- Sanctuary Widgets ---
  initSanctuaryWidgets() {
    // Write new entry prominent button
    const btnSanctuaryWrite = document.getElementById('btn-sanctuary-write');
    if (btnSanctuaryWrite) {
      btnSanctuaryWrite.addEventListener('click', () => {
        this.switchTab('editor');
        if (window.nocturneEditor) window.nocturneEditor.createNewEntry();
      });
    }

    // Daily quote / prompt refresh
    const quoteRefreshBtn = document.getElementById('btn-refresh-quote');
    if (quoteRefreshBtn) {
      quoteRefreshBtn.addEventListener('click', () => this.renderRandomQuote());
    }

    this.renderRandomQuote();

    const promptBtn = document.getElementById('btn-new-prompt-gen');
    if (promptBtn) {
      promptBtn.addEventListener('click', () => this.generateNewJournalPrompt());
    }
  }

  renderRandomQuote() {
    const quoteTextEl = document.getElementById('sanctuary-quote-text');
    const quoteAuthorEl = document.getElementById('sanctuary-quote-author');
    if (!quoteTextEl || !quoteAuthorEl) return;

    const q = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    quoteTextEl.textContent = `“${q.text}”`;
    quoteAuthorEl.textContent = `— ${q.author}`;
  }

  generateNewJournalPrompt() {
    const promptDisplayEl = document.getElementById('sanctuary-daily-prompt');
    if (!promptDisplayEl) return;
    const p = this.prompts[Math.floor(Math.random() * this.prompts.length)];
    promptDisplayEl.textContent = p;
  }

  renderMoonWidget() {
    const container = document.getElementById('sanctuary-moon-widget');
    if (!container || !window.nocturneMoon) return;

    const moonData = window.nocturneMoon.getMoonData(new Date());
    const moonSvg = window.nocturneMoon.renderMoonSvg(moonData);

    container.innerHTML = `
      <div class="moon-widget-card">
        <div class="moon-visual-col">
          ${moonSvg}
        </div>
        <div class="moon-info-col">
          <div class="moon-phase-tag">${moonData.icon} ${moonData.phase}</div>
          <h4 class="moon-energy-heading">${moonData.energy}</h4>
          <div class="moon-illumination">Illumination: ${moonData.illumPercent}% · Day ${moonData.cycleDays}</div>
          <p class="moon-prompt-text">“${moonData.mysticalPrompt}”</p>
          <button class="gothic-link-btn btn-write-moon-prompt" id="btn-write-lunar-prompt">Write with Lunar Energy →</button>
        </div>
      </div>
    `;

    const writeLunarBtn = document.getElementById('btn-write-lunar-prompt');
    if (writeLunarBtn) {
      writeLunarBtn.addEventListener('click', () => {
        this.switchTab('editor');
        if (window.nocturneEditor) {
          window.nocturneEditor.createNewEntry();
          if (window.nocturneEditor.dom.titleInput) {
            window.nocturneEditor.dom.titleInput.value = `${moonData.phase} Reflection`;
          }
          if (window.nocturneEditor.dom.tagsInput) {
            window.nocturneEditor.dom.tagsInput.value = `Moon Magic, ${moonData.phase}`;
          }
          if (window.nocturneEditor.dom.contentArea) {
            window.nocturneEditor.dom.contentArea.innerHTML = `<p><em>${moonData.mysticalPrompt}</em></p><p>Under the light of the ${moonData.phase}...</p>`;
          }
        }
      });
    }
  }

  // --- Bookshelf & Recent Entries ---
  async refreshSanctuary() {
    if (!window.nocturneDB) return;
    const entries = await window.nocturneDB.getAllEntries();

    this.renderBookshelf(entries);
    this.renderRecentMiniPages(entries);
    this.renderPinnedFavorites(entries);
    this.renderSanctuaryCalendarPreview(entries);
  }

  renderBookshelf(entries) {
    const shelfEl = document.getElementById('sanctuary-bookshelf-items');
    if (!shelfEl) return;
    shelfEl.innerHTML = '';

    if (entries.length === 0) {
      shelfEl.innerHTML = `<div class="empty-shelf-text">The antique mahogany bookshelf awaits your first journal volume.</div>`;
      return;
    }

    const spineStyles = ['spine-plum', 'spine-obsidian', 'spine-lavender', 'spine-burgundy', 'spine-emerald'];

    entries.slice(0, 10).forEach((entry, idx) => {
      const book = document.createElement('div');
      const spineClass = spineStyles[idx % spineStyles.length];
      book.className = `vintage-book-spine ${spineClass}`;
      book.title = `${entry.title} (${entry.date})`;

      book.innerHTML = `
        <div class="spine-ribbon"></div>
        <div class="spine-title-vertical">${entry.title}</div>
        <div class="spine-ornament">✦</div>
        <div class="spine-date">${entry.date ? entry.date.slice(5) : ''}</div>
      `;

      book.addEventListener('click', () => {
        this.switchTab('editor');
        if (window.nocturneEditor) window.nocturneEditor.loadEntry(entry);
      });

      shelfEl.appendChild(book);
    });
  }

  renderRecentMiniPages(entries) {
    const container = document.getElementById('sanctuary-recent-pages-grid');
    if (!container) return;
    container.innerHTML = '';

    if (entries.length === 0) {
      container.innerHTML = `<div class="empty-recent-msg">No decorated journal pages written yet.</div>`;
      return;
    }

    entries.slice(0, 4).forEach(entry => {
      const mini = document.createElement('div');
      mini.className = `mini-journal-page bg-${entry.pageBackground || 'purple-parchment'}`;
      const snippet = (entry.content || '').replace(/<[^>]+>/g, '').slice(0, 110) + '...';

      let stickerThumbHtml = '';
      if (entry.stickers && entry.stickers.length > 0) {
        const firstStk = window.STICKERS_DATA.find(s => s.id === entry.stickers[0].stickerId);
        if (firstStk) {
          stickerThumbHtml = `<div class="mini-page-sticker-preview">${firstStk.svg}</div>`;
        }
      }

      mini.innerHTML = `
        <div class="mini-page-header">
          <span class="mini-date">${entry.date || 'Timeless'}</span>
          <span class="mini-mood-dot mood-${entry.mood || 'dreamy'}"></span>
        </div>
        <h4 class="mini-title">${entry.title}</h4>
        <p class="mini-snippet">${snippet}</p>
        ${stickerThumbHtml}
        <div class="mini-page-torn-edge"></div>
      `;

      mini.addEventListener('click', () => {
        this.switchTab('editor');
        if (window.nocturneEditor) window.nocturneEditor.loadEntry(entry);
      });

      container.appendChild(mini);
    });
  }

  renderPinnedFavorites(entries) {
    const container = document.getElementById('sanctuary-pinned-memories');
    if (!container) return;
    container.innerHTML = '';

    const pinned = entries.filter(e => e.isPinned || e.isFavorite);
    if (pinned.length === 0) {
      container.innerHTML = `<div class="empty-pinned-msg">No pinned confessions or favorite memories yet. Pin an entry using the 📌 button in the editor.</div>`;
      return;
    }

    pinned.slice(0, 4).forEach(entry => {
      const card = document.createElement('div');
      card.className = 'pinned-memory-card';
      card.innerHTML = `
        <div class="pinned-header">
          <span class="pin-icon">📌</span>
          <span class="pinned-title">${entry.title}</span>
          <span class="pinned-date">${entry.date}</span>
        </div>
        <p class="pinned-snippet">${(entry.content || '').replace(/<[^>]+>/g, '').slice(0, 100)}...</p>
      `;

      card.addEventListener('click', () => {
        this.switchTab('editor');
        if (window.nocturneEditor) window.nocturneEditor.loadEntry(entry);
      });

      container.appendChild(card);
    });
  }

  renderSanctuaryCalendarPreview(entries) {
    const grid = document.getElementById('sanctuary-mini-calendar');
    if (!grid) return;
    grid.innerHTML = '';

    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const todayNum = now.getDate();

    const datesWithEntries = new Set(entries.map(e => {
      if (!e.date) return null;
      const parts = e.date.split('-');
      if (parseInt(parts[0], 10) === now.getFullYear() && parseInt(parts[1], 10) === now.getMonth() + 1) {
        return parseInt(parts[2], 10);
      }
      return null;
    }));

    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      cell.className = 'mini-cal-cell';
      if (d === todayNum) cell.classList.add('today');
      if (datesWithEntries.has(d)) cell.classList.add('has-entry');
      cell.textContent = d;

      cell.addEventListener('click', () => {
        this.switchTab('calendar');
      });

      grid.appendChild(cell);
    }
  }

  async openRandomMemory() {
    if (!window.nocturneDB) return;
    const entries = await window.nocturneDB.getAllEntries();
    if (entries.length === 0) {
      this.showNotification('No memories written in your sanctuary yet.');
      return;
    }
    const randomEntry = entries[Math.floor(Math.random() * entries.length)];
    this.switchTab('editor');
    if (window.nocturneEditor) {
      window.nocturneEditor.loadEntry(randomEntry);
      this.showNotification(`Unsealed random memory: “${randomEntry.title}” ✦`);
    }
  }

  // --- Full Sticker Collection Showcase View ---
  renderFullStickersShowcase() {
    const grid = document.getElementById('stickers-showcase-grid');
    if (!grid || !window.STICKERS_DATA) return;
    grid.innerHTML = '';

    const catSelect = document.getElementById('showcase-cat-filter');
    const activeCat = catSelect ? catSelect.value : 'all';

    let list = window.STICKERS_DATA;
    if (activeCat !== 'all') {
      list = list.filter(s => s.category === activeCat);
    }

    list.forEach(sticker => {
      const card = document.createElement('div');
      card.className = 'sticker-showcase-card';
      card.innerHTML = `
        <div class="showcase-svg-container">${sticker.svg}</div>
        <div class="showcase-info">
          <h4 class="showcase-name">${sticker.name}</h4>
          <span class="showcase-cat">${sticker.category}</span>
          <div class="showcase-tags">${sticker.tags.map(t => `#${t}`).slice(0, 3).join(' ')}</div>
          <button class="gothic-btn btn-xs btn-use-sticker">Use in Editor ✦</button>
        </div>
      `;

      card.querySelector('.btn-use-sticker').addEventListener('click', () => {
        this.switchTab('editor');
        if (window.nocturneEditor) {
          window.nocturneEditor.addStickerToCanvas(sticker);
        }
      });

      grid.appendChild(card);
    });

    if (catSelect && !catSelect.hasAttribute('data-bound')) {
      catSelect.setAttribute('data-bound', 'true');
      catSelect.addEventListener('change', () => this.renderFullStickersShowcase());
    }
  }

  // --- Settings View ---
  initSettingsView() {
    const themeSelect = document.getElementById('settings-theme-select');
    if (themeSelect) {
      themeSelect.value = this.userSettings.theme;
      themeSelect.addEventListener('change', (e) => {
        this.userSettings.theme = e.target.value;
        this.applyTheme(this.userSettings.theme);
        this.saveSettings();
      });
    }

    const nicknameInput = document.getElementById('settings-nickname-input');
    if (nicknameInput) {
      nicknameInput.value = this.userSettings.nickname;
      nicknameInput.addEventListener('change', (e) => {
        this.userSettings.nickname = e.target.value.trim() || 'Moonchild';
        this.updateUserGreeting();
        this.saveSettings();
      });
    }

    const soundSelect = document.getElementById('settings-sound-select');
    if (soundSelect) {
      soundSelect.value = this.userSettings.sound;
      soundSelect.addEventListener('change', (e) => {
        this.userSettings.sound = e.target.value;
        if (window.nocturneAudio) {
          window.nocturneAudio.setAmbient(this.userSettings.sound);
        }
        this.saveSettings();
      });
    }

    const volumeSlider = document.getElementById('settings-sound-volume');
    if (volumeSlider) {
      volumeSlider.value = this.userSettings.volume;
      volumeSlider.addEventListener('input', (e) => {
        this.userSettings.volume = parseFloat(e.target.value);
        if (window.nocturneAudio) {
          window.nocturneAudio.setVolume(this.userSettings.volume);
        }
        this.saveSettings();
      });
    }

    const particleToggle = document.getElementById('settings-particles-toggle');
    if (particleToggle) {
      particleToggle.checked = this.userSettings.particles;
      particleToggle.addEventListener('change', (e) => {
        this.userSettings.particles = e.target.checked;
        if (this.particleCanvas) {
          this.particleCanvas.style.display = this.userSettings.particles ? 'block' : 'none';
        }
        this.saveSettings();
      });
    }

    // Passcode lock setup
    const passcodeToggle = document.getElementById('settings-passcode-toggle');
    const passcodePinInput = document.getElementById('settings-passcode-pin');
    if (passcodeToggle && passcodePinInput) {
      passcodeToggle.checked = this.userSettings.passcodeEnabled;
      passcodePinInput.value = this.userSettings.passcodePin || '';

      passcodeToggle.addEventListener('change', (e) => {
        this.userSettings.passcodeEnabled = e.target.checked;
        this.saveSettings();
        this.showNotification(this.userSettings.passcodeEnabled ? 'Gothic Passcode Lock activated 🗝️' : 'Passcode Lock disabled.');
      });

      passcodePinInput.addEventListener('change', (e) => {
        this.userSettings.passcodePin = e.target.value.trim();
        this.saveSettings();
      });
    }

    // Export Data Button
    const btnExport = document.getElementById('btn-export-journal-json');
    if (btnExport) {
      btnExport.addEventListener('click', async () => {
        if (window.nocturneDB) {
          const json = await window.nocturneDB.exportJournalData();
          const blob = new Blob([json], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `nocturne-journal-backup-${new Date().toISOString().split('T')[0]}.json`;
          a.click();
          URL.revokeObjectURL(url);
          this.showNotification('Journal backup exported safely ✦');
        }
      });
    }

    // Import Data Button
    const btnImport = document.getElementById('btn-import-journal-trigger');
    const importFileInput = document.getElementById('journal-import-file-input');
    if (btnImport && importFileInput) {
      btnImport.addEventListener('click', () => importFileInput.click());
      importFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const text = await file.text();
        try {
          if (window.nocturneDB) {
            await window.nocturneDB.importJournalData(text);
            this.showNotification('Journal memories imported successfully! ✦');
            setTimeout(() => window.location.reload(), 1200);
          }
        } catch (err) {
          this.showNotification('Error importing backup: ' + err.message);
        }
      });
    }
  }

  // --- App Passcode Lock Engine ---
  initAppLock() {
    const lockScreen = document.getElementById('app-passcode-lock-screen');
    const pinInput = document.getElementById('lock-screen-pin-input');
    const unlockBtn = document.getElementById('btn-lock-screen-unlock');
    const resetBtn = document.getElementById('btn-lock-forgot-pin');

    if (!lockScreen) return;

    // "Forgot PIN" — wipes the lock setting so user can get in
    if (resetBtn) {
      resetBtn.addEventListener('click', async () => {
        const confirmed = confirm('Reset your passcode? The diary will open, and you can set a new PIN in Settings.');
        if (!confirmed) return;
        this.userSettings.passcodeEnabled = false;
        this.userSettings.passcodePin = '';
        // Also clear from localStorage immediately (belt + suspenders)
        try {
          const raw = localStorage.getItem('nocturne_settings');
          if (raw) {
            const cfg = JSON.parse(raw);
            if (cfg) { cfg.passcodeEnabled = false; cfg.passcodePin = ''; }
            localStorage.setItem('nocturne_settings', JSON.stringify(cfg));
          }
        } catch (e) { /* ignore */ }
        await this.saveSettings().catch(() => {});
        lockScreen.classList.remove('active');
        this.showNotification('Passcode reset. Set a new one in ⚙ Settings when ready.');
      });
    }

    // Only show lock if passcode is truly enabled AND a non-empty PIN is saved
    const pinSaved = (this.userSettings.passcodePin || '').toString().trim();
    if (this.userSettings.passcodeEnabled && pinSaved.length > 0) {
      lockScreen.classList.add('active');
      if (pinInput) {
        pinInput.focus();
        const tryUnlock = () => {
          const entered = pinInput.value.toString().trim();
          if (entered === pinSaved) {
            lockScreen.classList.remove('active');
            pinInput.value = '';
            this.showNotification('Welcome back to the shadows ✦');
          } else {
            lockScreen.classList.add('shake');
            setTimeout(() => lockScreen.classList.remove('shake'), 500);
            pinInput.value = '';
            this.showNotification('Incorrect passcode — try again 🗝️');
          }
        };

        if (unlockBtn) unlockBtn.addEventListener('click', tryUnlock);
        pinInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') tryUnlock();
        });
      }
    } else {
      // No lock configured — make sure screen stays hidden
      lockScreen.classList.remove('active');
    }
  }

  // --- Floating Atmosphere Particles (Dust motes & Stars) ---
  initParticles() {
    this.particleCanvas = document.getElementById('ambient-particles-canvas');
    if (!this.particleCanvas) return;
    this.particleCtx = this.particleCanvas.getContext('2d');

    const resize = () => {
      this.particleCanvas.width = window.innerWidth;
      this.particleCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Create 45 subtle ethereal particles
    this.particles = [];
    for (let i = 0; i < 45; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.8 + 0.4,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        pulsing: Math.random() * 0.02
      });
    }

    const animate = () => {
      if (!this.userSettings.particles) {
        requestAnimationFrame(animate);
        return;
      }

      this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);

      this.particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.pulsing;

        if (p.opacity > 0.7 || p.opacity < 0.1) {
          p.pulsing = -p.pulsing;
        }

        if (p.y < 0) {
          p.y = this.particleCanvas.height;
          p.x = Math.random() * this.particleCanvas.width;
        }

        this.particleCtx.beginPath();
        this.particleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.particleCtx.fillStyle = `rgba(231, 221, 245, ${Math.max(0, p.opacity)})`;
        this.particleCtx.shadowBlur = 4;
        this.particleCtx.shadowColor = '#A993C9';
        this.particleCtx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  // --- Toast Notifications ---
  showNotification(text) {
    const toast = document.getElementById('app-toast-notification');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('visible');
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  }
}

// Instantiate and Boot App on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.nocturneApp = new NocturneApp();
  window.nocturneApp.init();
});
