// ============================================================
// CHRONICLES OF AELTHAR — Game Engine
// script.js
// ============================================================

'use strict';

// ─── GAME STATE ──────────────────────────────────────────────
const GameState = {
  player: {
    name: '',
    race: '',
    raceIcon: '',
    class: '',
    classIcon: '',
    hp: 100,
    maxHp: 100,
    morality: 50,   // 0 = corrupt, 100 = saintly
  },
  currentEpisode: null,
  currentScene: null,
  achievements: [],      // list of ending_id strings
  history: [],           // scene id history
  isTyping: false,
};

// ─── RACE / CLASS DATA ───────────────────────────────────────
const RACES = [
  { id: 'human',  name: 'Human',  icon: '🧑', desc: 'Adaptable & driven. +5 Morality' },
  { id: 'elf',    name: 'Elf',    icon: '🧝', desc: 'Ancient wisdom. +5 Max HP' },
  { id: 'dwarf',  name: 'Dwarf',  icon: '⛏️', desc: 'Hardy & stubborn. +10 Max HP' },
  { id: 'orc',    name: 'Orc',    icon: '🪖', desc: 'Fierce & fearless. Extra choice power' },
];

const CLASSES = [
  { id: 'warrior', name: 'Warrior', icon: '⚔️', desc: 'Heavy armor. Wins combat easier' },
  { id: 'mage',    name: 'Mage',    icon: '🔮', desc: 'Arcane power. Reveals hidden options' },
  { id: 'rogue',   name: 'Rogue',   icon: '🗡️', desc: 'Stealth & guile. Better scouting' },
  { id: 'cleric',  name: 'Cleric',  icon: '✝️', desc: 'Holy power. Stronger vs undead' },
];

// ─── DOM REFS ────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const Pages = {
  menu:         $('page-menu'),
  create:       $('page-create'),
  episodes:     $('page-episodes'),
  game:         $('page-game'),
  ending:       $('page-ending'),
  achievements: $('page-achievements'),
};

// ─── PAGE NAVIGATION ────────────────────────────────────────
function showPage(name) {
  const overlay = $('transition-overlay');
  overlay.classList.add('fade-in');
  setTimeout(() => {
    Object.values(Pages).forEach(p => p.classList.remove('active'));
    if (Pages[name]) Pages[name].classList.add('active');
    overlay.classList.remove('fade-in');
  }, 350);
}

// ─── LOCAL STORAGE ───────────────────────────────────────────
const SAVE_KEY = 'aelthar_save';

function saveGame() {
  const data = {
    player: { ...GameState.player },
    currentEpisode: GameState.currentEpisode,
    currentScene: GameState.currentScene,
    achievements: [...GameState.achievements],
    history: [...GameState.history],
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  showToast('📜 Progress saved to the chronicles.');
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    Object.assign(GameState, data);
    return true;
  } catch {
    return false;
  }
}

function hasSave() {
  return !!localStorage.getItem(SAVE_KEY);
}

function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

