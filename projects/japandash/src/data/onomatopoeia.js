export const categories = {
  giongo: { label: '擬音語 Giongo', description: 'Sounds from the environment', color: 'ai' },
  gitaigo: { label: '擬態語 Gitaigo', description: 'States, conditions, feelings', color: 'beni' },
  giseigo: { label: '擬声語 Giseigo', description: 'Human & animal sounds', color: 'matcha' },
}

export const onomatopoeia = [
  // Gitaigo — states & feelings
  {
    word: 'わくわく',
    romaji: 'wakuwaku',
    category: 'gitaigo',
    meaning: 'Excited, thrilled',
    explanation: 'Describes the bubbling feeling of excitement or anticipation before something fun.',
    examples: [
      { ja: '旅行の前日、わくわくして眠れなかった。', en: "I was so excited the night before the trip that I couldn't sleep." },
    ],
    related: ['どきどき', 'うきうき'],
    level: 'N3',
  },
  {
    word: 'どきどき',
    romaji: 'dokidoki',
    category: 'gitaigo',
    meaning: 'Heart pounding, nervous excitement',
    explanation: 'The feeling of your heart beating fast — from nervousness, excitement, or love.',
    examples: [
      { ja: '告白する前にどきどきした。', en: 'My heart was pounding before I confessed.' },
    ],
    related: ['わくわく', 'はらはら'],
    level: 'N4',
  },
  {
    word: 'いらいら',
    romaji: 'iraira',
    category: 'gitaigo',
    meaning: 'Irritated, frustrated',
    explanation: 'A growing sense of irritation or annoyance, often when things don\'t go as planned.',
    examples: [
      { ja: '電車が遅れていらいらした。', en: 'I got irritated because the train was late.' },
    ],
    related: ['むかむか'],
    level: 'N3',
  },
  {
    word: 'のんびり',
    romaji: 'nonbiri',
    category: 'gitaigo',
    meaning: 'Relaxed, carefree, at ease',
    explanation: 'A calm, unhurried state — taking it easy without a care in the world.',
    examples: [
      { ja: '休みの日はのんびり過ごしたい。', en: 'I want to spend my day off relaxing.' },
    ],
    related: ['ゆっくり', 'ぼんやり'],
    level: 'N3',
  },
  {
    word: 'ぴかぴか',
    romaji: 'pikapika',
    category: 'gitaigo',
    meaning: 'Sparkling, shiny, brand new',
    explanation: 'Something gleaming or spotlessly clean, often describing new things.',
    examples: [
      { ja: '新しい靴がぴかぴかだ。', en: 'My new shoes are sparkling.' },
    ],
    related: ['きらきら', 'つやつや'],
    level: 'N4',
  },
  // Giongo — environmental sounds
  {
    word: 'ざあざあ',
    romaji: 'zaazaa',
    category: 'giongo',
    meaning: 'Heavy rain pouring',
    explanation: 'The sound of heavy rainfall or rushing water.',
    examples: [
      { ja: '外はざあざあ降っている。', en: 'It\'s pouring rain outside.' },
    ],
    related: ['しとしと', 'ぱらぱら'],
    level: 'N3',
  },
  {
    word: 'しとしと',
    romaji: 'shitoshito',
    category: 'giongo',
    meaning: 'Light, gentle rain',
    explanation: 'The quiet sound of light, steady rain falling softly.',
    examples: [
      { ja: '雨がしとしと降っている。', en: 'The rain is falling gently.' },
    ],
    related: ['ざあざあ', 'ぱらぱら'],
    level: 'N3',
  },
  {
    word: 'ごろごろ',
    romaji: 'gorogoro',
    category: 'giongo',
    meaning: 'Rumbling thunder / lounging around',
    explanation: 'The deep rumble of thunder, or lazily rolling around doing nothing.',
    examples: [
      { ja: '雷がごろごろ鳴っている。', en: 'Thunder is rumbling.' },
      { ja: '週末は家でごろごろしていた。', en: 'I spent the weekend lounging around at home.' },
    ],
    related: ['ぴかぴか', 'だらだら'],
    level: 'N3',
  },
  {
    word: 'がたがた',
    romaji: 'gatagata',
    category: 'giongo',
    meaning: 'Rattling, clattering',
    explanation: 'The sound of something shaking or rattling, or teeth chattering from cold.',
    examples: [
      { ja: '風で窓ががたがた鳴る。', en: 'The wind is rattling the windows.' },
    ],
    related: ['ぐらぐら'],
    level: 'N3',
  },
  // Giseigo — human & animal sounds
  {
    word: 'わんわん',
    romaji: 'wanwan',
    category: 'giseigo',
    meaning: 'Woof woof (dog barking)',
    explanation: 'The Japanese representation of a dog\'s bark. Also used as a baby-word for "dog".',
    examples: [
      { ja: '犬がわんわん吠えている。', en: 'The dog is barking.' },
    ],
    related: ['にゃんにゃん', 'きゃんきゃん'],
    level: 'N5',
  },
  {
    word: 'にゃんにゃん',
    romaji: 'nyannyan',
    category: 'giseigo',
    meaning: 'Meow meow (cat sound)',
    explanation: 'How cats sound in Japanese. Also a cute baby-word for "cat".',
    examples: [
      { ja: '猫がにゃんにゃん鳴いている。', en: 'The cat is meowing.' },
    ],
    related: ['わんわん'],
    level: 'N5',
  },
  {
    word: 'げらげら',
    romaji: 'geragera',
    category: 'giseigo',
    meaning: 'Loud, boisterous laughter',
    explanation: 'Uncontrolled, belly-shaking laughter — sometimes considered rude.',
    examples: [
      { ja: '友達とげらげら笑った。', en: 'I laughed out loud with my friends.' },
    ],
    related: ['くすくす', 'にこにこ'],
    level: 'N3',
  },
  {
    word: 'くすくす',
    romaji: 'kusukusu',
    category: 'giseigo',
    meaning: 'Giggling, snickering quietly',
    explanation: 'Soft, suppressed laughter — giggling behind your hand.',
    examples: [
      { ja: '子供たちがくすくす笑っていた。', en: 'The children were giggling.' },
    ],
    related: ['げらげら', 'にこにこ'],
    level: 'N3',
  },
  {
    word: 'ぺらぺら',
    romaji: 'perapera',
    category: 'giseigo',
    meaning: 'Fluent (in a language) / chattering away',
    explanation: 'Speaking a language smoothly and fluently, or talking non-stop.',
    examples: [
      { ja: '彼女は日本語がぺらぺらだ。', en: 'She is fluent in Japanese.' },
    ],
    related: ['すらすら'],
    level: 'N3',
  },
  {
    word: 'ぶつぶつ',
    romaji: 'butsubutsu',
    category: 'giseigo',
    meaning: 'Muttering, grumbling',
    explanation: 'Talking to yourself under your breath, often complaining.',
    examples: [
      { ja: '彼はぶつぶつ文句を言っていた。', en: 'He was muttering complaints.' },
    ],
    related: ['ぐちぐち'],
    level: 'N3',
  },
]
