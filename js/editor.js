/**
 * Nocturne - Diary Editor Engine
 * Full-featured interactive journal editor with rich text, page textures,
 * draggable/rotatable stickers & polaroids, auto-save, typewriter mode, and reflection prompts.
 */

class NocturneEditor {
  constructor() {
    this.currentEntry = null;
    this.isDirty = false;
    this.autoSaveTimer = null;
    this.selectedStickerElement = null;
    this.typewriterActive = false;
    this.activeDrag = null;

    this.dom = {
      editorContainer: document.getElementById('view-editor'),
      pageCanvas: document.getElementById('journal-page-canvas'),
      titleInput: document.getElementById('entry-title-input'),
      dateInput: document.getElementById('entry-date-input'),
      moodSelect: document.getElementById('entry-mood-select'),
      tagsInput: document.getElementById('entry-tags-input'),
      contentArea: document.getElementById('entry-content-editable'),
      backgroundSelect: document.getElementById('page-bg-select'),
      fontFamilySelect: document.getElementById('font-family-select'),
      stickersLayer: document.getElementById('journal-stickers-layer'),
      saveStatus: document.getElementById('save-status-indicator'),
      wordCount: document.getElementById('editor-word-count'),
      reflectionQuestion: document.getElementById('reflection-question-select'),
      reflectionAnswer: document.getElementById('reflection-answer-input'),
      typewriterToggle: document.getElementById('typewriter-mode-btn')
    };

    this.initEventListeners();
    this.initStickerInteraction();
  }

