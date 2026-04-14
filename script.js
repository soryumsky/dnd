// ============================================================
// KRONIK AELTHAR — Mesin Permainan
// script.js
// ============================================================

'use strict';

// ─── STATUS PERMAINAN ──────────────────────────────────────────────
const GameState = {
  player: {
    name: '',
    race: '',
    raceIcon: '',
    class: '',
    classIcon: '',
    hp: 100,
    maxHp: 100,
    morality: 50,   // 0 = korup, 100 = suci
  },
  // Variabel tersembunyi efek kupu-kupu (Episode 2)
  butterfly: {
    trust: 0,       // kepercayaan NPC
    corruption: 0,  // pengaruh korupsi
    knowledge: 0,   // pengetahuan yang ditemukan
  },
  currentEpisode: null,
  currentScene: null,
  achievements: [],      // daftar string ending_id
  history: [],           // riwayat id adegan
  isTyping: false,
};

// ─── DATA RAS / KELAS ───────────────────────────────────────
const RACES = [
  { id: 'human',  name: 'Manusia',  icon: '🧑', desc: 'Mudah beradaptasi & tekun. +5 Moralitas' },
  { id: 'elf',    name: 'Elf',      icon: '🧝', desc: 'Kebijaksanaan kuno. +5 HP Maks' },
  { id: 'dwarf',  name: 'Kurcaci',  icon: '⛏️', desc: 'Tangguh & keras kepala. +10 HP Maks' },
  { id: 'orc',    name: 'Orc',      icon: '🪖', desc: 'Ganas & tanpa rasa takut. Kekuatan pilihan ekstra' },
];

const CLASSES = [
  { id: 'warrior', name: 'Prajurit', icon: '⚔️', desc: 'Baju besi berat. Memenangkan pertempuran lebih mudah' },
  { id: 'mage',    name: 'Penyihir', icon: '🔮', desc: 'Kekuatan arkana. Mengungkap pilihan tersembunyi' },
  { id: 'rogue',   name: 'Penggelap', icon: '🗡️', desc: 'Senyap & licik. Pengintaian lebih baik' },
  { id: 'cleric',  name: 'Klerik',   icon: '✝️', desc: 'Kekuatan suci. Lebih kuat melawan yang tak-mati' },
];

// ─── REFERENSI DOM ────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const Pages = {
  menu:         $('page-menu'),
  create:       $('page-create'),
  episodes:     $('page-episodes'),
  game:         $('page-game'),
  ending:       $('page-ending'),
  achievements: $('page-achievements'),
};

// ─── NAVIGASI HALAMAN ────────────────────────────────────────
function showPage(name) {
  const overlay = $('transition-overlay');
  overlay.classList.add('fade-in');
  setTimeout(() => {
    Object.values(Pages).forEach(p => p.classList.remove('active'));
    if (Pages[name]) Pages[name].classList.add('active');
    overlay.classList.remove('fade-in');
  }, 350);
}

// ─── PENYIMPANAN LOKAL ───────────────────────────────────────────────
const SAVE_KEY = 'aelthar_save';

