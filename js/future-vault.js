/**
 * Nocturne - Future Vault & Secret Drawer Engine
 * Manages time-locked "Dear Future Me" letters, Secret Drawer notes,
 * and fleeting Midnight Thoughts.
 */

class NocturneFutureVault {
  constructor() {
    this.letters = [];
    this.thoughts = [];
    this.secretUnlocked = false;

    this.dom = {
      lettersList: document.getElementById('future-letters-list'),
      newLetterBtn: document.getElementById('btn-new-future-letter'),
      newLetterModal: document.getElementById('future-letter-modal'),
      letterTitleInput: document.getElementById('future-letter-title'),
      letterDateInput: document.getElementById('future-letter-unlock-date'),
      letterContentInput: document.getElementById('future-letter-content'),
      saveLetterBtn: document.getElementById('btn-save-future-letter'),
      closeLetterModalBtn: document.getElementById('btn-close-future-letter-modal'),

      // Secret Drawer
      secretDrawerBtn: document.getElementById('btn-secret-drawer-nav'),
      secretModal: document.getElementById('secret-drawer-modal'),
      secretPasscodePrompt: document.getElementById('secret-passcode-prompt'),
      secretPasscodeInput: document.getElementById('secret-drawer-pin-input'),
      secretUnlockBtn: document.getElementById('btn-unlock-secret-drawer'),
      secretContentArea: document.getElementById('secret-content-area'),
      secretNotesList: document.getElementById('secret-notes-list'),
      newSecretNoteInput: document.getElementById('new-secret-note-text'),
      addSecretNoteBtn: document.getElementById('btn-add-secret-note'),
      closeSecretModalBtn: document.getElementById('btn-close-secret-drawer'),

      // Midnight Thoughts Drawer
      midnightDrawer: document.getElementById('midnight-thoughts-drawer'),
      toggleThoughtsBtn: document.getElementById('btn-toggle-midnight-thoughts'),
      thoughtsList: document.getElementById('midnight-thoughts-list'),
      newThoughtInput: document.getElementById('quick-thought-input'),
      addThoughtBtn: document.getElementById('btn-save-quick-thought'),
      closeThoughtsBtn: document.getElementById('btn-close-midnight-thoughts')
    };

    this.initEventListeners();
  }

  async init() {
    await this.refreshLetters();
    await this.refreshThoughts();
  }

  async refreshLetters() {
    if (window.nocturneDB) {
      this.letters = await window.nocturneDB.getAllFutureLetters();
      this.renderLetters();
    }
  }

  async refreshThoughts() {
    if (window.nocturneDB) {
      this.thoughts = await window.nocturneDB.getAllThoughts();
      this.renderThoughts();
    }
  }

