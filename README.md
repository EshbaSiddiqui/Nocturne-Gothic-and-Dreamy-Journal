# ✦ Nocturne — Personal Gothic Sanctuary & Journal Web App

> *“A secret diary discovered in an ancient gothic mansion, filled with midnight-purple pages, silver moonlight, pressed black roses, handwritten confessions, vintage stamps, and little pieces of someone’s life.”*

**Nocturne** is a fully functional, aesthetic personal diary and scrapbooking web application designed with a blend of **gothic romance, dark academia, vintage scrapbooking, witchy aesthetics, and gothic coquette**.

---

## 🌒 Features Overview

### 1. 🏰 My Personal Sanctuary (Home Screen)
- **Gothic Header & Typography**: Personalized midnight greetings (*“Welcome back, Moonchild”*, *“Your secrets live here”*).
- **Interactive Vintage Bookshelf**: A row of antique leather, velvet, and obsidian book spines resting on a mahogany shelf. Clicking any spine immediately unseals and loads that entry into the editor.
- **Dynamic Moon Phase Widget**: Real-time astronomical lunar calculation displaying the current phase (New Moon, Waxing Crescent, Full Moon, etc.), illumination percentage, day in the synodic cycle, and witchy daily writing prompts.
- **Recent Miniature Decorated Pages**: Preview recently written diary pages showing their actual parchment backgrounds, snippets, and sticker decorations.
- **Daily Inspiration & Prompts**: Gothic literary quotations (Mary Shelley, Edgar Allan Poe, Camus) and an interactive journal prompt generator.
- **Pinned Memories & Confessions**: Fast access to pinned sacred notes.
- **Sanctuary Mini Calendar**: Monthly calendar overview highlighting days with active journal entries.

---

### 2. ✒️ Interactive Diary Editor
- **Distraction-Free Gothic Canvas**: Resembles an authentic hardcover journal page with ornate silver and lavender filigree corners, parchment textures, and torn edges.
- **5 Page Backgrounds**:
  - *Purple Parchment*: Royal plum gothic vellum with dark vignette.
  - *Midnight Black*: Deep midnight obsidian with stardust grain.
  - *Vintage Aged Vellum*: Antique sepia parchment for dark academia memories.
  - *Starry Constellations*: Violet twilight sky with subtle stellar nebulae.
  - *Dark Victorian Damask*: Gothic floral lace wallpaper.
- **Typography & Font Switcher**:
  - *Cormorant Garamond* (Classic Gothic Serif)
  - *Caveat* (Romantic Handwritten Cursive)
  - *Antique Typewriter* (Mechanical Monospace)
  - *MedievalSharp* (Gothic Medieval Calligraphy)
- **Rich Text Toolbar**: Bold, italic, underline, strikethrough, violet glow highlighter, headings (H2, H3), blockquotes, lists, text alignment, and font color picker.
- **Typewriter Mode**: Focused centered line mode with mechanical typewriter audio key clicks and carriage return bell chime!
- **Draggable & Rotatable Stickers & Stamps**: Place stickers directly onto the journal canvas, drag to reposition, resize with handles, rotate, adjust z-index layering, duplicate, or delete.
- **Memory Photos & Polaroids**: Add personal photos formatted into vintage polaroid frames with washi tape and handwritten captions.
- **Auto-Save Engine**: Continuous silent saving with indicators (*“Saved in the shadows ✦”*, *“Whispering changes...”*).
- **Personal Reflection Drawer**: 5 optional, gentle prompts (*“What made today memorable?”*, *“What is something I wish I could say?”*, *“What am I grateful for?”*, etc.).

---

### 3. 💀 Stickers, Stamps & Kuromi Collection
A built-in interactive decoration library of crisp vector SVG illustrations:
- **Kuromi Gothic Collection**:
  - *Kuromi Classic Mischief* (Iconic black jester cap, pink skull emblem, playful wink)
  - *Kuromi with Black Rose* (Gothic lolita with an obsidian rose)
  - *Kuromi Dark Angel Wings* (Bat wings, devil tail, sly smile)
  - *Kuromi Sleepy on Crescent Moon* (Nestled in moonlight with stars)
- **Dark Flora & Roses**:
  - *Obsidian Velvet Rose*, *Bleeding Plum Rosebud*, *Pressed Dried Bouquet*.
- **Moths, Bats & Creatures**:
  - *Death's-Head Hawk Moth*, *Midnight Winged Bat*, *Witch Familiar Black Cat*, *Edgar the Perched Raven*.
- **Celestial & Witchcraft**:
  - *Ornate Moonlit Crescent*, *Amethyst Elixir Potion Bottle*, *Mementō Morī Skull Candle*, *Ancient Skeleton Key*.
