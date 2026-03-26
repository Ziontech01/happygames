// ── Spelling Quiz Question Bank ───────────────────────────────
// Uses QuizEngine. Mix of multiple-choice and typed questions.
// Format: { question, answers[], correct (index), explanation }
// Typed questions: { question, type:'typed', answers:['correct'], acceptedAnswers:[], explanation }

function getSpellingQuestions(level) {
  switch (level) {
    case 'reception': return splReception();
    case 'year1':     return splYear1();
    case 'year2':     return splYear2();
    case 'year3':     return splYear3();
    case 'year4':     return splYear4();
    case 'year5':     return splYear5();
    case 'year6':     return splYear6();
    default:          return splYear1();
  }
}

function splMCQ(question, answers, correct, explanation, emoji) {
  return { question, answers, correct, explanation, emoji: emoji || null };
}

function splTyped(question, answer, hint, explanation) {
  return { question, type: 'typed', answers: [answer], acceptedAnswers: [answer.toLowerCase()], explanation, emoji: hint || null };
}

// ── Reception (Age 4–5) ─────────────────────────────────────
function splReception() {
  return [
    splMCQ('Which spells the sound a dog makes?', ['wuf', 'woof', 'wuf', 'wouf'], 1, 'Woof! Dogs say "woof" — w-o-o-f! 🐶', '🐶'),
    splMCQ('Which word rhymes with "cat"?', ['car', 'cup', 'hat', 'can'], 2, '"Hat" rhymes with "cat" — they both end in "-at"! 🎩', '🐱'),
    splMCQ('Which word spells a colour?', ['rede', 'red', 'reed', 'redd'], 1, 'Red is a colour — r-e-d! 🔴', '🎨'),
    splMCQ('Which correctly spells a number?', ['won', 'wun', 'one', 'oan'], 2, '"One" — it is a tricky word! O-N-E. 1️⃣', '1️⃣'),
    splMCQ('Which word spells something you sit on?', ['char', 'chare', 'chair', 'chiar'], 2, 'Chair — c-h-a-i-r! You sit on a chair. 🪑', '🪑'),
    splMCQ('Which is the correct spelling?', ['sun', 'son', 'sune', 'sunn'], 0, 'Sun — s-u-n. The sun shines in the sky! ☀️', '☀️'),
    splMCQ('Which word names an animal?', ['frog', 'forg', 'forog', 'froge'], 0, 'Frog — f-r-o-g. Frogs jump and say ribbit! 🐸', '🐸'),
    splMCQ('Find the correctly spelt word:', ['buk', 'book', 'bouk', 'boke'], 1, 'Book — b-o-o-k. You read a book! 📚', '📚'),
    splMCQ('Which spells something you eat?', ['kake', 'caek', 'cake', 'cak'], 2, 'Cake — c-a-k-e. Delicious! 🎂', '🎂'),
    splMCQ('Which word spells a number?', ['to', 'two', 'tow', 'tue'], 1, 'Two — t-w-o. It is a tricky spelling! ✌️', '2️⃣'),
    splMCQ('Which word names something in the sky?', ['star', 'ster', 'stare', 'starr'], 0, 'Star — s-t-a-r. Stars twinkle at night! ⭐', '⭐'),
    splMCQ('Which correctly spells an action?', ['runn', 'run', 'rune', 'rn'], 1, 'Run — r-u-n. You run fast! 🏃', '🏃'),
    splMCQ('Which spells something you drink?', ['milk', 'milck', 'milke', 'mylk'], 0, 'Milk — m-i-l-k. Good for your bones! 🥛', '🥛'),
    splMCQ('Which word names a colour?', ['bloo', 'blew', 'blue', 'blou'], 2, 'Blue — b-l-u-e. The sky is blue! 💙', '💙'),
    splMCQ('Which spells a number?', ['thre', 'three', 'tree', 'threa'], 1, 'Three — t-h-r-e-e! 3️⃣', '3️⃣'),
  ];
}

