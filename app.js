// =====================================================================
// «СловоВместе» (Lexicon Duo) — Автономный модуль приложения
// =====================================================================

// -------------------------------------------------------------
// 1. БАЗА ВЫРАЗИТЕЛЬНЫХ СЛОВ РОДНОГО ЯЗЫКА
// -------------------------------------------------------------
const VOCABULARY_CATEGORIES = [
  { id: 'all', title: 'Все слова', icon: '✨' },
  { id: 'gems', title: 'Литературные жемчужины', icon: '💎' },
  { id: 'psychology', title: 'Чувства и мышление', icon: '🧠' },
  { id: 'rhetoric', title: 'Риторика и спор', icon: '🎭' },
  { id: 'vivid_verbs', title: 'Выразительные действия', icon: '⚡' },
  { id: 'aesthetics', title: 'Эстетика и стиль', icon: '🎨' },
];

const INITIAL_VOCABULARY = [
  {
    id: 'ekivoki',
    word: 'Экиво́ки',
    accented: 'Экиво́ки',
    partOfSpeech: 'существительное, мн. ч.',
    category: 'gems',
    definition: 'Двусмысленные намеки, увёртки, иносказания в речи.',
    deepMeaning: 'В отличие от грубой лжи, экивоки — это изящная игра недосказанностей, когда говорящий не отвечает прямо, но даёт понять суть между строк.',
    synonyms: ['Иносказания', 'Увёртки', 'Обиняки', 'Намёки'],
    antonyms: ['Прямота', 'Откровенность', 'Чистосердечие'],
    exampleQuote: '«Говорите же прямо, без экивоков и виляний!» — Антон Чехов, «Дуэль».',
    lifeExample: '«Давай без экивоков: тебе действительно нравится этот проект или ты просто не хочешь меня огорчать?»',
    activeTip: 'Используйте вместо банального «не ходи вокруг да около». Звучит элегантно и призывает к честному диалогу.'
  },
  {
    id: 'flaner',
    word: 'Фланёр',
    accented: 'Фланёр',
    partOfSpeech: 'существительное, м. р.',
    category: 'gems',
    definition: 'Человек, праздно и созерцательно гуляющий по городским улицам без конкретной цели, наблюдая за жизнью.',
    deepMeaning: 'Понятие, воспетое Шарлем Бодлером и Вальтером Беньямином. Фланёр не просто бездельничает — он изучает дух города и людей.',
    synonyms: ['Созерцатель', 'Гуляка', 'Наблюдатель'],
    antonyms: ['Спешащий', 'Деловой человек', 'Трудоголик'],
    exampleQuote: '«Город принадлежит не тем, кто спешит в метро, а одинокому вечернему фланёру.»',
    lifeExample: '«В это воскресенье мы превратились в настоящих фланёров: бродили по старым переулкам и пили кофе на скамейках.»',
    activeTip: 'Замените «мы просто бесцельно шатались» на «мы фланировали по бульварам».'
  },
  {
    id: 'ambivalentnost',
    word: 'Амбивале́нтность',
    accented: 'Амбивале́нтность',
    partOfSpeech: 'существительное, ж. р.',
    category: 'psychology',
    definition: 'Двойственность отношения к чему-либо; одновременное сосуществование противоположных чувств (например, любви и неприязни).',
    deepMeaning: 'Точно описывает сложную палитру человеческих эмоций, когда нельзя однозначно сказать «да» или «нет».',
    synonyms: ['Двойственность', 'Противоречивость', 'Неоднозначность'],
    antonyms: ['Однозначность', 'Определенность', 'Цельность'],
    exampleQuote: '«Его отношение к славе отличалось глубокой амбивалентностью: он жаждал признания, но тяготился вниманием.»',
    lifeExample: '«Я испытываю амбивалентные чувства по поводу переезда: безумно рада новым возможностям, но щемит сердце от прощания с домом.»',
    activeTip: 'Идеальное слово, чтобы описать сложное решение, когда оба выбора имеют свои сильные стороны.'
  },
  {
    id: 'palimpsest',
    word: 'Палимпсе́ст',
    accented: 'Палимпсе́ст',
    partOfSpeech: 'существительное, м. р.',
    category: 'aesthetics',
    definition: 'Древняя рукопись, написанная поверх счищенного старого текста; метафорически — явление, в котором сквозь новое просвечивают слои прошлого.',
    deepMeaning: 'Прекрасная метафора для человеческой памяти, старых городов или отношений, в которых прошлый опыт никогда не исчезает бесследно.',
    synonyms: ['Многослойность', 'Наслоение смыслов'],
    antonyms: ['Чистый лист', 'Tabula rasa'],
    exampleQuote: '«Старый Рим — это гигантский палимпсест из камня, где барокко вырастает прямо из античных руин.»',
    lifeExample: '«Наш с ней диалог напоминал палимпсест: мы говорили о погоде, но за каждым словом читалась пятилетняя дружба.»',
    activeTip: 'Используйте, когда описываете город, старый интерьер или долгие отношения с богатой предысторией.'
  },
  {
    id: 'vitiystvovat',
    word: 'Вити́йствовать',
    accented: 'Вити́йствовать',
    partOfSpeech: 'глагол, несов. в.',
    category: 'vivid_verbs',
    definition: 'Говорить или писать излишне витиевато, красноречиво, пышно и напыщенно.',
    deepMeaning: 'Часто употребляется с лёгкой иронией по отношению к тем, кто увлекается внешними украшательствами речи в ущерб ясности мысли.',
    synonyms: ['Краснобайствовать', 'Фразеёрствовать', 'Мудрствовать'],
    antonyms: ['Говорить по делу', 'Лаконично выражаться'],
    exampleQuote: '«Хватит витийствовать, скажи наконец суть дела в двух предложениях!»',
    lifeExample: '«Он так долго витийствовал на совещании, что к концу презентации все забыли начальный вопрос.»',
    activeTip: 'Отличный способ с улыбкой одёрнуть собеседника, любящего витиеватые монологи.'
  },
  {
    id: 'resilience',
    word: 'Резилье́нтность',
    accented: 'Резилье́нтность',
    partOfSpeech: 'существительное, ж. р.',
    category: 'psychology',
    definition: 'Способность психики и личности восстанавливаться после кризисов, травм и стресса, сохраняя внутреннюю устойчивость.',
    deepMeaning: 'В отличие от «неуязвимости», резильентность признает, что человек может согнуться под ударом судьбы, но распрямляется обратно, как молодая ива.',
    synonyms: ['Жизнестойкость', 'Упругость духа', 'Стойкость'],
    antonyms: ['Хрупкость', 'Уязвимость', 'Надломленность'],
    exampleQuote: '«Резильентность проявляется не в отсутствии трудностей, а в умении подниматься на ноги после каждого падения.»',
    lifeExample: '«Восхищаюсь её резильентностью: после провала первого стартапа она с ещё большим энтузиазмом взялась за новый проект.»',
    activeTip: 'Гораздо глубже и точнее, чем просто «сильный характер» или «стрессоустойчивость».'
  },
  {
    id: 'sofizm',
    word: 'Софи́зм',
    accented: 'Софи́зм',
    partOfSpeech: 'существительное, м. р.',
    category: 'rhetoric',
    definition: 'Умозаключение или довод, формально кажущийся правильным, но содержащий скрытую логическую ошибку для обмана или победы в споре.',
    deepMeaning: 'Идёт от древнегреческих софистов, которые учили искусству побеждать в спорах любой ценой, даже подменяя понятия.',
    synonyms: ['Логическая уловка', 'Казуистика', 'Крючкотворство'],
    antonyms: ['Строгое доказательство', 'Безупречная логика'],
    exampleQuote: '«Все кошки смертны. Сократ смертен. Значит, Сократ — кошка. Классический пример наивного софизма.»',
    lifeExample: '«Твой аргумент звучит красиво, но это чистый софизм: ты смешал причину со следствием.»',
    activeTip: 'Незаменимо в спорах, когда собеседник пытается запутать вас красивой, но ложной логикой.'
  },
  {
    id: 'nivelirovat',
    word: 'Нивели́ровать',
    accented: 'Нивели́ровать',
    partOfSpeech: 'глагол, сов. и несов. в.',
    category: 'vivid_verbs',
    definition: 'Сглаживать различия, уничтожать индивидуальные особенности; сводить на нет воздействие чего-либо.',
    deepMeaning: 'Изначально геодезический термин (определение высот точек), ставший метафорой усреднения или компенсации эффекта.',
    synonyms: ['Сглаживать', 'Усреднять', 'Компенсировать', 'Обезличивать'],
    antonyms: ['Усиливать контраст', 'Выделять', 'Дифференцировать'],
    exampleQuote: '«Массовая культура имеет свойство нивелировать уникальные региональные традиции.»',
    lifeExample: '«Его дружелюбная улыбка и юмор помогли полностью нивелировать неловкость первой встречи.»',
    activeTip: 'Используйте «нивелировать разницу / риск / неловкость» вместо «убрать» или «уменьшить».'
  },
  {
    id: 'katarsis',
    word: 'Ката́рсис',
    accented: 'Ката́рсис',
    partOfSpeech: 'существительное, м. р.',
    category: 'psychology',
    definition: 'Состояние душевного очищения, высвобождения и просветления, переживаемое через сопереживание или сильное потрясение.',
    deepMeaning: 'В античной трагедии Аристотель описывал катарсис как очищение души страхом и состраданием.',
    synonyms: ['Очищение', 'Просветление', 'Освобождение духа'],
    antonyms: ['Опустошение', 'Ожесточение', 'Подавленность'],
    exampleQuote: '«Финальный аккорд симфонии вызвал в зале настоящий катарсис: публика сидела в звенящей тишине.»',
    lifeExample: '«Этот откровенный разговор стал для нас катарсисом: всё напряжение последних месяцев растворилось в слезах и объятиях.»',
    activeTip: 'Используйте, когда фильм, книга или глубокий разговор принесли чувство освобождения и лёгкости.'
  },
  {
    id: 'sibarit',
    word: 'Сибари́т',
    accented: 'Сибари́т',
    partOfSpeech: 'существительное, м. р.',
    category: 'gems',
    definition: 'Человек, избалованный роскошью, живущий в праздности и отдающийся утонченным наслаждениям.',
    deepMeaning: 'По названию древнегреческой колонии Сибарис, жители которой славились фантастическим стремлением к комфорту и неге.',
    synonyms: ['Гедонист', 'Неженка', 'Эпикуреец', 'Баловень судьбы'],
    antonyms: ['Аскет', 'Спартанец', 'Подвижник'],
    exampleQuote: '«Кот лежал на бархатной подушке с видом истинного сибарита, благосклонно ждущего ужина.»',
    lifeExample: '«В эти выходные объявляю себя сибаритом: буду только пить кофе в постели, читать новеллы и есть круассаны.»',
    activeTip: 'Самоироничный и красивый способ сказать «хочу полениться в уюте и комфорте».'
  },
  {
    id: 'eskapizm',
    word: 'Эскапи́зм',
    accented: 'Эскапи́зм',
    partOfSpeech: 'существительное, м. р.',
    category: 'psychology',
    definition: 'Стремление уйти от повседневной реальности, проблем и рутины в мир иллюзий, фантазий, книг или виртуальной жизни.',
    deepMeaning: 'От англ. escape (бегство). Эскапизм может быть как формой отдыха и творчества, так и психологической защитой.',
    synonyms: ['Бегство от реальности', 'Уход в себя', 'Грезовитость'],
    antonyms: ['Реализм', 'Прагматизм', 'Приземленность'],
    exampleQuote: '«Чтение толстых романов фэнтези осенью — мой любимый и самый спасительный эскапизм.»',
    lifeExample: '«Иногда здоровый эскапизм просто необходим, чтобы перегрузить уставший мозг и набраться сил.»',
    activeTip: 'Вместо «я залипаю в сериалы, чтобы не думать о делах» скажите «позволяю себе немного терапевтического эскапизма».'
  },
  {
    id: 'obskurantizm',
    word: 'Обскуранти́зм',
    accented: 'Обскуранти́зм',
    partOfSpeech: 'существительное, м. р.',
    category: 'rhetoric',
    definition: 'Враждебное отношение к просвещению, науке, культуре и общественному прогрессу; мракобесие.',
    deepMeaning: 'От латинского obscurans — «затемняющий». Сознательное стремление удержать людей в неведении.',
    synonyms: ['Мракобесие', 'Ретроградство', 'Косность'],
    antonyms: ['Просвещение', 'Прогрессивизм', 'Свободомыслие'],
    exampleQuote: '«Отрицать очевидные научные достижения медицины в XXI веке — это опасный обскурантизм.»',
    lifeExample: '«Дискуссия скатилась в дремучий обскурантизм, когда оппоненты стали апеллировать к суевериям.»',
    activeTip: 'Точное интеллигентное слово для описания нелепого отрицания науки или культурного прогресса.'
  },
  {
    id: 'sinesteziya',
    word: 'Синестези́я',
    accented: 'Синестези́я',
    partOfSpeech: 'существительное, ж. р.',
    category: 'aesthetics',
    definition: 'Нейрологический или поэтический феномен, при котором раздражение одного органа чувств вызывает ощущение в другом (например, «цветной слух»).',
    deepMeaning: 'У Владимира Набокова была врожденная синестезия: каждая буква алфавита имела для него собственный точный цвет и фактуру.',
    synonyms: ['Соощущение', 'Смешение чувств'],
    antonyms: ['Изолированное восприятие'],
    exampleQuote: '«Набоков видел букву "К" цвета черники, а букву "М" — цвета спелой малины: чистая поэтическая синестезия.»',
    lifeExample: '«У этого саксофонного соло густой бархатный цвет горячего шоколада — прямо синестезия наяву.»',
    activeTip: 'Прекрасно обогащает описания: «терпкий зимний свет», «хрустальный звонкий смех».'
  },
  {
    id: 'aberaciya',
    word: 'Аберра́ция',
    accented: 'Аберра́ция',
    partOfSpeech: 'существительное, ж. р.',
    category: 'psychology',
    definition: 'Отклонение от нормы, заблуждение, искажение восприятия реальности под воздействием предвзятости или эмоций.',
    deepMeaning: 'Часто говорят «аберрация памяти» — когда события прошлого вспоминаются сквозь розовые или искаженные очки.',
    synonyms: ['Искажение', 'Погрешность', 'Иллюзия'],
    antonyms: ['Точность', 'Адекватность', 'Объективность'],
    exampleQuote: '«Идеализация детства — обычная аберрация человеческой памяти, стирающая тревоги и оставляющая лишь солнце.»',
    lifeExample: '«Мне казалось, что проект продвигается быстро, но это была оптическая аберрация из-за суеты вокруг мелких задач.»',
    activeTip: 'Используйте словосочетание «аберрация взгляда / памяти», когда хотите подчеркнуть субъективное искажение фактов.'
  },
  {
    id: 'imponirovat',
    word: 'Импони́ровать',
    accented: 'Импони́ровать',
    partOfSpeech: 'глагол, несов. в.',
    category: 'vivid_verbs',
    definition: 'Производить положительное впечатление, внушать уважение, нравиться своими качествами.',
    deepMeaning: 'Употребляется с дательным падежом: «мне импонирует его честность».',
    synonyms: ['Нравиться', 'Внушать симпатию', 'Подкупать'],
    antonyms: ['Отталкивать', 'Вызывать антипатию'],
    exampleQuote: '«Мне всегда импонировали люди, способные сохранять хладнокровие в момент всеобщей паники.»',
    lifeExample: '«Мне очень импонирует твоя привычка доводить начатое до конца без лишней драмы.»',
    activeTip: 'Звучит вежливо, зрело и уважительно в комплиментах и деловой переписке.'
  },
  {
    id: 'iskromiotniy',
    word: 'Искромётный',
    accented: 'Искромётный',
    partOfSpeech: 'прилагательное, м. р.',
    category: 'gems',
    definition: 'Яркий, блестящий, брызжущий остроумием, живой и заразительный.',
    deepMeaning: 'Создает осязаемый визуальный образ сыплющихся искр — метафора ума, вспыхивающего мгновенными точными шутками.',
    synonyms: ['Остроумный', 'Блестящий', 'Жгучий'],
    antonyms: ['Прессный', 'Унылый', 'Банальный'],
    exampleQuote: '«Его искромётный юмор согревал даже самые пасмурные осенние вечера в лаборатории.»',
    lifeExample: '«Спасибо за этот вечер! Твой искромётный рассказ о поездке рассмешил всех до слез.»',
    activeTip: 'Замените примитивное «классная шутка» на «искромётная реплика».'
  }
];

