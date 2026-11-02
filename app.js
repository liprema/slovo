import { VOCABULARY_CATEGORIES } from './src/data/vocabulary.js';
import { storage } from './src/modules/storage.js';
import { audio } from './src/modules/audio.js';
import { quizEngine } from './src/modules/quiz-engine.js';
import { duelManager } from './src/modules/peer.js';
import { storyGenerator } from './src/modules/ai-story.js';

class AppController {
  constructor() {
    this.currentTab = 'cards';
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.cardQueue = [];
    this.currentCardIndex = 0;
    this.isCardFlipped = false;

    // Solo Quiz state
    this.activeQuiz = null;

    // Local duel state (Pass & Play)
    this.localDuel = null;

    this.init();
  }

  init() {
    this.applyTheme(storage.profile.theme || 'auto');
    this.updateHeaderStats();
    this.setupEventListeners();
    this.loadCardsQueue();
    this.renderScreen();
  }

  applyTheme(theme) {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  updateHeaderStats() {
    const streakEl = document.getElementById('streak-count');
    if (streakEl) streakEl.textContent = storage.stats.streak || 1;
  }

  setupEventListeners() {
    // Табы навигации
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.dataset.tab;
        if (tab && tab !== this.currentTab) {
          audio.playTap();
          this.switchTab(tab);
        }
      });
    });

    // Кнопка добавления слова
    document.getElementById('btn-open-add')?.addEventListener('click', () => {
      audio.playTap();
      this.openAddWordModal();
    });

    // Кнопка настроек
    document.getElementById('btn-open-settings')?.addEventListener('click', () => {
      audio.playTap();
      this.openSettingsModal();
    });

    // Подписка на сетевые события дуэли
    duelManager.on('status', (data) => this.onDuelStatus(data));
    duelManager.on('room_created', (data) => this.onDuelRoomCreated(data));
    duelManager.on('connected', (data) => this.onDuelConnected(data));
    duelManager.on('game_started', (data) => this.onOnlineGameStarted(data));
    duelManager.on('opponent_answered', (data) => this.onOpponentAnswered(data));
    duelManager.on('reaction_received', (data) => this.onReactionReceived(data));
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    const titles = {
      cards: 'Карточки',
      duel: 'Дуэль подруг',
      train: 'Тренажёр',
      dictionary: 'Лексикон',
      stories: 'Истории & Челленджи'
    };
    document.getElementById('page-title').textContent = titles[tabName] || 'СловоВместе';

    this.renderScreen();
  }

  renderScreen() {
    const container = document.getElementById('screen-container');
    if (!container) return;

    switch (this.currentTab) {
      case 'cards':
        this.renderCardsScreen(container);
        break;
      case 'duel':
        this.renderDuelScreen(container);
        break;
      case 'train':
        this.renderTrainScreen(container);
        break;
      case 'dictionary':
        this.renderDictionaryScreen(container);
        break;
      case 'stories':
        this.renderStoriesScreen(container);
        break;
    }
  }

  // ==========================================
  // 1. ЭКРАН КАРТОЧЕК (SPACED REPETITION)
  // ==========================================
  loadCardsQueue() {
    this.cardQueue = storage.getWordsForReview();
    if (this.cardQueue.length === 0) {
      // Если все повторено, берем 5 любых для практики
      this.cardQueue = [...storage.words].sort(() => Math.random() - 0.5).slice(0, 5);
    }
    this.currentCardIndex = 0;
    this.isCardFlipped = false;
  }

  renderCardsScreen(container) {
    if (!this.cardQueue || this.cardQueue.length === 0 || this.currentCardIndex >= this.cardQueue.length) {
      container.innerHTML = `
        <div class="ios-card" style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 56px; margin-bottom: 16px;">🎉</div>
          <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Все слова повторены!</h2>
          <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 15px;">
            Вы отлично поработали над словарным запасом. Слова вернутся в карточки в идеальный момент по алгоритму интервальных повторений.
          </p>
          <button class="ios-btn-primary" id="btn-restart-cards">
            <span>Взять ещё 5 случайных слов</span>
          </button>
        </div>
      `;
      document.getElementById('btn-restart-cards')?.addEventListener('click', () => {
        audio.playTap();
        this.loadCardsQueue();
        this.renderScreen();
      });
      return;
    }

    const currentWord = this.cardQueue[this.currentCardIndex];
    const progress = storage.getWordProgress(currentWord.id);
    const remaining = this.cardQueue.length - this.currentCardIndex;

    const statusBadges = {
      new: '🌱 Новое слово',
      learning: '📘 Закрепляем',
      active: '⭐️ В активном запасе',
      mastered: '🏆 Освоено свободно'
    };

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">
          Осталось в колоде: ${remaining}
        </span>
        <span class="card-badge">${statusBadges[progress.status] || 'Новое'}</span>
      </div>

      <div class="flip-card-perspective" id="flashcard">
        <div class="flip-card-inner ${this.isCardFlipped ? 'flipped' : ''}" id="flashcard-inner">
          <!-- Лицевая сторона -->
          <div class="flip-card-front">
            <div class="card-header-bar">
              <span class="card-badge">Уровень: ${progress.box}/5</span>
              <button class="card-sound-btn" id="btn-speak-front" title="Озвучить произношение">🔊</button>
            </div>

            <div style="margin: auto 0;">
              <h2 class="card-word-title">${currentWord.accented || currentWord.word}</h2>
              <div class="card-pos">${currentWord.partOfSpeech}</div>
              <div style="font-size: 15px; color: var(--text-secondary); line-height: 1.4;">
                Постарайтесь вспомнить толкование и как использовать это слово в беседе.
              </div>
            </div>

            <div class="tap-hint">
              <span>👆 Нажмите на карточку, чтобы перевернуть</span>
            </div>
          </div>

          <!-- Обратная сторона -->
          <div class="flip-card-back">
            <div class="card-header-bar">
              <span class="card-badge" style="background: rgba(0, 122, 255, 0.1); color: var(--ios-blue);">
                Толкование
              </span>
              <button class="card-sound-btn" id="btn-speak-back" title="Озвучить">🔊</button>
            </div>

            <div style="margin: 14px 0 6px 0;">
              <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 6px;">${currentWord.word}</h3>
              <p style="font-size: 16px; font-weight: 500; line-height: 1.45; color: var(--text-primary);">
                ${currentWord.definition}
              </p>
            </div>

            ${currentWord.deepMeaning ? `
              <div style="font-size: 13px; color: var(--text-secondary); margin: 6px 0;">
                💡 <strong>Тонкость:</strong> ${currentWord.deepMeaning}
              </div>
            ` : ''}

            ${currentWord.exampleQuote ? `
              <div class="quote-box">
                ${currentWord.exampleQuote}
              </div>
            ` : ''}

            ${currentWord.lifeExample ? `
              <div style="font-size: 13px; margin: 6px 0;">
                💬 <strong>В живой речи:</strong> ${currentWord.lifeExample}
              </div>
            ` : ''}

            <div class="active-tip-box">
              🎯 <strong>Как применить:</strong> ${currentWord.activeTip}
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопки оценки Spaced Repetition (показываются всегда или после переворота) -->
      <div style="margin-top: 10px;">
        <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); text-align: center; margin-bottom: 6px;">
          Как хорошо вы владеете этим словом?
        </div>
        <div class="rating-buttons-bar">
          <button class="rate-btn rate-again" data-quality="1">
            <span>❌ Снова</span>
            <span style="font-size: 10px; opacity: 0.8;">не помню</span>
          </button>
          <button class="rate-btn rate-hard" data-quality="2">
            <span>🤔 Трудно</span>
            <span style="font-size: 10px; opacity: 0.8;">смутно</span>
          </button>
          <button class="rate-btn rate-good" data-quality="3">
            <span>👍 Помню</span>
            <span style="font-size: 10px; opacity: 0.8;">знаю смысл</span>
          </button>
          <button class="rate-btn rate-master" data-quality="4">
            <span>🌟 В активе</span>
            <span style="font-size: 10px; opacity: 0.8;">свободно</span>
          </button>
        </div>
      </div>
    `;

    // Обработчик клика по карточке (переворот)
    const cardEl = document.getElementById('flashcard');
    cardEl?.addEventListener('click', (e) => {
      // Игнорируем клик по кнопке звука
      if (e.target.closest('.card-sound-btn')) return;
      audio.playFlip();
      this.isCardFlipped = !this.isCardFlipped;
      document.getElementById('flashcard-inner')?.classList.toggle('flipped', this.isCardFlipped);
    });

    // Озвучка
    document.getElementById('btn-speak-front')?.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.speak(currentWord.word);
    });
    document.getElementById('btn-speak-back')?.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.speak(currentWord.word);
    });

    // Обработка кнопок оценки
    container.querySelectorAll('.rate-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const quality = parseInt(btn.dataset.quality, 10);
        if (quality >= 3) {
          audio.playSuccess();
        } else {
          audio.playTap();
        }
        audio.vibrate(20);
        storage.rateWord(currentWord.id, quality);
        this.currentCardIndex++;
        this.isCardFlipped = false;
        this.renderScreen();
      });
    });
  }

  // ==========================================
  // 2. ЭКРАН ДУЭЛЕЙ (ОНЛАЙН И ЗА ОДНИМ СТОЛОМ)
  // ==========================================
  renderDuelScreen(container) {
    if (this.localDuel && this.localDuel.isActive) {
      this.renderLocalDuelPlay(container);
      return;
    }

    if (duelManager.status === 'in_game') {
      this.renderOnlineDuelPlay(container);
      return;
    }

    container.innerHTML = `
      <div class="ios-card" style="text-align: center; padding: 24px 20px;">
        <div style="font-size: 48px; margin-bottom: 12px;">⚔️</div>
        <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 6px;">Дуэль со словарём</h2>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">
          Соревнуйтесь с подругой в скорости и точности понимания слов! 5 раундов блица.
        </p>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <button class="ios-btn-primary" id="btn-start-local-duel">
            <span>📱 Играть на одном устройстве</span>
          </button>
          <button class="ios-btn-secondary" id="btn-open-online-duel">
            <span>🌐 Дуэль на двух телефонах (Онлайн)</span>
          </button>
        </div>
      </div>

      <div class="ios-card">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">📊 История ваших поединков</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; text-align: center;">
          <div style="background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius-sm);">
            <div style="font-size: 26px; font-weight: 800; color: var(--ios-blue);">${storage.stats.duelsPlayed || 0}</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Сыграно дуэлей</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius-sm);">
            <div style="font-size: 26px; font-weight: 800; color: var(--ios-green);">${storage.stats.duelsWon || 0}</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Побед</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-start-local-duel')?.addEventListener('click', () => {
      audio.playTap();
      this.startLocalDuel();
    });

    document.getElementById('btn-open-online-duel')?.addEventListener('click', () => {
      audio.playTap();
      this.openOnlineDuelModal();
    });
  }

  // --- Локальная дуэль (на одном экране) ---
  startLocalDuel() {
    const questions = quizEngine.generateDuelSet(5);
    this.localDuel = {
      isActive: true,
      questions,
      currentIndex: 0,
      activePlayer: 1, // 1: Полина, 2: Подруга
      scores: { p1: 0, p2: 0 },
      answersLog: []
    };
    this.renderScreen();
  }

  renderLocalDuelPlay(container) {
    const duel = this.localDuel;
    const q = duel.questions[duel.currentIndex];
    const isP1 = duel.activePlayer === 1;
    const p1Name = storage.profile.name || 'Полина';
    const p2Name = storage.profile.friendName || 'Подруга';

    container.innerHTML = `
      <div class="duel-versus-bar">
        <div class="player-info" style="${isP1 ? 'opacity: 1; transform: scale(1.05);' : 'opacity: 0.6;'}">
          <div class="player-avatar">${storage.profile.avatar || '🌸'}</div>
          <div>
            <div class="player-name">${p1Name}</div>
            <div class="player-score">${duel.scores.p1}</div>
          </div>
        </div>
        <div class="versus-badge">РАУНД ${duel.currentIndex + 1}/5</div>
        <div class="player-info" style="${!isP1 ? 'opacity: 1; transform: scale(1.05);' : 'opacity: 0.6;'}">
          <div>
            <div class="player-name" style="text-align: right;">${p2Name}</div>
            <div class="player-score" style="text-align: right; color: var(--ios-pink);">${duel.scores.p2}</div>
          </div>
          <div class="player-avatar">${storage.profile.friendAvatar || '💫'}</div>
        </div>
      </div>

      <div class="ios-card" style="border: 2px solid ${isP1 ? 'var(--ios-blue)' : 'var(--ios-pink)'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="card-badge" style="background: ${isP1 ? 'rgba(0,122,255,0.1)' : 'rgba(255,45,85,0.1)'}; color: ${isP1 ? 'var(--ios-blue)' : 'var(--ios-pink)'};">
            Ходит: ${isP1 ? p1Name : p2Name}
          </span>
          <span class="card-badge">${q.badge}</span>
        </div>

        <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 6px;">${q.prompt}</p>
        <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); line-height: 1.3;">
          ${q.highlight}
        </h3>

        <div class="quiz-options-grid" id="duel-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn" data-index="${i}">
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <button class="ios-btn-secondary" id="btn-cancel-duel" style="margin-top: 12px;">
        <span>Сдаться / Завершить дуэль</span>
      </button>
    `;

    document.getElementById('btn-cancel-duel')?.addEventListener('click', () => {
      this.localDuel = null;
      this.renderScreen();
    });

    const optionBtns = container.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        const opt = q.options[idx];
        const isCorrect = opt.isCorrect;

        optionBtns.forEach((b, i) => {
          b.disabled = true;
          if (q.options[i].isCorrect) b.classList.add('correct');
        });

        if (isCorrect) {
          btn.classList.add('correct');
          audio.playSuccess();
          if (isP1) duel.scores.p1 += 100;
          else duel.scores.p2 += 100;
        } else {
          btn.classList.add('wrong');
          audio.playError();
        }

        setTimeout(() => {
          // Переход хода
          if (duel.activePlayer === 1) {
            duel.activePlayer = 2;
          } else {
            duel.activePlayer = 1;
            duel.currentIndex++;
          }

          if (duel.currentIndex >= duel.questions.length) {
            this.finishLocalDuel();
          } else {
            this.renderScreen();
          }
        }, 1100);
      });
    });
  }

  finishLocalDuel() {
    const duel = this.localDuel;
    const p1Name = storage.profile.name || 'Полина';
    const p2Name = storage.profile.friendName || 'Подруга';
    const isP1Winner = duel.scores.p1 > duel.scores.p2;
    const isDraw = duel.scores.p1 === duel.scores.p2;

    storage.stats.duelsPlayed = (storage.stats.duelsPlayed || 0) + 1;
    if (isP1Winner) storage.stats.duelsWon = (storage.stats.duelsWon || 0) + 1;
    storage.saveStats();

    if (window.confetti) {
      window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
    audio.playVictory();

    const container = document.getElementById('screen-container');
    container.innerHTML = `
      <div class="ios-card" style="text-align: center; padding: 36px 20px;">
        <div style="font-size: 54px; margin-bottom: 12px;">🏆</div>
        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">
          ${isDraw ? 'Ничья! Вы обе эрудитки!' : `Победила ${isP1Winner ? p1Name : p2Name}!`}
        </h2>
        <div style="font-size: 22px; font-weight: 700; color: var(--ios-indigo); margin-bottom: 24px;">
          ${duel.scores.p1} : ${duel.scores.p2}
        </div>

        <button class="ios-btn-primary" id="btn-rematch-local">
          <span>Сыграть реванш</span>
        </button>
        <button class="ios-btn-secondary" id="btn-back-duel" style="margin-top: 10px;">
          <span>В меню дуэлей</span>
        </button>
      </div>
    `;

    document.getElementById('btn-rematch-local')?.addEventListener('click', () => {
      this.startLocalDuel();
    });
    document.getElementById('btn-back-duel')?.addEventListener('click', () => {
      this.localDuel = null;
      this.renderScreen();
    });
  }

  // --- Сетевая онлайн дуэль через WebRTC / PeerJS ---
  openOnlineDuelModal() {
    const modal = document.getElementById('modal-container');
    modal.innerHTML = `
      <div class="ios-modal-backdrop" id="modal-backdrop">
        <div class="ios-modal-sheet">
          <div class="modal-grabber"></div>
          <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 14px;">🌐 Онлайн-дуэль в реальном времени</h3>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">
            Создайте комнату и отправьте подруге 4-буквенный код, либо введите код её комнаты!
          </p>

          <div style="background: var(--bg-tertiary); padding: 18px; border-radius: var(--radius-md); margin-bottom: 20px; text-align: center;">
            <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">
              ВАШ ВАРИАНТ 1: СОЗДАТЬ НОВУЮ КОМНАТУ
            </div>
            <button class="ios-btn-primary" id="btn-host-room">
              <span>Создать комнату дуэли</span>
            </button>
          </div>

          <div style="background: var(--bg-tertiary); padding: 18px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">
              ВАРИАНТ 2: ВОЙТИ В КОМНАТУ ПОДРУГИ
            </div>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="input-room-code" class="ios-input" placeholder="Код комнаты (напр. ABCD)" maxlength="6" style="text-align: center; font-size: 18px; font-weight: 700; text-transform: uppercase;">
              <button class="ios-btn-primary" id="btn-join-room" style="width: auto; padding: 0 20px;">
                Войти
              </button>
            </div>
          </div>

          <button class="ios-btn-secondary" id="btn-close-modal" style="margin-top: 20px;">
            <span>Отмена</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-close-modal')?.addEventListener('click', () => modal.innerHTML = '');
    document.getElementById('modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-backdrop') modal.innerHTML = '';
    });

    document.getElementById('btn-host-room')?.addEventListener('click', () => {
      duelManager.createRoom();
    });

    document.getElementById('btn-join-room')?.addEventListener('click', () => {
      const code = document.getElementById('input-room-code')?.value.trim();
      if (code) {
        duelManager.joinRoom(code);
      }
    });
  }

  onDuelRoomCreated(data) {
    const modal = document.getElementById('modal-container');
    modal.innerHTML = `
      <div class="ios-modal-backdrop">
        <div class="ios-modal-sheet" style="text-align: center;">
          <div class="modal-grabber"></div>
          <div style="font-size: 40px; margin-bottom: 8px;">📡</div>
          <h3 style="font-size: 20px; font-weight: 700;">Комната создана!</h3>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">
            Попросите подругу ввести этот код на своём iPhone или iPad:
          </p>

          <div style="font-size: 44px; font-weight: 900; letter-spacing: 4px; color: var(--ios-blue); background: var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
            ${data.code}
          </div>

          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">
            ⏳ Ожидаем подключения подруги...
          </div>

          <button class="ios-btn-secondary" id="btn-cancel-room">
            <span>Отменить</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-cancel-room')?.addEventListener('click', () => {
      duelManager.disconnect();
      modal.innerHTML = '';
    });
  }

  onDuelConnected(data) {
    const modal = document.getElementById('modal-container');
    audio.playSuccess();
    modal.innerHTML = `
      <div class="ios-modal-backdrop">
        <div class="ios-modal-sheet" style="text-align: center;">
          <div class="modal-grabber"></div>
          <div style="font-size: 44px; margin-bottom: 8px;">🤝</div>
          <h3 style="font-size: 20px; font-weight: 700;">Подруга на связи!</h3>
          <p style="color: var(--text-secondary); font-size: 15px; margin: 12px 0 24px 0;">
            Игрок подключился. Всё готово к интеллектуальному баттлу!
          </p>

          ${duelManager.isHost ? `
            <button class="ios-btn-primary" id="btn-start-online-game">
              <span>🚀 Начать поединок!</span>
            </button>
          ` : `
            <div style="font-size: 14px; color: var(--text-secondary);">
              Ожидаем, пока ведущий запустит раунд...
            </div>
          `}
        </div>
      </div>
    `;

    document.getElementById('btn-start-online-game')?.addEventListener('click', () => {
      duelManager.startHostGame();
    });
  }

  onOnlineGameStarted(data) {
    document.getElementById('modal-container').innerHTML = '';
    this.renderScreen();
  }

  renderOnlineDuelPlay(container) {
    const q = duelManager.currentQuestions[duelManager.currentRound];
    if (!q) return;

    container.innerHTML = `
      <div class="duel-versus-bar">
        <div class="player-info">
          <div class="player-avatar">${storage.profile.avatar || '🌸'}</div>
          <div>
            <div class="player-name">${storage.profile.name || 'Вы'}</div>
            <div class="player-score">${duelManager.scores.my}</div>
          </div>
        </div>
        <div class="versus-badge">РАУНД ${duelManager.currentRound + 1}/5</div>
        <div class="player-info">
          <div>
            <div class="player-name" style="text-align: right;">${duelManager.opponentName}</div>
            <div class="player-score" style="text-align: right; color: var(--ios-pink);">${duelManager.scores.opponent}</div>
          </div>
          <div class="player-avatar">${duelManager.opponentAvatar || '💫'}</div>
        </div>
      </div>

      <div class="ios-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="card-badge">${q.badge}</span>
        </div>

        <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 6px;">${q.prompt}</p>
        <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); line-height: 1.3;">
          ${q.highlight}
        </h3>

        <div class="quiz-options-grid" id="online-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn" data-index="${i}">
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Быстрые эмодзи-реакции -->
      <div style="display: flex; justify-content: center; gap: 12px; margin-top: 14px;">
        ${['🔥', '👏', '😱', '💡', '🎉'].map(emoji => `
          <button class="card-sound-btn" data-emoji="${emoji}" style="font-size: 20px;">${emoji}</button>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('[data-emoji]').forEach(btn => {
      btn.addEventListener('click', () => {
        duelManager.sendReaction(btn.dataset.emoji);
        audio.playTap();
      });
    });

    const optionBtns = container.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        const opt = q.options[idx];
        const isCorrect = opt.isCorrect;

        optionBtns.forEach(b => b.disabled = true);
        if (isCorrect) {
          btn.classList.add('correct');
          audio.playSuccess();
        } else {
          btn.classList.add('wrong');
          audio.playError();
        }

        duelManager.submitAnswer(duelManager.currentRound, isCorrect, 100);

        setTimeout(() => {
          duelManager.currentRound++;
          if (duelManager.currentRound >= duelManager.currentQuestions.length) {
            this.finishOnlineDuel();
          } else {
            this.renderScreen();
          }
        }, 1200);
      });
    });
  }

  finishOnlineDuel() {
    const isWinner = duelManager.scores.my > duelManager.scores.opponent;
    if (isWinner && window.confetti) {
      window.confetti({ particleCount: 100, spread: 80 });
    }
    audio.playVictory();

    const container = document.getElementById('screen-container');
    container.innerHTML = `
      <div class="ios-card" style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 56px; margin-bottom: 12px;">🏆</div>
        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">
          ${isWinner ? 'Блестящая победа!' : 'Отличный поединок!'}
        </h2>
        <div style="font-size: 24px; font-weight: 800; color: var(--ios-indigo); margin-bottom: 24px;">
          ${duelManager.scores.my} : ${duelManager.scores.opponent}
        </div>
        <button class="ios-btn-primary" id="btn-close-online-duel">
          <span>Завершить</span>
        </button>
      </div>
    `;

    document.getElementById('btn-close-online-duel')?.addEventListener('click', () => {
      duelManager.disconnect();
      this.renderScreen();
    });
  }

  onOpponentAnswered(data) {
    audio.playTap();
  }

  onReactionReceived(data) {
    if (window.confetti) {
      window.confetti({ particleCount: 20, origin: { x: 0.8, y: 0.2 } });
    }
  }

  // ==========================================
  // 3. ЭКРАН ТРЕНАЖЁРА (СОЛО КВИЗЫ И ИГРЫ)
  // ==========================================
  renderTrainScreen(container) {
    if (this.activeQuiz) {
      this.renderActiveQuiz(container);
      return;
    }

    container.innerHTML = `
      <div class="ios-card">
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 6px;">Режимы тренировки</h2>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 18px;">
          Выберите формат, чтобы активировать слова в долговременной памяти:
        </p>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div class="ios-card" id="mode-blitz" style="cursor: pointer; margin-bottom: 0; background: var(--bg-tertiary);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 32px;">⚡</span>
              <div>
                <h4 style="font-size: 16px; font-weight: 700;">Блиц-микс (10 раундов)</h4>
                <div style="font-size: 13px; color: var(--text-secondary);">Случайный коктейль из всех типов вопросов</div>
              </div>
            </div>
          </div>

          <div class="ios-card" id="mode-synonyms" style="cursor: pointer; margin-bottom: 0; background: var(--bg-tertiary);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 32px;">🎭</span>
              <div>
                <h4 style="font-size: 16px; font-weight: 700;">Подбор синонимов</h4>
                <div style="font-size: 13px; color: var(--text-secondary);">Расширяем ассоциативный ряд к каждому слову</div>
              </div>
            </div>
          </div>

          <div class="ios-card" id="mode-imposter" style="cursor: pointer; margin-bottom: 0; background: var(--bg-tertiary);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 32px;">🕵️</span>
              <div>
                <h4 style="font-size: 16px; font-weight: 700;">Найди самозванца</h4>
                <div style="font-size: 13px; color: var(--text-secondary);">Определите лишнее слово среди синонимов</div>
              </div>
            </div>
          </div>

          <div class="ios-card" id="mode-fill" style="cursor: pointer; margin-bottom: 0; background: var(--bg-tertiary);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 32px;">📜</span>
              <div>
                <h4 style="font-size: 16px; font-weight: 700;">Цитаты классиков</h4>
                <div style="font-size: 13px; color: var(--text-secondary);">Вставьте нужное слово в литературный фрагмент</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('mode-blitz')?.addEventListener('click', () => this.startQuiz(null, 10));
    document.getElementById('mode-synonyms')?.addEventListener('click', () => this.startQuiz('find_synonym', 5));
    document.getElementById('mode-imposter')?.addEventListener('click', () => this.startQuiz('odd_one_out', 5));
    document.getElementById('mode-fill')?.addEventListener('click', () => this.startQuiz('fill_in_the_blank', 5));
  }

  startQuiz(type = null, count = 5) {
    audio.playTap();
    const questions = [];
    for (let i = 0; i < count; i++) {
      questions.push(quizEngine.generateQuestion(type));
    }
    this.activeQuiz = {
      questions,
      currentIndex: 0,
      score: 0,
      correctCount: 0
    };
    this.renderScreen();
  }

  renderActiveQuiz(container) {
    const quiz = this.activeQuiz;
    const q = quiz.questions[quiz.currentIndex];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="card-badge">Вопрос ${quiz.currentIndex + 1} из ${quiz.questions.length}</span>
        <span style="font-size: 14px; font-weight: 700; color: var(--ios-blue);">Счёт: ${quiz.score}</span>
      </div>

      <div class="ios-card">
        <div style="margin-bottom: 10px;">
          <span class="card-badge" style="background: rgba(88,86,214,0.12); color: var(--ios-indigo);">${q.badge}</span>
        </div>
        <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 6px;">${q.prompt}</p>
        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 18px; color: var(--text-primary); line-height: 1.35;">
          ${q.highlight}
        </h3>

        <div class="quiz-options-grid">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn" data-index="${i}">
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <button class="ios-btn-secondary" id="btn-quit-quiz" style="margin-top: 12px;">
        <span>Закончить тренировку</span>
      </button>
    `;

    document.getElementById('btn-quit-quiz')?.addEventListener('click', () => {
      this.activeQuiz = null;
      this.renderScreen();
    });

    const optionBtns = container.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        const opt = q.options[idx];

        optionBtns.forEach((b, i) => {
          b.disabled = true;
          if (q.options[i].isCorrect) b.classList.add('correct');
        });

        if (opt.isCorrect) {
          btn.classList.add('correct');
          audio.playSuccess();
          quiz.score += 100;
          quiz.correctCount++;
        } else {
          btn.classList.add('wrong');
          audio.playError();
        }

        setTimeout(() => {
          quiz.currentIndex++;
          if (quiz.currentIndex >= quiz.questions.length) {
            this.finishQuiz();
          } else {
            this.renderScreen();
          }
        }, 1100);
      });
    });
  }

  finishQuiz() {
    const quiz = this.activeQuiz;
    storage.stats.quizzesPlayed = (storage.stats.quizzesPlayed || 0) + 1;
    storage.saveStats();

    if (window.confetti && quiz.correctCount >= quiz.questions.length / 2) {
      window.confetti({ particleCount: 70, spread: 60 });
    }
    audio.playVictory();

    const container = document.getElementById('screen-container');
    container.innerHTML = `
      <div class="ios-card" style="text-align: center; padding: 36px 20px;">
        <div style="font-size: 52px; margin-bottom: 12px;">🎯</div>
        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">Тренировка завершена!</h2>
        <div style="font-size: 16px; color: var(--text-secondary); margin-bottom: 16px;">
          Правильных ответов: <strong>${quiz.correctCount} из ${quiz.questions.length}</strong>
        </div>
        <div style="font-size: 28px; font-weight: 900; color: var(--ios-blue); margin-bottom: 24px;">
          +${quiz.score} очков
        </div>

        <button class="ios-btn-primary" id="btn-again-quiz">
          <span>Сыграть ещё раз</span>
        </button>
        <button class="ios-btn-secondary" id="btn-back-train" style="margin-top: 10px;">
          <span>К выбору режимов</span>
        </button>
      </div>
    `;

    document.getElementById('btn-again-quiz')?.addEventListener('click', () => {
      this.startQuiz(null, quiz.questions.length);
    });
    document.getElementById('btn-back-train')?.addEventListener('click', () => {
      this.activeQuiz = null;
      this.renderScreen();
    });
  }

  // ==========================================
  // 4. ЭКРАН СЛОВАРЯ (БИБЛИОТЕКА И ДЕТАЛИ)
  // ==========================================
  renderDictionaryScreen(container) {
    const filteredWords = storage.words.filter(word => {
      const matchCat = this.activeCategory === 'all' || word.category === this.activeCategory;
      const matchSearch = !this.searchQuery || 
        word.word.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        word.definition.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <!-- Поиск в стиле iOS -->
      <div class="ios-input-group" style="margin-bottom: 12px;">
        <input type="search" id="dict-search" class="ios-input" placeholder="🔍 Поиск слова или значения..." value="${this.searchQuery}">
      </div>

      <!-- Фильтр по категориям -->
      <div class="category-pills-row">
        ${VOCABULARY_CATEGORIES.map(cat => `
          <button class="pill-btn ${this.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
            <span>${cat.icon}</span>
            <span>${cat.title}</span>
          </button>
        `).join('')}
      </div>

      <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 12px;">
        Найдено слов: ${filteredWords.length}
      </div>

      <!-- Список слов -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${filteredWords.map(word => {
          const prog = storage.getWordProgress(word.id);
          const statusIcons = { new: '🌱', learning: '📘', active: '⭐️', mastered: '🏆' };
          return `
            <div class="ios-card dict-word-item" data-word-id="${word.id}" style="cursor: pointer; margin-bottom: 0; padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <h3 style="font-size: 18px; font-weight: 700;">${word.accented || word.word}</h3>
                    <span style="font-size: 13px;">${statusIcons[prog.status] || '🌱'}</span>
                  </div>
                  <div style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">
                    ${word.partOfSpeech}
                  </div>
                </div>
                <button class="card-sound-btn btn-quick-speak" data-word="${word.word}" style="width: 32px; height: 32px; font-size: 14px;">
                  🔊
                </button>
              </div>
              <p style="font-size: 14px; color: var(--text-primary); margin-top: 8px; line-height: 1.4;">
                ${word.definition}
              </p>
            </div>
          `;
        }).join('')}
      </div>
    `;

    document.getElementById('dict-search')?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderScreen();
    });

    container.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.cat;
        audio.playTap();
        this.renderScreen();
      });
    });

    container.querySelectorAll('.btn-quick-speak').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.speak(btn.dataset.word);
      });
    });

    container.querySelectorAll('.dict-word-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.wordId;
        const w = storage.words.find(w => w.id === id);
        if (w) this.openWordDetailModal(w);
      });
    });
  }

  openWordDetailModal(word) {
    audio.playTap();
    const modal = document.getElementById('modal-container');
    const prog = storage.getWordProgress(word.id);

    modal.innerHTML = `
      <div class="ios-modal-backdrop" id="modal-backdrop">
        <div class="ios-modal-sheet">
          <div class="modal-grabber"></div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="card-badge">Уровень освоения: ${prog.box}/5</span>
            <button class="card-sound-btn" id="modal-speak-word" style="font-size: 18px;">🔊</button>
          </div>

          <h2 style="font-size: 32px; font-weight: 800; margin-bottom: 4px;">${word.accented || word.word}</h2>
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">${word.partOfSpeech}</div>

          <div style="font-size: 16px; line-height: 1.5; margin-bottom: 14px;">
            <strong>Толкование:</strong> ${word.definition}
          </div>

          ${word.deepMeaning ? `
            <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">
              💡 <strong>Тонкость:</strong> ${word.deepMeaning}
            </div>
          ` : ''}

          ${word.synonyms?.length ? `
            <div style="margin-bottom: 10px;">
              <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">Синонимы: </span>
              <span style="font-size: 14px;">${word.synonyms.join(', ')}</span>
            </div>
          ` : ''}

          ${word.antonyms?.length ? `
            <div style="margin-bottom: 12px;">
              <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">Антонимы: </span>
              <span style="font-size: 14px;">${word.antonyms.join(', ')}</span>
            </div>
          ` : ''}

          ${word.exampleQuote ? `
            <div class="quote-box">
              ${word.exampleQuote}
            </div>
          ` : ''}

          ${word.lifeExample ? `
            <div style="font-size: 14px; margin: 10px 0;">
              💬 <strong>В разговоре:</strong> ${word.lifeExample}
            </div>
          ` : ''}

          <div class="active-tip-box" style="margin-bottom: 20px;">
            🎯 <strong>Совет по использованию:</strong> ${word.activeTip}
          </div>

          <button class="ios-btn-primary" id="btn-close-word-modal">
            <span>Понятно</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('modal-speak-word')?.addEventListener('click', () => audio.speak(word.word));
    document.getElementById('btn-close-word-modal')?.addEventListener('click', () => modal.innerHTML = '');
    document.getElementById('modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-backdrop') modal.innerHTML = '';
    });
  }

  // ==========================================
  // 5. ЭКРАН ИСТОРИЙ & ЧЕЛЛЕНДЖЕЙ ДЛЯ ДВОИХ
  // ==========================================
  renderStoriesScreen(container) {
    const dailyChallenge = storyGenerator.getDailyChallenge();

    container.innerHTML = `
      <!-- Челлендж дня для подруг -->
      <div class="ios-card" style="border: 1px solid rgba(255, 149, 0, 0.3); background: linear-gradient(135deg, rgba(255, 149, 0, 0.08), rgba(255, 45, 85, 0.08));">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="card-badge" style="background: rgba(255, 149, 0, 0.15); color: var(--ios-orange);">
            🔥 Челлендж дня для двоих
          </span>
          <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">Сегодня</span>
        </div>

        <h3 style="font-size: 24px; font-weight: 800; margin: 8px 0 4px 0;">
          ${dailyChallenge.word.accented || dailyChallenge.word.word}
        </h3>
        <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">
          ${dailyChallenge.word.definition}
        </p>

        <div style="font-size: 14px; line-height: 1.45; margin-bottom: 14px;">
          ${dailyChallenge.description}
        </div>

        <div class="quote-box" style="margin-bottom: 16px;">
          ${dailyChallenge.example}
        </div>

        <button class="ios-btn-primary" id="btn-complete-challenge">
          <span>✨ Мы применили это слово сегодня!</span>
        </button>
      </div>

      <!-- Генератор литературных историй с новыми словами -->
      <div class="ios-card">
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 6px;">✍️ Генератор контекстных историй</h3>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">
          Создайте мини-зарисовку, в которой изученные слова оживают в естественной беседе.
        </p>

        <button class="ios-btn-secondary" id="btn-generate-story">
          <span>Сгенерировать новую историю</span>
        </button>

        <div id="story-result-box" style="margin-top: 18px;">
          <!-- Результат генерации -->
        </div>
      </div>
    `;

    document.getElementById('btn-complete-challenge')?.addEventListener('click', () => {
      if (window.confetti) window.confetti({ particleCount: 70, spread: 60 });
      audio.playVictory();
      storage.stats.streak = (storage.stats.streak || 1) + 1;
      storage.saveStats();
      this.updateHeaderStats();
      alert('Супер! Ваша языковая копилка пополнилась, а активный словарный запас окреп! 🔥');
    });

    document.getElementById('btn-generate-story')?.addEventListener('click', () => {
      audio.playTap();
      this.displayGeneratedStory();
    });

    // Показываем первую историю сразу
    this.displayGeneratedStory();
  }

  displayGeneratedStory() {
    const resultBox = document.getElementById('story-result-box');
    if (!resultBox) return;

    const story = storyGenerator.generateStory();
    resultBox.innerHTML = `
      <div style="background: var(--bg-tertiary); padding: 18px; border-radius: var(--radius-md); border-left: 4px solid var(--ios-indigo);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--ios-indigo);">
            Сцена: ${story.theme}
          </span>
          <span style="font-size: 12px; color: var(--text-secondary);">Слова: ${story.words.map(w => w.word).join(', ')}</span>
        </div>
        <div style="font-size: 15px; line-height: 1.6; white-space: pre-line; color: var(--text-primary); margin-bottom: 14px;">
          ${story.text.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--ios-blue); text-decoration: underline;">$1</strong>')}
        </div>
        <div class="active-tip-box">
          💡 ${story.challenge}
        </div>
      </div>
    `;
  }

  // ==========================================
  // МОДАЛЬНОЕ ОКНО: ДОБАВИТЬ СВОЁ СЛОВО
  // ==========================================
  openAddWordModal() {
    const modal = document.getElementById('modal-container');
    modal.innerHTML = `
      <div class="ios-modal-backdrop" id="modal-backdrop">
        <div class="ios-modal-sheet">
          <div class="modal-grabber"></div>
          <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 14px;">➕ Добавить слово в словарь</h3>

          <div class="ios-input-group">
            <label class="ios-label">Слово *</label>
            <input type="text" id="add-word" class="ios-input" placeholder="Например: Палимпсест">
          </div>

          <div class="ios-input-group">
            <label class="ios-label">Слово с ударением</label>
            <input type="text" id="add-accented" class="ios-input" placeholder="Например: Палимпсе́ст">
          </div>

          <div class="ios-input-group">
            <label class="ios-label">Толкование *</label>
            <textarea id="add-def" class="ios-textarea" rows="2" placeholder="Краткое и точное значение"></textarea>
          </div>

          <div class="ios-input-group">
            <label class="ios-label">Синонимы (через запятую)</label>
            <input type="text" id="add-synonyms" class="ios-input" placeholder="Наслоение, многослойность">
          </div>

          <div class="ios-input-group">
            <label class="ios-label">Пример из книги или жизни</label>
            <textarea id="add-example" class="ios-textarea" rows="2" placeholder="«Наш разговор напоминал...»"></textarea>
          </div>

          <button class="ios-btn-primary" id="btn-save-new-word" style="margin-top: 10px;">
            <span>Сохранить в коллекцию</span>
          </button>
          <button class="ios-btn-secondary" id="btn-cancel-add" style="margin-top: 8px;">
            <span>Отмена</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-cancel-add')?.addEventListener('click', () => modal.innerHTML = '');
    document.getElementById('modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-backdrop') modal.innerHTML = '';
    });

    document.getElementById('btn-save-new-word')?.addEventListener('click', () => {
      const word = document.getElementById('add-word')?.value.trim();
      const def = document.getElementById('add-def')?.value.trim();
      if (!word || !def) {
        alert('Пожалуйста, заполните слово и толкование!');
        return;
      }

      storage.addCustomWord({
        word,
        accented: document.getElementById('add-accented')?.value.trim() || word,
        definition: def,
        synonyms: document.getElementById('add-synonyms')?.value.trim(),
        lifeExample: document.getElementById('add-example')?.value.trim()
      });

      audio.playSuccess();
      modal.innerHTML = '';
      this.loadCardsQueue();
      this.renderScreen();
    });
  }

  // ==========================================
  // МОДАЛЬНОЕ ОКНО: НАСТРОЙКИ И ПРОФИЛИ
  // ==========================================
  openSettingsModal() {
    const modal = document.getElementById('modal-container');
    const p = storage.profile;

    modal.innerHTML = `
      <div class="ios-modal-backdrop" id="modal-backdrop">
        <div class="ios-modal-sheet">
          <div class="modal-grabber"></div>
          <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">⚙️ Настройки и профили</h3>

          <div class="ios-input-group">
            <label class="ios-label">Ваше имя и аватар</label>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="cfg-avatar" class="ios-input" value="${p.avatar || '🌸'}" style="width: 50px; text-align: center; font-size: 20px;">
              <input type="text" id="cfg-name" class="ios-input" value="${p.name || 'Полина'}" style="flex: 1;">
            </div>
          </div>

          <div class="ios-input-group">
            <label class="ios-label">Имя подруги и аватар</label>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="cfg-friend-avatar" class="ios-input" value="${p.friendAvatar || '💫'}" style="width: 50px; text-align: center; font-size: 20px;">
              <input type="text" id="cfg-friend-name" class="ios-input" value="${p.friendName || 'Подруга'}" style="flex: 1;">
            </div>
          </div>

          <div class="ios-input-group">
            <label class="ios-label">Тема оформления</label>
            <select id="cfg-theme" class="ios-input">
              <option value="auto" ${p.theme === 'auto' ? 'selected' : ''}>Как в системе (Авто)</option>
              <option value="light" ${p.theme === 'light' ? 'selected' : ''}>Светлая тема</option>
              <option value="dark" ${p.theme === 'dark' ? 'selected' : ''}>Тёмная тема (OLED)</option>
            </select>
          </div>

          <div style="margin-top: 14px; background: var(--bg-tertiary); padding: 12px 14px; border-radius: var(--radius-sm); font-size: 13px; color: var(--text-secondary); line-height: 1.4;">
            📱 <strong>Как установить на iPhone / iPad:</strong>
            <br>Откройте эту страницу в <strong>Safari</strong>, нажмите кнопку «Поделиться» (квадрат со стрелкой вверх) и выберите <strong>«На экран Домой»</strong>.
          </div>

          <button class="ios-btn-primary" id="btn-save-settings" style="margin-top: 16px;">
            <span>Сохранить</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-save-settings')?.addEventListener('click', () => {
      const updated = {
        name: document.getElementById('cfg-name')?.value.trim() || 'Полина',
        avatar: document.getElementById('cfg-avatar')?.value.trim() || '🌸',
        friendName: document.getElementById('cfg-friend-name')?.value.trim() || 'Подруга',
        friendAvatar: document.getElementById('cfg-friend-avatar')?.value.trim() || '💫',
        theme: document.getElementById('cfg-theme')?.value || 'auto'
      };

      storage.saveProfile(updated);
      this.applyTheme(updated.theme);
      audio.playSuccess();
      modal.innerHTML = '';
      this.renderScreen();
    });

    document.getElementById('modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-backdrop') modal.innerHTML = '';
    });
  }
}

// Запуск приложения при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
