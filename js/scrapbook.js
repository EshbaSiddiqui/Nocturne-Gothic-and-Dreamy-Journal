/**
 * Nocturne - Creative Scrapbook Mode
 * Freeform vintage & gothic scrapbooking board with polaroid frames,
 * washi tape strips, paper scraps, stickers, photo uploads, and multi-board saving.
 */

class NocturneScrapbook {
  constructor() {
    this.currentBoard = null;
    this.boards = [];
    this.selectedItem = null;

    this.dom = {
      container: document.getElementById('view-scrapbook'),
      canvas: document.getElementById('scrapbook-freeform-canvas'),
      boardTitle: document.getElementById('scrapbook-title-input'),
      themeSelect: document.getElementById('scrapbook-theme-select'),
      boardSelector: document.getElementById('scrapbook-board-selector'),
      photoUpload: document.getElementById('scrapbook-photo-upload'),
      addNoteBtn: document.getElementById('btn-add-scrap-note'),
      addTapeBtn: document.getElementById('btn-add-washi-tape'),
      addStickerBtn: document.getElementById('btn-add-scrap-sticker'),
      newBoardBtn: document.getElementById('btn-new-scrapbook-board'),
      saveBoardBtn: document.getElementById('btn-save-scrapbook-board'),
      deleteBoardBtn: document.getElementById('btn-delete-scrapbook-board')
    };

    this.initEventListeners();
  }

  async init() {
    if (window.nocturneDB) {
      this.boards = await window.nocturneDB.getAllScrapbooks();
      if (this.boards.length > 0) {
        this.loadBoard(this.boards[0]);
      } else {
        this.createNewBoard();
      }
      this.updateBoardSelectorDropdown();
    }
  }

  initEventListeners() {
    if (this.dom.boardTitle) {
      this.dom.boardTitle.addEventListener('input', () => {
        if (this.currentBoard) {
          this.currentBoard.title = this.dom.boardTitle.value.trim() || 'Untitled Board';
        }
      });
      // 🎹 Typewriter sound on board title
      this.dom.boardTitle.addEventListener('keydown', (e) => {
        if (!window.nocturneAudio) return;
        if (e.key === 'Enter') window.nocturneAudio.playCarriageBell();
        else if (e.key === ' ') window.nocturneAudio.playTypewriterKey('space');
        else if (e.key === 'Backspace' || e.key === 'Delete') window.nocturneAudio.playTypewriterKey('backspace');
        else if (e.key.length === 1) window.nocturneAudio.playTypewriterKey('key');
      });
    }

    if (this.dom.themeSelect) {
      this.dom.themeSelect.addEventListener('change', (e) => {
        if (this.currentBoard) {
          this.currentBoard.theme = e.target.value;
          this.applyTheme(this.currentBoard.theme);
        }
      });
    }

    if (this.dom.boardSelector) {
      this.dom.boardSelector.addEventListener('change', (e) => {
        const found = this.boards.find(b => b.id === e.target.value);
        if (found) this.loadBoard(found);
      });
    }

    if (this.dom.newBoardBtn) {
      this.dom.newBoardBtn.addEventListener('click', () => this.createNewBoard());
    }

    if (this.dom.saveBoardBtn) {
      this.dom.saveBoardBtn.addEventListener('click', () => this.saveCurrentBoard());
    }

    if (this.dom.deleteBoardBtn) {
      this.dom.deleteBoardBtn.addEventListener('click', () => this.deleteCurrentBoard());
    }

    // Add Elements
    if (this.dom.addNoteBtn) {
      this.dom.addNoteBtn.addEventListener('click', () => this.addNoteElement());
    }

    if (this.dom.addTapeBtn) {
      this.dom.addTapeBtn.addEventListener('click', () => {
        this.addWashiTapeElement();
        // 🎵 Washi tape peel sound
        if (window.nocturneAudio) window.nocturneAudio.playWashiTape();
      });
    }

    // Sticker Picker Button
    if (this.dom.addStickerBtn) {
      this.dom.addStickerBtn.addEventListener('click', () => {
        if (window.openUniversalPicker) {
          window.openUniversalPicker('scrapbook', 'kuromi');
        } else {
          const stickers = (window.STICKERS_DATA || []).filter(s => s.category === 'kuromi');
          const s = stickers[Math.floor(Math.random() * stickers.length)] || window.STICKERS_DATA[0];
          this.addStickerToScrapbook(s);
        }
      });
    }

    // Wax Seal Picker Button
    const btnSeal = document.getElementById('btn-add-scrap-seal');
    if (btnSeal) {
      btnSeal.addEventListener('click', () => {
        if (window.openUniversalPicker) {
          window.openUniversalPicker('scrapbook', 'seals');
        } else {
          this.addWaxSealElement();
        }
      });
    }

    // Envelope Picker Button
    const btnEnv = document.getElementById('btn-add-scrap-envelope');
    if (btnEnv) {
      btnEnv.addEventListener('click', () => {
        if (window.openUniversalPicker) {
          window.openUniversalPicker('scrapbook', 'envelopes');
        } else {
          this.addEnvelopeElement();
        }
      });
    }

    if (this.dom.photoUpload) {
      this.dom.photoUpload.addEventListener('change', (e) => this.handlePhotoUpload(e));
    }

    // Canvas click to deselect
    if (this.dom.canvas) {
      this.dom.canvas.addEventListener('click', (e) => {
        if (!e.target.closest('.scrap-canvas-item')) {
          this.deselectAll();
        }
      });
    }
  }

