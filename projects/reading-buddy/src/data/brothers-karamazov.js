export default {
  id: 'brothers-karamazov',
  title: 'The Brothers Karamazov',
  author: 'Fyodor Dostoevsky',

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
  },

  books: [
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
            },
          },
        },
      ],
    },
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
                {
                  to: 'dmitri',
                  type: 'Father',
                  note: 'Abandoned Dmitri as a child after his first wife fled',
                },
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
                {
                  to: 'fyodor',
                  type: 'Son',
                  note: 'Abandoned by Fyodor as an infant',
                },
              ],
              events: ['Left in the care of the servant Grigory as a baby'],
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
                {
                  to: 'ivan',
                  type: 'Father',
                  note: 'Neglects Ivan and Alyosha from his second marriage',
                },
                {
                  to: 'alyosha',
                  type: 'Father',
                  note: 'Neglects both sons of his second marriage',
                },
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
                {
                  to: 'fyodor',
                  type: 'Son',
                  note: "Neglected by Fyodor after mother's death",
                },
                {
                  to: 'alyosha',
                  type: 'Brother',
                  note: "Full brother, both from Fyodor's second marriage",
                },
              ],
              events: [
                'Raised by Yefim Petrovich after being orphaned',
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
                {
                  to: 'zosima',
                  type: 'Disciple',
                  note: 'Becomes devoted to Elder Zosima at the monastery',
                },
              ],
              events: [
                'Enters the monastery',
                "Becomes Elder Zosima's devoted follower",
              ],
            },
            zosima: {
              description:
                'An elder of the monastery, revered by many as a holy man and spiritual guide. Practices the tradition of receiving visitors for counsel.',
              traits: ['Wise', 'Compassionate', 'Charismatic elder'],
              relationships: [
                {
                  to: 'alyosha',
                  type: 'Spiritual mentor',
                  note: 'Takes Alyosha under his care',
                },
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
              traits: [
                'Controversial within the monastery',
                'Absolute spiritual authority',
              ],
              relationships: [],
              events: [
                'The practice of "elders" in Russian monasticism is explained',
              ],
            },
          },
        },
      ],
    },
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
            },
            zosima: {
              description:
                'Senses his own approaching death. Instructs Alyosha to leave the monastery to be near his brothers.',
              traits: ['Prophetic', 'Self-aware of mortality'],
              relationships: [
                {
                  to: 'alyosha',
                  type: 'Spiritual mentor',
                  note: 'Sends Alyosha out into the world, believing it is his true calling',
                },
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
                {
                  to: 'katerina',
                  type: 'Fiancee',
                  note: 'Engaged to Katerina but consumed by passion for Grushenka',
                },
                {
                  to: 'grushenka',
                  type: 'Love interest',
                  note: 'Obsessively in love with Grushenka',
                },
                {
                  to: 'fyodor',
                  type: 'Rival',
                  note: "Father and son compete for Grushenka's affection",
                },
              ],
              events: [
                'Confronts Fyodor about the inheritance and about Grushenka',
              ],
            },
            katerina: {
              description:
                'A proud, beautiful, well-born woman engaged to Dmitri. Once humiliated herself before Dmitri to save her father from disgrace.',
              traits: ['Proud', 'Self-sacrificing', 'Strong-willed'],
              relationships: [
                {
                  to: 'dmitri',
                  type: 'Fiancee',
                  note: 'Engaged, though Dmitri is unfaithful in his heart',
                },
                {
                  to: 'ivan',
                  type: 'Admirer',
                  note: 'Ivan is drawn to her, creating a secondary love triangle',
                },
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
                {
                  to: 'dmitri',
                  type: 'Pursued by',
                  note: 'Dmitri is desperately in love with her',
                },
                {
                  to: 'fyodor',
                  type: 'Pursued by',
                  note: 'Fyodor tries to lure her with money',
                },
              ],
              events: [
                'Mentioned as the object of the father-son rivalry',
              ],
            },
            smerdyakov: {
              description:
                'Fyodor\'s cook and servant, rumored to be his illegitimate son by the vagrant "Stinking Lizaveta." Epileptic, resentful, and quietly intelligent.',
              traits: [
                'Epileptic',
                'Resentful',
                'Quietly intelligent',
                'Servile',
              ],
              relationships: [
                {
                  to: 'fyodor',
                  type: 'Illegitimate son / servant',
                  note: 'Believed to be Fyodor\'s son by Lizaveta Smerdyashchaya',
                },
                {
                  to: 'ivan',
                  type: 'Intellectual admirer',
                  note: 'Looks up to Ivan, absorbs his philosophical ideas',
                },
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
                {
                  to: 'katerina',
                  type: 'Confidant',
                  note: 'Katerina trusts Alyosha as a go-between',
                },
              ],
              events: [
                'Visits Katerina Ivanovna at her home',
                'Observes the complicated dynamic between Ivan and Katerina',
              ],
            },
            ivan: {
              description:
                'Clearly drawn to Katerina, though he masks his feelings. His intellectual pride keeps him aloof.',
              traits: ['Emotionally guarded', 'Proud'],
              relationships: [
                {
                  to: 'katerina',
                  type: 'Secret admirer',
                  note: 'Attracted to Katerina but unwilling to show it',
                },
              ],
              events: [
                "Present at Katerina's when Alyosha visits",
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
            },
            zosima: {
              description:
                'In a stunning gesture, bows deeply before Dmitri, touching his forehead to the ground — seemingly foreseeing Dmitri\'s future suffering.',
              traits: ['Prophetic'],
              relationships: [
                {
                  to: 'dmitri',
                  type: 'Seer',
                  note: 'Bows before Dmitri, foreshadowing his great suffering',
                },
              ],
              events: [
                'Bows to the ground before Dmitri in a mysterious, prophetic gesture',
              ],
            },
          },
        },
      ],
    },
  ],
}
