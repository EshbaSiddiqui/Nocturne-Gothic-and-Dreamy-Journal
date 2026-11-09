/**
 * Nocturne - IndexedDB Database Storage Engine with LocalStorage Fallback
 * High-capacity client-side persistence for diary entries, scrapbook boards,
 * future letters, quick thoughts, and settings.
 */

const DB_NAME = 'NocturneJournalDB';
const DB_VERSION = 1;

class NocturneDB {
  constructor() {
    this.db = null;
    this.useLocalStorage = false;
    this.activeUser = localStorage.getItem('nocturne_current_user') || 'Eshba';
    this.ready = this.init();
  }

  init() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported in this environment, using LocalStorage fallback.');
        this.useLocalStorage = true;
        this.populateInitialDataIfNeeded();
        return resolve(null);
      }

      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (e) => {
          const db = e.target.result;

          if (!db.objectStoreNames.contains('entries')) {
            const entryStore = db.createObjectStore('entries', { keyPath: 'id' });
            entryStore.createIndex('date', 'date', { unique: false });
            entryStore.createIndex('createdAt', 'createdAt', { unique: false });
            entryStore.createIndex('mood', 'mood', { unique: false });
            entryStore.createIndex('isPinned', 'isPinned', { unique: false });
          }

          if (!db.objectStoreNames.contains('scrapbooks')) {
            const scrapStore = db.createObjectStore('scrapbooks', { keyPath: 'id' });
            scrapStore.createIndex('updatedAt', 'updatedAt', { unique: false });
          }

          if (!db.objectStoreNames.contains('futureLetters')) {
            const lettersStore = db.createObjectStore('futureLetters', { keyPath: 'id' });
            lettersStore.createIndex('unlockDate', 'unlockDate', { unique: false });
          }

          if (!db.objectStoreNames.contains('midnightThoughts')) {
            db.createObjectStore('midnightThoughts', { keyPath: 'id' });
          }

          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
          }
        };

        request.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
          // Seed demo data asynchronously AFTER resolving this.ready so no deadlock can occur!
          setTimeout(() => {
            this.populateInitialDataIfNeeded().catch(err => console.warn('Demo seed warning:', err));
          }, 10);
        };

        request.onerror = (e) => {
          console.warn('IndexedDB permission or open error, using LocalStorage fallback:', e);
          this.useLocalStorage = true;
          this.populateInitialDataIfNeeded();
          resolve(null);
        };
      } catch (err) {
        console.warn('IndexedDB exception, falling back to LocalStorage:', err);
        this.useLocalStorage = true;
        this.populateInitialDataIfNeeded();
        resolve(null);
      }
    });
  }


  // Multi-User Sanctuary Isolation
  getCurrentUser() {
    return this.activeUser || 'Eshba';
  }

  setCurrentUser(username) {
    if (!username) return;
    this.activeUser = username.trim();
    localStorage.setItem('nocturne_current_user', this.activeUser);
    const users = this.getUsersList();
    if (!users.includes(this.activeUser)) {
      users.push(this.activeUser);
      localStorage.setItem('nocturne_users_list', JSON.stringify(users));
    }
  }

  getUsersList() {
    try {
      const u = localStorage.getItem('nocturne_users_list');
      return u ? JSON.parse(u) : ['Eshba', 'Moonchild'];
    } catch (e) {
      return ['Eshba', 'Moonchild'];
    }
  }

  // --- LocalStorage Helpers ---
  getLS(key, defaultVal = []) {
    try {
      const v = localStorage.getItem('nocturne_' + key);
      return v ? JSON.parse(v) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  setLS(key, val) {
    try {
      localStorage.setItem('nocturne_' + key, JSON.stringify(val));
    } catch (e) {
      console.warn('LocalStorage write warning:', e);
    }
  }

  // --- Generic Helpers ---
  async getStore(storeName, mode = 'readonly') {
    if (!this.db && !this.useLocalStorage) {
      await this.ready;
    }
    if (this.useLocalStorage || !this.db) {
      return null;
    }
    try {
      const tx = this.db.transaction(storeName, mode);
      return tx.objectStore(storeName);
    } catch (e) {
      console.warn('IndexedDB transaction error, falling back to LocalStorage:', e);
      this.useLocalStorage = true;
      return null;
    }
  }

  // --- Entries Methods ---
  async getAllEntries() {
    const store = await this.getStore('entries', 'readonly');
    if (!store) {
      const entries = this.getLS('entries', []);
      entries.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
      return entries;
    }
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const all = request.result || [];
        const entries = all.filter(e => e.userId === this.activeUser || (!e.userId && this.activeUser === 'Eshba'));
        entries.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
        resolve(entries);
      };
      request.onerror = () => {
        const entries = this.getLS('entries', []);
        resolve(entries);
      };
    });
  }

  async getEntry(id) {
    const store = await this.getStore('entries', 'readonly');
    if (!store) {
      const entries = this.getLS('entries', []);
      return entries.find(e => e.id === id) || null;
    }
    return new Promise((resolve) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => {
        const entries = this.getLS('entries', []);
        resolve(entries.find(e => e.id === id) || null);
      };
    });
  }

  async saveEntry(entry) {
    entry.userId = entry.userId || this.activeUser;
    // Also save in localStorage as instant backup
    const lsEntries = this.getLS('entries', []);
    const idx = lsEntries.findIndex(e => e.id === entry.id);
    if (idx !== -1) lsEntries[idx] = entry;
    else lsEntries.unshift(entry);
    this.setLS('entries', lsEntries);

    const store = await this.getStore('entries', 'readwrite');
    if (!store) return entry;

    return new Promise((resolve) => {
      const request = store.put(entry);
      request.onsuccess = () => resolve(entry);
      request.onerror = () => resolve(entry);
    });
  }

  async deleteEntry(id) {
    const lsEntries = this.getLS('entries', []).filter(e => e.id !== id);
    this.setLS('entries', lsEntries);

    const store = await this.getStore('entries', 'readwrite');
    if (!store) return true;

    return new Promise((resolve) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(true);
    });
  }

  // --- Scrapbooks ---
  async getAllScrapbooks() {
    const store = await this.getStore('scrapbooks', 'readonly');
    if (!store) return this.getLS('scrapbooks', []);
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => resolve(this.getLS('scrapbooks', []));
    });
  }

  async saveScrapbook(board) {
    board.userId = board.userId || this.activeUser;
    const lsBoards = this.getLS('scrapbooks', []);
    const idx = lsBoards.findIndex(b => b.id === board.id);
    if (idx !== -1) lsBoards[idx] = board;
    else lsBoards.push(board);
    this.setLS('scrapbooks', lsBoards);

    const store = await this.getStore('scrapbooks', 'readwrite');
    if (!store) return board;

    return new Promise((resolve) => {
      const request = store.put(board);
      request.onsuccess = () => resolve(board);
      request.onerror = () => resolve(board);
    });
  }

  async deleteScrapbook(id) {
    const lsBoards = this.getLS('scrapbooks', []).filter(b => b.id !== id);
    this.setLS('scrapbooks', lsBoards);

    const store = await this.getStore('scrapbooks', 'readwrite');
    if (!store) return true;

    return new Promise((resolve) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(true);
    });
  }

  // --- Future Letters ---
  async getAllFutureLetters() {
    const store = await this.getStore('futureLetters', 'readonly');
    if (!store) return this.getLS('futureLetters', []);
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => resolve(this.getLS('futureLetters', []));
    });
  }

  async saveFutureLetter(letter) {
    const lsLetters = this.getLS('futureLetters', []);
    const idx = lsLetters.findIndex(l => l.id === letter.id);
    if (idx !== -1) lsLetters[idx] = letter;
    else lsLetters.push(letter);
    this.setLS('futureLetters', lsLetters);

    const store = await this.getStore('futureLetters', 'readwrite');
    if (!store) return letter;

    return new Promise((resolve) => {
      const request = store.put(letter);
      request.onsuccess = () => resolve(letter);
      request.onerror = () => resolve(letter);
    });
  }

  async deleteFutureLetter(id) {
    const lsLetters = this.getLS('futureLetters', []).filter(l => l.id !== id);
    this.setLS('futureLetters', lsLetters);

    const store = await this.getStore('futureLetters', 'readwrite');
    if (!store) return true;

    return new Promise((resolve) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(true);
    });
  }

  // --- Midnight Thoughts ---
  async getAllThoughts() {
    const store = await this.getStore('midnightThoughts', 'readonly');
    if (!store) {
      const th = this.getLS('midnightThoughts', []);
      th.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return th;
    }
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const thoughts = request.result || [];
        thoughts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        resolve(thoughts);
      };
      request.onerror = () => resolve(this.getLS('midnightThoughts', []));
    });
  }

  async saveThought(thought) {
    const lsThoughts = this.getLS('midnightThoughts', []);
    lsThoughts.unshift(thought);
    this.setLS('midnightThoughts', lsThoughts);

    const store = await this.getStore('midnightThoughts', 'readwrite');
    if (!store) return thought;

    return new Promise((resolve) => {
      const request = store.put(thought);
      request.onsuccess = () => resolve(thought);
      request.onerror = () => resolve(thought);
    });
  }

  async deleteThought(id) {
    const lsThoughts = this.getLS('midnightThoughts', []).filter(t => t.id !== id);
    this.setLS('midnightThoughts', lsThoughts);

    const store = await this.getStore('midnightThoughts', 'readwrite');
    if (!store) return true;

    return new Promise((resolve) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(true);
    });
  }

  // --- Settings ---
  async getSetting(key, defaultValue = null) {
    const store = await this.getStore('settings', 'readonly');
    if (!store) {
      const s = this.getLS('settings', {});
      return s[key] !== undefined ? s[key] : defaultValue;
    }
    return new Promise((resolve) => {
      const request = store.get(key);
      request.onsuccess = () => {
        if (request.result && request.result.value !== undefined) {
          resolve(request.result.value);
        } else {
          const s = this.getLS('settings', {});
          resolve(s[key] !== undefined ? s[key] : defaultValue);
        }
      };
      request.onerror = () => {
        const s = this.getLS('settings', {});
        resolve(s[key] !== undefined ? s[key] : defaultValue);
      };
    });
  }

  async setSetting(key, value) {
    const s = this.getLS('settings', {});
    s[key] = value;
    this.setLS('settings', s);

    const store = await this.getStore('settings', 'readwrite');
    if (!store) return value;

    return new Promise((resolve) => {
      const request = store.put({ key, value });
      request.onsuccess = () => resolve(value);
      request.onerror = () => resolve(value);
    });
  }

  // --- Export & Import ---
  async exportJournalData() {
    const entries = await this.getAllEntries();
    const scrapbooks = await this.getAllScrapbooks();
    const futureLetters = await this.getAllFutureLetters();
    const thoughts = await this.getAllThoughts();

    const data = {
      version: 1,
      appName: 'Nocturne',
      exportedAt: new Date().toISOString(),
      entries,
      scrapbooks,
      futureLetters,
      thoughts
    };
    return JSON.stringify(data, null, 2);
  }

  async importJournalData(jsonString) {
    const data = JSON.parse(jsonString);
    if (!data.appName || data.appName !== 'Nocturne') {
      throw new Error('Invalid Nocturne backup file.');
    }

    if (Array.isArray(data.entries)) {
      for (const entry of data.entries) {
        await this.saveEntry(entry);
      }
    }
    if (Array.isArray(data.scrapbooks)) {
      for (const board of data.scrapbooks) {
        await this.saveScrapbook(board);
      }
    }
    if (Array.isArray(data.futureLetters)) {
      for (const letter of data.futureLetters) {
        await this.saveFutureLetter(letter);
      }
    }
    if (Array.isArray(data.thoughts)) {
      for (const th of data.thoughts) {
        await this.saveThought(th);
      }
    }
    return true;
  }

  // --- Seed Initial Gothic Demo Content ---
  async populateInitialDataIfNeeded() {
    const entries = await this.getAllEntries();
    if (entries && entries.length > 0) return; // already seeded

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0];

    const demoEntries = [
      {
        id: 'entry-nocturne-welcome',
        title: 'Whispers in the Violet Gloom',
        date: today,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        mood: 'dreamy',
        tags: ['Gothic Musings', 'Sanctuary', 'Midnight'],
        pageBackground: 'purple-parchment',
        fontStyle: 'serif',
        isPinned: true,
        isFavorite: true,
        reflection: {
          question: 'What made today memorable?',
          answer: 'Finding this secret space where midnight thoughts finally have a velvet home.'
        },
        content: `
          <p>The grandfather clock in the corridor struck twelve times, its resonance lingering like cold smoke in the dark hallway. I lit two lavender taper candles and watched their purple shadows flutter against the old wallpaper.</p>
          <p>There is a peaceful solace in the midnight hours that daylight can never replicate. In this sanctuary, the world outside goes silent, and whatever heavy secrets or fleeting joys I carried through the afternoon are permitted to breathe.</p>
          <blockquote style="border-left: 3px solid #A993C9; padding-left: 14px; margin: 18px 0; font-style: italic; color: #E7DDF5;">
            "We are all wanderers in the dark, collecting fragments of moonlight to illuminate our fragile dreams."
          </blockquote>
          <p>I placed my favorite Kuromi charm near the inkpot and pressed a dried black rose petal into the margin. The ink smells of old paper and rain. Tomorrow may demand that I wear a mask of ordinary composure, but tonight, I am entirely myself.</p>
        `,
        stickers: [
          {
            id: 'stk-1',
            stickerId: 'kuromi-classic',
            x: 75,
            y: 8,
            width: 110,
            height: 110,
            rotate: 12,
            zIndex: 3
          },
          {
            id: 'stk-2',
            stickerId: 'seal-midnight-skull',
            x: 10,
            y: 75,
            width: 95,
            height: 95,
            rotate: -8,
            zIndex: 4
          },
          {
            id: 'stk-3',
            stickerId: 'stamp-top-secret',
            x: 55,
            y: 82,
            width: 140,
            height: 70,
            rotate: -6,
            zIndex: 2
          }
        ]
      },
      {
        id: 'entry-black-tea-rain',
        title: 'Earl Grey, Old Books & Rain on the Glass',
        date: yesterday,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        mood: 'calm',
        tags: ['Autumn Rain', 'Dark Academia', 'Tea'],
        pageBackground: 'midnight',
        fontStyle: 'handwritten',
        isPinned: false,
        isFavorite: true,
        reflection: {
          question: 'What am I grateful for?',
          answer: 'The sound of rain against the tall arched window, and tea warm enough to hold between both palms.'
        },
        content: `
          <p>Rain poured incessantly from late afternoon into dusk. The window glass was streaked with weeping silver tears.</p>
          <p>I steeped a pot of bergamot black tea with a drop of lavender honey and reread a passage from Mary Shelley. Sometimes I wonder if people in the nineteenth century felt the exact same quiet longing when looking out into an overgrown garden shrouded in evening mist.</p>
          <p>I drew a tiny raven in the corner of this page to guard my thoughts. Tonight feels gentle, like heavy velvet draped over a tired heart.</p>
        `,
        stickers: [
          {
            id: 'stk-4',
            stickerId: 'death-head-moth',
            x: 70,
            y: 12,
            width: 100,
            height: 100,
            rotate: -15,
            zIndex: 3
          },
          {
            id: 'stk-5',
            stickerId: 'stamp-memory-forever',
            x: 8,
            y: 70,
            width: 90,
            height: 90,
            rotate: 10,
            zIndex: 2
          }
        ]
      },
      {
        id: 'entry-gothic-confession',
        title: 'Things I Whispered to the Mirror',
        date: twoDaysAgo,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        mood: 'anxious',
        tags: ['Confessions', 'Secret Drawer', 'Fragile Heart'],
        pageBackground: 'dark-floral',
        fontStyle: 'gothic',
        isPinned: true,
        isFavorite: false,
        reflection: {
          question: 'What is something I wish I could say?',
          answer: 'That I notice every little silence, even when I pretend I am immune to it.'
        },
        content: `
          <p>Some days feel like walking through an ornate labyrinth where every turn reflects a version of myself I am not sure I recognize.</p>
          <p>I felt a tight knot of anxious thoughts today — worries about the future, expectations that feel as suffocating as antique corset lace. But writing it down here softens the blade.</p>
          <p>No matter what unravels outside, this book belongs only to me. Locked away under violet wax and silver stars.</p>
        `,
        stickers: [
          {
            id: 'stk-6',
            stickerId: 'kuromi-bat-wings',
            x: 72,
            y: 15,
            width: 110,
            height: 110,
            rotate: 8,
            zIndex: 3
          },
          {
            id: 'stk-7',
            stickerId: 'stamp-fragile-heart',
            x: 12,
            y: 72,
            width: 130,
            height: 65,
            rotate: -4,
            zIndex: 2
          }
        ]
      }
    ];

    for (const item of demoEntries) {
      await this.saveEntry(item);
    }

    // Seed a demo Scrapbook Board
    const demoScrapbook = {
      id: 'scrapbook-midnight-memories',
      title: 'Midnight Reverie & Pressed Petals',
      theme: 'purple-dream',
      updatedAt: new Date().toISOString(),
      elements: [
        {
          id: 'sc-1',
          type: 'note',
          text: '“In the depths of winter, I finally learned that within me there lay an invincible summer.” — Albert Camus',
          x: 40,
          y: 40,
          width: 240,
          rotate: -3,
          bg: '#251536'
        },
        {
          id: 'sc-2',
          type: 'tape',
          style: 'lace',
          x: 180,
          y: 20,
          width: 120,
          rotate: -2
        },
        {
          id: 'sc-3',
          type: 'sticker',
          stickerId: 'kuromi-goth-rose',
          x: 320,
          y: 60,
          width: 120,
          height: 120,
          rotate: 15
        },
        {
          id: 'sc-4',
          type: 'sticker',
          stickerId: 'rose-black-velvet',
          x: 60,
          y: 220,
          width: 110,
          height: 110,
          rotate: -10
        },
        {
          id: 'sc-5',
          type: 'polaroid',
          caption: 'Castle Nocturne by Twilight',
          date: 'October 31st',
          x: 220,
          y: 180,
          width: 220,
          rotate: 4,
          photoPlaceholder: 'gothic-castle'
        },
        {
          id: 'sc-6',
          type: 'sticker',
          stickerId: 'seal-blood-rose',
          x: 400,
          y: 280,
          width: 85,
          height: 85,
          rotate: 12
        }
      ]
    };
    await this.saveScrapbook(demoScrapbook);

    // Seed a demo "Dear Future Me" letter
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const demoFutureLetter = {
      id: 'future-letter-1',
      title: 'To Myself One Moon Cycle From Now',
      createdAt: new Date().toISOString(),
      unlockDate: futureDate.toISOString().split('T')[0],
      isOpened: false,
      content: 'Dear future self, are you sleeping better now? Have you forgiven yourself for the things you could not control this month? Remember the quiet vow you made under the autumn crescent moon.'
    };
    await this.saveFutureLetter(demoFutureLetter);

    // Seed a few Midnight Thoughts
    await this.saveThought({
      id: 'th-1',
      text: 'The moon looked like an unblinking silver eye tonight behind the skeletal oak branches.',
      timestamp: new Date().toISOString(),
      isPinned: true
    });
    await this.saveThought({
      id: 'th-2',
      text: 'Black coffee and dark lace. Maybe sorrow is just poetry without a rhythm.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isPinned: false
    });
  }
}

// Global DB instance
window.nocturneDB = new NocturneDB();