  createNewBoard() {
    const newBoard = {
      id: 'board-' + Date.now(),
      title: 'Dark Reverie & Autumn Whispers',
      theme: 'purple-dream',
      updatedAt: new Date().toISOString(),
      elements: [
        {
          id: 'sc-init-note',
          type: 'note',
          text: '“Every secret is a rose that blooms only in the dark.”',
          x: 60,
          y: 60,
          width: 260,
          rotate: -2,
          bg: '#251536'
        },
        {
          id: 'sc-init-tape',
          type: 'tape',
          style: 'lace',
          x: 180,
          y: 40,
          width: 130,
          rotate: -1
        }
      ]
    };
    this.boards.unshift(newBoard);
    this.loadBoard(newBoard);
    this.updateBoardSelectorDropdown();
  }

  loadBoard(board) {
    this.currentBoard = JSON.parse(JSON.stringify(board));
    if (!this.currentBoard.elements) this.currentBoard.elements = [];

    if (this.dom.boardTitle) this.dom.boardTitle.value = this.currentBoard.title || 'Untitled Board';
    if (this.dom.themeSelect) this.dom.themeSelect.value = this.currentBoard.theme || 'purple-dream';
    if (this.dom.boardSelector) this.dom.boardSelector.value = this.currentBoard.id;

    this.applyTheme(this.currentBoard.theme || 'purple-dream');
    this.renderBoardElements();
  }

  applyTheme(theme) {
    if (!this.dom.canvas) return;
    this.dom.canvas.className = 'scrapbook-freeform-canvas ' + `theme-${theme}`;
  }