- **Ribbons, Lace & Coquette**:
  - *Dark Velvet Coquette Bow*, *Sacred Bleeding Heart with Thorns*.
- **Distressed Inked Stamps**:
  - *“TOP SECRET”*, *“CLASSIFIED”*, *“DO NOT OPEN”*, *“FRAGILE HEART”*, *“A MEMORY FOREVER”*.
- **3D Embossed Wax Seals**:
  - *Midnight Purple Skull*, *Blood Crimson Rose*, *Antique Silver Moon*.

---

### 4. 🥀 Creative Scrapbook Mode
- **Freeform Memory Board**: Arrange photos, memories, and clippings without rigid grids.
- **Board Themes**: *Purple Dream*, *Gothic Garden*, *Midnight Memories*, *Vintage Archive*.
- **Scrapbook Elements**:
  - Polaroid frames with customizable photo uploads.
  - Decorative Washi Tape strips (*Black Lace*, *Royal Purple*, *Gothic Rose*, *Celestial Stars*).
  - Torn paper handwritten notes.
  - Freely draggable and rotatable stickers.
- Multi-board saving and board selector.

---

### 5. 🌙 Calendar & Mood Aura Tracker
- **Monthly Calendar Grid**: Full month view with mood dots and day entry indicators.
- **Selected Date Inspection**: View all entries recorded on any specific date or click to write for that day.
- **“On This Day” Feature**: Automatically unearths memories written on the exact same date in previous years.
- **Monthly Mood Aura Breakdown**: Statistical distribution of 10 expressive moods (*Happy, Sad, Anxious, Calm, Angry, Excited, Exhausted, Dreamy, Confused, Grateful*).
- **Timeline of Memories**: Chronological timeline of entries with mood pins, tag pills, and instant search filter.

---

### 6. ✉️ Dear Future Me & Secret Drawer
- **Dear Future Me (Time Capsule)**:
  - Write letters to yourself locked until a specified future date.
  - Visual lock state, remaining day countdown, and wax seal unsealing animation once the date arrives.
- **The Secret Drawer**:
  - Hidden drawer accessible from the sidebar.
  - Protected with a secret PIN (Default: `1313`).
  - Store private fleeting secrets and burn them whenever you choose.
- **Midnight Thoughts Scratchpad**:
  - Slide-out quick drawer to jot down fleeting midnight thoughts and inspirations.

---

### 7. 🌧️ Procedural Audio Synthesizer (Web Audio API)
No external MP3 files required — 100% offline procedural audio:
- **Gentle Midnight Rain** (Soft pink noise filtered through an acoustic window simulation)
- **Crackling Fireplace** (Warm rumble with intermittent ember pop bursts)
- **Midnight Wind Chimes** (Pentatonic celestial resonant sine bells)
- **Typewriter Mechanical Clicks** (Dynamic pitch-drop key strikes and carriage return bell)
- Mute/Unmute quick toggle in the header.

---

### 8. 🗝️ Privacy, Passcode Lock & Data Persistence
- **High-Capacity IndexedDB**: Full offline client-side database (`NocturneJournalDB`) for entries, scrapbook boards, future letters, and high-resolution photo blobs.
- **Gothic Passcode Lock**: Protect the diary with a secret PIN screen.
- **Backup & Restore**: Export your entire journal to a portable JSON backup file and import it anytime.
- **Client-Side Privacy**: Your diary entries, photos, and secrets never leave your device.

---

## 🚀 How to Run

### Option 1: Direct Double-Click (Zero Setup)
Simply double-click `index.html` or `start_nocturne.bat`. It opens directly in Google Chrome, Microsoft Edge, Opera, Firefox, or Safari.

### Option 2: Local Python Server
Run the included Python launcher:
```bash
python server.py
```
Or with specific Python version:
```powershell
& "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe" server.py
```
Then navigate to `http://localhost:8080`.

---

## 🎨 Color Palette Reference
| Shade | Hex Code | Purpose |
|---|---|---|
| Deep Midnight Black | `#0B0812` | Core backgrounds & shadow vignettes |
| Dark Plum | `#21112F` | Surface cards, parchment layers |
| Royal Gothic Purple | `#542A80` | Accent glow, buttons, spines |
| Dusty Lavender | `#A993C9` | Borders, typography secondary, moon aura |
| Pale Moonlight | `#E7DDF5` | Headings, highlights, stardust |
| Muted Pink / Crimson | `#E87CA1` / `#75173B` | Kuromi details, wax seals, stamps |
| Antique Silver | `#C5BACF` | Metal corners, keyholes, filigree |

---
*Created with love, stardust, and midnight shadows for Nocturne.*