// ─── TOAST NOTIFICATIONS ─────────────────────────────────────
function showToast(msg, duration = 3000) {
  const container = $('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ─── TYPING EFFECT ───────────────────────────────────────────
let typingTimeout = null;

function typeText(container, paragraphs, onDone) {
  GameState.isTyping = true;
  container.innerHTML = '';
  const allText = paragraphs.join('\n\n');
  // Replace player tokens
  const processed = allText
    .replace(/{NAME}/g, GameState.player.name || 'Adventurer')
    .replace(/{CLASS}/g, GameState.player.class || 'hero')
    .replace(/{RACE}/g, GameState.player.race || 'unknown');

  const paras = processed.split('\n\n');
  let paraIdx = 0;
  let charIdx = 0;
  let currentP = null;

  function nextPara() {
    if (paraIdx >= paras.length) {
      GameState.isTyping = false;
      if (onDone) onDone();
      return;
    }
    currentP = document.createElement('p');
    container.appendChild(currentP);
    charIdx = 0;
    typeChar();
  }

  function typeChar() {
    if (paraIdx >= paras.length) return;
    const text = paras[paraIdx];
    if (charIdx < text.length) {
      currentP.textContent += text[charIdx];
      charIdx++;
      typingTimeout = setTimeout(typeChar, 18);
    } else {
      paraIdx++;
      setTimeout(nextPara, 120);
    }
  }

  nextPara();
}

function skipTyping(container, paragraphs) {
  if (typingTimeout) clearTimeout(typingTimeout);
  GameState.isTyping = false;
  const processed = paragraphs.join('\n\n')
    .replace(/{NAME}/g, GameState.player.name || 'Adventurer')
    .replace(/{CLASS}/g, GameState.player.class || 'hero')
    .replace(/{RACE}/g, GameState.player.race || 'unknown');

  container.innerHTML = processed.split('\n\n')
    .map(p => `<p>${p}</p>`)
    .join('');
}

// ─── STAT SYSTEM ─────────────────────────────────────────────
function applyStatEffects(effects) {
  if (!effects) return;
  const p = GameState.player;

  if (effects.hp) {
    p.hp = Math.min(p.maxHp, Math.max(0, p.hp + effects.hp));
    flashStat('stat-hp');
  }
  if (effects.morality !== undefined && effects.morality !== 0) {
    p.morality = Math.min(100, Math.max(0, p.morality + effects.morality));
    flashStat('stat-morality');
  }
  updateSidebar();
}

function flashStat(id) {
  const el = $(id);
  if (!el) return;
  el.classList.remove('stat-flash');
  void el.offsetWidth; // reflow
  el.classList.add('stat-flash');
}

function updateSidebar() {
  const p = GameState.player;
  // Name & tags
  const nameEl = $('sidebar-char-name');
  const tagEl = $('sidebar-char-tags');
  if (nameEl) nameEl.textContent = p.name || 'Adventurer';
  if (tagEl) tagEl.textContent = `${p.race} ${p.class}`;

  // Portrait icon
  const raceData = RACES.find(r => r.name === p.race);
  const classData = CLASSES.find(c => c.name === p.class);
  const portraitEl = $('sidebar-portrait-icon');
  if (portraitEl) portraitEl.textContent = raceData?.icon || '🧑';

  // Stat bars
  const hpFill = $('stat-hp');
  const hpVal = $('stat-hp-val');
  if (hpFill) hpFill.style.width = `${(p.hp / p.maxHp) * 100}%`;
  if (hpVal) hpVal.textContent = `${p.hp}/${p.maxHp}`;

  const morFill = $('stat-morality');
  const morVal = $('stat-morality-val');
  if (morFill) morFill.style.width = `${p.morality}%`;
  if (morVal) morVal.textContent = p.morality;

  // Achievements in sidebar
  const achList = $('sidebar-achievements');
  if (achList) {
    achList.innerHTML = '';
    if (GameState.achievements.length === 0) {
      achList.innerHTML = '<div class="achievement-chip" style="font-style:italic;opacity:0.5;">None yet...</div>';
    } else {
      GameState.achievements.forEach(endId => {
        const endData = findEnding(endId);
        if (!endData) return;
        const chip = document.createElement('div');
        chip.className = 'achievement-chip';
        chip.innerHTML = `<span>${endData.ending_icon}</span><span>${endData.ending_name}</span>`;
        achList.appendChild(chip);
      });
    }
  }
}

function findEnding(endId) {
  for (const ep of STORY_DATA.episodes) {
    for (const [, scene] of Object.entries(ep.scenes)) {
      if (scene.type === 'ending' && scene.ending_id === endId) return scene;
    }
  }
  return null;
}

// ─── SCENE RENDERING ─────────────────────────────────────────
function renderScene(episodeId, sceneId) {
  GameState.currentEpisode = episodeId;
  GameState.currentScene = sceneId;
  GameState.history.push(sceneId);

  const scene = getScene(episodeId, sceneId);
  if (!scene) { console.error('Scene not found:', sceneId); return; }

  // If this is an ending scene, go to ending page
  if (scene.type === 'ending') {
    renderEnding(scene);
    return;
  }

  showPage('game');

  // Scene header
  const titleEl = $('scene-title');
  if (titleEl) titleEl.textContent = scene.title || '';

  // Narration
  const narText = $('narration-text');
  const narSpeaker = $('narration-speaker');
  if (narSpeaker) narSpeaker.textContent = scene.speaker || 'Narrator';

  // Choices hidden during typing
  const choicesSection = $('choices-section');
  if (choicesSection) choicesSection.style.opacity = '0';

  if (narText) {
    typeText(narText, scene.narration || [], () => {
      if (choicesSection) {
        choicesSection.style.opacity = '1';
        choicesSection.style.transition = 'opacity 0.5s ease';
      }
      renderChoices(scene, episodeId);
    });
  }

  // Background tint
  const gameMain = $('game-main');
  if (gameMain && scene.bg) {
    gameMain.setAttribute('data-bg', scene.bg);
    gameMain.className = `game-main bg-${scene.bg}`;
  }

  updateSidebar();
}

function renderChoices(scene, episodeId) {
  const list = $('choices-list');
  if (!list) return;
  list.innerHTML = '';

  if (!scene.choices || scene.choices.length === 0) return;

  scene.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.text;
    btn.style.animationDelay = `${i * 0.08}s`;

    btn.addEventListener('click', () => {
      if (GameState.isTyping) return;
      applyStatEffects(choice.stat_effects);
      // Disable all choices
      list.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
      // Navigate
      setTimeout(() => renderScene(episodeId, choice.next), 300);
    });

    list.appendChild(btn);
  });
}