// -------------------------------------------------------------
// 2. ХРАНИЛИЩЕ И ИНТЕРВАЛЬНОЕ ПОВТОРЕНИЕ (SPACED REPETITION)
// -------------------------------------------------------------
const STORAGE_KEYS = {
  WORDS: 'slovo_words_v2',
  PROGRESS: 'slovo_progress_v2',
  STATS: 'slovo_stats_v2',
  PROFILE: 'slovo_profile_v2',
};

const INTERVALS_HOURS = [0, 4, 24, 72, 168, 720];

class StorageService {
  constructor() {
    this.words = this.loadWords();
    this.progress = this.loadProgress();
    this.stats = this.loadStats();
    this.profile = this.loadProfile();
    this.checkStreak();
  }

  loadWords() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WORDS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(INITIAL_VOCABULARY));
        return [...INITIAL_VOCABULARY];
      }
      const parsed = JSON.parse(stored);
      const existingIds = new Set(parsed.map(w => w.id));
      const merged = [...parsed];
      for (const w of INITIAL_VOCABULARY) {
        if (!existingIds.has(w.id)) merged.push(w);
      }
      return merged;
    } catch (e) {
      return [...INITIAL_VOCABULARY];
    }
  }

  saveWords() {
    try {
      localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(this.words));
    } catch (e) {}
  }

  addCustomWord(wordData) {
    const id = 'custom_' + Date.now();
    const newWord = {
      id,
      word: wordData.word.trim(),
      accented: wordData.accented?.trim() || wordData.word.trim(),
      partOfSpeech: wordData.partOfSpeech || 'существительное',
      category: wordData.category || 'gems',
      definition: wordData.definition.trim(),
      deepMeaning: wordData.deepMeaning?.trim() || '',
      synonyms: Array.isArray(wordData.synonyms) ? wordData.synonyms : (wordData.synonyms || '').split(',').map(s => s.trim()).filter(Boolean),
      antonyms: Array.isArray(wordData.antonyms) ? wordData.antonyms : (wordData.antonyms || '').split(',').map(s => s.trim()).filter(Boolean),
      exampleQuote: wordData.exampleQuote?.trim() || '',
      lifeExample: wordData.lifeExample?.trim() || '',
      activeTip: wordData.activeTip?.trim() || 'Постарайтесь использовать это слово в разговоре сегодня!',
      isCustom: true
    };
    this.words.unshift(newWord);
    this.saveWords();
    return newWord;
  }

  loadProgress() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(this.progress));
    } catch (e) {}
  }

  getWordProgress(wordId) {
    return this.progress[wordId] || {
      status: 'new',
      box: 0,
      nextReviewDate: 0,
      reviewCount: 0
    };
  }

  rateWord(wordId, quality) {
    const item = this.getWordProgress(wordId);
    item.reviewCount = (item.reviewCount || 0) + 1;

    if (quality >= 3) {
      item.box = Math.min(5, (item.box || 0) + 1);
      if (item.box >= 4) item.status = 'mastered';
      else if (item.box >= 2) item.status = 'active';
      else item.status = 'learning';
    } else {
      item.box = 1;
      item.status = 'learning';
    }

    const hours = INTERVALS_HOURS[item.box] || 4;
    item.nextReviewDate = Date.now() + hours * 3600 * 1000;

    this.progress[wordId] = item;
    this.saveProgress();

    this.stats.totalReviews = (this.stats.totalReviews || 0) + 1;
    this.saveStats();
    return item;
  }

  getWordsForReview() {
    const now = Date.now();
    return this.words.filter(word => {
      const p = this.getWordProgress(word.id);
      if (p.status === 'new') return true;
      return p.nextReviewDate <= now;
    });
  }

  loadStats() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      return stored ? JSON.parse(stored) : {
        streak: 1,
        bestStreak: 1,
        lastActiveDate: new Date().toDateString(),
        totalReviews: 0,
        quizzesPlayed: 0,
        duelsPlayed: 0,
        duelsWon: 0,
      };
    } catch (e) {
      return { streak: 1, lastActiveDate: new Date().toDateString() };
    }
  }

  saveStats() {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(this.stats));
    } catch (e) {}
  }

  checkStreak() {
    const today = new Date().toDateString();
    if (this.stats.lastActiveDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (this.stats.lastActiveDate === yesterday) {
      this.stats.streak = (this.stats.streak || 0) + 1;
    } else {
      this.stats.streak = 1;
    }
    this.stats.lastActiveDate = today;
    this.saveStats();
  }

  loadProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return stored ? JSON.parse(stored) : {
        name: 'Полина',
        friendName: 'Подруга',
        avatar: '🌸',
        friendAvatar: '💫',
        theme: 'auto'
      };
    } catch (e) {
      return { name: 'Полина', friendName: 'Подруга', avatar: '🌸', friendAvatar: '💫', theme: 'auto' };
    }
  }

  saveProfile(profile) {
    this.profile = { ...this.profile, ...profile };
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(this.profile));
    } catch (e) {}
  }
}