// ── Year 1 (Age 5–6) ────────────────────────────────────────
function splYear1() {
  return [
    splMCQ('Which is the correct spelling?', ['becaus', 'because', 'becuase', 'becouse'], 1, '"Because" — b-e-c-a-u-s-e. A tricky one! Try saying: "Big Elephants Can Always Understand Small Elephants"! 🐘'),
    splMCQ('Which spells a day of the week?', ['Munday', 'Mownday', 'Monday', 'Mondey'], 2, 'Monday — M-o-n-d-a-y. Days of the week always have a capital letter! 📅'),
    splMCQ('Which is correct?', ['thay', 'thei', 'they', 'thaye'], 2, '"They" — t-h-e-y. A common sight word to learn! 👫'),
    splMCQ('Choose the correct spelling:', ['hav', 'haev', 'have', 'hafe'], 2, '"Have" — h-a-v-e. The "e" at the end is silent! 🤫'),
    splMCQ('Which is correct?', ['liek', 'like', 'lyke', 'leke'], 1, '"Like" — l-i-k-e. I like lots of things! 😊'),
    splMCQ('Which correctly spells a common word?', ['sed', 'sayd', 'said', 'sead'], 2, '"Said" — s-a-i-d. It sounds like "sed" but is spelled differently! ✍️'),
    splMCQ('Find the correct spelling:', ['yor', 'your', 'yore', 'youre'], 1, '"Your" — y-o-u-r. "Is this YOUR bag?" 🎒'),
    splMCQ('Which is correct?', ['wen', 'whan', 'when', 'ween'], 2, '"When" — w-h-e-n. The "wh" makes a /w/ sound! ⏰'),
    splMCQ('Choose the correct spelling:', ['whent', 'went', 'wennt', 'wenet'], 1, '"Went" — w-e-n-t. Past tense of "go"! 🚶'),
    splMCQ('Which is correct?', ['thier', 'ther', 'thare', 'there'], 3, '"There" — t-h-e-r-e. "It is over THERE." 👉'),
    splMCQ('Find the correct spelling:', ['cum', 'come', 'comb', 'coome'], 1, '"Come" — c-o-m-e. "Come here!" The e is silent! 👋'),
    splMCQ('Which is correct?', ['sum', 'some', 'soum', 'soom'], 1, '"Some" — s-o-m-e. "Can I have SOME cake?" 🎂'),
    splMCQ('Choose the correct spelling:', ['littel', 'litl', 'little', 'litlle'], 2, '"Little" — l-i-t-t-l-e. Double "t" in the middle! 🐭'),
    splMCQ('Which is correct?', ['wota', 'warter', 'water', 'watter'], 2, '"Water" — w-a-t-e-r. We all need water! 💧'),
    splMCQ('Find the correct spelling:', ['luv', 'luve', 'love', 'lov'], 2, '"Love" — l-o-v-e. The "o" makes an /u/ sound! ❤️'),
  ];
}