// ─── ENDING ──────────────────────────────────────────────────
function renderEnding(scene) {
  showPage('ending');

  // Unlock achievement
  if (scene.ending_id && !GameState.achievements.includes(scene.ending_id)) {
    GameState.achievements.push(scene.ending_id);
    setTimeout(() => showToast(`🏆 Ending unlocked: "${scene.ending_name}"!`, 4000), 800);
  }

  // Populate ending page
  const iconEl = $('ending-icon');
  const titleEl = $('ending-title');
  const nameEl = $('ending-name');
  const rarityEl = $('ending-rarity');
  const narEl = $('ending-narration');

  if (iconEl) iconEl.textContent = scene.ending_icon || '📖';
  if (titleEl) titleEl.textContent = scene.title || 'The End';
  if (nameEl) nameEl.textContent = `Ending: ${scene.ending_name}`;
  if (rarityEl) {
    rarityEl.textContent = scene.rarity || 'common';
    rarityEl.className = `ending-rarity ${scene.rarity || 'common'}`;
  }
  if (narEl) {
    narEl.innerHTML = (scene.narration || [])
      .join('\n\n')
      .split('\n\n')
      .map(p => `<p>${p}</p>`)
      .join('');
  }

  // Auto-save progress
  saveGame();
}

// ─── CHARACTER CREATION ──────────────────────────────────────
let selectedRace = null;
let selectedClass = null;
let createStep = 1;

function startNewGame() {
  selectedRace = null;
  selectedClass = null;
  createStep = 1;
  GameState.player = { name: '', race: '', raceIcon: '', class: '', classIcon: '', hp: 100, maxHp: 100, morality: 50 };
  GameState.history = [];
  GameState.currentScene = null;
  GameState.currentEpisode = null;
  renderCreateStep(1);
  showPage('create');
}

function renderCreateStep(step) {
  document.querySelectorAll('.create-step').forEach(s => s.classList.remove('active'));
  const el = $(`create-step-${step}`);
  if (el) el.classList.add('active');
  createStep = step;
}

function buildRaceGrid() {
  const grid = $('race-grid');
  if (!grid) return;
  grid.innerHTML = '';
  RACES.forEach(race => {
    const card = document.createElement('div');
    card.className = 'option-card';
    card.innerHTML = `
      <div class="option-icon">${race.icon}</div>
      <span class="option-name">${race.name}</span>
      <span class="option-desc">${race.desc}</span>
    `;
    card.addEventListener('click', () => {
      grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedRace = race;
    });
    grid.appendChild(card);
  });
}