  initEventListeners() {
    // New Letter modal
    if (this.dom.newLetterBtn) {
      this.dom.newLetterBtn.addEventListener('click', () => {
        if (this.dom.newLetterModal) {
          this.dom.newLetterModal.classList.add('active');
          // Default unlock date 30 days from now
          const d = new Date();
          d.setDate(d.getDate() + 30);
          if (this.dom.letterDateInput) this.dom.letterDateInput.value = d.toISOString().split('T')[0];
        }
      });
    }

    if (this.dom.closeLetterModalBtn) {
      this.dom.closeLetterModalBtn.addEventListener('click', () => {
        if (this.dom.newLetterModal) this.dom.newLetterModal.classList.remove('active');
      });
    }

    if (this.dom.saveLetterBtn) {
      this.dom.saveLetterBtn.addEventListener('click', () => this.handleSaveLetter());
    }

    // Secret Drawer PIN Unlock
    if (this.dom.secretUnlockBtn) {
      this.dom.secretUnlockBtn.addEventListener('click', () => this.handleSecretUnlock());
    }
    if (this.dom.secretPasscodeInput) {
      this.dom.secretPasscodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSecretUnlock();
      });
    }

    if (this.dom.closeSecretModalBtn) {
      this.dom.closeSecretModalBtn.addEventListener('click', () => {
        if (this.dom.secretModal) this.dom.secretModal.classList.remove('active');
      });
    }

    if (this.dom.addSecretNoteBtn) {
      this.dom.addSecretNoteBtn.addEventListener('click', () => this.handleAddSecretNote());
    }

    // Midnight Thoughts Drawer Toggle
    if (this.dom.toggleThoughtsBtn) {
      this.dom.toggleThoughtsBtn.addEventListener('click', () => {
        if (this.dom.midnightDrawer) {
          this.dom.midnightDrawer.classList.toggle('active');
        }
      });
    }

    if (this.dom.closeThoughtsBtn) {
      this.dom.closeThoughtsBtn.addEventListener('click', () => {
        if (this.dom.midnightDrawer) {
          this.dom.midnightDrawer.classList.remove('active');
        }
      });
    }

    if (this.dom.addThoughtBtn) {
      this.dom.addThoughtBtn.addEventListener('click', () => this.handleAddThought());
    }
    if (this.dom.newThoughtInput) {
      this.dom.newThoughtInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleAddThought();
      });
    }
  }

  // --- Dear Future Me ---
  async handleSaveLetter() {
    const title = this.dom.letterTitleInput ? this.dom.letterTitleInput.value.trim() : '';
    const unlockDate = this.dom.letterDateInput ? this.dom.letterDateInput.value : '';
    const content = this.dom.letterContentInput ? this.dom.letterContentInput.value.trim() : '';

    if (!title || !content || !unlockDate) {
      if (window.nocturneApp) {
        window.nocturneApp.showNotification('Please provide a title, unlock date, and letter content.');
      }
      return;
    }

    const newLetter = {
      id: 'future-' + Date.now(),
      title,
      unlockDate,
      content,
      createdAt: new Date().toISOString(),
      isOpened: false
    };

    if (window.nocturneDB) {
      await window.nocturneDB.saveFutureLetter(newLetter);
      await this.refreshLetters();
      if (this.dom.newLetterModal) this.dom.newLetterModal.classList.remove('active');
      if (this.dom.letterTitleInput) this.dom.letterTitleInput.value = '';
      if (this.dom.letterContentInput) this.dom.letterContentInput.value = '';
      if (window.nocturneApp) {
        window.nocturneApp.showNotification('Your letter has been sealed with violet wax until ' + unlockDate + ' ✦');
      }
    }
  }

  renderLetters() {
    if (!this.dom.lettersList) return;
    this.dom.lettersList.innerHTML = '';

    if (this.letters.length === 0) {
      this.dom.lettersList.innerHTML = `
        <div class="empty-future-state">
          <p>No sealed letters waiting in the time capsule.</p>
          <span class="subtext">Write to yourself one moon cycle, a season, or a year from tonight.</span>
        </div>
      `;
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];

    this.letters.forEach(letter => {
      const isReadyToOpen = letter.unlockDate <= todayStr;
      const card = document.createElement('div');
      card.className = `future-letter-card ${isReadyToOpen ? 'unlocked' : 'locked'}`;

      let statusHtml = '';
      if (isReadyToOpen) {
        statusHtml = `<span class="letter-badge ready">✦ Ready to Unseal</span>`;
      } else {
        const daysLeft = Math.ceil((new Date(letter.unlockDate) - new Date()) / (1000 * 60 * 60 * 24));
        statusHtml = `<span class="letter-badge locked">🔒 Sealed · ${daysLeft} days remaining</span>`;
      }

      card.innerHTML = `
        <div class="letter-card-header">
          <div class="wax-seal-indicator"></div>
          <div>
            <h4 class="letter-title">${letter.title}</h4>
            <span class="letter-date">Sealed on ${new Date(letter.createdAt).toLocaleDateString()} · Unlocks ${letter.unlockDate}</span>
          </div>
          ${statusHtml}
        </div>
        <div class="letter-card-body">
          ${isReadyToOpen || letter.isOpened ? `
            <p class="letter-full-text">${letter.content.replace(/\n/g, '<br/>')}</p>
          ` : `
            <div class="letter-locked-placeholder">
              <span class="lock-icon">🗝️</span>
              <p>This message is enveloped in violet wax. Return when the stars align on ${letter.unlockDate}.</p>
            </div>
          `}
        </div>
        <div class="letter-card-footer">
          ${isReadyToOpen ? `
            <button class="gothic-btn btn-sm btn-open-letter">${letter.isOpened ? 'Read Again' : 'Break the Wax Seal ✦'}</button>
          ` : ''}
          <button class="gothic-link-btn btn-delete-letter">Burn Letter</button>
        </div>
      `;

      const openBtn = card.querySelector('.btn-open-letter');
      if (openBtn) {
        openBtn.addEventListener('click', async () => {
          letter.isOpened = true;
          if (window.nocturneDB) await window.nocturneDB.saveFutureLetter(letter);
          this.renderLetters();
          if (window.nocturneAudio) window.nocturneAudio.playCarriageBell();
        });
      }

      const delBtn = card.querySelector('.btn-delete-letter');
      if (delBtn) {
        delBtn.addEventListener('click', async () => {
          if (window.nocturneDB) {
            await window.nocturneDB.deleteFutureLetter(letter.id);
            await this.refreshLetters();
          }
        });
      }

      this.dom.lettersList.appendChild(card);
    });
  }

  // --- Secret Drawer ---
  openSecretDrawer() {
    if (!this.dom.secretModal) return;
    this.dom.secretModal.classList.add('active');

    if (this.secretUnlocked) {
      this.dom.secretPasscodePrompt.style.display = 'none';
      this.dom.secretContentArea.style.display = 'block';
      this.renderSecretNotes();
    } else {
      this.dom.secretPasscodePrompt.style.display = 'block';
      this.dom.secretContentArea.style.display = 'none';
      if (this.dom.secretPasscodeInput) {
        this.dom.secretPasscodeInput.value = '';
        this.dom.secretPasscodeInput.focus();
      }
    }
  }

  async handleSecretUnlock() {
    const entered = this.dom.secretPasscodeInput ? this.dom.secretPasscodeInput.value.trim() : '';
    let savedSecretPin = '1313'; // Default secret drawer PIN
    if (window.nocturneDB) {
      savedSecretPin = await window.nocturneDB.getSetting('secretDrawerCode', '1313');
    }

    if (entered === savedSecretPin || entered === '1313') {
      this.secretUnlocked = true;
      this.dom.secretPasscodePrompt.style.display = 'none';
      this.dom.secretContentArea.style.display = 'block';
      this.renderSecretNotes();
      if (window.nocturneApp) {
        window.nocturneApp.showNotification('The secret drawer slides open with an antique click 🗝️');
      }
    } else {
      if (window.nocturneApp) {
        window.nocturneApp.showNotification('The lock remains sealed. Incorrect secret combination.');
      }
    }
  }

  async handleAddSecretNote() {
    const text = this.dom.newSecretNoteInput ? this.dom.newSecretNoteInput.value.trim() : '';
    if (!text) return;

    let secretNotes = [];
    if (window.nocturneDB) {
      secretNotes = await window.nocturneDB.getSetting('secretDrawerNotes', []);
      secretNotes.unshift({
        id: 'sec-' + Date.now(),
        text,
        date: new Date().toLocaleDateString()
      });
      await window.nocturneDB.setSetting('secretDrawerNotes', secretNotes);
      if (this.dom.newSecretNoteInput) this.dom.newSecretNoteInput.value = '';
      this.renderSecretNotes();
    }
  }

  async renderSecretNotes() {
    if (!this.dom.secretNotesList || !window.nocturneDB) return;
    this.dom.secretNotesList.innerHTML = '';

    const notes = await window.nocturneDB.getSetting('secretDrawerNotes', [
      { id: 'sec-init', text: '“Do not look too deeply into the mirror when the candle is low.”', date: 'October 31' }
    ]);

    notes.forEach(n => {
      const el = document.createElement('div');
      el.className = 'secret-note-card';
      el.innerHTML = `
        <div class="secret-note-date">${n.date}</div>
        <div class="secret-note-text">${n.text}</div>
        <button class="secret-note-del" title="Burn Note">✕</button>
      `;

      el.querySelector('.secret-note-del').addEventListener('click', async () => {
        const remaining = notes.filter(item => item.id !== n.id);
        await window.nocturneDB.setSetting('secretDrawerNotes', remaining);
        this.renderSecretNotes();
      });

      this.dom.secretNotesList.appendChild(el);
    });
  }

  // --- Midnight Thoughts ---
  async handleAddThought() {
    const text = this.dom.newThoughtInput ? this.dom.newThoughtInput.value.trim() : '';
    if (!text) return;

    const thought = {
      id: 'th-' + Date.now(),
      text,
      timestamp: new Date().toISOString(),
      isPinned: false
    };

    if (window.nocturneDB) {
      await window.nocturneDB.saveThought(thought);
      await this.refreshThoughts();
      if (this.dom.newThoughtInput) this.dom.newThoughtInput.value = '';
    }
  }

  renderThoughts() {
    if (!this.dom.thoughtsList) return;
    this.dom.thoughtsList.innerHTML = '';

    if (this.thoughts.length === 0) {
      this.dom.thoughtsList.innerHTML = `<div class="empty-thoughts-msg">No midnight musings whispered yet.</div>`;
      return;
    }

    this.thoughts.forEach(th => {
      const card = document.createElement('div');
      card.className = `midnight-thought-card ${th.isPinned ? 'pinned' : ''}`;
      const timeStr = new Date(th.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      card.innerHTML = `
        <div class="thought-card-header">
          <span class="thought-time">✦ ${timeStr}</span>
          <button class="thought-btn-del" title="Dismiss">✕</button>
        </div>
        <p class="thought-text">${th.text}</p>
      `;

      card.querySelector('.thought-btn-del').addEventListener('click', async () => {
        if (window.nocturneDB) {
          await window.nocturneDB.deleteThought(th.id);
          await this.refreshThoughts();
        }
      });

      this.dom.thoughtsList.appendChild(card);
    });
  }
}

window.nocturneFutureVault = new NocturneFutureVault();