// ── Year 2 (Age 6–7) ────────────────────────────────────────
function splYear2() {
  return [
    splMCQ('Which is correct?', ['cood', 'coud', 'could', 'cuold'], 2, '"Could" — c-o-u-l-d. The "l" is silent! "Could, would, should" all have a silent l. 🤫'),
    splMCQ('Choose the correct spelling:', ['shood', 'should', 'shoold', 'shoud'], 1, '"Should" — s-h-o-u-l-d. Silent l again! Just like could and would. 🤫'),
    splMCQ('Which is correct?', ['agen', 'agian', 'agaen', 'again'], 3, '"Again" — a-g-a-i-n. "Let\'s play again!" 🔄'),
    splMCQ('Find the correct spelling:', ['difer', 'differant', 'different', 'difrent'], 2, '"Different" — d-i-f-f-e-r-e-n-t. Double "f"! 🔤'),
    splMCQ('Which is correct?', ['frend', 'freind', 'friend', 'friand'], 2, '"Friend" — f-r-i-e-n-d. "i before e" here! 👫'),
    splMCQ('Choose the correct spelling:', ['grate', 'graet', 'greet', 'great'], 3, '"Great" — g-r-e-a-t. "You did a GREAT job!" ⭐'),
    splMCQ('Which is correct?', ['peeple', 'peaple', 'people', 'peopel'], 2, '"People" — p-e-o-p-l-e. Tricky! The "eo" together is unusual. 👥'),
    splMCQ('Find the correct spelling:', ['scool', 'skoool', 'scholl', 'school'], 3, '"School" — s-c-h-o-o-l. "sch" makes a /sk/ sound! 🏫'),
    splMCQ('Which is correct?', ['evry', 'every', 'evrey', 'everi'], 1, '"Every" — e-v-e-r-y. There\'s no "a" — just "every"! 📖'),
    splMCQ('Choose the correct spelling:', ['herd', 'heard', 'heird', 'heaerd'], 1, '"Heard" — h-e-a-r-d. "I HEARD a noise." It contains "ear"! 👂'),
    splMCQ('Which is correct?', ['dont', "don't", 'dont\'', 'd\'ont'], 1, '"Don\'t" — the apostrophe replaces the "o" in "not": do not = don\'t! 📝'),
    splMCQ('Find the correct spelling:', ['breack', 'braek', 'break', 'breake'], 2, '"Break" — b-r-e-a-k. "Let\'s take a BREAK." ☕'),
    splMCQ('Which is correct?', ['becaus', 'because', 'becuase', 'becose'], 1, '"Because" — b-e-c-a-u-s-e. "Big Elephants Can Always Understand Small Elephants"! 🐘'),
    splMCQ('Choose the correct spelling:', ['woud', 'wood', 'would', 'wold'], 2, '"Would" — w-o-u-l-d. Silent l! Would, could, should all work the same way. 🤫'),
    splMCQ('Which is correct?', ['nite', 'knight', 'night', 'nigt'], 2, '"Night" — n-i-g-h-t. The "gh" is silent — it\'s a tricky spelling! 🌙'),
  ];
}

// ── Year 3 (Age 7–8) ────────────────────────────────────────
function splYear3() {
  return [
    splMCQ('Which is correct?', ['acsident', 'aksidant', 'accident', 'acident'], 2, '"Accident" — a-c-c-i-d-e-n-t. Double "c"! An accident happens by mistake. 🚨'),
    splMCQ('Choose the correct spelling:', ['Februar', 'Febuary', 'February', 'Feburary'], 2, '"February" — F-e-b-r-u-a-r-y. There are two "r"s — the first one is often missed! 📅'),
    splMCQ('Which is correct?', ['beleve', 'beleive', 'believe', 'beleave'], 2, '"Believe" — b-e-l-i-e-v-e. "I before e except after c" helps here! 🌟'),
    splMCQ('Find the correct spelling:', ['gramer', 'grammer', 'grammar', 'gramear'], 2, '"Grammar" — g-r-a-m-m-a-r. Double "m" and ends in "ar" not "er"! ✏️'),
    splMCQ('Which is correct?', ['separete', 'seperate', 'separate', 'separrate'], 2, '"Separate" — s-e-p-a-r-a-t-e. There\'s a RAT in "sepaRAte"! 🐀'),
    splMCQ('Choose the correct spelling:', ['nessesary', 'necessary', 'neccesary', 'necesary'], 1, '"Necessary" — one Collar, two Socks: n-e-c-e-s-s-a-r-y. One c, two s! 🧦'),
    splMCQ('Which is correct?', ['adress', 'addres', 'address', 'adresse'], 2, '"Address" — a-d-d-r-e-s-s. Double d AND double s! 📮'),
    splMCQ('Find the correct spelling:', ['calender', 'calendar', 'calander', 'calendur'], 1, '"Calendar" — c-a-l-e-n-d-a-r. Ends in "ar" not "er"! 📅'),
    splMCQ('Which is correct?', ['knowlege', 'knowledge', 'knolwedge', 'knowlegde'], 1, '"Knowledge" — k-n-o-w-l-e-d-g-e. The "k" and "w" are both pronounced! 🧠'),
    splMCQ('Choose the correct spelling:', ['libary', 'libarry', 'library', 'librery'], 2, '"Library" — l-i-b-r-a-r-y. Two r\'s! People often forget the first "r". 📚'),
    splMCQ('Which is correct?', ['exersise', 'exircise', 'exercise', 'excersize'], 2, '"Exercise" — e-x-e-r-c-i-s-e. Remember: exERCIse! 🏃'),
    splMCQ('Find the correct spelling:', ['possable', 'posible', 'possible', 'possibal'], 2, '"Possible" — p-o-s-s-i-b-l-e. Double s! 💡'),
    splMCQ('Which is correct?', ['intrest', 'interest', 'intarest', 'enterest'], 1, '"Interest" — i-n-t-e-r-e-s-t. Don\'t drop the middle "e"! 🎯'),
    splMCQ('Choose the correct spelling:', ['bisycul', 'bicycle', 'bycycle', 'bicyle'], 1, '"Bicycle" — b-i-c-y-c-l-e. Think: two cycles (bi = two)! 🚲'),
    splMCQ('Which is correct?', ['gurad', 'gaurd', 'guard', 'guerd'], 2, '"Guard" — g-u-a-r-d. The "ua" together is unusual! 💂'),
  ];
}