function saveGame() {
  const data = {
    player: { ...GameState.player },
    butterfly: { ...GameState.butterfly },
    currentEpisode: GameState.currentEpisode,
    currentScene: GameState.currentScene,
    achievements: [...GameState.achievements],
    history: [...GameState.history],
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  showToast('📜 Perkembangan tersimpan ke dalam kronik.');
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    Object.assign(GameState, data);
    if (!GameState.butterfly) GameState.butterfly = { trust: 0, corruption: 0, knowledge: 0 };
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

// ─── NOTIFIKASI TOAST ─────────────────────────────────────
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

// ─── EFEK MENGETIK ───────────────────────────────────────────────
let typingTimeout = null;

function typeText(container, paragraphs, onDone) {
  GameState.isTyping = true;
  container.innerHTML = '';
  const allText = paragraphs.join('\n\n');
  const processed = allText
    .replace(/{NAME}/g, GameState.player.name || 'Petualang')
    .replace(/{CLASS}/g, GameState.player.class || 'pahlawan')
    .replace(/{RACE}/g, GameState.player.race || 'tak diketahui');

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
    .replace(/{NAME}/g, GameState.player.name || 'Petualang')
    .replace(/{CLASS}/g, GameState.player.class || 'pahlawan')
    .replace(/{RACE}/g, GameState.player.race || 'tak diketahui');

  container.innerHTML = processed.split('\n\n')
    .map(p => `<p>${p}</p>`)
    .join('');
}

// ─── SISTEM STATISTIK ─────────────────────────────────────────────
function applyStatEffects(effects) {
  if (!effects) return;
  const p = GameState.player;
  const b = GameState.butterfly;

  if (effects.hp) {
    p.hp = Math.min(p.maxHp, Math.max(0, p.hp + effects.hp));
    flashStat('stat-hp');
  }
  if (effects.morality !== undefined && effects.morality !== 0) {
    p.morality = Math.min(100, Math.max(0, p.morality + effects.morality));
    flashStat('stat-morality');
  }
  // Variabel tersembunyi efek kupu-kupu
  if (effects.trust !== undefined)      b.trust      = Math.max(0, b.trust      + effects.trust);
  if (effects.corruption !== undefined) b.corruption = Math.max(0, b.corruption + effects.corruption);
  if (effects.knowledge !== undefined)  b.knowledge  = Math.max(0, b.knowledge  + effects.knowledge);

  updateSidebar();
}

function flashStat(id) {
  const el = $(id);
  if (!el) return;
  el.classList.remove('stat-flash');
  void el.offsetWidth;
  el.classList.add('stat-flash');
}

function updateSidebar() {
  const p = GameState.player;
  const nameEl = $('sidebar-char-name');
  const tagEl = $('sidebar-char-tags');
  if (nameEl) nameEl.textContent = p.name || 'Petualang';
  if (tagEl) tagEl.textContent = `${p.race} ${p.class}`;

  const raceData = RACES.find(r => r.name === p.race);
  const portraitEl = $('sidebar-portrait-icon');
  if (portraitEl) portraitEl.textContent = raceData?.icon || '🧑';

  const hpFill = $('stat-hp');
  const hpVal = $('stat-hp-val');
  if (hpFill) hpFill.style.width = `${(p.hp / p.maxHp) * 100}%`;
  if (hpVal) hpVal.textContent = `${p.hp}/${p.maxHp}`;

  const morFill = $('stat-morality');
  const morVal = $('stat-morality-val');
  if (morFill) morFill.style.width = `${p.morality}%`;
  if (morVal) morVal.textContent = p.morality;

  const achList = $('sidebar-achievements');
  if (achList) {
    achList.innerHTML = '';
    if (GameState.achievements.length === 0) {
      achList.innerHTML = '<div class="achievement-chip" style="font-style:italic;opacity:0.5;">Belum ada...</div>';
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

// ─── RENDERING ADEGAN ─────────────────────────────────────────────
function renderScene(episodeId, sceneId) {
  GameState.currentEpisode = episodeId;
  GameState.currentScene = sceneId;
  GameState.history.push(sceneId);

  const scene = getScene(episodeId, sceneId);
  if (!scene) { console.error('Adegan tidak ditemukan:', sceneId); return; }

  if (scene.type === 'ending') {
    renderEnding(scene);
    return;
  }

  // Untuk adegan pengecekan akhiran ep2, tentukan akhiran berdasarkan variabel butterfly
  if (sceneId === 'ep2_resolve_ending') {
    const b = GameState.butterfly;
    // Rahasia: dilihat danau DAN percayai Elira
    if (b.knowledge >= 2 && b.trust >= 3) {
      renderScene(episodeId, 'ep2_ending_loop');
      return;
    }
    // Korupsi tinggi
    if (b.corruption >= 3) {
      renderScene(episodeId, 'ep2_ending_hollow_king');
      return;
    }
    // Pengetahuan tinggi
    if (b.knowledge >= 3) {
      renderScene(episodeId, 'ep2_ending_truth_seeker');
      return;
    }
    // Kepercayaan tinggi
    if (b.trust >= 2) {
      renderScene(episodeId, 'ep2_ending_lightbearer');
      return;
    }
    // Semuanya rendah
    renderScene(episodeId, 'ep2_ending_lost_soul');
    return;
  }

  showPage('game');

  const titleEl = $('scene-title');
  if (titleEl) titleEl.textContent = scene.title || '';

  const narText = $('narration-text');
  const narSpeaker = $('narration-speaker');
  if (narSpeaker) narSpeaker.textContent = scene.speaker || 'Narator';

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
      list.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
      setTimeout(() => renderScene(episodeId, choice.next), 300);
    });

    list.appendChild(btn);
  });
}

// ─── AKHIRAN ──────────────────────────────────────────────────────────────────
function renderEnding(scene) {
  showPage('ending');

  if (scene.ending_id && !GameState.achievements.includes(scene.ending_id)) {
    GameState.achievements.push(scene.ending_id);
    setTimeout(() => showToast(`🏆 Akhiran terbuka: "${scene.ending_name}"!`, 4000), 800);
  }

  const iconEl = $('ending-icon');
  const titleEl = $('ending-title');
  const nameEl = $('ending-name');
  const rarityEl = $('ending-rarity');
  const narEl = $('ending-narration');

  if (iconEl) iconEl.textContent = scene.ending_icon || '📖';
  if (titleEl) titleEl.textContent = scene.title || 'Tamat';
  if (nameEl) nameEl.textContent = `Akhiran: ${scene.ending_name}`;
  if (rarityEl) {
    const rarityLabels = { common: 'biasa', uncommon: 'tidak biasa', rare: 'langka', secret: 'rahasia' };
    rarityEl.textContent = rarityLabels[scene.rarity] || scene.rarity || 'biasa';
    rarityEl.className = `ending-rarity ${scene.rarity || 'common'}`;
  }
  if (narEl) {
    narEl.innerHTML = (scene.narration || [])
      .join('\n\n')
      .split('\n\n')
      .map(p => `<p>${p}</p>`)
      .join('');
  }

  saveGame();
}

// ─── PEMBUATAN KARAKTER ──────────────────────────────────────────────────
let selectedRace = null;
let selectedClass = null;
let createStep = 1;

function startNewGame() {
  selectedRace = null;
  selectedClass = null;
  createStep = 1;
  GameState.player = { name: '', race: '', raceIcon: '', class: '', classIcon: '', hp: 100, maxHp: 100, morality: 50 };
  GameState.butterfly = { trust: 0, corruption: 0, knowledge: 0 };
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
    if (!name) { showToast('⚠️ Masukkan namamu, petualang.'); return; }
    GameState.player.name = name;
    buildRaceGrid();
    renderCreateStep(2);

  } else if (createStep === 2) {
    if (!selectedRace) { showToast('⚠️ Pilih rasamu, petualang.'); return; }
    GameState.player.race = selectedRace.name;
    GameState.player.raceIcon = selectedRace.icon;
    if (selectedRace.id === 'dwarf') { GameState.player.maxHp = 110; GameState.player.hp = 110; }
    if (selectedRace.id === 'elf')   { GameState.player.maxHp = 105; GameState.player.hp = 105; }
    if (selectedRace.id === 'human') { GameState.player.morality = 55; }
    buildClassGrid();
    renderCreateStep(3);

  } else if (createStep === 3) {
    if (!selectedClass) { showToast('⚠️ Pilih kelasmu, petualang.'); return; }
    GameState.player.class = selectedClass.name;
    GameState.player.classIcon = selectedClass.icon;
    showEpisodeSelect();
  }
}