function buildClassGrid() {
  const grid = $('class-grid');
  if (!grid) return;
  grid.innerHTML = '';
  CLASSES.forEach(cls => {
    const card = document.createElement('div');
    card.className = 'option-card';
    card.innerHTML = `
      <div class="option-icon">${cls.icon}</div>
      <span class="option-name">${cls.name}</span>
      <span class="option-desc">${cls.desc}</span>
    `;
    card.addEventListener('click', () => {
      grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedClass = cls;
    });
    grid.appendChild(card);
  });
}

function advanceCreateStep() {
  if (createStep === 1) {
    const name = $('player-name-input')?.value.trim();
    if (!name) { showToast('⚠️ Please enter your name, adventurer.'); return; }
    GameState.player.name = name;
    buildRaceGrid();
    renderCreateStep(2);

  } else if (createStep === 2) {
    if (!selectedRace) { showToast('⚠️ Choose your race, adventurer.'); return; }
    GameState.player.race = selectedRace.name;
    GameState.player.raceIcon = selectedRace.icon;
    // Apply race bonus
    if (selectedRace.id === 'dwarf') { GameState.player.maxHp = 110; GameState.player.hp = 110; }
    if (selectedRace.id === 'elf')   { GameState.player.maxHp = 105; GameState.player.hp = 105; }
    if (selectedRace.id === 'human') { GameState.player.morality = 55; }
    buildClassGrid();
    renderCreateStep(3);

  } else if (createStep === 3) {
    if (!selectedClass) { showToast('⚠️ Choose your class, adventurer.'); return; }
    GameState.player.class = selectedClass.name;
    GameState.player.classIcon = selectedClass.icon;
    showEpisodeSelect();
  }
}

// ─── EPISODE SELECTION ───────────────────────────────────────
function showEpisodeSelect() {
  buildEpisodeList();
  showPage('episodes');
}

function buildEpisodeList() {
  const container = $('episode-list');
  if (!container) return;
  container.innerHTML = '';

  STORY_DATA.episodes.forEach((ep, i) => {
    const card = document.createElement('div');
    card.className = 'episode-card' + (i > 0 ? ' locked' : '');
    card.innerHTML = `
      <div class="episode-thumb">${ep.thumbnail}</div>
      <div class="episode-info">
        <div class="episode-subtitle">${ep.subtitle}${i > 0 ? ' — Coming Soon' : ''}</div>
        <div class="episode-title">${ep.title}</div>
        <div class="episode-desc">${ep.description}</div>
      </div>
    `;
    if (i === 0) {
      card.addEventListener('click', () => startEpisode(ep.id));
    }
    container.appendChild(card);
  });
}

function startEpisode(epId) {
  const ep = STORY_DATA.episodes.find(e => e.id === epId);
  if (!ep) return;
  GameState.currentEpisode = epId;
  GameState.history = [];
  renderScene(epId, ep.startScene);
}

// ─── ACHIEVEMENTS PAGE ───────────────────────────────────────
function showAchievements() {
  buildAchievementGrid();
  showPage('achievements');
}

function buildAchievementGrid() {
  const grid = $('achievement-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Collect all endings from all episodes
  const allEndings = [];
  for (const ep of STORY_DATA.episodes) {
    for (const [, scene] of Object.entries(ep.scenes)) {
      if (scene.type === 'ending') allEndings.push(scene);
    }
  }

  allEndings.forEach(ending => {
    const unlocked = GameState.achievements.includes(ending.ending_id);
    const card = document.createElement('div');
    card.className = `achievement-full${unlocked ? ' unlocked' : ''}`;
    card.innerHTML = `
      <span class="achievement-full-icon">${ending.ending_icon}</span>
      <div class="achievement-full-name">${unlocked ? ending.ending_name : '???'}</div>
      <div class="achievement-full-ending">${unlocked ? ending.title : 'Not yet discovered'}</div>
      <div class="ending-rarity ${ending.rarity}" style="margin-top:0.35rem;font-size:0.6rem">${ending.rarity}</div>
    `;
    grid.appendChild(card);
  });
}

// ─── CONFIRM MODAL ───────────────────────────────────────────
function showModal(title, body, onConfirm) {
  const overlay = $('modal-overlay');
  const modalTitle = $('modal-title');
  const modalBody = $('modal-body');
  const confirmBtn = $('modal-confirm');

  if (modalTitle) modalTitle.textContent = title;
  if (modalBody) modalBody.textContent = body;
  if (overlay) overlay.classList.add('active');

  if (confirmBtn) {
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, newBtn);
    // Actually just use direct event
    $('modal-confirm').onclick = () => {
      overlay.classList.remove('active');
      onConfirm();
    };
  }
}