  updateBoardSelectorDropdown() {
    if (!this.dom.boardSelector) return;
    this.dom.boardSelector.innerHTML = '';
    this.boards.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b.id;
      opt.textContent = b.title;
      this.dom.boardSelector.appendChild(opt);
    });
    if (this.currentBoard) {
      this.dom.boardSelector.value = this.currentBoard.id;
    }
  }

  async saveCurrentBoard() {
    if (!this.currentBoard || !window.nocturneDB) return;
    this.currentBoard.title = this.dom.boardTitle ? this.dom.boardTitle.value.trim() : 'Untitled Board';
    this.currentBoard.theme = this.dom.themeSelect ? this.dom.themeSelect.value : 'purple-dream';
    this.currentBoard.updatedAt = new Date().toISOString();

    await window.nocturneDB.saveScrapbook(this.currentBoard);
    const idx = this.boards.findIndex(b => b.id === this.currentBoard.id);
    if (idx !== -1) {
      this.boards[idx] = this.currentBoard;
    } else {
      this.boards.push(this.currentBoard);
    }
    this.updateBoardSelectorDropdown();

    if (window.nocturneApp) {
      window.nocturneApp.showNotification('Scrapbook board preserved in the velvet archive ✦');
    }
  }

  async deleteCurrentBoard() {
    if (!this.currentBoard || !window.nocturneDB) return;
    if (this.boards.length <= 1) {
      if (window.nocturneApp) {
        window.nocturneApp.showNotification('Cannot delete your only scrapbook board.');
      }
      return;
    }
    await window.nocturneDB.deleteScrapbook(this.currentBoard.id);
    this.boards = this.boards.filter(b => b.id !== this.currentBoard.id);
    this.loadBoard(this.boards[0]);
    this.updateBoardSelectorDropdown();
    if (window.nocturneApp) {
      window.nocturneApp.showNotification('Scrapbook board vanished into shadows.');
    }
  }

  renderBoardElements() {
    if (!this.dom.canvas) return;
    this.dom.canvas.innerHTML = '';

    if (!this.currentBoard || !this.currentBoard.elements) return;

    this.currentBoard.elements.forEach(item => {
      this.createItemDOM(item);
    });
  }

  createItemDOM(item) {
    const el = document.createElement('div');
    el.className = `scrap-canvas-item scrap-type-${item.type}`;
    el.id = item.id;
    el.style.left = `${item.x}px`;
    el.style.top = `${item.y}px`;
    if (item.width) el.style.width = `${item.width}px`;
    el.style.transform = `rotate(${item.rotate || 0}deg)`;
    el.style.zIndex = item.zIndex || 2;

    if (item.type === 'note') {
      el.innerHTML = `
        <div class="scrap-note-content" contenteditable="true" style="background: ${item.bg || '#251536'};">
          ${item.text || 'Write your handwritten memory here...'}
        </div>
        <div class="item-selection-controls">
          <button class="item-ctrl-btn btn-rotate">↻</button>
          <button class="item-ctrl-btn btn-delete">✕</button>
        </div>
      `;
    } else if (item.type === 'tape') {
      el.innerHTML = `
        <div class="washi-tape-strip tape-${item.style || 'lace'}"></div>
        <div class="item-selection-controls">
          <button class="item-ctrl-btn btn-rotate">↻</button>
          <button class="item-ctrl-btn btn-delete">✕</button>
        </div>
      `;
    } else if (item.type === 'polaroid') {
      el.innerHTML = `
        <div class="polaroid-frame">
          <div class="washi-tape-strip tape-purple"></div>
          ${item.dataUrl ? `<img src="${item.dataUrl}" class="polaroid-img" alt="Photo"/>` : `<div class="polaroid-placeholder"><span class="icon">📷</span><span>Memory Photograph</span></div>`}
          <div class="polaroid-caption" contenteditable="true">${item.caption || 'Remember this night'}</div>
        </div>
        <div class="item-selection-controls">
          <button class="item-ctrl-btn btn-rotate">↻</button>
          <button class="item-ctrl-btn btn-delete">✕</button>
        </div>
      `;
    } else if (item.type === 'seal' || item.type === 'wax-seal') {
      const sId = item.sealId || item.stickerId;
      const sData = window.STICKERS_DATA ? window.STICKERS_DATA.find(s => s.id === sId) : null;
      let graphic = '<div style="font-size:32px;">🪤</div>';
      if (sData) {
        graphic = sData.img
          ? `<img src="${sData.img}" class="sticker-img-asset" alt="${sData.name}" draggable="false" />`
          : (sData.svg || graphic);
      }
      el.innerHTML = `
        <div class="scrap-sticker-graphic" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.8)); cursor: grab;">
          ${graphic}
        </div>
        <div class="item-selection-controls">
          <button class="item-ctrl-btn btn-rotate">↻</button>
          <button class="item-ctrl-btn btn-delete">✕</button>
        </div>
      `;
    } else if (item.type === 'envelope') {
      const eId = item.envelopeId || item.stickerId;
      const eData = window.STICKERS_DATA ? window.STICKERS_DATA.find(s => s.id === eId) : null;
      let graphic = '<div style="font-size:32px;">✉️</div>';
      if (eData) {
        graphic = eData.img
          ? `<img src="${eData.img}" class="sticker-img-asset" alt="${eData.name}" draggable="false" />`
          : (eData.svg || graphic);
      }
      el.innerHTML = `
        <div class="scrap-sticker-graphic" style="filter: drop-shadow(0 4px 14px rgba(0,0,0,0.7)); cursor: grab;">
          ${graphic}
        </div>
        <div class="item-selection-controls">
          <button class="item-ctrl-btn btn-rotate">↻</button>
          <button class="item-ctrl-btn btn-delete">✕</button>
        </div>
      `;
    } else if (item.type === 'sticker') {
      const sId = item.stickerId || item.sealId || item.envelopeId;
      const sData = window.STICKERS_DATA ? window.STICKERS_DATA.find(s => s.id === sId) : null;
      let graphic = '✦';
      if (sData) {
        if (sData.img) {
          graphic = `<img src="${sData.img}" class="sticker-img-asset" alt="${sData.name}" draggable="false" />`;
        } else if (sData.isInteractiveEnvelope) {
          graphic = sData.svg;
        } else {
          graphic = sData.svg || '✦';
        }
      }
      el.innerHTML = `
        <div class="scrap-sticker-graphic" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.8)); cursor: grab;">
          ${graphic}
        </div>
        <div class="item-selection-controls">
          <button class="item-ctrl-btn btn-rotate">↻</button>
          <button class="item-ctrl-btn btn-delete">✕</button>
        </div>
      `;
    }

    this.dom.canvas.appendChild(el);
    this.attachHandlers(el, item);
    return el;
  }

  attachHandlers(el, item) {
    el.addEventListener('mousedown', (e) => {
      if (e.target.closest('.item-ctrl-btn') || e.target.getAttribute('contenteditable') === 'true') {
        return;
      }
      this.selectItem(el, item);
      this.startDrag(e, el, item);
    });

    const rotateBtn = el.querySelector('.btn-rotate');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        item.rotate = ((item.rotate || 0) + 15) % 360;
        el.style.transform = `rotate(${item.rotate}deg)`;
      });
    }

    const delBtn = el.querySelector('.btn-delete');
    if (delBtn) {
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.currentBoard.elements = this.currentBoard.elements.filter(it => it.id !== item.id);
        el.remove();
      });
    }

    const editable = el.querySelector('[contenteditable="true"]');
    if (editable) {
      editable.addEventListener('input', () => {
        if (item.type === 'note') item.text = editable.innerText;
        if (item.type === 'polaroid') item.caption = editable.innerText;
      });
      // 🎹 Typewriter sounds in scrapbook notes & captions
      editable.addEventListener('keydown', (e) => {
        if (!window.nocturneAudio) return;
        if (e.key === 'Enter') window.nocturneAudio.playCarriageBell();
        else if (e.key === ' ') window.nocturneAudio.playTypewriterKey('space');
        else if (e.key === 'Backspace' || e.key === 'Delete') window.nocturneAudio.playTypewriterKey('backspace');
        else if (e.key.length === 1) window.nocturneAudio.playTypewriterKey('key');
      });
    }
  }

  selectItem(el, item) {
    this.deselectAll();
    el.classList.add('selected');
    this.selectedItem = { el, item };
  }

  deselectAll() {
    document.querySelectorAll('.scrap-canvas-item').forEach(i => i.classList.remove('selected'));
    this.selectedItem = null;
  }

  startDrag(e, el, item) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const initialLeft = el.offsetLeft;
    const initialTop = el.offsetTop;

    const onMove = (moveEvt) => {
      const dx = moveEvt.clientX - startX;
      const dy = moveEvt.clientY - startY;
      const newX = initialLeft + dx;
      const newY = initialTop + dy;

      el.style.left = `${newX}px`;
      el.style.top = `${newY}px`;
      item.x = newX;
      item.y = newY;
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  addNoteElement() {
    if (!this.currentBoard) return;
    const item = {
      id: 'sc-note-' + Date.now(),
      type: 'note',
      text: 'Whispered confession or poetry...',
      x: 100 + Math.random() * 80,
      y: 100 + Math.random() * 80,
      width: 240,
      rotate: Math.floor(Math.random() * 10 - 5),
      bg: '#251536'
    };
    this.currentBoard.elements.push(item);
    const el = this.createItemDOM(item);
    this.selectItem(el, item);
  }

  addWashiTapeElement() {
    if (!this.currentBoard) return;
    const styles = ['lace', 'purple', 'rose', 'celestial'];
    const style = styles[Math.floor(Math.random() * styles.length)];
    const item = {
      id: 'sc-tape-' + Date.now(),
      type: 'tape',
      style: style,
      x: 150 + Math.random() * 80,
      y: 150 + Math.random() * 80,
      width: 140,
      rotate: Math.floor(Math.random() * 12 - 6)
    };
    this.currentBoard.elements.push(item);
    const el = this.createItemDOM(item);
    this.selectItem(el, item);
  }

  handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target.result;
      this.addPolaroidElement(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  addPolaroidElement(dataUrl) {
    if (!this.currentBoard) return;
    const item = {
      id: 'sc-polaroid-' + Date.now(),
      type: 'polaroid',
      dataUrl: dataUrl,
      caption: 'Captured under midnight skies',
      x: 120 + Math.random() * 60,
      y: 120 + Math.random() * 60,
      width: 220,
      rotate: Math.floor(Math.random() * 12 - 6)
    };
    this.currentBoard.elements.push(item);
    const el = this.createItemDOM(item);
    this.selectItem(el, item);
  }


  addThemedNoteElement(themeKey) {
    if (!this.currentBoard) return;
    const themes = {
      'midnight': { bg: '#21112F', border: '#7A39B0', text: '#E7DDF5', label: 'Midnight Velvet' },
      'parchment': { bg: '#2A1F18', border: '#C2A58C', text: '#F4E9DB', label: 'Antique Sepia' },
      'pure-black': { bg: '#0A0A0A', border: '#444444', text: '#EEEEEE', label: 'Pure Abyss' },
      'neon': { bg: '#0C0618', border: '#8B00FF', text: '#F0E0FF', label: 'Neon Noir' },
      'crimson': { bg: '#2E0E1B', border: '#B83956', text: '#FCEEF4', label: 'Blood Velvet' },
      'lavender': { bg: '#261C38', border: '#A993C9', text: '#FAF6FF', label: 'Dusty Lavender' }
    };
    const t = themes[themeKey] || themes['midnight'];
    const item = {
      id: 'sc-note-' + Date.now(),
      type: 'note',
      text: 'A whispered midnight confession...',
      bg: t.bg,
      x: 100 + Math.random() * 80,
      y: 100 + Math.random() * 80,
      width: 220,
      rotate: Math.floor(Math.random() * 8 - 4)
    };
    this.currentBoard.elements.push(item);
    const el = this.createItemDOM(item);
    this.selectItem(el, item);
    if (window.nocturneAudio) window.nocturneAudio.playTypewriterKey('key');
    if (window.nocturneApp) window.nocturneApp.showNotification('Added ' + t.label + ' Note \u2726');
  }

  addWaxSealElement(sealId) {
    if (!this.currentBoard) this.createNewBoard();
    const seals = (window.STICKERS_DATA || []).filter(s => s.category === 'seals');
    const chosen = sealId ? seals.find(s => s.id === sealId) : (seals[Math.floor(Math.random() * seals.length)] || null);
    if (!chosen) return;
    const item = {
      id: 'sc-seal-' + Date.now(),
      type: 'seal',
      sealId: chosen.id,
      x: 140 + Math.random() * 80,
      y: 140 + Math.random() * 80,
      width: 95,
      rotate: Math.floor(Math.random() * 30 - 15)
    };
    this.currentBoard.elements.push(item);
    const el = this.createItemDOM(item);
    this.selectItem(el, item);
    if (window.nocturneAudio) window.nocturneAudio.playWaxSeal();
    if (window.nocturneApp) window.nocturneApp.showNotification('Wax Seal stamped: ' + chosen.name + ' \u2726');
  }

  addEnvelopeElement(envId) {
    if (!this.currentBoard) this.createNewBoard();
    const envs = (window.STICKERS_DATA || []).filter(s => s.category === 'envelopes');
    const chosen = envId ? envs.find(s => s.id === envId) : (envs[Math.floor(Math.random() * envs.length)] || null);
    if (!chosen) return;
    const item = {
      id: 'sc-env-' + Date.now(),
      type: 'envelope',
      envelopeId: chosen.id,
      x: 120 + Math.random() * 80,
      y: 120 + Math.random() * 80,
      width: 150,
      rotate: Math.floor(Math.random() * 14 - 7)
    };
    this.currentBoard.elements.push(item);
    const el = this.createItemDOM(item);
    this.selectItem(el, item);
    if (window.nocturneAudio) window.nocturneAudio.playEnvelope();
    if (window.nocturneApp) window.nocturneApp.showNotification('Gothic Envelope placed: ' + chosen.name + ' \u2726');
  }

  addStickerToScrapbook(stickerData) {
    if (!this.currentBoard) this.createNewBoard();
    if (!stickerData) return;
    const item = {
      id: 'sc-stk-' + Date.now(),
      type: 'sticker',
      stickerId: stickerData.id,
      x: 180 + Math.random() * 60,
      y: 180 + Math.random() * 60,
      width: 110,
      rotate: Math.floor(Math.random() * 20 - 10)
    };
    this.currentBoard.elements.push(item);
    const el = this.createItemDOM(item);
    this.selectItem(el, item);
    if (window.nocturneAudio) window.nocturneAudio.playStickerPop();
    if (window.nocturneApp) window.nocturneApp.showNotification('Attached ' + stickerData.name + ' to scrapbook \u2726');
  }
}

window.nocturneScrapbook = new NocturneScrapbook();