  initEventListeners() {
    // Rich Text Formatting Buttons
    document.querySelectorAll('[data-format-cmd]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cmd = btn.getAttribute('data-format-cmd');
        const val = btn.getAttribute('data-format-val') || null;
        document.execCommand(cmd, false, val);
        this.dom.contentArea.focus();
        this.markDirty();
      });
    });

    // Content typing & Typewriter Audio
    const handleTypewriterAudio = (e) => {
      if (!window.nocturneAudio) return;
      if (e.key === 'Enter') {
        window.nocturneAudio.playCarriageBell();
      } else if (e.key === ' ' || e.code === 'Space') {
        window.nocturneAudio.playTypewriterKey('space');
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        window.nocturneAudio.playTypewriterKey('backspace');
      } else if (e.key && e.key.length === 1) {
        window.nocturneAudio.playTypewriterKey('key');
      }
    };

    if (this.dom.contentArea) {
      this.dom.contentArea.addEventListener('input', () => {
        this.updateWordCount();
        this.markDirty();
      });

      this.dom.contentArea.addEventListener('keydown', handleTypewriterAudio);
    }

    // Attach typewriter sound to Title & Reflection inputs as well
    if (this.dom.titleInput) {
      this.dom.titleInput.addEventListener('keydown', handleTypewriterAudio);
    }
    if (this.dom.reflectionAnswer) {
      this.dom.reflectionAnswer.addEventListener('keydown', handleTypewriterAudio);
    }

    // Title, Date, Tags, Reflection changes
    [this.dom.titleInput, this.dom.dateInput, this.dom.tagsInput, this.dom.reflectionAnswer].forEach(el => {
      if (el) {
        el.addEventListener('input', () => this.markDirty());
      }
    });

    // Mood picker
    document.querySelectorAll('.mood-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (this.currentEntry) {
          this.currentEntry.mood = btn.getAttribute('data-mood');
          this.markDirty();
        }
      });
    });

    // Page Background Switcher
    if (this.dom.backgroundSelect) {
      this.dom.backgroundSelect.addEventListener('change', (e) => {
        const bg = e.target.value;
        this.applyPageBackground(bg);
        if (this.currentEntry) {
          this.currentEntry.pageBackground = bg;
          this.markDirty();
        }
      });
    }

    // Font Family Switcher
    if (this.dom.fontFamilySelect) {
      this.dom.fontFamilySelect.addEventListener('change', (e) => {
        const font = e.target.value;
        this.applyPageFont(font);
        if (this.currentEntry) {
          this.currentEntry.fontStyle = font;
          this.markDirty();
        }
      });
    }

    // Color picker
    const colorPicker = document.getElementById('text-color-picker');
    if (colorPicker) {
      colorPicker.addEventListener('input', (e) => {
        document.execCommand('foreColor', false, e.target.value);
        this.markDirty();
      });
    }

    // Manual Save Button
    const saveBtn = document.getElementById('manual-save-entry-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveCurrentEntry(true));
    }

    // New Entry Button
    const newEntryBtn = document.getElementById('btn-new-entry-editor');
    if (newEntryBtn) {
      newEntryBtn.addEventListener('click', () => this.createNewEntry());
    }

    // Image Upload input
    const photoUploadInput = document.getElementById('page-photo-uploader');
    if (photoUploadInput) {
      photoUploadInput.addEventListener('change', (e) => this.handleImageUpload(e));
    }

    // Typewriter Mode toggle
    if (this.dom.typewriterToggle) {
      this.dom.typewriterToggle.addEventListener('click', () => {
        this.typewriterActive = !this.typewriterActive;
        this.dom.editorContainer.classList.toggle('typewriter-focus-mode', this.typewriterActive);
        this.dom.typewriterToggle.classList.toggle('active', this.typewriterActive);
        if (window.nocturneAudio) {
          window.nocturneAudio.typewriterEnabled = this.typewriterActive;
        }
      });
    }

    // Deselect sticker when clicking blank canvas
    if (this.dom.pageCanvas) {
      this.dom.pageCanvas.addEventListener('click', (e) => {
        if (!e.target.closest('.interactive-page-item')) {
          this.deselectAllItems();
        }
      });
    }
  }

  // --- Create / Load Entry ---
  createNewEntry() {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      id: 'entry-' + Date.now(),
      title: 'Untitled Shadows',
      date: today,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mood: 'dreamy',
      tags: ['Nocturne'],
      pageBackground: 'purple-parchment',
      fontStyle: 'serif',
      content: '<p>The candlelight wavers upon the paper...</p>',
      isPinned: false,
      isFavorite: false,
      reflection: {
        question: 'What made today memorable?',
        answer: ''
      },
      stickers: [],
      images: []
    };
    this.loadEntry(newEntry);
  }

  loadEntry(entry) {
    this.currentEntry = JSON.parse(JSON.stringify(entry)); // deep copy
    if (!this.currentEntry.stickers) this.currentEntry.stickers = [];
    if (!this.currentEntry.images) this.currentEntry.images = [];
    if (!this.currentEntry.reflection) {
      this.currentEntry.reflection = { question: 'What made today memorable?', answer: '' };
    }

    // Populate Fields
    if (this.dom.titleInput) this.dom.titleInput.value = this.currentEntry.title || '';
    if (this.dom.dateInput) this.dom.dateInput.value = this.currentEntry.date || new Date().toISOString().split('T')[0];
    if (this.dom.tagsInput) this.dom.tagsInput.value = (this.currentEntry.tags || []).join(', ');
    if (this.dom.contentArea) this.dom.contentArea.innerHTML = this.currentEntry.content || '';
    if (this.dom.backgroundSelect) this.dom.backgroundSelect.value = this.currentEntry.pageBackground || 'purple-parchment';
    if (this.dom.fontFamilySelect) this.dom.fontFamilySelect.value = this.currentEntry.fontStyle || 'serif';

    // Reflection
    if (this.dom.reflectionQuestion) this.dom.reflectionQuestion.value = this.currentEntry.reflection.question || 'What made today memorable?';
    if (this.dom.reflectionAnswer) this.dom.reflectionAnswer.value = this.currentEntry.reflection.answer || '';

    // Mood UI
    document.querySelectorAll('.mood-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mood') === this.currentEntry.mood);
    });

    this.applyPageBackground(this.currentEntry.pageBackground || 'purple-parchment');
    this.applyPageFont(this.currentEntry.fontStyle || 'serif');

    // Render Stickers & Polaroids
    this.renderStickersLayer();

    this.updateWordCount();
    this.setSaveStatus('Saved in the shadows ✦');
    this.isDirty = false;
  }

  applyPageBackground(bg) {
    if (!this.dom.pageCanvas) return;
    this.dom.pageCanvas.className = 'journal-page-canvas ' + `bg-${bg}`;
  }

  applyPageFont(font) {
    if (!this.dom.contentArea) return;
    this.dom.contentArea.className = 'entry-content-editable ' + `font-${font}`;
  }

  updateWordCount() {
    if (!this.dom.contentArea || !this.dom.wordCount) return;
    const text = this.dom.contentArea.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    this.dom.wordCount.textContent = `${words} words · ${chars} characters`;
  }

  markDirty() {
    this.isDirty = true;
    this.setSaveStatus('Whispering changes...');
    if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);
    this.autoSaveTimer = setTimeout(() => {
      this.saveCurrentEntry(false);
    }, 1800);
  }

  setSaveStatus(msg) {
    if (this.dom.saveStatus) {
      this.dom.saveStatus.textContent = msg;
    }
  }

  async saveCurrentEntry(showToast = true) {
    if (!this.currentEntry) return;

    // Collect Data
    this.currentEntry.title = this.dom.titleInput ? this.dom.titleInput.value.trim() || 'Untitled Shadows' : 'Untitled';
    this.currentEntry.date = this.dom.dateInput ? this.dom.dateInput.value : new Date().toISOString().split('T')[0];
    this.currentEntry.tags = this.dom.tagsInput ? this.dom.tagsInput.value.split(',').map(t => t.trim()).filter(Boolean) : [];
    this.currentEntry.content = this.dom.contentArea ? this.dom.contentArea.innerHTML : '';
    this.currentEntry.pageBackground = this.dom.backgroundSelect ? this.dom.backgroundSelect.value : 'purple-parchment';
    this.currentEntry.fontStyle = this.dom.fontFamilySelect ? this.dom.fontFamilySelect.value : 'serif';
    this.currentEntry.updatedAt = new Date().toISOString();

    if (this.dom.reflectionQuestion && this.dom.reflectionAnswer) {
      this.currentEntry.reflection = {
        question: this.dom.reflectionQuestion.value,
        answer: this.dom.reflectionAnswer.value.trim()
      };
    }

    // Save to DB
    if (window.nocturneDB) {
      await window.nocturneDB.saveEntry(this.currentEntry);
      this.setSaveStatus('Saved in the shadows ✦');
      this.isDirty = false;
      if (showToast && window.nocturneApp) {
        window.nocturneApp.showNotification('Your secrets have been recorded in the shadows ✦');
      }
      // Refresh Home/Calendar if active
      if (window.nocturneApp && window.nocturneApp.refreshSanctuary) {
        window.nocturneApp.refreshSanctuary();
      }
    }
  }

  // --- Sticker & Decoration Placement Engine ---
  renderStickersLayer() {
    if (!this.dom.stickersLayer) return;
    this.dom.stickersLayer.innerHTML = '';

    if (!this.currentEntry || !this.currentEntry.stickers) return;

    this.currentEntry.stickers.forEach(item => {
      this.createStickerDOM(item);
    });
  }

  addStickerToCanvas(stickerData) {
    if (!this.currentEntry) return;

    // Default centered position with slight random offset
    const randomOffset = Math.floor(Math.random() * 40 - 20);
    const newItem = {
      id: 'stk-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      stickerId: stickerData.id,
      x: 35 + (randomOffset / 10),
      y: 25 + (randomOffset / 10),
      width: stickerData.category === 'stamps' ? 140 : 100,
      height: stickerData.category === 'stamps' ? 70 : 100,
      rotate: Math.floor(Math.random() * 16 - 8),
      zIndex: (this.currentEntry.stickers.length + 1) * 2
    };

    this.currentEntry.stickers.push(newItem);
    const domEl = this.createStickerDOM(newItem);
    this.selectItem(domEl, newItem);
    this.markDirty();

    // 🎵 Play sticker pop sound
    if (window.nocturneAudio) window.nocturneAudio.playStickerPop();
  }

  createStickerDOM(item) {
    const rawSticker = window.STICKERS_DATA.find(s => s.id === item.stickerId);
    if (!rawSticker) return null;

    const el = document.createElement('div');
    el.className = 'interactive-page-item sticker-item';
    el.id = item.id;
    el.style.left = `${item.x}%`;
    el.style.top = `${item.y}%`;
    el.style.width = `${item.width}px`;
    el.style.height = `${item.height}px`;
    el.style.transform = `rotate(${item.rotate || 0}deg)`;
    el.style.zIndex = item.zIndex || 2;

    const graphic = rawSticker.img
      ? `<img src="${rawSticker.img}" class="sticker-img-asset" alt="${rawSticker.name}" draggable="false" />`
      : (rawSticker.svg || '✦');

    el.innerHTML = `
      <div class="item-inner-graphic">${graphic}</div>
      <div class="item-selection-controls">
        <button class="item-ctrl-btn btn-rotate" title="Rotate Sticker">↻</button>
        <button class="item-ctrl-btn btn-layer-up" title="Bring Forward">▲</button>
        <button class="item-ctrl-btn btn-layer-down" title="Send Backward">▼</button>
        <button class="item-ctrl-btn btn-duplicate" title="Duplicate">❐</button>
        <button class="item-ctrl-btn btn-delete" title="Delete">✕</button>
        <div class="item-resize-handle" title="Drag to Resize"></div>
      </div>
    `;

    this.dom.stickersLayer.appendChild(el);
    this.attachItemHandlers(el, item);
    return el;
  }

  // Handle Image Upload (Polaroid or Scrap)
  handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target.result;
      this.addPhotoToCanvas(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // reset input
  }

  addPhotoToCanvas(dataUrl) {
    if (!this.currentEntry) return;

    const newItem = {
      id: 'photo-' + Date.now(),
      type: 'photo',
      dataUrl: dataUrl,
      caption: 'A captured memory',
      x: 30,
      y: 20,
      width: 180,
      height: 220,
      rotate: Math.floor(Math.random() * 10 - 5),
      zIndex: (this.currentEntry.stickers.length + 1) * 2
    };

    if (!this.currentEntry.images) this.currentEntry.images = [];
    this.currentEntry.images.push(newItem);

    const el = document.createElement('div');
    el.className = 'interactive-page-item polaroid-item';
    el.id = newItem.id;
    el.style.left = `${newItem.x}%`;
    el.style.top = `${newItem.y}%`;
    el.style.width = `${newItem.width}px`;
    el.style.transform = `rotate(${newItem.rotate}deg)`;
    el.style.zIndex = newItem.zIndex;

    el.innerHTML = `
      <div class="polaroid-frame">
        <div class="washi-tape-strip tape-rose"></div>
        <img src="${dataUrl}" class="polaroid-img" alt="Memory Photo"/>
        <div class="polaroid-caption" contenteditable="true">A captured memory</div>
      </div>
      <div class="item-selection-controls">
        <button class="item-ctrl-btn btn-rotate" title="Rotate">↻</button>
        <button class="item-ctrl-btn btn-layer-up" title="Bring Forward">▲</button>
        <button class="item-ctrl-btn btn-delete" title="Delete">✕</button>
        <div class="item-resize-handle" title="Resize"></div>
      </div>
    `;

    this.dom.stickersLayer.appendChild(el);
    this.attachItemHandlers(el, newItem, true);
    this.selectItem(el, newItem);
    this.markDirty();
  }

  // Attach drag, resize, rotate, and action buttons to a canvas item
  attachItemHandlers(el, itemData, isPhoto = false) {
    el.addEventListener('mousedown', (e) => {
      if (e.target.closest('.item-ctrl-btn') || e.target.classList.contains('item-resize-handle')) {
        return; // handle is clicked
      }
      this.selectItem(el, itemData);
      this.startDragging(e, el, itemData);
    });

    // Resize Handle
    const resizeHandle = el.querySelector('.item-resize-handle');
    if (resizeHandle) {
      resizeHandle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        this.startResizing(e, el, itemData);
      });
    }

    // Rotate Button
    const rotateBtn = el.querySelector('.btn-rotate');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        itemData.rotate = ((itemData.rotate || 0) + 15) % 360;
        el.style.transform = `rotate(${itemData.rotate}deg)`;
        this.markDirty();
      });
    }

    // Layer Up
    const layerUp = el.querySelector('.btn-layer-up');
    if (layerUp) {
      layerUp.addEventListener('click', (e) => {
        e.stopPropagation();
        itemData.zIndex = (itemData.zIndex || 2) + 2;
        el.style.zIndex = itemData.zIndex;
        this.markDirty();
      });
    }

    // Layer Down
    const layerDown = el.querySelector('.btn-layer-down');
    if (layerDown) {
      layerDown.addEventListener('click', (e) => {
        e.stopPropagation();
        itemData.zIndex = Math.max(1, (itemData.zIndex || 2) - 2);
        el.style.zIndex = itemData.zIndex;
        this.markDirty();
      });
    }

    // Duplicate
    const dupBtn = el.querySelector('.btn-duplicate');
    if (dupBtn) {
      dupBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const clone = JSON.parse(JSON.stringify(itemData));
        clone.id = 'stk-' + Date.now();
        clone.x = Math.min(80, clone.x + 5);
        clone.y = Math.min(80, clone.y + 5);
        this.currentEntry.stickers.push(clone);
        const newEl = this.createStickerDOM(clone);
        this.selectItem(newEl, clone);
        this.markDirty();
      });
    }

    // Delete
    const delBtn = el.querySelector('.btn-delete');
    if (delBtn) {
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPhoto) {
          this.currentEntry.images = (this.currentEntry.images || []).filter(i => i.id !== itemData.id);
        } else {
          this.currentEntry.stickers = (this.currentEntry.stickers || []).filter(s => s.id !== itemData.id);
        }
        el.remove();
        this.markDirty();
      });
    }
  }

  selectItem(el, itemData) {
    this.deselectAllItems();
    el.classList.add('selected');
    this.selectedStickerElement = { el, data: itemData };
  }

  deselectAllItems() {
    document.querySelectorAll('.interactive-page-item').forEach(i => i.classList.remove('selected'));
    this.selectedStickerElement = null;
  }

  // --- Drag Engine ---
  startDragging(e, el, itemData) {
    e.preventDefault();
    const canvasRect = this.dom.pageCanvas.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const initialLeft = el.offsetLeft;
    const initialTop = el.offsetTop;

    const onMouseMove = (moveEvt) => {
      const dx = moveEvt.clientX - startX;
      const dy = moveEvt.clientY - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // Keep within page boundaries with padding
      newLeft = Math.max(0, Math.min(newLeft, canvasRect.width - el.offsetWidth));
      newTop = Math.max(0, Math.min(newTop, canvasRect.height - el.offsetHeight));

      el.style.left = `${(newLeft / canvasRect.width) * 100}%`;
      el.style.top = `${(newTop / canvasRect.height) * 100}%`;

      itemData.x = (newLeft / canvasRect.width) * 100;
      itemData.y = (newTop / canvasRect.height) * 100;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      this.markDirty();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // --- Resize Engine ---
  startResizing(e, el, itemData) {
    e.preventDefault();
    const startX = e.clientX;
    const initialWidth = el.offsetWidth;
    const aspectRatio = el.offsetHeight / el.offsetWidth;

    const onMouseMove = (moveEvt) => {
      const dx = moveEvt.clientX - startX;
      let newWidth = Math.max(50, Math.min(350, initialWidth + dx));
      let newHeight = newWidth * aspectRatio;

      el.style.width = `${newWidth}px`;
      el.style.height = `${newHeight}px`;

      itemData.width = newWidth;
      itemData.height = newHeight;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      this.markDirty();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  initStickerInteraction() {
    // Populate Sticker Drawer in Editor
    const drawerGrid = document.getElementById('editor-sticker-drawer-grid');
    if (!drawerGrid || !window.STICKERS_DATA) return;

    // Default to Kuromi Collection so user can immediately click & attach Kuromi stickers!
    this.renderStickerDrawer(drawerGrid, 'kuromi');

    // Quick Kuromi button in toolbar
    const quickKuromiBtn = document.getElementById('btn-quick-kuromi');
    if (quickKuromiBtn) {
      quickKuromiBtn.addEventListener('click', () => {
        const kuromis = window.STICKERS_DATA.filter(s => s.category === 'kuromi');
        if (kuromis.length > 0) {
          const k = kuromis[Math.floor(Math.random() * kuromis.length)];
          this.addStickerToCanvas(k);
          if (window.nocturneApp) window.nocturneApp.showNotification(`Attached ${k.name} to your diary ✦`);
        }
      });
    }

    // Category filter tabs in drawer
    document.querySelectorAll('.sticker-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sticker-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        this.renderStickerDrawer(drawerGrid, cat);
      });
    });

    // Sticker Search input
    const searchInput = document.getElementById('sticker-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.renderStickerDrawer(drawerGrid, 'search', query);
      });
    }
  }

  renderStickerDrawer(container, category = 'all', query = '') {
    container.innerHTML = '';
    let filtered = window.STICKERS_DATA;

    if (category === 'search' && query) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(query) || s.tags.some(t => t.toLowerCase().includes(query)));
    } else if (category !== 'all') {
      filtered = filtered.filter(s => s.category === category);
    }

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-stickers-msg">No curiosities found in the dark...</div>`;
      return;
    }

    filtered.forEach(sticker => {
      const card = document.createElement('div');
      card.className = 'sticker-picker-thumb';
      card.title = `${sticker.name} (Click to place on page)`;
      if (sticker.img) {
        card.innerHTML = `<img src="${sticker.img}" alt="${sticker.name}" draggable="false" />`;
      } else if (sticker.isInteractiveEnvelope) {
        card.innerHTML = `<div style="font-size:32px; text-align:center;">✉️</div><span style="font-size:10px; color:#A993C9;">Envelope</span>`;
      } else {
        card.innerHTML = sticker.svg;
      }

      card.addEventListener('click', () => {
        this.addStickerToCanvas(sticker);
        if (window.nocturneApp) {
          window.nocturneApp.showNotification(`Added ${sticker.name} to your page ✦`);
        }
      });

      container.appendChild(card);
    });
  }
}

// Global Editor Instance
window.nocturneEditor = new NocturneEditor();