// ── Year 4 (Age 8–9) ────────────────────────────────────────
function splYear4() {
  return [
    splMCQ('Which is correct?', ['ocasion', 'occassion', 'occation', 'occasion'], 3, '"Occasion" — o-c-c-a-s-i-o-n. Double c, single s! 🎉'),
    splMCQ('Choose the correct spelling:', ['posession', 'possesion', 'possession', 'posesion'], 2, '"Possession" — p-o-s-s-e-s-s-i-o-n. Double s TWICE! 📦'),
    splMCQ('Which is correct?', ['measurment', 'measurament', 'measurement', 'meassurement'], 2, '"Measurement" — m-e-a-s-u-r-e-m-e-n-t. Keep the "e" after "measur"! 📏'),
    splMCQ('Find the correct spelling:', ['dissapear', 'dissappear', 'disapear', 'disappear'], 3, '"Disappear" — d-i-s-a-p-p-e-a-r. One s, double p! 👻'),
    splMCQ('Which is correct?', ['soverign', 'sovereign', 'sovreign', 'soveregn'], 1, '"Sovereign" — s-o-v-e-r-e-i-g-n. The silent "g" before "n" trips people up! 👑'),
    splMCQ('Choose the correct spelling:', ['immagine', 'imaggine', 'imagine', 'imageine'], 2, '"Imagine" — i-m-a-g-i-n-e. Single m and single g! 💭'),
    splMCQ('Which is correct?', ['suprise', 'surpise', 'surprise', 'surpirse'], 2, '"Surprise" — s-u-r-p-r-i-s-e. The first "r" is often missed in speech! 🎁'),
    splMCQ('Find the correct spelling:', ['stratagey', 'strategy', 'stratergy', 'startegy'], 1, '"Strategy" — s-t-r-a-t-e-g-y. No extra "r" before the "g"! ♟️'),
    splMCQ('Which is correct?', ['recieve', 'receve', 'receive', 'recieave'], 2, '"Receive" — r-e-c-e-i-v-e. "i before e EXCEPT after c" — re-C-eive! 📬'),
    splMCQ('Choose the correct spelling:', ['consciance', 'conscience', 'conshence', 'conscence'], 1, '"Conscience" — c-o-n-s-c-i-e-n-c-e. The "sc" makes an /sh/ sound! 💚'),
    splMCQ('Which is correct?', ['privalege', 'privilidge', 'privilige', 'privilege'], 3, '"Privilege" — p-r-i-v-i-l-e-g-e. Not "privelege"! 🌟'),
    splMCQ('Find the correct spelling:', ['freequent', 'frequent', 'frequant', 'frquent'], 1, '"Frequent" — f-r-e-q-u-e-n-t. Remember: "q" is almost always followed by "u"! ⏰'),
    splMCQ('Which is correct?', ['acheive', 'achieve', 'achive', 'acheeve'], 1, '"Achieve" — a-c-h-i-e-v-e. "i before e" — ach-I-E-ve! 🏆'),
    splMCQ('Choose the correct spelling:', ['corageous', 'couragous', 'courageous', 'couraegous'], 2, '"Courageous" — c-o-u-r-a-g-e-o-u-s. Keep the "e" before "ous"! 🦁'),
    splTyped('Type the correct spelling of the month after January:', 'february', '📅', '"February" has two r\'s — F-e-b-r-u-a-r-y. The first r is often forgotten! ❄️'),
  ];
}