const storage = new StorageService();

// -------------------------------------------------------------
// 3. АУДИО И ОЗВУЧИВАНИЕ (WEB AUDIO API & SPEECH SYNTHESIS)
// -------------------------------------------------------------
class AudioService {
  constructor() {
    this.ctx = null;
  }

  initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTap() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playSuccess() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.35);
      });
    } catch (e) {}
  }

  playError() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  playFlip() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playVictory() {
    this.initContext();
    if (!this.ctx) return;
    try {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.12 + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.12);
        osc.stop(this.ctx.currentTime + i * 0.12 + 0.5);
      });
    } catch (e) {}
  }

  speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[\u0300-\u036f]/g, '').replace('́', '');
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = 'ru-RU';
      utter.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const ruVoice = voices.find(v => v.lang.startsWith('ru'));
      if (ruVoice) utter.voice = ruVoice;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  vibrate(ms = 20) {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(ms); } catch (e) {}
    }
  }
}

const audio = new AudioService();

// -------------------------------------------------------------
// 4. ДВИЖОК КВИЗОВ И ТРЕНАЖЁРОВ
// -------------------------------------------------------------
class QuizEngine {
  constructor() {
    this.words = storage.words;
  }

  refresh() {
    this.words = storage.words;
  }

  generateQuestion(forcedType = null) {
    this.refresh();
    const types = ['word_to_definition', 'definition_to_word', 'find_synonym', 'odd_one_out', 'fill_in_the_blank'];
    const chosenType = forcedType || types[Math.floor(Math.random() * types.length)];

    switch (chosenType) {
      case 'word_to_definition':
        return this.createWordToDefQuestion();
      case 'definition_to_word':
        return this.createDefToWordQuestion();
      case 'find_synonym':
        return this.createSynonymQuestion();
      case 'odd_one_out':
        return this.createOddOneOutQuestion();
      case 'fill_in_the_blank':
        return this.createFillBlankQuestion();
      default:
        return this.createWordToDefQuestion();
    }
  }