function closeModal() {
  const overlay = $('modal-overlay');
  if (overlay) overlay.classList.remove('active');
}

// ─── NARRATION SKIP ──────────────────────────────────────────
function handleNarrationClick() {
  if (GameState.isTyping) {
    const narText = $('narration-text');
    const scene = getScene(GameState.currentEpisode, GameState.currentScene);
    if (scene && narText) {
      skipTyping(narText, scene.narration || []);
      GameState.isTyping = false;
      const choicesSection = $('choices-section');
      if (choicesSection) {
        choicesSection.style.opacity = '1';
      }
      renderChoices(scene, GameState.currentEpisode);
    }
  }
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Load achievements from save (they persist even between runs)
  const raw = localStorage.getItem(SAVE_KEY);
  if (raw) {
    try {
      const data = JSON.parse(raw);
      if (data.achievements) GameState.achievements = data.achievements;
    } catch {}
  }

  // Main Menu buttons
  $('btn-new-game')?.addEventListener('click', startNewGame);

  $('btn-load-game')?.addEventListener('click', () => {
    if (!hasSave()) { showToast('📜 No saved game found in the chronicles.'); return; }
    if (loadGame()) {
      showToast('📖 Chronicles restored. Welcome back, ' + GameState.player.name + '.');
      if (GameState.currentEpisode && GameState.currentScene) {
        renderScene(GameState.currentEpisode, GameState.currentScene);
      } else {
        showEpisodeSelect();
      }
    } else {
      showToast('⚠️ The chronicles are corrupted. Begin anew.');
    }
  });

  $('btn-achievements-menu')?.addEventListener('click', showAchievements);

  // Character Creation
  $('btn-create-next')?.addEventListener('click', advanceCreateStep);

  $('btn-create-back')?.addEventListener('click', () => {
    if (createStep > 1) renderCreateStep(createStep - 1);
    else showPage('menu');
  });

  $('player-name-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') advanceCreateStep();
  });

  // Episode Select — back button
  $('btn-episodes-back')?.addEventListener('click', () => showPage('create'));

  // Game page buttons
  $('btn-save')?.addEventListener('click', saveGame);
  $('btn-exit-game')?.addEventListener('click', () => {
    showModal('Return to the World Map?', 'Your current progress will be lost unless saved. Are you certain, adventurer?', () => {
      showPage('menu');
    });
  });
  $('btn-achievements-game')?.addEventListener('click', showAchievements);

  // Narration click to skip typing
  $('narration-panel')?.addEventListener('click', handleNarrationClick);

  // Ending page buttons
  $('btn-play-again')?.addEventListener('click', () => {
    // Replay same episode from start
    if (GameState.currentEpisode) {
      const ep = STORY_DATA.episodes.find(e => e.id === GameState.currentEpisode);
      if (ep) {
        GameState.history = [];
        renderScene(ep.id, ep.startScene);
      }
    }
  });

  $('btn-main-menu-ending')?.addEventListener('click', () => showPage('menu'));
  $('btn-achievements-ending')?.addEventListener('click', showAchievements);

  // Achievements back button
  $('btn-achievements-back')?.addEventListener('click', () => showPage('menu'));

  // Modal close
  $('modal-cancel')?.addEventListener('click', closeModal);
  $('modal-overlay')?.addEventListener('click', e => {
    if (e.target === $('modal-overlay')) closeModal();
  });

  // Update load button state
  if (!hasSave()) {
    const loadBtn = $('btn-load-game');
    if (loadBtn) loadBtn.disabled = true;
  }

  // Show menu
  showPage('menu');
});