// ─── PEMILIHAN EPISODE ───────────────────────────────────────
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
    card.className = 'episode-card';
    card.innerHTML = `
      <div class="episode-thumb">${ep.thumbnail}</div>
      <div class="episode-info">
        <div class="episode-subtitle">${ep.subtitle}</div>
        <div class="episode-title">${ep.title}</div>
        <div class="episode-desc">${ep.description}</div>
      </div>
    `;
    card.addEventListener('click', () => {
      // Reset butterfly untuk episode 2 saat dimulai
      if (ep.id === 'ep2') {
        GameState.butterfly = { trust: 0, corruption: 0, knowledge: 0 };
      }
      startEpisode(ep.id);
    });
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

// ─── HALAMAN PENCAPAIAN ───────────────────────────────────────
function showAchievements() {
  buildAchievementGrid();
  showPage('achievements');
}

function buildAchievementGrid() {
  const grid = $('achievement-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const allEndings = [];
  for (const ep of STORY_DATA.episodes) {
    for (const [, scene] of Object.entries(ep.scenes)) {
      if (scene.type === 'ending') allEndings.push({ ...scene, epTitle: ep.title });
    }
  }

  // Kelompokkan per episode
  const ep1Endings = allEndings.filter(e => e.ending_id && !e.ending_id.startsWith('ep2'));
  const ep2Endings = allEndings.filter(e => e.ending_id && e.ending_id.startsWith('ep2'));

  function renderGroup(endings, label) {
    if (endings.length === 0) return;
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1/-1; text-align:center; font-family:var(--font-title); color:var(--gold-dim); font-size:0.75rem; letter-spacing:0.12em; text-transform:uppercase; margin-top:0.5rem; margin-bottom:0.25rem;';
    header.textContent = label;
    grid.appendChild(header);

    endings.forEach(ending => {
      const unlocked = GameState.achievements.includes(ending.ending_id);
      const rarityLabels = { common: 'Biasa', uncommon: 'Tidak Biasa', rare: 'Langka', secret: 'Rahasia' };
      const card = document.createElement('div');
      card.className = `achievement-full${unlocked ? ' unlocked' : ''}`;
      card.innerHTML = `
        <span class="achievement-full-icon">${ending.ending_icon}</span>
        <div class="achievement-full-name">${unlocked ? ending.ending_name : '???'}</div>
        <div class="achievement-full-ending">${unlocked ? ending.title : 'Belum ditemukan'}</div>
        <div class="ending-rarity ${ending.rarity}" style="margin-top:0.35rem;font-size:0.6rem">${rarityLabels[ending.rarity] || ending.rarity}</div>
      `;
      grid.appendChild(card);
    });
  }

  renderGroup(ep1Endings, '— Episode I: Mahkota yang Hancur —');
  renderGroup(ep2Endings, '— Episode II: Bisikan yang Berongga —');
}

// ─── MODAL KONFIRMASI ───────────────────────────────────────────────
function showModal(title, body, onConfirm) {
  const overlay = $('modal-overlay');
  const modalTitle = $('modal-title');
  const modalBody = $('modal-body');

  if (modalTitle) modalTitle.textContent = title;
  if (modalBody) modalBody.textContent = body;
  if (overlay) overlay.classList.add('active');

  $('modal-confirm').onclick = () => {
    overlay.classList.remove('active');
    onConfirm();
  };
}

function closeModal() {
  const overlay = $('modal-overlay');
  if (overlay) overlay.classList.remove('active');
}

// ─── LEWATI NARASI ──────────────────────────────────────────────────
function handleNarrationClick() {
  if (GameState.isTyping) {
    const narText = $('narration-text');
    const scene = getScene(GameState.currentEpisode, GameState.currentScene);
    if (scene && narText) {
      skipTyping(narText, scene.narration || []);
      GameState.isTyping = false;
      const choicesSection = $('choices-section');
      if (choicesSection) choicesSection.style.opacity = '1';
      renderChoices(scene, GameState.currentEpisode);
    }
  }
}

// ─── INISIALISASI ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const raw = localStorage.getItem(SAVE_KEY);
  if (raw) {
    try {
      const data = JSON.parse(raw);
      if (data.achievements) GameState.achievements = data.achievements;
    } catch {}
  }

  // Tombol Menu Utama
  $('btn-new-game')?.addEventListener('click', startNewGame);

  $('btn-load-game')?.addEventListener('click', () => {
    if (!hasSave()) { showToast('📜 Tidak ada simpanan yang ditemukan dalam kronik.'); return; }
    if (loadGame()) {
      showToast('📖 Kronik dipulihkan. Selamat datang kembali, ' + GameState.player.name + '.');
      if (GameState.currentEpisode && GameState.currentScene) {
        renderScene(GameState.currentEpisode, GameState.currentScene);
      } else {
        showEpisodeSelect();
      }
    } else {
      showToast('⚠️ Kronik rusak. Mulailah dari awal.');
    }
  });

  $('btn-achievements-menu')?.addEventListener('click', showAchievements);

  // Pembuatan Karakter
  $('btn-create-next')?.addEventListener('click', advanceCreateStep);

  $('btn-create-back')?.addEventListener('click', () => {
    if (createStep > 1) renderCreateStep(createStep - 1);
    else showPage('menu');
  });

  $('player-name-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') advanceCreateStep();
  });

  // Pemilihan Episode — tombol kembali
  $('btn-episodes-back')?.addEventListener('click', () => showPage('create'));

  // Tombol halaman permainan
  $('btn-save')?.addEventListener('click', saveGame);
  $('btn-exit-game')?.addEventListener('click', () => {
    showModal('Kembali ke Peta Dunia?', 'Perkembanganmu saat ini akan hilang jika tidak disimpan. Apakah kamu yakin, petualang?', () => {
      showPage('menu');
    });
  });
  $('btn-achievements-game')?.addEventListener('click', showAchievements);

  // Klik narasi untuk melewati pengetikan
  $('narration-panel')?.addEventListener('click', handleNarrationClick);

  // Tombol halaman akhiran
  $('btn-play-again')?.addEventListener('click', () => {
    if (GameState.currentEpisode) {
      const ep = STORY_DATA.episodes.find(e => e.id === GameState.currentEpisode);
      if (ep) {
        GameState.history = [];
        if (ep.id === 'ep2') {
          GameState.butterfly = { trust: 0, corruption: 0, knowledge: 0 };
        }
        renderScene(ep.id, ep.startScene);
      }
    }
  });

  $('btn-main-menu-ending')?.addEventListener('click', () => showPage('menu'));
  $('btn-achievements-ending')?.addEventListener('click', showAchievements);

  // Tombol kembali pencapaian
  $('btn-achievements-back')?.addEventListener('click', () => showPage('menu'));

  // Tutup modal
  $('modal-cancel')?.addEventListener('click', closeModal);
  $('modal-overlay')?.addEventListener('click', e => {
    if (e.target === $('modal-overlay')) closeModal();
  });

  if (!hasSave()) {
    const loadBtn = $('btn-load-game');
    if (loadBtn) loadBtn.disabled = true;
  }

  showPage('menu');
});