  generateDuelSet(count = 5) {
    this.refresh();
    const questions = [];
    const usedWordIds = new Set();
    for (let i = 0; i < count; i++) {
      let q = this.generateQuestion();
      let attempts = 0;
      while (usedWordIds.has(q.targetWordId) && attempts < 10) {
        q = this.generateQuestion();
        attempts++;
      }
      usedWordIds.add(q.targetWordId);
      questions.push({ ...q, roundIndex: i + 1, totalRounds: count });
    }
    return questions;
  }

  createWordToDefQuestion() {
    const target = this.getRandomWord();
    const distractors = this.getRandomWords(3, target.id);
    const options = [
      { text: target.definition, isCorrect: true },
      ...distractors.map(d => ({ text: d.definition, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    return {
      badge: 'Толкование',
      prompt: `Что означает слово?`,
      highlight: target.word,
      options,
      targetWordId: target.id
    };
  }

  createDefToWordQuestion() {
    const target = this.getRandomWord();
    const distractors = this.getRandomWords(3, target.id);
    const options = [
      { text: target.word, isCorrect: true },
      ...distractors.map(d => ({ text: d.word, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    return {
      badge: 'Подбор слова',
      prompt: `Какое выразительное слово подходит к определению?`,
      highlight: `«${target.definition}»`,
      options,
      targetWordId: target.id
    };
  }

  createSynonymQuestion() {
    const pool = this.words.filter(w => w.synonyms && w.synonyms.length > 0);
    const target = pool[Math.floor(Math.random() * pool.length)] || this.getRandomWord();
    const correct = target.synonyms[Math.floor(Math.random() * target.synonyms.length)];
    const distractors = this.getRandomWords(3, target.id).map(w => w.word);

    const options = [
      { text: correct, isCorrect: true },
      ...distractors.map(text => ({ text, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    return {
      badge: 'Синонимы',
      prompt: `Подберите ближайший синоним к слову:`,
      highlight: target.word,
      options,
      targetWordId: target.id
    };
  }

  createOddOneOutQuestion() {
    const candidates = this.words.filter(w => w.synonyms && w.synonyms.length >= 3);
    const target = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : this.words[0];
    const threeSynonyms = [...target.synonyms].sort(() => Math.random() - 0.5).slice(0, 3);
    const imposter = this.getRandomWords(1, target.id)[0].word;

    const options = [
      { text: imposter, isCorrect: true },
      ...threeSynonyms.map(s => ({ text: s, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    return {
      badge: 'Найди самозванца',
      prompt: `Какое слово лишнее и НЕ является синонимом?`,
      highlight: `Синонимы к контексту «${target.word}»`,
      options,
      targetWordId: target.id
    };
  }

  createFillBlankQuestion() {
    const candidates = this.words.filter(w => w.exampleQuote || w.lifeExample);
    const target = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : this.getRandomWord();
    const raw = target.exampleQuote || target.lifeExample;
    const regex = new RegExp(target.word.substring(0, Math.max(3, target.word.length - 2)), 'i');
    const blank = raw.replace(regex, '«________»');

    const distractors = this.getRandomWords(3, target.id);
    const options = [
      { text: target.word, isCorrect: true },
      ...distractors.map(d => ({ text: d.word, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    return {
      badge: 'Слово в контексте',
      prompt: `Какое слово пропущено в предложении?`,
      highlight: blank,
      options,
      targetWordId: target.id
    };
  }

  getRandomWord(excludeId = null) {
    const pool = excludeId ? this.words.filter(w => w.id !== excludeId) : this.words;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  getRandomWords(count, excludeId = null) {
    const pool = excludeId ? this.words.filter(w => w.id !== excludeId) : [...this.words];
    return pool.sort(() => Math.random() - 0.5).slice(0, count);
  }
}

const quizEngine = new QuizEngine();

// -------------------------------------------------------------
// 5. ИСТОРИИ И ЧЕЛЛЕНДЖ ДНЯ
// -------------------------------------------------------------
const STORY_SCENARIOS = [
  {
    theme: 'Уютная кофейня осенним вечером',
    template: (w1, w2, w3) => `
      Дождь монотонно стучал по стеклу маленькой кофейни на Патриарших. За столиком сидели двое давних друзей.
      
      — Знаешь, — задумчиво произнесла она, отставляя чашку кофе, — в последнее время я замечаю, как часто люди используют **${w1.word}**, словно боятся искренности. Ведь ${w1.definition.toLowerCase()}
      
      Её собеседник улыбнулся:
      — Пожалуй. Но это своего рода душевная **${w2.word}** — то есть ${w2.definition.toLowerCase()} Без этого в суете мегаполиса сложно сохранить баланс.
      
      — Согласна, — тихо добавила она. — Главное — не пытаться **${w3.word}** уникальность момента (${w3.definition.toLowerCase()}). Давай просто насладимся этим вечером.
    `
  },
  {
    theme: 'Спор в книжном клубе',
    template: (w1, w2, w3) => `
      Дискуссия вокруг нового романа накалилась до предела. Ведущий встречи поднял руку, призывая к тишине.
      
      — Друзья, мне очень **${w1.word}** ваша страсть к литературе! Но взгляните на структуру текста. Это настоящий **${w2.word}**: сквозь современный ироничный сюжет просвечивают вечные классические темы (${w2.definition.toLowerCase()}).
      
      — Но разве автор не использует **${w3.word}**? — возразила девушка из первого ряда. — В его словах чувствуется ${w3.definition.toLowerCase()}
      
      Все поняли, что этот спор лишь обнажил подлинную глубину книги.
    `
  }
];

class StoryGenerator {
  generateStory(selectedWords = null) {
    let words = selectedWords;
    if (!words || words.length < 2) {
      words = [...storage.words].sort(() => Math.random() - 0.5).slice(0, 3);
    }
    const w1 = words[0];
    const w2 = words[1] || words[0];
    const w3 = words[2] || words[0];
    const scenario = STORY_SCENARIOS[Math.floor(Math.random() * STORY_SCENARIOS.length)];

    return {
      theme: scenario.theme,
      words: [w1, w2, w3],
      text: scenario.template(w1, w2, w3).trim(),
      challenge: `Попробуйте сегодня за чашкой чая или в переписке употребить слово «${w1.word}»!`
    };
  }

  getDailyChallenge() {
    const today = new Date().toDateString();
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const word = storage.words[hash % storage.words.length];
    return {
      word,
      description: `Употребите слово «${word.word}» в сообщении друг другу или в разговоре так, чтобы это звучало максимально естественно и остроумно!`,
      example: word.lifeExample || word.exampleQuote
    };
  }
}

const storyGenerator = new StoryGenerator();

// -------------------------------------------------------------
// 6. СЕТЕВЫЕ ДУЭЛИ В РЕАЛЬНОМ ВРЕМЕНИ (WEBRTC PEERJS)
// -------------------------------------------------------------
class DuelManager {
  constructor() {
    this.peer = null;
    this.conn = null;
    this.isHost = false;
    this.roomCode = null;
    this.callbacks = {};
    this.currentQuestions = [];
    this.currentRound = 0;
    this.scores = { my: 0, opponent: 0 };
    this.status = 'disconnected';
    this.opponentName = 'Подруга';
  }

  on(event, callback) { this.callbacks[event] = callback; }
  emit(event, data) { if (this.callbacks[event]) this.callbacks[event](data); }

  generateRoomCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  createRoom() {
    const code = this.generateRoomCode();
    this.roomCode = code;
    this.isHost = true;
    this.status = 'connecting';
    this.emit('status', { status: 'connecting', message: `Создаём комнату ${code}...` });

    try {
      if (window.Peer) {
        this.peer = new window.Peer(`slovo-duo-${code.toLowerCase()}`, {
          debug: 1,
          config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
        });
        this.peer.on('open', () => {
          this.status = 'waiting';
          this.emit('room_created', { code });
        });
        this.peer.on('connection', (conn) => {
          this.conn = conn;
          this.setupConnection();
        });
        this.peer.on('error', () => {
          this.createRoom();
        });
      } else {
        this.emit('room_created', { code });
      }
    } catch (e) {
      this.emit('error', { message: 'Ошибка сети. Можно сыграть на одном устройстве!' });
    }
  }

  joinRoom(code) {
    this.roomCode = code.toUpperCase().trim();
    this.isHost = false;
    this.status = 'connecting';
    this.emit('status', { status: 'connecting', message: `Подключаемся к ${this.roomCode}...` });

    try {
      if (window.Peer) {
        this.peer = new window.Peer(`slovo-duo-guest-${Date.now().toString(36)}`, {
          debug: 1,
          config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
        });
        this.peer.on('open', () => {
          this.conn = this.peer.connect(`slovo-duo-${this.roomCode.toLowerCase()}`, { reliable: true });
          this.setupConnection();
        });
        this.peer.on('error', () => {
          this.emit('error', { message: 'Не удалось найти комнату. Проверьте код.' });
        });
      }
    } catch (e) {
      this.emit('error', { message: 'Ошибка подключения.' });
    }
  }

  setupConnection() {
    if (!this.conn) return;
    this.conn.on('open', () => {
      this.status = 'connected';
      this.sendData({
        type: 'handshake',
        name: storage.profile.name || 'Игрок',
        avatar: storage.profile.avatar || '🌸'
      });
      this.emit('connected', { opponentName: this.opponentName });
    });

    this.conn.on('data', (data) => {
      if (data.type === 'handshake') {
        this.opponentName = data.name;
        this.opponentAvatar = data.avatar;
        this.emit('player_joined', { name: data.name, avatar: data.avatar });
      } else if (data.type === 'start_game') {
        this.currentQuestions = data.questions;
        this.currentRound = 0;
        this.scores = { my: 0, opponent: 0 };
        this.status = 'in_game';
        this.emit('game_started', { questions: this.currentQuestions });
      } else if (data.type === 'round_answer') {
        this.scores.opponent += data.points;
        this.emit('opponent_answered', { points: data.points });
      } else if (data.type === 'reaction') {
        this.emit('reaction_received', { emoji: data.emoji });
      }
    });

    this.conn.on('close', () => {
      this.status = 'disconnected';
      this.emit('disconnected');
    });
  }

  sendData(payload) {
    if (this.conn && this.conn.open) this.conn.send(payload);
  }

  startHostGame() {
    if (!this.isHost) return;
    const questions = quizEngine.generateDuelSet(5);
    this.currentQuestions = questions;
    this.currentRound = 0;
    this.scores = { my: 0, opponent: 0 };
    this.status = 'in_game';
    this.sendData({ type: 'start_game', questions });
    this.emit('game_started', { questions });
  }

  submitAnswer(roundIndex, isCorrect, points) {
    if (isCorrect) this.scores.my += points;
    this.sendData({ type: 'round_answer', roundIndex, isCorrect, points: isCorrect ? points : 0 });
    return { myScore: this.scores.my, opponentScore: this.scores.opponent };
  }

  sendReaction(emoji) {
    this.sendData({ type: 'reaction', emoji });
  }

  disconnect() {
    if (this.conn) this.conn.close();
    if (this.peer) this.peer.destroy();
    this.status = 'disconnected';
    this.conn = null;
    this.peer = null;
  }
}

const duelManager = new DuelManager();

// -------------------------------------------------------------
// 7. ГЛАВНЫЙ КОНТРОЛЛЕР ИНТЕРФЕЙСА (UI CONTROLLER)
// -------------------------------------------------------------
class AppController {
  constructor() {
    this.currentTab = 'cards';
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.cardQueue = [];
    this.currentCardIndex = 0;
    this.isCardFlipped = false;
    this.activeQuiz = null;
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
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
  }

  updateHeaderStats() {
    const streakEl = document.getElementById('streak-count');
    if (streakEl) streakEl.textContent = storage.stats.streak || 1;
  }

  setupEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab && tab !== this.currentTab) {
          audio.playTap();
          this.switchTab(tab);
        }
      });
    });

    document.getElementById('btn-open-add')?.addEventListener('click', () => {
      audio.playTap();
      this.openAddWordModal();
    });

    document.getElementById('btn-open-settings')?.addEventListener('click', () => {
      audio.playTap();
      this.openSettingsModal();
    });

    duelManager.on('room_created', (data) => this.onDuelRoomCreated(data));
    duelManager.on('connected', (data) => this.onDuelConnected(data));
    duelManager.on('game_started', () => this.onOnlineGameStarted());
    duelManager.on('opponent_answered', () => audio.playTap());
    duelManager.on('reaction_received', () => {
      if (window.confetti) window.confetti({ particleCount: 20, origin: { x: 0.8, y: 0.2 } });
    });
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
      case 'cards': return this.renderCardsScreen(container);
      case 'duel': return this.renderDuelScreen(container);
      case 'train': return this.renderTrainScreen(container);
      case 'dictionary': return this.renderDictionaryScreen(container);
      case 'stories': return this.renderStoriesScreen(container);
    }
  }

  loadCardsQueue() {
    this.cardQueue = storage.getWordsForReview();
    if (this.cardQueue.length === 0) {
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
            Вы отлично поработали над словарным запасом. Слова вернутся в карточки по интервальному алгоритму.
          </p>
          <button class="ios-btn-primary" id="btn-restart-cards">
            <span>Взять ещё 5 слов</span>
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
      active: '⭐️ В активе',
      mastered: '🏆 Освоено'
    };

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">Осталось: ${remaining}</span>
        <span class="card-badge">${statusBadges[progress.status] || 'Новое'}</span>
      </div>

      <div class="flip-card-perspective" id="flashcard">
        <div class="flip-card-inner ${this.isCardFlipped ? 'flipped' : ''}" id="flashcard-inner">
          <div class="flip-card-front">
            <div class="card-header-bar">
              <span class="card-badge">Уровень: ${progress.box}/5</span>
              <button class="card-sound-btn" id="btn-speak-front">🔊</button>
            </div>
            <div style="margin: auto 0;">
              <h2 class="card-word-title">${currentWord.accented || currentWord.word}</h2>
              <div class="card-pos">${currentWord.partOfSpeech}</div>
              <div style="font-size: 15px; color: var(--text-secondary);">Вспомните смысл и контекст слова</div>
            </div>
            <div class="tap-hint">👆 Нажмите на карточку, чтобы перевернуть</div>
          </div>

          <div class="flip-card-back">
            <div class="card-header-bar">
              <span class="card-badge" style="background: rgba(0, 122, 255, 0.1); color: var(--ios-blue);">Толкование</span>
              <button class="card-sound-btn" id="btn-speak-back">🔊</button>
            </div>
            <div style="margin: 14px 0 6px 0;">
              <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 6px;">${currentWord.word}</h3>
              <p style="font-size: 16px; font-weight: 500; line-height: 1.45;">${currentWord.definition}</p>
            </div>
            ${currentWord.exampleQuote ? `<div class="quote-box">${currentWord.exampleQuote}</div>` : ''}
            ${currentWord.lifeExample ? `<div style="font-size: 13px; margin: 6px 0;">💬 <strong>В речи:</strong> ${currentWord.lifeExample}</div>` : ''}
            <div class="active-tip-box">🎯 <strong>Совет:</strong> ${currentWord.activeTip}</div>
          </div>
        </div>
      </div>

      <div style="margin-top: 10px;">
        <div class="rating-buttons-bar">
          <button class="rate-btn rate-again" data-quality="1">
            <span>❌ Снова</span>
            <span style="font-size: 10px;">не помню</span>
          </button>
          <button class="rate-btn rate-hard" data-quality="2">
            <span>🤔 Трудно</span>
            <span style="font-size: 10px;">смутно</span>
          </button>
          <button class="rate-btn rate-good" data-quality="3">
            <span>👍 Помню</span>
            <span style="font-size: 10px;">знаю смысл</span>
          </button>
          <button class="rate-btn rate-master" data-quality="4">
            <span>🌟 В активе</span>
            <span style="font-size: 10px;">свободно</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('flashcard')?.addEventListener('click', (e) => {
      if (e.target.closest('.card-sound-btn')) return;
      audio.playFlip();
      this.isCardFlipped = !this.isCardFlipped;
      document.getElementById('flashcard-inner')?.classList.toggle('flipped', this.isCardFlipped);
    });

    document.getElementById('btn-speak-front')?.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.speak(currentWord.word);
    });
    document.getElementById('btn-speak-back')?.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.speak(currentWord.word);
    });

    container.querySelectorAll('.rate-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const quality = parseInt(btn.dataset.quality, 10);
        if (quality >= 3) audio.playSuccess();
        else audio.playTap();
        audio.vibrate(20);
        storage.rateWord(currentWord.id, quality);
        this.currentCardIndex++;
        this.isCardFlipped = false;
        this.renderScreen();
      });
    });
  }

  // --- ДУЭЛИ ---
  renderDuelScreen(container) {
    if (this.localDuel && this.localDuel.isActive) {
      return this.renderLocalDuelPlay(container);
    }
    if (duelManager.status === 'in_game') {
      return this.renderOnlineDuelPlay(container);
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
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">📊 История поединков</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; text-align: center;">
          <div style="background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius-sm);">
            <div style="font-size: 26px; font-weight: 800; color: var(--ios-blue);">${storage.stats.duelsPlayed || 0}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Сыграно</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius-sm);">
            <div style="font-size: 26px; font-weight: 800; color: var(--ios-green);">${storage.stats.duelsWon || 0}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Побед</div>
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

  startLocalDuel() {
    this.localDuel = {
      isActive: true,
      questions: quizEngine.generateDuelSet(5),
      currentIndex: 0,
      activePlayer: 1,
      scores: { p1: 0, p2: 0 }
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
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span class="card-badge" style="background: ${isP1 ? 'rgba(0,122,255,0.1)' : 'rgba(255,45,85,0.1)'}; color: ${isP1 ? 'var(--ios-blue)' : 'var(--ios-pink)'};">
            Ход: ${isP1 ? p1Name : p2Name}
          </span>
          <span class="card-badge">${q.badge}</span>
        </div>
        <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 6px;">${q.prompt}</p>
        <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">${q.highlight}</h3>

        <div class="quiz-options-grid">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn" data-index="${i}"><span>${opt.text}</span></button>
          `).join('')}
        </div>
      </div>

      <button class="ios-btn-secondary" id="btn-cancel-duel" style="margin-top: 12px;">
        <span>Завершить дуэль</span>
      </button>
    `;

    document.getElementById('btn-cancel-duel')?.addEventListener('click', () => {
      this.localDuel = null;
      this.renderScreen();
    });

    const btns = container.querySelectorAll('.quiz-option-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        const opt = q.options[idx];
        btns.forEach((b, i) => {
          b.disabled = true;
          if (q.options[i].isCorrect) b.classList.add('correct');
        });

        if (opt.isCorrect) {
          btn.classList.add('correct');
          audio.playSuccess();
          if (isP1) duel.scores.p1 += 100;
          else duel.scores.p2 += 100;
        } else {
          btn.classList.add('wrong');
          audio.playError();
        }

        setTimeout(() => {
          if (duel.activePlayer === 1) duel.activePlayer = 2;
          else {
            duel.activePlayer = 1;
            duel.currentIndex++;
          }
          if (duel.currentIndex >= duel.questions.length) this.finishLocalDuel();
          else this.renderScreen();
        }, 1100);
      });
    });
  }

  finishLocalDuel() {
    const duel = this.localDuel;
    const isP1 = duel.scores.p1 > duel.scores.p2;
    storage.stats.duelsPlayed = (storage.stats.duelsPlayed || 0) + 1;
    if (isP1) storage.stats.duelsWon = (storage.stats.duelsWon || 0) + 1;
    storage.saveStats();

    if (window.confetti) window.confetti({ particleCount: 80, spread: 70 });
    audio.playVictory();

    const container = document.getElementById('screen-container');
    container.innerHTML = `
      <div class="ios-card" style="text-align: center; padding: 36px 20px;">
        <div style="font-size: 54px; margin-bottom: 12px;">🏆</div>
        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">
          ${duel.scores.p1 === duel.scores.p2 ? 'Ничья! Вы обе эрудитки!' : `Победила ${isP1 ? storage.profile.name : storage.profile.friendName}!`}
        </h2>
        <div style="font-size: 22px; font-weight: 700; color: var(--ios-indigo); margin-bottom: 24px;">
          ${duel.scores.p1} : ${duel.scores.p2}
        </div>
        <button class="ios-btn-primary" id="btn-rematch-local"><span>Сыграть реванш</span></button>
        <button class="ios-btn-secondary" id="btn-back-duel" style="margin-top: 10px;"><span>В меню</span></button>
      </div>
    `;

    document.getElementById('btn-rematch-local')?.addEventListener('click', () => this.startLocalDuel());
    document.getElementById('btn-back-duel')?.addEventListener('click', () => {
      this.localDuel = null;
      this.renderScreen();
    });
  }

  openOnlineDuelModal() {
    const modal = document.getElementById('modal-container');
    modal.innerHTML = `
      <div class="ios-modal-backdrop" id="modal-backdrop">
        <div class="ios-modal-sheet">
          <div class="modal-grabber"></div>
          <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 14px;">🌐 Онлайн-дуэль в реальном времени</h3>
          <div style="background: var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); margin-bottom: 16px; text-align: center;">
            <button class="ios-btn-primary" id="btn-host-room"><span>Создать комнату дуэли</span></button>
          </div>
          <div style="background: var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); text-align: center;">
            <div style="display: flex; gap: 8px;">
              <input type="text" id="input-room-code" class="ios-input" placeholder="Код комнаты" maxlength="4" style="text-align: center; font-size: 18px; font-weight: 700; text-transform: uppercase;">
              <button class="ios-btn-primary" id="btn-join-room" style="width: auto; padding: 0 20px;">Войти</button>
            </div>
          </div>
          <button class="ios-btn-secondary" id="btn-close-modal" style="margin-top: 16px;"><span>Отмена</span></button>
        </div>
      </div>
    `;
    document.getElementById('btn-close-modal')?.addEventListener('click', () => modal.innerHTML = '');
    document.getElementById('modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-backdrop') modal.innerHTML = '';
    });
    document.getElementById('btn-host-room')?.addEventListener('click', () => duelManager.createRoom());
    document.getElementById('btn-join-room')?.addEventListener('click', () => {
      const code = document.getElementById('input-room-code')?.value.trim();
      if (code) duelManager.joinRoom(code);
    });
  }

  onDuelRoomCreated(data) {
    const modal = document.getElementById('modal-container');
    modal.innerHTML = `
      <div class="ios-modal-backdrop">
        <div class="ios-modal-sheet" style="text-align: center;">
          <div class="modal-grabber"></div>
          <div style="font-size: 40px; margin-bottom: 8px;">📡</div>
          <h3 style="font-size: 20px; font-weight: 700;">Код комнаты:</h3>
          <div style="font-size: 44px; font-weight: 900; letter-spacing: 4px; color: var(--ios-blue); background: var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); margin: 16px 0;">
            ${data.code}
          </div>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">Скажите этот код подруге!</p>
          <button class="ios-btn-secondary" id="btn-cancel-room"><span>Отмена</span></button>
        </div>
      </div>
    `;
    document.getElementById('btn-cancel-room')?.addEventListener('click', () => {
      duelManager.disconnect();
      modal.innerHTML = '';
    });
  }

  onDuelConnected() {
    const modal = document.getElementById('modal-container');
    audio.playSuccess();
    modal.innerHTML = `
      <div class="ios-modal-backdrop">
        <div class="ios-modal-sheet" style="text-align: center;">
          <div class="modal-grabber"></div>
          <div style="font-size: 44px; margin-bottom: 8px;">🤝</div>
          <h3 style="font-size: 20px; font-weight: 700;">Подруга подключилась!</h3>
          <p style="color: var(--text-secondary); font-size: 15px; margin: 12px 0 24px 0;">Готовы к поединку?</p>
          ${duelManager.isHost ? `<button class="ios-btn-primary" id="btn-start-online-game"><span>🚀 Начать!</span></button>` : `<div style="color: var(--text-secondary);">Ведущий запускает игру...</div>`}
        </div>
      </div>
    `;
    document.getElementById('btn-start-online-game')?.addEventListener('click', () => duelManager.startHostGame());
  }

  onOnlineGameStarted() {
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
        <span class="card-badge">${q.badge}</span>
        <p style="font-size: 15px; color: var(--text-secondary); margin: 6px 0;">${q.prompt}</p>
        <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">${q.highlight}</h3>
        <div class="quiz-options-grid">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn" data-index="${i}"><span>${opt.text}</span></button>
          `).join('')}
        </div>
      </div>

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

    const btns = container.querySelectorAll('.quiz-option-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        const opt = q.options[idx];
        btns.forEach(b => b.disabled = true);
        if (opt.isCorrect) {
          btn.classList.add('correct');
          audio.playSuccess();
        } else {
          btn.classList.add('wrong');
          audio.playError();
        }
        duelManager.submitAnswer(duelManager.currentRound, opt.isCorrect, 100);

        setTimeout(() => {
          duelManager.currentRound++;
          if (duelManager.currentRound >= duelManager.currentQuestions.length) this.finishOnlineDuel();
          else this.renderScreen();
        }, 1200);
      });
    });
  }

  finishOnlineDuel() {
    const isWinner = duelManager.scores.my > duelManager.scores.opponent;
    if (isWinner && window.confetti) window.confetti({ particleCount: 100, spread: 80 });
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
        <button class="ios-btn-primary" id="btn-close-online-duel"><span>Завершить</span></button>
      </div>
    `;
    document.getElementById('btn-close-online-duel')?.addEventListener('click', () => {
      duelManager.disconnect();
      this.renderScreen();
    });
  }

  // --- ТРЕНАЖЁР ---
  renderTrainScreen(container) {
    if (this.activeQuiz) return this.renderActiveQuiz(container);

    container.innerHTML = `
      <div class="ios-card">
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 14px;">Режимы тренировки</h2>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div class="ios-card" id="mode-blitz" style="cursor: pointer; margin-bottom: 0; background: var(--bg-tertiary);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 32px;">⚡</span>
              <div>
                <h4 style="font-size: 16px; font-weight: 700;">Блиц-микс (10 раундов)</h4>
                <div style="font-size: 13px; color: var(--text-secondary);">Коктейль из всех форматов</div>
              </div>
            </div>
          </div>
          <div class="ios-card" id="mode-synonyms" style="cursor: pointer; margin-bottom: 0; background: var(--bg-tertiary);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 32px;">🎭</span>
              <div>
                <h4 style="font-size: 16px; font-weight: 700;">Подбор синонимов</h4>
                <div style="font-size: 13px; color: var(--text-secondary);">Ассоциации и синонимы</div>
              </div>
            </div>
          </div>
          <div class="ios-card" id="mode-imposter" style="cursor: pointer; margin-bottom: 0; background: var(--bg-tertiary);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 32px;">🕵️</span>
              <div>
                <h4 style="font-size: 16px; font-weight: 700;">Найди самозванца</h4>
                <div style="font-size: 13px; color: var(--text-secondary);">Лишнее слово среди синонимов</div>
              </div>
            </div>
          </div>
          <div class="ios-card" id="mode-fill" style="cursor: pointer; margin-bottom: 0; background: var(--bg-tertiary);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 32px;">📜</span>
              <div>
                <h4 style="font-size: 16px; font-weight: 700;">Цитаты классиков</h4>
                <div style="font-size: 13px; color: var(--text-secondary);">Пропуски в предложениях</div>
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
    for (let i = 0; i < count; i++) questions.push(quizEngine.generateQuestion(type));
    this.activeQuiz = { questions, currentIndex: 0, score: 0, correctCount: 0 };
    this.renderScreen();
  }

  renderActiveQuiz(container) {
    const quiz = this.activeQuiz;
    const q = quiz.questions[quiz.currentIndex];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <span class="card-badge">Вопрос ${quiz.currentIndex + 1}/${quiz.questions.length}</span>
        <span style="font-size: 14px; font-weight: 700; color: var(--ios-blue);">Счёт: ${quiz.score}</span>
      </div>

      <div class="ios-card">
        <span class="card-badge" style="background: rgba(88,86,214,0.12); color: var(--ios-indigo);">${q.badge}</span>
        <p style="font-size: 15px; color: var(--text-secondary); margin: 8px 0 4px 0;">${q.prompt}</p>
        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 18px;">${q.highlight}</h3>
        <div class="quiz-options-grid">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn" data-index="${i}"><span>${opt.text}</span></button>
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

    const btns = container.querySelectorAll('.quiz-option-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        const opt = q.options[idx];
        btns.forEach((b, i) => {
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
          if (quiz.currentIndex >= quiz.questions.length) this.finishQuiz();
          else this.renderScreen();
        }, 1100);
      });
    });
  }

  finishQuiz() {
    const quiz = this.activeQuiz;
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
        <button class="ios-btn-primary" id="btn-again-quiz"><span>Ещё раз</span></button>
        <button class="ios-btn-secondary" id="btn-back-train" style="margin-top: 10px;"><span>К режимам</span></button>
      </div>
    `;

    document.getElementById('btn-again-quiz')?.addEventListener('click', () => this.startQuiz(null, quiz.questions.length));
    document.getElementById('btn-back-train')?.addEventListener('click', () => {
      this.activeQuiz = null;
      this.renderScreen();
    });
  }

  // --- СЛОВАРЬ ---
  renderDictionaryScreen(container) {
    const filtered = storage.words.filter(word => {
      const matchCat = this.activeCategory === 'all' || word.category === this.activeCategory;
      const matchSearch = !this.searchQuery || 
        word.word.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        word.definition.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <div class="ios-input-group" style="margin-bottom: 12px;">
        <input type="search" id="dict-search" class="ios-input" placeholder="🔍 Поиск слова или толкования..." value="${this.searchQuery}">
      </div>

      <div class="category-pills-row">
        ${VOCABULARY_CATEGORIES.map(cat => `
          <button class="pill-btn ${this.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
            <span>${cat.icon}</span>
            <span>${cat.title}</span>
          </button>
        `).join('')}
      </div>

      <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 12px;">
        Найдено слов: ${filtered.length}
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${filtered.map(word => {
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
                  <div style="font-size: 13px; color: var(--text-secondary);">${word.partOfSpeech}</div>
                </div>
                <button class="card-sound-btn btn-quick-speak" data-word="${word.word}" style="width: 32px; height: 32px; font-size: 14px;">🔊</button>
              </div>
              <p style="font-size: 14px; margin-top: 8px; line-height: 1.4;">${word.definition}</p>
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
        const w = storage.words.find(w => w.id === item.dataset.wordId);
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
            <span class="card-badge">Уровень: ${prog.box}/5</span>
            <button class="card-sound-btn" id="modal-speak-word">🔊</button>
          </div>
          <h2 style="font-size: 32px; font-weight: 800; margin-bottom: 4px;">${word.accented || word.word}</h2>
          <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">${word.partOfSpeech}</div>
          <div style="font-size: 16px; line-height: 1.5; margin-bottom: 14px;"><strong>Толкование:</strong> ${word.definition}</div>
          ${word.deepMeaning ? `<div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">💡 <strong>Тонкость:</strong> ${word.deepMeaning}</div>` : ''}
          ${word.synonyms?.length ? `<div style="font-size: 14px; margin-bottom: 10px;"><strong>Синонимы:</strong> ${word.synonyms.join(', ')}</div>` : ''}
          ${word.exampleQuote ? `<div class="quote-box">${word.exampleQuote}</div>` : ''}
          ${word.lifeExample ? `<div style="font-size: 14px; margin: 10px 0;">💬 <strong>В речи:</strong> ${word.lifeExample}</div>` : ''}
          <div class="active-tip-box" style="margin-bottom: 20px;">🎯 <strong>Совет:</strong> ${word.activeTip}</div>
          <button class="ios-btn-primary" id="btn-close-word-modal"><span>Понятно</span></button>
        </div>
      </div>
    `;

    document.getElementById('modal-speak-word')?.addEventListener('click', () => audio.speak(word.word));
    document.getElementById('btn-close-word-modal')?.addEventListener('click', () => modal.innerHTML = '');
    document.getElementById('modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-backdrop') modal.innerHTML = '';
    });
  }

  // --- ИСТОРИИ & ЧЕЛЛЕНДЖИ ---
  renderStoriesScreen(container) {
    const daily = storyGenerator.getDailyChallenge();

    container.innerHTML = `
      <div class="ios-card" style="border: 1px solid rgba(255, 149, 0, 0.3); background: linear-gradient(135deg, rgba(255, 149, 0, 0.08), rgba(255, 45, 85, 0.08));">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="card-badge" style="background: rgba(255, 149, 0, 0.15); color: var(--ios-orange);">🔥 Челлендж дня для двоих</span>
          <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">Сегодня</span>
        </div>
        <h3 style="font-size: 24px; font-weight: 800; margin: 8px 0 4px 0;">${daily.word.accented || daily.word.word}</h3>
        <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">${daily.word.definition}</p>
        <div style="font-size: 14px; margin-bottom: 14px;">${daily.description}</div>
        <button class="ios-btn-primary" id="btn-complete-challenge"><span>✨ Мы применили это слово сегодня!</span></button>
      </div>

      <div class="ios-card">
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 6px;">✍️ Генератор контекстных историй</h3>
        <button class="ios-btn-secondary" id="btn-generate-story"><span>Сгенерировать историю со словами</span></button>
        <div id="story-result-box" style="margin-top: 18px;"></div>
      </div>
    `;

    document.getElementById('btn-complete-challenge')?.addEventListener('click', () => {
      if (window.confetti) window.confetti({ particleCount: 70, spread: 60 });
      audio.playVictory();
      storage.stats.streak = (storage.stats.streak || 1) + 1;
      storage.saveStats();
      this.updateHeaderStats();
      alert('Супер! Словарный запас пополнился! 🔥');
    });

    document.getElementById('btn-generate-story')?.addEventListener('click', () => {
      audio.playTap();
      this.displayGeneratedStory();
    });

    this.displayGeneratedStory();
  }

  displayGeneratedStory() {
    const box = document.getElementById('story-result-box');
    if (!box) return;
    const story = storyGenerator.generateStory();
    box.innerHTML = `
      <div style="background: var(--bg-tertiary); padding: 18px; border-radius: var(--radius-md); border-left: 4px solid var(--ios-indigo);">
        <div style="font-size: 12px; font-weight: 700; color: var(--ios-indigo); margin-bottom: 8px;">СЦЕНА: ${story.theme.toUpperCase()}</div>
        <div style="font-size: 15px; line-height: 1.6; white-space: pre-line; margin-bottom: 12px;">
          ${story.text.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--ios-blue); text-decoration: underline;">$1</strong>')}
        </div>
        <div class="active-tip-box">💡 ${story.challenge}</div>
      </div>
    `;
  }

  // --- МОДАЛКИ: ДОБАВЛЕНИЕ СЛОВА И НАСТРОЙКИ ---
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
            <label class="ios-label">Толкование *</label>
            <textarea id="add-def" class="ios-textarea" rows="2" placeholder="Краткое и точное значение"></textarea>
          </div>
          <div class="ios-input-group">
            <label class="ios-label">Синонимы (через запятую)</label>
            <input type="text" id="add-synonyms" class="ios-input" placeholder="Наслоение, многослойность">
          </div>
          <button class="ios-btn-primary" id="btn-save-new-word" style="margin-top: 10px;"><span>Сохранить в коллекцию</span></button>
          <button class="ios-btn-secondary" id="btn-cancel-add" style="margin-top: 8px;"><span>Отмена</span></button>
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
        definition: def,
        synonyms: document.getElementById('add-synonyms')?.value.trim()
      });
      audio.playSuccess();
      modal.innerHTML = '';
      this.loadCardsQueue();
      this.renderScreen();
    });
  }

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
            <label class="ios-label">Тема</label>
            <select id="cfg-theme" class="ios-input">
              <option value="auto" ${p.theme === 'auto' ? 'selected' : ''}>Как в системе (Авто)</option>
              <option value="light" ${p.theme === 'light' ? 'selected' : ''}>Светлая тема</option>
              <option value="dark" ${p.theme === 'dark' ? 'selected' : ''}>Тёмная тема (OLED)</option>
            </select>
          </div>
          <button class="ios-btn-primary" id="btn-save-settings" style="margin-top: 16px;"><span>Сохранить</span></button>
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

document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
