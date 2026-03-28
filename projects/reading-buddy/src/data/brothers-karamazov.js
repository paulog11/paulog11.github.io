export default {
  id: 'brothers-karamazov',
  type: 'narrative',
  title: 'The Brothers Karamazov',
  author: 'Fyodor Dostoevsky',
  coverEmoji: '\uD83D\uDCD6',
  description: 'A sprawling family drama of faith, doubt, and patricide in 19th-century Russia.',

  characters: {
    fyodor: {
      name: 'Fyodor Pavlovich Karamazov',
      shortName: 'Fyodor',
      epithet: 'The Father',
    },
    dmitri: {
      name: 'Dmitri Fyodorovich Karamazov',
      shortName: 'Dmitri (Mitya)',
      epithet: 'The Eldest Son',
    },
    ivan: {
      name: 'Ivan Fyodorovich Karamazov',
      shortName: 'Ivan',
      epithet: 'The Middle Son',
    },
    alyosha: {
      name: 'Alexei Fyodorovich Karamazov',
      shortName: 'Alyosha',
      epithet: 'The Youngest Son',
    },
    smerdyakov: {
      name: 'Pavel Fyodorovich Smerdyakov',
      shortName: 'Smerdyakov',
      epithet: 'The Illegitimate Son',
    },
    zosima: {
      name: 'Elder Zosima',
      shortName: 'Zosima',
      epithet: 'The Spiritual Elder',
    },
    grushenka: {
      name: 'Agrafena Alexandrovna Svetlova',
      shortName: 'Grushenka',
      epithet: 'The Enchantress',
    },
    katerina: {
      name: 'Katerina Ivanovna Verkhovtseva',
      shortName: 'Katerina',
      epithet: 'The Proud Fiancée',
    },
    grigory: {
      name: 'Grigory Vasilyevich Kutuzov',
      shortName: 'Grigory',
      epithet: 'The Faithful Servant',
    },
    marfa: {
      name: 'Marfa Ignatyevna',
      shortName: 'Marfa',
      epithet: "Grigory's Wife",
    },
    lise: {
      name: 'Lise Khokhlakova',
      shortName: 'Lise',
      epithet: 'The Impish Invalid',
    },
    snegiryov: {
      name: 'Captain Nikolai Ilyich Snegiryov',
      shortName: 'Captain Snegiryov',
      epithet: 'The Humiliated Captain',
    },
    ilyusha: {
      name: 'Ilyusha Snegiryov',
      shortName: 'Ilyusha',
      epithet: "The Captain's Son",
    },
  },

  books: [
    // ── Prologue ──────────────────────────────────────────
    {
      id: 'prologue',
      title: 'From the Author',
      chapters: [
        {
          id: 'prologue-1',
          title: 'From the Author',
          introduces: ['alyosha'],
          characterDetails: {
            alyosha: {
              description:
                'Introduced as the hero of the story, though the narrator admits he is an odd and perhaps uncertain sort of hero.',
              traits: ['Unusual', 'Modest'],
              relationships: [],
              events: [
                'Narrator introduces Alyosha as the protagonist of the novel',
              ],
              timeline: [
                { label: 'Introduced as the hero', tone: 'neutral' },
              ],
            },
          },
        },
      ],
    },

    // ── Book I ────────────────────────────────────────────
    {
      id: 'book-1',
      title: 'Book I: A Nice Little Family',
      chapters: [
        {
          id: '1-1',
          title: 'Chapter 1: Fyodor Pavlovich Karamazov',
          introduces: ['fyodor', 'dmitri'],
          characterDetails: {
            fyodor: {
              description:
                'A petty, dissolute landowner. A buffoon by nature, cunning with money, and thoroughly negligent of his children.',
              traits: ['Buffoonish', 'Dissolute', 'Cunning', 'Negligent father'],
              relationships: [
                { to: 'dmitri', type: 'Father', note: 'Abandoned Dmitri as a child after his first wife fled' },
              ],
              events: [
                'Background of his first marriage to Adelaida Ivanovna Miusova',
                'Neglects infant Dmitri after his wife leaves',
              ],
            },
            dmitri: {
              description:
                "The eldest son, born of Fyodor's first marriage. Raised by servants and distant relatives after being abandoned by his father.",
              traits: ['Abandoned', 'Wild upbringing'],
              relationships: [
                { to: 'fyodor', type: 'Son', note: 'Abandoned by Fyodor as an infant' },
              ],
              events: ['Left in the care of the servant Grigory as a baby'],
              timeline: [
                { label: 'Abandoned by Fyodor as infant', tone: 'suffering' },
              ],
            },
          },
        },
        {
          id: '1-2',
          title: 'Chapter 2: The First Son Sent Packing',
          introduces: [],
          characterDetails: {
            dmitri: {
              description:
                'Grows up wild, learning of his inheritance only as a young man. Arrives to confront his father over money.',
              traits: ['Hot-tempered', 'Passionate', 'Spendthrift'],
              relationships: [],
              events: [
                "Discovers his mother's estate should have provided him income",
                'Begins disputing money with Fyodor',
              ],
              timeline: [
                { label: 'Confronts Fyodor over inheritance', tone: 'conflict' },
              ],
            },
          },
        },
        {
          id: '1-3',
          title: 'Chapter 3: Second Marriage and More Children',
          introduces: ['ivan'],
          characterDetails: {
            fyodor: {
              description:
                'Marries a second time to Sofya Ivanovna, a young orphan. Continues his debauched lifestyle, mistreating his new wife.',
              traits: ['Cruel husband'],
              relationships: [
                { to: 'ivan', type: 'Father', note: 'Neglects Ivan and Alyosha from his second marriage' },
                { to: 'alyosha', type: 'Father', note: 'Neglects both sons of his second marriage' },
              ],
              events: [
                'Second marriage to Sofya Ivanovna',
                'Brings women into the house, humiliating his wife',
              ],
            },
            ivan: {
              description:
                "The middle brother, intellectual and brooding. Raised in the household of a benefactor after his mother's death.",
              traits: ['Intellectual', 'Reserved', 'Independent'],
              relationships: [
                { to: 'fyodor', type: 'Son', note: "Neglected by Fyodor after mother's death" },
                { to: 'alyosha', type: 'Brother', note: "Full brother, both from Fyodor's second marriage" },
              ],
              events: ['Raised by Yefim Petrovich after being orphaned'],
              timeline: [
                { label: 'Raised by a benefactor after orphaned', tone: 'suffering' },
              ],
            },
            alyosha: {
              description:
                'The youngest son. Remembered his mother from early childhood, an experience that marked him deeply.',
              traits: ['Gentle', 'Devout', 'Sensitive'],
              relationships: [
                { to: 'ivan', type: 'Brother', note: 'Full brother' },
              ],
              events: [
                'Retains early memory of his mother praying before an icon',
              ],
              timeline: [
                { label: 'Remembers his mother before the icon', tone: 'revelation' },
              ],
            },
          },
        },
        {
          id: '1-4',
          title: 'Chapter 4: The Third Son, Alyosha',
          introduces: ['zosima'],
          characterDetails: {
            alyosha: {
              description:
                'Enters the monastery, drawn to Elder Zosima. Not a fanatic but a lover of humanity, unable to judge others.',
              traits: ['Non-judgmental', 'Serene', 'Monastic calling'],
              relationships: [
                { to: 'zosima', type: 'Disciple', note: 'Becomes devoted to Elder Zosima at the monastery' },
              ],
              events: [
                'Enters the monastery',
                "Becomes Elder Zosima's devoted follower",
              ],
              timeline: [
                { label: 'Enters the monastery', tone: 'growth' },
              ],
            },
            zosima: {
              description:
                'An elder of the monastery, revered by many as a holy man and spiritual guide. Practices the tradition of receiving visitors for counsel.',
              traits: ['Wise', 'Compassionate', 'Charismatic elder'],
              relationships: [
                { to: 'alyosha', type: 'Spiritual mentor', note: 'Takes Alyosha under his care' },
              ],
              events: [
                'Introduced as the influential elder at the monastery',
              ],
            },
          },
        },
        {
          id: '1-5',
          title: 'Chapter 5: Elders',
          introduces: [],
          characterDetails: {
            zosima: {
              description:
                "The institution of the elder is explained. Zosima's authority is absolute over those who submit to him. He is both loved and resented within the monastery.",
              traits: ['Controversial within the monastery', 'Absolute spiritual authority'],
              relationships: [],
              events: [
                'The practice of "elders" in Russian monasticism is explained',
              ],
            },
          },
        },
      ],
    },

    // ── Book II ───────────────────────────────────────────
    {
      id: 'book-2',
      title: 'Book II: An Inappropriate Gathering',
      chapters: [
        {
          id: '2-1',
          title: 'Chapter 1: They Arrive at the Monastery',
          introduces: [],
          characterDetails: {
            fyodor: {
              description:
                'Arrives at the monastery for the family meeting, immediately behaving clownishly.',
              traits: ['Shameless in sacred settings'],
              relationships: [],
              events: [
                "Arrives at the monastery for the mediation meeting over Dmitri's inheritance",
              ],
            },
            dmitri: {
              description: 'Notably late to the gathering at the monastery.',
              traits: [],
              relationships: [],
              events: ['Fails to arrive on time for the meeting'],
              timeline: [
                { label: 'Late to the monastery meeting', tone: 'neutral' },
              ],
            },
          },
        },
        {
          id: '2-2',
          title: 'Chapter 2: The Old Buffoon',
          introduces: [],
          characterDetails: {
            fyodor: {
              description:
                'Performs outrageous clowning before the elder, unable to stop himself. Lies, blasphemes, and makes a spectacle.',
              traits: ['Compulsive liar', 'Self-aware buffoon'],
              relationships: [],
              events: [
                'Humiliates himself before Elder Zosima with outrageous stories and lies',
              ],
            },
            zosima: {
              description:
                'Responds to Fyodor\'s buffoonery with calm wisdom, telling him the most important thing is not to lie to himself.',
              traits: ['Penetrating insight'],
              relationships: [],
              events: [
                'Counsels Fyodor: "Above all, do not lie to yourself"',
              ],
            },
          },
        },
        {
          id: '2-3',
          title: 'Chapter 3: Women of Faith',
          introduces: [],
          characterDetails: {
            zosima: {
              description:
                'Receives peasant women seeking counsel. Shows deep empathy, particularly to a grieving mother.',
              traits: ['Empathetic', 'Patient with suffering'],
              relationships: [],
              events: [
                'Counsels peasant women who come seeking spiritual guidance',
                'Comforts a mother grieving for her dead child',
              ],
            },
          },
        },
        {
          id: '2-4',
          title: 'Chapter 4: A Lady of Little Faith',
          introduces: [],
          characterDetails: {
            zosima: {
              description:
                'Counsels Madame Khokhlakova about her crisis of faith and her doubts about the afterlife.',
              traits: ['Philosophical', 'Practical wisdom'],
              relationships: [],
              events: [
                'Advises on "active love" versus "love in dreams"',
              ],
            },
          },
        },
        {
          id: '2-5',
          title: 'Chapter 5: So Be It! So Be It!',
          introduces: [],
          characterDetails: {
            alyosha: {
              description:
                'Zosima sends Alyosha out into the world, away from the monastery. Alyosha is distressed but obedient.',
              traits: ['Obedient', 'Conflicted'],
              relationships: [],
              events: [
                'Zosima instructs Alyosha to leave the monastery and go into the world',
              ],
              timeline: [
                { label: 'Zosima sends him into the world', tone: 'revelation' },
              ],
            },
            zosima: {
              description:
                'Senses his own approaching death. Instructs Alyosha to leave the monastery to be near his brothers.',
              traits: ['Prophetic', 'Self-aware of mortality'],
              relationships: [
                { to: 'alyosha', type: 'Spiritual mentor', note: 'Sends Alyosha out into the world, believing it is his true calling' },
              ],
              events: [
                'Orders Alyosha to leave the monastery and live in the world',
              ],
            },
          },
        },
        {
          id: '2-6',
          title: 'Chapter 6: Why Is Such a Man Alive?',
          introduces: ['katerina', 'grushenka', 'smerdyakov'],
          characterDetails: {
            dmitri: {
              description:
                'Bursts in late and exposes his rage toward his father. Reveals the tangled love rivalry over Grushenka.',
              traits: ['Explosive', 'Jealous', 'Honorable in his own way'],
              relationships: [
                { to: 'katerina', type: 'Fiancee', note: 'Engaged to Katerina but consumed by passion for Grushenka' },
                { to: 'grushenka', type: 'Love interest', note: 'Obsessively in love with Grushenka' },
                { to: 'fyodor', type: 'Rival', note: "Father and son compete for Grushenka's affection" },
              ],
              events: [
                'Confronts Fyodor about the inheritance and about Grushenka',
              ],
              timeline: [
                { label: 'Confronts Fyodor at monastery', tone: 'conflict' },
              ],
            },
            katerina: {
              description:
                'A proud, beautiful, well-born woman engaged to Dmitri. Once humiliated herself before Dmitri to save her father from disgrace.',
              traits: ['Proud', 'Self-sacrificing', 'Strong-willed'],
              relationships: [
                { to: 'dmitri', type: 'Fiancee', note: 'Engaged, though Dmitri is unfaithful in his heart' },
                { to: 'ivan', type: 'Admirer', note: 'Ivan is drawn to her, creating a secondary love triangle' },
              ],
              events: [
                'Her backstory with Dmitri and the 4,500 rubles is alluded to',
              ],
            },
            grushenka: {
              description:
                'A local beauty of low origins who has bewitched both Fyodor and Dmitri. Cunning and independent.',
              traits: ['Bewitching', 'Independent', 'Cunning'],
              relationships: [
                { to: 'dmitri', type: 'Pursued by', note: 'Dmitri is desperately in love with her' },
                { to: 'fyodor', type: 'Pursued by', note: 'Fyodor tries to lure her with money' },
              ],
              events: [
                'Mentioned as the object of the father-son rivalry',
              ],
            },
            smerdyakov: {
              description:
                'Fyodor\'s cook and servant, rumored to be his illegitimate son by the vagrant "Stinking Lizaveta." Epileptic, resentful, and quietly intelligent.',
              traits: ['Epileptic', 'Resentful', 'Quietly intelligent', 'Servile'],
              relationships: [
                { to: 'fyodor', type: 'Illegitimate son / servant', note: "Believed to be Fyodor's son by Lizaveta Smerdyashchaya" },
                { to: 'ivan', type: 'Intellectual admirer', note: 'Looks up to Ivan, absorbs his philosophical ideas' },
              ],
              events: [
                "Mentioned in connection with Fyodor's household",
              ],
            },
          },
        },
        {
          id: '2-7',
          title: 'Chapter 7: The Seminarist-Careerist',
          introduces: [],
          characterDetails: {
            alyosha: {
              description:
                'Visits Katerina at her request. Witnesses the tension between Katerina and Ivan.',
              traits: ['Mediator', 'Perceptive'],
              relationships: [
                { to: 'katerina', type: 'Confidant', note: 'Katerina trusts Alyosha as a go-between' },
              ],
              events: [
                'Visits Katerina Ivanovna at her home',
                'Observes the complicated dynamic between Ivan and Katerina',
              ],
              timeline: [
                { label: "Mediates at Katerina's", tone: 'growth' },
              ],
            },
            ivan: {
              description:
                'Clearly drawn to Katerina, though he masks his feelings. His intellectual pride keeps him aloof.',
              traits: ['Emotionally guarded', 'Proud'],
              relationships: [
                { to: 'katerina', type: 'Secret admirer', note: 'Attracted to Katerina but unwilling to show it' },
              ],
              events: [
                "Present at Katerina's when Alyosha visits",
              ],
              timeline: [
                { label: 'Hides feelings for Katerina', tone: 'neutral' },
              ],
            },
          },
        },
        {
          id: '2-8',
          title: 'Chapter 8: Scandal',
          introduces: [],
          characterDetails: {
            fyodor: {
              description:
                'The family meeting at the monastery ends in a terrible scandal. Fyodor accuses Dmitri and makes outrageous scenes.',
              traits: ['Provocateur'],
              relationships: [],
              events: [
                'The monastery meeting collapses into a full scandal',
                'Fyodor makes wild accusations against Dmitri',
              ],
            },
            dmitri: {
              description:
                'Loses control during the meeting. Nearly attacks his father in the presence of the monks.',
              traits: ['Violent temper', 'Uncontrollable rage'],
              relationships: [],
              events: [
                'Nearly assaults Fyodor during the monastery meeting',
              ],
              timeline: [
                { label: 'Nearly attacks Fyodor at monastery', tone: 'conflict' },
              ],
            },
            zosima: {
              description:
                "In a stunning gesture, bows deeply before Dmitri, touching his forehead to the ground — seemingly foreseeing Dmitri's future suffering.",
              traits: ['Prophetic'],
              relationships: [
                { to: 'dmitri', type: 'Seer', note: 'Bows before Dmitri, foreshadowing his great suffering' },
              ],
              events: [
                'Bows to the ground before Dmitri in a mysterious, prophetic gesture',
              ],
            },
          },
        },
      ],
    },

    // ── Book III ──────────────────────────────────────────
    {
      id: 'book-3',
      title: 'Book III: The Sensualists',
      chapters: [
        {
          id: '3-1',
          title: "Chapter 1: In the Servants' Quarters",
          introduces: ['grigory', 'marfa'],
          characterDetails: {
            grigory: {
              description:
                "Fyodor's old, faithful servant who raised all three brothers. A stern, honest, stubborn man of rigid principles.",
              traits: ['Stern', 'Faithful', 'Stubborn', 'Honest'],
              relationships: [
                { to: 'fyodor', type: 'Servant', note: "Lifelong servant, loyal despite Fyodor's depravity" },
                { to: 'marfa', type: 'Husband', note: 'Married to Marfa Ignatyevna' },
                { to: 'smerdyakov', type: 'Adoptive father', note: 'Raised Smerdyakov from infancy' },
              ],
              events: ["Backstory of Grigory's long service to the Karamazov household"],
            },
            marfa: {
              description:
                "Grigory's wife, also a servant in the Karamazov household. Helped raise Smerdyakov after his birth in their kitchen garden.",
              traits: ['Dutiful', 'Quiet'],
              relationships: [
                { to: 'grigory', type: 'Wife', note: 'Married to Grigory' },
                { to: 'smerdyakov', type: 'Adoptive mother', note: 'Nursed Smerdyakov as a baby' },
              ],
              events: ['Her role in raising Smerdyakov is described'],
            },
            smerdyakov: {
              description:
                'His origins are fully explained: born to "Stinking Lizaveta," a mute vagrant, in the Karamazov bathhouse. Raised by Grigory and Marfa.',
              traits: ['Orphaned', 'Low birth'],
              relationships: [
                { to: 'grigory', type: 'Raised by', note: 'Grigory took him in as an infant' },
              ],
              events: ["The story of Stinking Lizaveta and Smerdyakov's birth is told in full"],
            },
          },
        },
        {
          id: '3-2',
          title: 'Chapter 2: Stinking Lizaveta',
          introduces: [],
          characterDetails: {
            smerdyakov: {
              description:
                'The full story of his conception: Lizaveta Smerdyashchaya, a holy fool and mute vagrant, was taken advantage of, and Fyodor is suspected.',
              traits: ['Child of scandal'],
              relationships: [
                { to: 'fyodor', type: 'Suspected illegitimate son', note: 'Town gossip holds Fyodor responsible' },
              ],
              events: [
                'Lizaveta\'s story is told: a mute, homeless woman the town treated as a holy fool',
                'Smerdyakov is born in the Karamazov garden and Grigory takes the infant in',
              ],
            },
          },
        },
        {
          id: '3-3',
          title: 'Chapter 3: The Confession of a Passionate Heart — in Verse',
          introduces: [],
          characterDetails: {
            dmitri: {
              description:
                'Begins his long confession to Alyosha in the gazebo. Quotes Schiller and speaks of the insect sensuality within him, the beauty in Sodom.',
              traits: ['Poetic', 'Self-lacerating', 'Philosophically tormented'],
              relationships: [
                { to: 'alyosha', type: 'Brother / confessor', note: 'Pours out his soul to Alyosha' },
              ],
              events: [
                'Confesses to Alyosha, quoting Schiller\'s "Hymn to Joy"',
                'Speaks of the ideal of the Madonna versus the ideal of Sodom',
              ],
              timeline: [
                { label: 'Confesses to Alyosha in verse', tone: 'revelation' },
              ],
            },
            alyosha: {
              description:
                "Listens with compassion to Dmitri's tormented confession, becoming his brother's confidant.",
              traits: ['Compassionate listener'],
              relationships: [],
              events: ["Receives Dmitri's confession in the gazebo"],
              timeline: [
                { label: "Receives Dmitri's confession", tone: 'growth' },
              ],
            },
          },
        },
        {
          id: '3-4',
          title: 'Chapter 4: The Confession of a Passionate Heart — in Anecdote',
          introduces: [],
          characterDetails: {
            dmitri: {
              description:
                'Tells Alyosha the story of Katerina: how her father was short 4,500 rubles, how she came to Dmitri to beg for the money, and how he gave it to her without taking advantage.',
              traits: ['Capable of nobility', 'Conflicted honor'],
              relationships: [
                { to: 'katerina', type: 'Complicated debt of honor', note: 'She came to him in desperation; he acted nobly but it bound them together' },
              ],
              events: [
                'Recounts how Katerina came to his rooms to beg for the 4,500 rubles',
                'Gave her the money and bowed to her, an act of nobility',
              ],
              timeline: [
                { label: 'Tells story of Katerina and 4,500 rubles', tone: 'revelation' },
              ],
            },
            katerina: {
              description:
                'Her backstory is revealed: sacrificed her pride to save her father from disgrace, went to Dmitri\'s rooms to beg for money.',
              traits: ['Self-sacrificing', 'Desperate'],
              relationships: [],
              events: ['The 4,500-ruble incident is described in full'],
            },
          },
        },
        {
          id: '3-5',
          title: 'Chapter 5: The Confession of a Passionate Heart — "Heels Up"',
          introduces: [],
          characterDetails: {
            dmitri: {
              description:
                "Reveals his obsession with Grushenka, his debts, the 3,000 rubles Katerina entrusted to him which he squandered on a spree with Grushenka in Mokroye.",
              traits: ['Spendthrift', 'Reckless', 'Desperately in love'],
              relationships: [
                { to: 'grushenka', type: 'Obsession', note: "Spent Katerina's 3,000 rubles on a wild night with Grushenka at Mokroye" },
                { to: 'katerina', type: 'Debtor', note: 'Misappropriated 3,000 rubles she entrusted to him' },
              ],
              events: [
                "Confesses he spent Katerina's 3,000 rubles on Grushenka",
                'The first Mokroye spree is described',
                'Tormented by the stolen money as a point of honor',
              ],
              timeline: [
                { label: "Squanders Katerina's 3,000 rubles", tone: 'suffering' },
              ],
            },
            grushenka: {
              description:
                "Dmitri's account paints her as irresistible, the woman who drives the rivalry between him and his father.",
              traits: ['Irresistible', 'Dangerous allure'],
              relationships: [],
              events: ['Dmitri describes his wild night with Grushenka at Mokroye'],
            },
          },
        },
        {
          id: '3-6',
          title: 'Chapter 6: Smerdyakov',
          introduces: [],
          characterDetails: {
            smerdyakov: {
              description:
                'Shown as a young man: contemptuous, vain, and arrogant despite his servile position. As a child he liked hanging cats and burying them with ceremony.',
              traits: ['Contemptuous', 'Vain', 'Cruel as a child', 'Arrogant'],
              relationships: [
                { to: 'grigory', type: 'Adopted son', note: 'Grigory taught him but Smerdyakov shows no gratitude' },
              ],
              events: [
                'His childhood cruelty (hanging cats) is recounted',
                'Grigory taught him to read but Smerdyakov showed no gratitude',
              ],
            },
            grigory: {
              description:
                'Tried to educate Smerdyakov, teaching him to read, but was repaid with contempt.',
              traits: ['Devoted educator'],
              relationships: [],
              events: ["Struck Smerdyakov for a contemptuous remark about God's creation of light"],
            },
          },
        },
        {
          id: '3-7',
          title: 'Chapter 7: The Controversy',
          introduces: [],
          characterDetails: {
            smerdyakov: {
              description:
                'Engages in theological argument at dinner, arguing that a Christian soldier captured by infidels may renounce his faith to save his life.',
              traits: ['Sophistic', 'Provocative thinker'],
              relationships: [
                { to: 'ivan', type: 'Philosophical disciple', note: "His arguments echo Ivan's rationalism" },
              ],
              events: ['Argues at dinner that renouncing faith under torture is no sin'],
            },
            ivan: {
              description:
                "Watches Smerdyakov's theological provocation with amusement rather than disapproval.",
              traits: ['Amused by blasphemy'],
              relationships: [],
              events: ["Listens to Smerdyakov's arguments with evident amusement"],
              timeline: [
                { label: "Amused by Smerdyakov's blasphemy", tone: 'neutral' },
              ],
            },
            fyodor: {
              description:
                'Enjoys the dinner-table theological argument, treating it as entertainment.',
              traits: ['Entertained by sacrilege'],
              relationships: [],
              events: ['Relishes the theological controversy at dinner'],
            },
          },
        },
        {
          id: '3-8',
          title: 'Chapter 8: Over the Cognac',
          introduces: [],
          characterDetails: {
            ivan: {
              description:
                'After dinner, Ivan and his father drink cognac. Fyodor interrogates Ivan about God and immortality. Ivan remains cryptic.',
              traits: ['Cryptic', 'Intellectually withholding'],
              relationships: [
                { to: 'fyodor', type: 'Son', note: "Father tries to draw out Ivan's true beliefs" },
              ],
              events: ['Drinks cognac with Fyodor; discusses God and immortality ambiguously'],
              timeline: [
                { label: 'Cryptic on God over cognac', tone: 'neutral' },
              ],
            },
            fyodor: {
              description:
                'Probes Ivan about whether God and immortality exist, half-seriously fearing the answer.',
              traits: ['Fear beneath the buffoonery'],
              relationships: [],
              events: ['Asks Ivan directly whether God exists and whether there is immortality'],
            },
            alyosha: {
              description:
                "Present during the conversation. Speaks up to affirm God's existence when pressed.",
              traits: ['Quiet conviction'],
              relationships: [],
              events: ['Affirms his belief in God during the dinner conversation'],
              timeline: [
                { label: 'Affirms belief in God', tone: 'growth' },
              ],
            },
          },
        },
        {
          id: '3-9',
          title: 'Chapter 9: The Sensualists',
          introduces: [],
          characterDetails: {
            fyodor: {
              description:
                'Reveals the depth of his rivalry with Dmitri over Grushenka. Has prepared an envelope of 3,000 rubles to lure her, sealed with a special inscription.',
              traits: ['Scheming', 'Lecherous'],
              relationships: [
                { to: 'grushenka', type: 'Would-be lover', note: 'Has prepared 3,000 rubles in a sealed envelope for her' },
                { to: 'dmitri', type: 'Rival', note: 'Father and son competing for the same woman' },
              ],
              events: [
                'Reveals the sealed envelope with 3,000 rubles meant for Grushenka',
                'Describes the signals Grushenka is to give if she comes at night',
              ],
            },
            ivan: {
              description:
                "Observes his father's obscene scheming with growing revulsion.",
              traits: ['Disgusted'],
              relationships: [],
              events: ['Witnesses Fyodor\'s plans regarding Grushenka with disgust'],
            },
          },
        },
        {
          id: '3-10',
          title: 'Chapter 10: Both Together',
          introduces: [],
          characterDetails: {
            alyosha: {
              description:
                'Visits Katerina again. Witnesses a dramatic scene between Katerina and Grushenka where the two women confront each other.',
              traits: ['Helpless witness'],
              relationships: [],
              events: [
                'Visits Katerina and is present for the confrontation with Grushenka',
              ],
              timeline: [
                { label: 'Witnesses Katerina-Grushenka clash', tone: 'suffering' },
              ],
            },
            katerina: {
              description:
                'Attempts to win Grushenka over, kissing her hand, believing Grushenka will give up Dmitri. She is cruelly humiliated instead.',
              traits: ['Naive hope', 'Humiliated'],
              relationships: [
                { to: 'grushenka', type: 'Rival', note: 'Grushenka humiliates Katerina after pretending to be friendly' },
              ],
              events: ['Kisses Grushenka\'s hand, only to be cruelly rebuffed'],
            },
            grushenka: {
              description:
                "Plays a cruel game: pretends to be sweet to Katerina, then reveals she has no intention of giving up Dmitri, relishing Katerina's humiliation.",
              traits: ['Cruel', 'Manipulative', 'Triumphant'],
              relationships: [
                { to: 'katerina', type: 'Rival', note: 'Deliberately humiliates Katerina in her own home' },
              ],
              events: ['Humiliates Katerina by withdrawing her promise and mocking her'],
            },
          },
        },
        {
          id: '3-11',
          title: 'Chapter 11: One More Ruined Reputation',
          introduces: [],
          characterDetails: {
            alyosha: {
              description:
                "Reels from the events at Katerina's. Encounters Dmitri, who has assaulted Captain Snegiryov.",
              traits: ['Shaken', 'Caught between parties'],
              relationships: [],
              events: [
                'Encounters Dmitri after leaving Katerina\'s',
                "Witnesses or hears of Dmitri's assault on Captain Snegiryov",
              ],
              timeline: [
                { label: "Witnesses Dmitri's violence", tone: 'suffering' },
              ],
            },
            dmitri: {
              description:
                "Ambushes Captain Snegiryov, publicly dragging him by the beard — an act of senseless violence that disgraces the captain.",
              traits: ['Violent', 'Impulsive', 'Misdirected rage'],
              relationships: [
                { to: 'snegiryov', type: 'Assailant', note: 'Dragged the captain by his beard in public' },
              ],
              events: ['Drags Captain Snegiryov by his beard in the marketplace'],
              timeline: [
                { label: 'Drags Snegiryov by the beard', tone: 'conflict' },
              ],
            },
          },
        },
      ],
    },

    // ── Book IV ──────────────────────────────────────────
    {
      id: 'book-4',
      title: 'Book IV: Lacerations',
      chapters: [
        {
          id: '4-1',
          title: 'Chapter 1: Father Ferapont',
          introduces: [],
          characterDetails: {
            zosima: {
              description:
                "Zosima's rival, the ascetic Father Ferapont, represents the harsh, anti-intellectual wing of the monastery. Zosima's influence is under attack.",
              traits: ['Opposed by fanatics'],
              relationships: [],
              events: ["Father Ferapont's hostility toward Zosima is described"],
            },
          },
        },
        {
          id: '4-2',
          title: "Chapter 2: At His Father's",
          introduces: [],
          characterDetails: {
            fyodor: {
              description:
                'Alyosha visits Fyodor, who is drunk and paranoid. Fyodor rants about money, Grushenka, and his hatred of Dmitri.',
              traits: ['Paranoid', 'Drunk'],
              relationships: [],
              events: ['Raves about Dmitri possibly coming to murder him for the envelope of money'],
            },
            alyosha: {
              description:
                'Visits his father, trying to mediate. Fyodor asks him point-blank whether God exists.',
              traits: ['Mediator'],
              relationships: [],
              events: ["Visits Fyodor and listens to his paranoid ranting"],
              timeline: [
                { label: 'Visits drunken Fyodor', tone: 'suffering' },
              ],
            },
          },
        },
        {
          id: '4-3',
          title: 'Chapter 3: He Gets Involved with Schoolboys',
          introduces: ['ilyusha'],
          characterDetails: {
            alyosha: {
              description:
                "Encounters a group of schoolboys throwing stones at a lone boy. The boy, Ilyusha, bites Alyosha's finger savagely.",
              traits: ['Patient', 'Curious'],
              relationships: [
                { to: 'ilyusha', type: 'First encounter', note: 'Ilyusha bites his finger viciously' },
              ],
              events: ['Is bitten on the finger by Ilyusha Snegiryov'],
              timeline: [
                { label: 'Bitten by Ilyusha', tone: 'suffering' },
              ],
            },
            ilyusha: {
              description:
                'A small, ragged boy of about nine, furiously throwing stones at other boys and biting Alyosha. Clearly tormented by something.',
              traits: ['Fierce', 'Small', 'Tormented', 'Defiant'],
              relationships: [
                { to: 'snegiryov', type: 'Son', note: "His rage stems from his father's humiliation" },
              ],
              events: ["Fights schoolboys and bites Alyosha's finger in rage"],
            },
          },
        },
        {
          id: '4-4',
          title: "Chapter 4: At the Khokhlakov's",
          introduces: ['lise'],
          characterDetails: {
            lise: {
              description:
                "Madame Khokhlakova's daughter, a girl of fourteen in a wheelchair. Clever, capricious, and sharp-tongued. Has written Alyosha a love letter.",
              traits: ['Clever', 'Capricious', 'Sharp-tongued', 'Romantic'],
              relationships: [
                { to: 'alyosha', type: 'Admirer', note: 'Has written a love letter confessing her feelings' },
              ],
              events: ['Alyosha reads her love letter; they have an intimate, playful conversation'],
            },
            alyosha: {
              description:
                "Receives Lise's letter and is flustered but gentle. Visits the Khokhlakov household seeking Katerina.",
              traits: ['Flustered', 'Gentle'],
              relationships: [
                { to: 'lise', type: 'Admirer', note: 'Responds warmly to her letter' },
              ],
              events: ["Reads Lise's love letter and visits the Khokhlakov home"],
              timeline: [
                { label: "Receives Lise's love letter", tone: 'growth' },
              ],
            },
          },
        },
        {
          id: '4-5',
          title: 'Chapter 5: Strain in the Drawing Room',
          introduces: [],
          characterDetails: {
            katerina: {
              description:
                'In the drawing room, Katerina is still reeling from Grushenka\'s cruelty. She hysterically declares her devotion to Dmitri despite everything.',
              traits: ['Hysterical', 'Stubbornly devoted'],
              relationships: [
                { to: 'ivan', type: 'Tension', note: "Ivan is pained by her devotion to Dmitri" },
              ],
              events: ['Declares she will never abandon Dmitri, even if he destroys her'],
            },
            ivan: {
              description:
                "Unable to bear Katerina's devotion to Dmitri. Storms out in anguish, revealing the depth of his feelings.",
              traits: ['Anguished', 'Jealous'],
              relationships: [
                { to: 'katerina', type: 'Unrequited love', note: 'Storms out, hurt by her loyalty to Dmitri' },
              ],
              events: ["Storms out of Katerina's drawing room in pain"],
              timeline: [
                { label: "Storms out over Katerina's devotion", tone: 'suffering' },
              ],
            },
          },
        },
        {
          id: '4-6',
          title: 'Chapter 6: Strain in the Cottage',
          introduces: ['snegiryov'],
          characterDetails: {
            snegiryov: {
              description:
                "A destitute, broken retired captain. Lives in a cramped cottage with his sick family. Dmitri dragged him by the beard publicly.",
              traits: ['Destitute', 'Humiliated', 'Proud despite poverty', 'Loving father'],
              relationships: [
                { to: 'ilyusha', type: 'Father', note: 'Ilyusha saw his humiliation and is traumatized by it' },
                { to: 'dmitri', type: 'Victim', note: 'Dmitri dragged him by his beard in public' },
              ],
              events: [
                'Alyosha visits the Snegiryov cottage and sees their poverty',
                'Snegiryov describes how Dmitri dragged him by the beard while Ilyusha watched',
              ],
            },
            alyosha: {
              description:
                "Visits Captain Snegiryov to offer help and learns the full story of Dmitri's assault. Deeply moved by the family's suffering.",
              traits: ['Moved by suffering', 'Charitable'],
              relationships: [
                { to: 'snegiryov', type: 'Benefactor', note: 'Comes to offer assistance from Katerina' },
              ],
              events: ["Visits the Snegiryov family and hears the captain's story"],
              timeline: [
                { label: 'Visits the Snegiryov family', tone: 'growth' },
              ],
            },
          },
        },
        {
          id: '4-7',
          title: 'Chapter 7: And in the Fresh Air',
          introduces: [],
          characterDetails: {
            snegiryov: {
              description:
                "Outside, Snegiryov first accepts Alyosha's 200 rubles with tearful gratitude, then suddenly crushes the notes underfoot and runs away — his pride refusing the charity.",
              traits: ['Proud', 'Torn between need and dignity'],
              relationships: [],
              events: [
                'Accepts the money from Alyosha with joy, then stamps on it and runs away',
              ],
            },
            alyosha: {
              description:
                "Watches Snegiryov's agonized refusal of the money, understanding that pride can coexist with desperate need.",
              traits: ['Understanding', 'Patient'],
              relationships: [],
              events: ['Witnesses Snegiryov crushing the money underfoot'],
              timeline: [
                { label: 'Watches Snegiryov crush the money', tone: 'revelation' },
              ],
            },
          },
        },
      ],
    },

    // ── Book V ───────────────────────────────────────────
    {
      id: 'book-5',
      title: 'Book V: Pro and Contra',
      chapters: [
        {
          id: '5-1',
          title: 'Chapter 1: The Engagement',
          introduces: [],
          characterDetails: {
            alyosha: {
              description:
                'Visits Lise again. They become informally engaged, though Alyosha is unsure of himself in matters of love.',
              traits: ['Shy in love', 'Sincere'],
              relationships: [
                { to: 'lise', type: 'Fiance', note: 'They become informally engaged' },
              ],
              events: ['Becomes engaged to Lise Khokhlakova'],
              timeline: [
                { label: 'Becomes engaged to Lise', tone: 'growth' },
              ],
            },
            lise: {
              description:
                'Overjoyed at the engagement but already shows signs of emotional instability, laughing and crying in rapid succession.',
              traits: ['Emotionally volatile', 'Overjoyed'],
              relationships: [
                { to: 'alyosha', type: 'Fiancee', note: 'They agree to marry' },
              ],
              events: ['Becomes engaged to Alyosha'],
            },
          },
        },
        {
          id: '5-2',
          title: 'Chapter 2: Smerdyakov with a Guitar',
          introduces: [],
          characterDetails: {
            smerdyakov: {
              description:
                "Found sitting outside playing guitar and courting a neighbor's daughter. He is vain, dressed above his station, contemptuous of Russia.",
              traits: ['Vain', 'Contemptuous of Russia', 'Pretentious'],
              relationships: [],
              events: ['Alyosha encounters Smerdyakov playing guitar and courting'],
            },
          },
        },
        {
          id: '5-3',
          title: 'Chapter 3: The Brothers Get Acquainted',
          introduces: [],
          characterDetails: {
            ivan: {
              description:
                "At a tavern, Ivan and Alyosha finally talk deeply. Ivan confesses he has a longing for life despite his intellectual despair. He accepts God but does not accept God's world.",
              traits: ['Torn between faith and reason', 'Longing for life', 'Intellectually honest'],
              relationships: [
                { to: 'alyosha', type: 'Brother / intellectual foil', note: 'Opens up to Alyosha as to no one else' },
              ],
              events: [
                'Meets Alyosha at the tavern for a pivotal conversation',
                'Declares he accepts God but cannot accept the world God created',
              ],
              timeline: [
                { label: "Accepts God but rejects His world", tone: 'revelation' },
              ],
            },
            alyosha: {
              description:
                'Engages Ivan in the deepest conversation they have had, listening with love but challenging Ivan from the heart.',
              traits: ['Engaged listener', 'Spiritually grounded'],
              relationships: [],
              events: ['Sits with Ivan in the tavern for their great conversation'],
              timeline: [
                { label: 'Deep conversation with Ivan at tavern', tone: 'growth' },
              ],
            },
          },
        },
        {
          id: '5-4',
          title: 'Chapter 4: Rebellion',
          introduces: [],
          characterDetails: {
            ivan: {
              description:
                'Delivers his devastating argument: he catalogues the suffering of innocent children and declares he "returns his ticket" to God\'s harmony if it requires a single child\'s tear.',
              traits: ['Morally outraged', 'Devastating rhetorician', 'Compassionate in rebellion'],
              relationships: [],
              events: [
                'Recounts horrifying cases of child suffering',
                '"Returns his ticket" — refuses to accept a harmony built on children\'s suffering',
              ],
              timeline: [
                { label: 'Returns his ticket — rejects divine harmony', tone: 'revelation' },
              ],
            },
            alyosha: {
              description:
                'Shaken by Ivan\'s argument, struggles to respond. When Ivan asks who could forgive all suffering, Alyosha whispers: "Christ."',
              traits: ['Shaken', 'Faithful under pressure'],
              relationships: [],
              events: ['Whispers "There is One who can forgive everything" — meaning Christ'],
              timeline: [
                { label: 'Whispers "Christ" in answer to Ivan', tone: 'revelation' },
              ],
            },
          },
        },
        {
          id: '5-5',
          title: 'Chapter 5: The Grand Inquisitor',
          introduces: [],
          characterDetails: {
            ivan: {
              description:
                'Recites his prose poem "The Grand Inquisitor." Christ returns to Seville during the Inquisition and is arrested. The Inquisitor tells Christ that humanity cannot bear the freedom He offered.',
              traits: ['Brilliant', 'Tormented creator', 'Ambiguous believer'],
              relationships: [
                { to: 'alyosha', type: 'Intellectual confessor', note: 'Shares his most important creation with Alyosha alone' },
              ],
              events: [
                "Recites The Grand Inquisitor — the novel's philosophical centerpiece",
                'In the poem, Christ silently kisses the Inquisitor and is released',
              ],
              timeline: [
                { label: 'Recites The Grand Inquisitor', tone: 'revelation' },
              ],
            },
            alyosha: {
              description:
                "Listens to the poem and sees it as Ivan's disguised praise of Christ. At the end, Alyosha kisses Ivan on the lips, mirroring Christ's kiss.",
              traits: ['Perceptive', 'Unconditionally loving'],
              relationships: [],
              events: [
                'Listens to the Grand Inquisitor poem',
                "Kisses Ivan on the lips, echoing Christ's kiss in the poem",
              ],
              timeline: [
                { label: "Kisses Ivan, echoing Christ's kiss", tone: 'growth' },
              ],
            },
          },
        },
        {
          id: '5-6',
          title: 'Chapter 6: For a While Still Very Unclear',
          introduces: [],
          characterDetails: {
            ivan: {
              description:
                "After parting from Alyosha, Ivan returns home. Smerdyakov intercepts him for a sinister conversation, hinting at terrible possibilities.",
              traits: ['Disturbed', 'Unwilling to understand'],
              relationships: [
                { to: 'smerdyakov', type: 'Uneasy interlocutor', note: 'Smerdyakov hints at terrible possibilities Ivan refuses to face' },
              ],
              events: ['Has a disturbing conversation with Smerdyakov about leaving for Moscow'],
              timeline: [
                { label: "Disturbed by Smerdyakov's insinuations", tone: 'conflict' },
              ],
            },
            smerdyakov: {
              description:
                'Corners Ivan with a veiled, manipulative conversation. Hints that something terrible may happen to Fyodor and that Ivan should leave town.',
              traits: ['Manipulative', 'Sinister', 'Veiled speech'],
              relationships: [
                { to: 'ivan', type: 'Manipulator', note: 'Hints Ivan should leave, implying permission for a crime' },
                { to: 'fyodor', type: 'Servant / threat', note: 'Implies Fyodor is in danger' },
              ],
              events: [
                'Tells Ivan about the "signals" for Grushenka and that he should go to Chermashnya',
                'Predicts he will have an epileptic fit — which may or may not be genuine',
              ],
            },
          },
        },
        {
          id: '5-7',
          title: "Chapter 7: 'It's Always Interesting to Talk with an Intelligent Man'",
          introduces: [],
          characterDetails: {
            ivan: {
              description:
                'Decides to leave for Moscow, not Chermashnya as Smerdyakov suggested. But he is tormented by self-disgust, sensing he is fleeing to enable a crime.',
              traits: ['Self-loathing', 'Morally compromised', 'Fleeing'],
              relationships: [],
              events: [
                'Decides to go to Moscow instead of Chermashnya',
                'Tormented by the feeling that he is complicit in whatever may happen',
              ],
              timeline: [
                { label: 'Flees to Moscow, sensing complicity', tone: 'suffering' },
              ],
            },
            smerdyakov: {
              description:
                'His parting line — "It\'s always interesting to talk with an intelligent man" — hangs ominously, confirming a secret understanding.',
              traits: ['Ominous'],
              relationships: [],
              events: ['Delivers the ominous parting line that gives the chapter its title'],
            },
          },
        },
      ],
    },

    // ── Book VI ──────────────────────────────────────────
    {
      id: 'book-6',
      title: 'Book VI: The Russian Monk',
      chapters: [
        {
          id: '6-1',
          title: 'Chapter 1: Elder Zosima and His Visitors',
          introduces: [],
          characterDetails: {
            zosima: {
              description:
                'On his deathbed, Zosima gathers his monks and Alyosha around him and begins to speak. He is weak but luminous, delivering his final teachings.',
              traits: ['Dying', 'Luminous', 'At peace'],
              relationships: [
                { to: 'alyosha', type: 'Spiritual father', note: 'Alyosha is at his bedside, recording his words' },
              ],
              events: ['Begins his final teachings from his deathbed'],
            },
            alyosha: {
              description:
                "At Zosima's bedside, faithfully recording the elder's last words. Deeply attentive and grieving.",
              traits: ['Faithful recorder', 'Grieving'],
              relationships: [],
              events: ["Records Zosima's final biography and teachings"],
              timeline: [
                { label: "At Zosima's deathbed", tone: 'suffering' },
              ],
            },
          },
        },
        {
          id: '6-2',
          title: 'Chapter 2: From the Life of the Elder Zosima',
          introduces: [],
          characterDetails: {
            zosima: {
              description:
                "Tells his life story: a beloved older brother Markel who died young after a sudden spiritual conversion. As a young officer, Zosima fought a duel but threw away his shot and begged forgiveness.",
              traits: ['Former officer', 'Transformed by grace', "Brother's influence"],
              relationships: [],
              events: [
                "Recounts his brother Markel's death and spiritual awakening",
                'Describes his duel: threw away his shot and begged forgiveness',
                'Renounced the military and entered the monastery',
                'Met a "mysterious visitor" who confessed a secret murder to him',
              ],
            },
          },
        },
        {
          id: '6-3',
          title: 'Chapter 3: From the Talks and Homilies of Elder Zosima',
          introduces: [],
          characterDetails: {
            zosima: {
              description:
                'Delivers his core teachings: every person is responsible for everyone and everything; hell is the suffering of being unable to love; the earth itself is sacred.',
              traits: ['Universal love', 'Radical responsibility', 'Earth-affirming spirituality'],
              relationships: [],
              events: [
                'Teaches that each person is guilty before all and for all',
                'Defines hell as the inability to love',
                'Calls his listeners to love all of God\'s creation',
                'Zosima dies shortly after these final words',
              ],
            },
            alyosha: {
              description:
                "Receives Zosima's final teachings, which will become his spiritual foundation for everything that follows.",
              traits: ['Spiritually transformed', 'Grieving but strengthened'],
              relationships: [],
              events: ["Hears Zosima's final homilies and is profoundly shaped by them"],
              timeline: [
                { label: "Receives Zosima's final teachings", tone: 'revelation' },
              ],
            },
          },
        },
      ],
    },
  ],
}