// ── Year 5 (Age 9–10) ───────────────────────────────────────
function splYear5() {
  return [
    splMCQ('Which is correct?', ['accomodate', 'accommodate', 'acommodate', 'accommadate'], 1, '"Accommodate" — two c\'s AND two m\'s! Think: "ACCOMModate" = Double C, Double M! 🏨'),
    splMCQ('Choose the correct spelling:', ['enbarass', 'embarras', 'embarrass', 'embarass'], 2, '"Embarrass" — e-m-b-a-r-r-a-s-s. Double r AND double s! How embarrassing to spell it wrong! 😳'),
    splMCQ('Which is correct?', ['definately', 'definitely', 'definetly', 'defiantly'], 1, '"Definitely" — d-e-f-i-n-i-t-e-l-y. Contains "finite"! De-finite-ly. ✅'),
    splMCQ('Find the correct spelling:', ['rythm', 'rhthym', 'rhythm', 'rhytem'], 2, '"Rhythm" — r-h-y-t-h-m. No vowels except "y"! Try: Rhythm Helps Your Two Hips Move! 🎵'),
    splMCQ('Which is correct?', ['conscous', 'conshious', 'conscious', 'consious'], 2, '"Conscious" — c-o-n-s-c-i-o-u-s. The "sci" makes a /sh/ sound! 🧠'),
    splMCQ('Choose the correct spelling:', ['reccommend', 'recomend', 'recommend', 'recommand'], 2, '"Recommend" — one c, double m: r-e-c-o-m-m-e-n-d! 👍'),
    splMCQ('Which is correct?', ['enviroment', 'envirionment', 'environment', 'enviroment'], 2, '"Environment" — e-n-v-i-r-o-n-m-e-n-t. The "n" before "m" is often missed! 🌍'),
    splMCQ('Find the correct spelling:', ['goverment', 'government', 'governement', 'goverament'], 1, '"Government" — g-o-v-e-r-n-m-e-n-t. There\'s a silent "n" before the "m"! 🏛️'),
    splMCQ('Which is correct?', ['occurance', 'occurrence', 'occurence', 'ocurrence'], 1, '"Occurrence" — o-c-c-u-r-r-e-n-c-e. Double c AND double r! 🔄'),
    splMCQ('Choose the correct spelling:', ['mischievous', 'mischieous', 'mischevious', 'mischeivous'], 0, '"Mischievous" — m-i-s-c-h-i-e-v-o-u-s. Three syllables: mis-chie-vous! 😈'),
    splMCQ('Which is correct?', ['persuation', 'persuation', 'persuasion', 'perswasion'], 2, '"Persuasion" — p-e-r-s-u-a-s-i-o-n. The "sua" → "sion" is a tricky ending! 💬'),
    splMCQ('Find the correct spelling:', ['prononciaton', 'pronounciation', 'pronunciation', 'pronunsiation'], 2, '"Pronunciation" — no second "o"! pro-NUN-ci-a-tion, not pro-NOUN-ciation! 🗣️'),
    splMCQ('Which is correct?', ['exagerate', 'exaggerate', 'exaggerrate', 'exaggarate'], 1, '"Exaggerate" — e-x-a-g-g-e-r-a-t-e. Double "g"! 📢'),
    splMCQ('Choose the correct spelling:', ['noticeable', 'noticable', 'notcieable', 'noticeable'], 0, '"Noticeable" — keep the "e" from "notice" before adding "able"! 👁️'),
    splTyped('Type the correct spelling of: a 12-month period', 'calendar', '📅', '"Calendar" — c-a-l-e-n-d-a-r. Ends in "ar" not "er"! 📅'),
  ];
}

