// ── General Knowledge Question Bank ──────────────────────────

function getGeneralQuestions(level) {
  const banks = { reception: gkReception, year1: gkYear1, year2: gkYear2,
    year3: gkYear3, year4: gkYear4, year5: gkYear5, year6: gkYear6 };
  return (banks[level] || banks.year1)();
}

function mcq(q, correct, w1, w2, w3, emoji) {
  const a = sh([correct, w1, w2, w3]);
  return { question: q, answers: a, correct: a.indexOf(correct), emoji: emoji||null };
}
function sh(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function gkReception() { return [
  mcq('What colour is the sky?',            'blue',   'red',    'green',  'yellow', '☁️'),
  mcq('What colour is grass?',              'green',  'blue',   'red',    'orange', '🌿'),
  mcq('What does a dog say?',               'woof',   'meow',   'moo',    'baa',    '🐶'),
  mcq('What does a cat say?',               'meow',   'woof',   'moo',    'quack',  '🐱'),
  mcq('What does a cow say?',               'moo',    'neigh',  'oink',   'roar',   '🐮'),
  mcq('Which animal has a long neck?',      'giraffe','elephant','lion',  'zebra',  '🦒'),
  mcq('Which animal is the king of the jungle?','lion','tiger','elephant','bear',   '🦁'),
  mcq('How many seasons are there?',        '4',      '3',      '5',      '6'),
  mcq('What season is it when it snows?',   'winter', 'summer', 'spring', 'autumn', '❄️'),
  mcq('How many days in a week?',           '7',      '5',      '6',      '8'),
  mcq('What shape is a pizza?',             'circle', 'square', 'triangle','star',  '🍕'),
  mcq('Which is a fruit?',                  'banana', 'carrot', 'potato', 'onion',  '🍌'),
  mcq('How many fingers on one hand?',      '5',      '4',      '6',      '10'),
  mcq('What do we use to brush our teeth?', 'toothbrush','spoon','fork',  'comb',   '🦷'),
  mcq('What colour is a fire engine?',      'red',    'blue',   'green',  'yellow', '🚒'),
];}

function gkYear1() { return [
  mcq('What is the capital city of England?',  'London',     'Paris',    'Madrid',   'Rome',      '🏙️'),
  mcq('How many months in a year?',            '12',         '10',       '11',       '13'),
  mcq('Which animal lives in the sea?',        'dolphin',    'lion',     'elephant', 'giraffe',   '🐬'),
  mcq('What do plants need to grow?',          'sunlight and water','milk and juice','sand','sugar','🌱'),
  mcq('Which planet do we live on?',           'Earth',      'Mars',     'Venus',    'Jupiter',   '🌍'),
  mcq('What is the biggest ocean?',            'Pacific',    'Atlantic', 'Indian',   'Arctic',    '🌊'),
  mcq('What colour are bananas?',              'yellow',     'red',      'green',    'purple',    '🍌'),
  mcq('How many legs does a spider have?',     '8',          '6',        '4',        '10'),
  mcq('Which is the coldest continent?',       'Antarctica', 'Africa',   'Europe',   'Asia',      '🧊'),
  mcq('What do caterpillars become?',          'butterflies','bees',     'flies',    'moths',     '🦋'),
  mcq('What is 2D shape with 3 sides?',        'triangle',   'square',   'circle',   'rectangle'),
  mcq('Which animal is famous for its stripes?','zebra',     'lion',     'giraffe',  'hippo',     '🦓'),
  mcq('What gas do humans breathe in?',        'oxygen',     'carbon dioxide','nitrogen','hydrogen','💨'),
  mcq('Which season comes after winter?',      'spring',     'autumn',   'summer',   'winter'),
  mcq('Who wrote the Harry Potter books?',     'J.K. Rowling','Roald Dahl','C.S. Lewis','J.R.R. Tolkien','📚'),
];}

function gkYear2() { return [
  mcq('What is the largest continent?',        'Asia',       'Africa',   'Europe',   'America',   '🌏'),
  mcq('How many continents are there?',        '7',          '5',        '6',        '8'),
  mcq('What is the largest mammal on Earth?',  'blue whale',  'elephant', 'giraffe',  'polar bear','🐋'),
  mcq('Which planet is known as the Red Planet?','Mars',     'Jupiter',  'Saturn',   'Venus',     '🔴'),
  mcq('What is H₂O the chemical formula for?', 'water',      'oxygen',   'hydrogen', 'salt',      '💧'),
  mcq('What do we call a baby dog?',           'puppy',      'cub',      'kitten',   'lamb',      '🐶'),
  mcq('Which country has the Eiffel Tower?',   'France',     'Spain',    'Italy',    'Germany',   '🗼'),
  mcq('What type of animal is a whale?',       'mammal',     'fish',     'reptile',  'amphibian', '🐋'),
  mcq('Which sense do we use our nose for?',   'smell',      'sight',    'hearing',  'taste',     '👃'),
  mcq('What is the closest star to Earth?',    'the Sun',    'Sirius',   'Polaris',  'Venus',     '☀️'),
  mcq('How many sides does a hexagon have?',   '6',          '5',        '7',        '8'),
  mcq('What is the opposite of north?',        'south',      'east',     'west',     'up',        '🧭'),
  mcq('Which animal is known for its memory?', 'elephant',   'goldfish', 'dog',      'cat',       '🐘'),
  mcq('What language is spoken in Brazil?',    'Portuguese', 'Spanish',  'English',  'French',    '🇧🇷'),
  mcq('What is the tallest mountain in the world?','Mount Everest','K2','Mont Blanc','Kilimanjaro','⛰️'),
];}

function gkYear3() { return [
  mcq('What is the capital of France?',         'Paris',         'Lyon',     'Marseille', 'Nice',      '🇫🇷'),
  mcq('What is the capital of Australia?',      'Canberra',      'Sydney',   'Melbourne', 'Brisbane',  '🇦🇺'),
  mcq('How many bones are in the human body?',  '206',           '196',      '216',       '186'),
  mcq('What is the currency of the USA?',       'Dollar',        'Pound',    'Euro',      'Yen',       '💵'),
  mcq('Which is the longest river in the world?','Nile',         'Amazon',   'Mississippi','Yangtze',  '🌊'),
  mcq('What does a herbivore eat?',             'plants',        'meat',     'both',      'fish',      '🌿'),
  mcq('Which gas do plants absorb?',            'carbon dioxide','oxygen',   'nitrogen',  'hydrogen'),
  mcq('What is the boiling point of water (°C)?','100',          '90',       '110',       '80',        '♨️'),
  mcq('How many planets in our solar system?',  '8',             '9',        '7',         '10',        '🪐'),
  mcq('What is the largest country by area?',   'Russia',        'China',    'USA',       'Canada',    '🗺️'),
  mcq('What is the hardest natural substance?', 'diamond',       'gold',     'iron',      'platinum',  '💎'),
  mcq('Who invented the telephone?',            'Alexander Graham Bell','Thomas Edison','Nikola Tesla','Einstein'),
  mcq('Which ocean is the smallest?',           'Arctic',        'Indian',   'Atlantic',  'Pacific',   '🧊'),
  mcq('What do we call animals active at night?','nocturnal',    'diurnal',  'dormant',   'migratory'),
  mcq('Which planet has rings?',                'Saturn',        'Jupiter',  'Mars',      'Uranus',    '🪐'),
];}

function gkYear4() { return [
  mcq('In what year did World War II end?',      '1945',       '1939',     '1918',       '1944',      '⚔️'),
  mcq('What is the chemical symbol for gold?',   'Au',         'Ag',       'Gd',         'Gl',        '🥇'),
  mcq('What is the chemical symbol for iron?',   'Fe',         'Ir',       'In',         'Io'),
  mcq('What country has the most population?',   'India',      'China',    'USA',        'Brazil',    '🌏'),
  mcq('What type of energy does the Sun give?',  'light & heat','chemical','electrical', 'kinetic',   '☀️'),
  mcq('What is photosynthesis?',                 'How plants make food using sunlight','How animals breathe','A type of weather','A kind of exercise'),
  mcq('What is the capital of Japan?',           'Tokyo',      'Beijing',  'Seoul',      'Bangkok',   '🇯🇵'),
  mcq('What is the name of the galaxy we live in?','Milky Way','Andromeda','Orion',      'Triangulum','🌌'),
  mcq('What is the speed of light (approx km/s)?','300,000',   '150,000',  '450,000',    '200,000'),
  mcq('What part of the body produces insulin?', 'pancreas',   'liver',    'kidney',     'heart'),
  mcq('Who painted the Mona Lisa?',              'Leonardo da Vinci','Michelangelo','Raphael','Picasso','🎨'),
  mcq('What is the largest desert in the world?','Sahara',     'Gobi',     'Arabian',    'Antarctic'),
  mcq('What is Newton\'s first law about?',      'inertia',    'gravity',  'energy',     'momentum'),
  mcq('What is the currency of Japan?',          'Yen',        'Won',      'Yuan',       'Ringgit',   '💴'),
  mcq('Which country invented paper?',           'China',      'Egypt',    'India',      'Greece'),
];}

function gkYear5() { return [
  mcq('What is the powerhouse of the cell?',        'mitochondria',   'nucleus',     'ribosome',    'vacuole'),
  mcq('What is DNA?',                               'Genetic material in cells','A type of protein','A cell membrane','A type of sugar'),
  mcq('In what year did man first land on the Moon?','1969',           '1959',        '1979',        '1989',       '🌕'),
  mcq('What is the Magna Carta (1215)?',             'A document limiting the king\'s power','A battle','A type of castle','A royal wedding'),
  mcq('What is the capital of Canada?',              'Ottawa',          'Toronto',     'Vancouver',   'Montreal',   '🇨🇦'),
  mcq('Which element has atomic number 1?',          'Hydrogen',        'Helium',      'Lithium',     'Carbon'),
  mcq('What is the process of a solid turning into a gas called?','sublimation','condensation','evaporation','melting'),
  mcq('What is the largest organ in the human body?','skin',            'liver',       'brain',       'heart'),
  mcq('Who was the first woman to win a Nobel Prize?','Marie Curie',    'Florence Nightingale','Amelia Earhart','Rosalind Franklin'),
  mcq('What is the term for animals with a backbone?','vertebrates',    'invertebrates','mammals',    'reptiles'),
  mcq('What is the capital of Egypt?',               'Cairo',           'Alexandria',  'Luxor',       'Giza',       '🇪🇬'),
  mcq('What is a prime number?',                     'A number divisible only by 1 and itself','An even number','A square number','A multiple of 10'),
  mcq('Is Pluto a planet?',                          'No — it\'s a dwarf planet','Yes','Sometimes','Only at night'),
  mcq('What is the study of earthquakes called?',    'seismology',      'geology',     'meteorology', 'vulcanology'),
  mcq('Who developed the theory of relativity?',     'Einstein',        'Newton',      'Darwin',      'Galileo',    '🧠'),
];}

function gkYear6() { return [
  mcq('What is the UN?',                            'United Nations — an international peace organisation','A sports league','An American school','A type of government'),
  mcq('Who wrote "Romeo and Juliet"?',              'William Shakespeare','Charles Dickens','Jane Austen','Geoffrey Chaucer','📜'),
  mcq('What was the Cold War?',                     'Political tension between USA and USSR (1947–1991)','A war fought in Arctic','A climate period','A trade dispute'),
  mcq('What is GDP?',                               'Gross Domestic Product — total value of a country\'s output','Government Debt Policy','Global Defence Plan','General Data Protocol'),
  mcq('What is the pH of pure water?',              '7','0','14','5'),
  mcq('What is Newton\'s third law?',               'Every action has an equal and opposite reaction','Objects in motion stay in motion','Force = mass × acceleration','Gravity is universal'),
  mcq('Who was the first President of the USA?',    'George Washington','Abraham Lincoln','Thomas Jefferson','John Adams'),
  mcq('What is the Pythagorean theorem?',           'a² + b² = c²','a + b = c','a × b = c²','a² − b² = c'),
  mcq('What is the capital of South Africa?',       'Pretoria (executive)','Cape Town','Johannesburg','Durban',     '🇿🇦'),
  mcq('What causes the seasons on Earth?',          'Earth\'s axial tilt','Distance from the Sun','The Moon\'s pull','Solar flares'),
  mcq('What is osmosis?',                           'Movement of water through a semi-permeable membrane','A type of cell division','Breaking down food','A kind of energy transfer'),
  mcq('Who discovered penicillin?',                 'Alexander Fleming','Louis Pasteur','Marie Curie','Edward Jenner'),
  mcq('What is the International Space Station?',   'A habitable satellite orbiting Earth','A space telescope','A rocket launch site','A type of satellite'),
  mcq('What is the greenhouse effect?',             'Trapping of heat by atmospheric gases','A gardening method','Cooling of the planet','A cloud formation'),
  mcq('What language has the most native speakers?','Mandarin Chinese','English','Spanish','Hindi'),
];}