// ── Year 6 (Age 10–11) ──────────────────────────────────────
function splYear6() {
  return [
    splMCQ('Which is correct?', ['dissastrous', 'disatstrous', 'disastrous', 'disasterous'], 2, '"Disastrous" — d-i-s-a-s-t-r-o-u-s. No "e"! Disaster → disastrous (drop the e)! 🌪️'),
    splMCQ('Choose the correct spelling:', ['burocracy', 'beaurocracy', 'bureaucracy', 'bureaucrasy'], 2, '"Bureaucracy" — b-u-r-e-a-u-c-r-a-c-y. "bur-eau" — French-origin word! 🏛️'),
    splMCQ('Which is correct?', ['conscientious', 'consciencious', 'consceintious', 'consientious'], 0, '"Conscientious" — c-o-n-s-c-i-e-n-t-i-o-u-s. Contains "science"! 🧪'),
    splMCQ('Find the correct spelling:', ['supercede', 'supersede', 'suparcede', 'superseed'], 1, '"Supersede" — s-u-p-e-r-s-e-d-e. Not "supercede"! From Latin "sedere" (to sit)! 👑'),
    splMCQ('Which is correct?', ['existance', 'existense', 'existence', 'existanse'], 2, '"Existence" — e-x-i-s-t-e-n-c-e. Ends in "-ence" not "-ance"! 🌌'),
    splMCQ('Choose the correct spelling:', ['heirarchy', 'hierachy', 'hierarchy', 'hierarhy'], 2, '"Hierarchy" — h-i-e-r-a-r-c-h-y. "hier" = holy (Latin). Two "r"s! 🏆'),
    splMCQ('Which is correct?', ['liaision', 'liasion', 'laison', 'liaison'], 3, '"Liaison" — l-i-a-i-s-o-n. Two "i"s! A liaison connects people. 🔗'),
    splMCQ('Find the correct spelling:', ['millenium', 'millennium', 'milennium', 'millennuim'], 1, '"Millennium" — m-i-l-l-e-n-n-i-u-m. Double l AND double n! 🎆'),
    splMCQ('Which is correct?', ['ocassionally', 'occasionally', 'ocassionaly', 'occassionally'], 1, '"Occasionally" — o-c-c-a-s-i-o-n-a-l-l-y. Double c, single s, double l at end! 🔄'),
    splMCQ('Choose the correct spelling:', ['paradox', 'parradox', 'paradocs', 'para-dox'], 0, '"Paradox" — p-a-r-a-d-o-x. A paradox seems contradictory but may be true! 🤔'),
    splMCQ('Which is correct?', ['mnemonic', 'neumonic', 'nnemonic', 'mnemonick'], 0, '"Mnemonic" — m-n-e-m-o-n-i-c. The "mn" at the start is silent! 🧠'),
    splMCQ('Find the correct spelling:', ['psycology', 'psychology', 'psychollogy', 'psycologie'], 1, '"Psychology" — p-s-y-c-h-o-l-o-g-y. The "ps" at the start is silent! 🧠'),
    splMCQ('Which is correct?', ['questionnaire', 'questionnare', 'questionnarie', 'quessionnaire'], 0, '"Questionnaire" — q-u-e-s-t-i-o-n-n-a-i-r-e. Double "n" and ends in "aire"! 📋'),
    splMCQ('Choose the correct spelling:', ['charachteristic', 'characteristic', 'charicteristic', 'characterristic'], 1, '"Characteristic" — c-h-a-r-a-c-t-e-r-i-s-t-i-c. Contains "character"! 🎭'),
    splTyped('Type the correct spelling: the quality of being very skilled or experienced', 'expertise', '🏆', '"Expertise" — e-x-p-e-r-t-i-s-e. From "expert" + ise! 🎯'),
  ];
}
