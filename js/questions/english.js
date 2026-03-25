// ── English Question Bank ─────────────────────────────────────

function getEnglishQuestions(level) {
  const banks = { reception: qReception, year1: qYear1, year2: qYear2,
    year3: qYear3, year4: qYear4, year5: qYear5, year6: qYear6 };
  return (banks[level] || banks.year1)();
}

function mcq(q, correct, w1, w2, w3, emoji) {
  const answers = sh([correct, w1, w2, w3]);
  return { question: q, answers, correct: answers.indexOf(correct), emoji: emoji || null };
}
function typed(q, answer, accepted, emoji) {
  return { question: q, type:'typed', answers:[answer], correct:0,
    acceptedAnswers: accepted || [answer.toLowerCase()], emoji: emoji || null };
}
function sh(a) { for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }

function qReception() { return [
  mcq('Which letter starts the word "Apple"?','A','B','C','D','🍎'),
  mcq('Which letter starts "Ball"?',          'B','P','D','R','⚽'),
  mcq('Which letter starts "Cat"?',           'C','K','G','S','🐱'),
  mcq('Which word rhymes with "hat"?',        'cat','dog','big','run'),
  mcq('Which word rhymes with "big"?',        'pig','hat','cup','dog'),
  mcq('How many letters in "dog"?',           '3','2','4','5'),
  mcq('How many letters in "fish"?',          '4','3','5','2'),
  mcq('Which is a colour?',                   'red','cat','run','big'),
  mcq('Which word is a number?',              'three','blue','jump','funny'),
  mcq('Pick the animal word:',                'rabbit','table','happy','green'),
  mcq('Which letter makes the "s" sound?',    'S','C','Z','X'),
  mcq('Which word means the opposite of big?','small','tall','fast','cold'),
  mcq('Which letter is a vowel?',             'A','B','C','D'),
  mcq('"The sun is ___." Pick the correct word:','bright','quickly','under','and'),
  mcq('Which word is a verb (doing word)?',   'jump','table','happy','sky'),
];}

function qYear1() { return [
  typed('Spell the word for this animal: 🐶',  'dog',  ['dog']),
  typed('Spell the word for this animal: 🐱',  'cat',  ['cat']),
  typed('Spell the word for this fruit: 🍎',   'apple',['apple']),
  mcq('Which is spelled correctly?',           'friend','frend','freind','frind'),
  mcq('Which word means "happy"?',             'glad','sad','angry','tired'),
  mcq('Pick the correct spelling:',            'come','kom','kome','cume'),
  mcq('Which word rhymes with "rain"?',        'train','cloud','snow','hail'),
  mcq('The dog ___ loudly. Pick the verb:',    'barked','quickly','big','and'),
  mcq('"She is ___ the book." Choose:',        'reading','run','happy','quick'),
  mcq('Which sentence has correct punctuation?',
      'The cat sat on the mat.','the cat sat on the mat','The cat sat on the mat','the Cat sat'),
  mcq('Which is a noun (naming word)?',        'table','run','big','slowly'),
  mcq('Opposite of "day"?',                    'night','sun','hot','light'),
  mcq('Which word is an adjective?',           'fluffy','jump','slowly','the'),
  mcq('Correct spelling:',                     'said','sed','sayd','saed'),
  mcq('Correct spelling:',                     'they','thay','thei','tey'),
];}

function qYear2() { return [
  mcq('Correct spelling:',                    'because','becuase','becose','becaus'),
  mcq('Correct spelling:',                    'February','Febuary','Feburary','Februery'),
  mcq('Opposite of "ancient"?',               'modern','old','tired','historic'),
  mcq('Which is the correct plural of "child"?','children','childs','childes','childrens'),
  mcq('Which sentence is correct?',           'I saw two deer.','I saw two deers.','I saw two deeres.','I saw two dear.'),
  mcq('A word that describes a verb is a/an:','adverb','adjective','noun','pronoun'),
  mcq('"The dog ran ___." Which adverb fits?','quickly','quick','quicker','quickest'),
  mcq('Which word is a connective?',          'because','table','run','happy'),
  mcq('Correct spelling:',                    'Wednesday','Wensday','Wenesday','Wednessday'),
  mcq('Correct spelling:',                    'beautiful','beatiful','butiful','beutiful'),
  typed('Spell the plural of "mouse".',       'mice',   ['mice']),
  typed('Spell the past tense of "run".',     'ran',    ['ran']),
  mcq('"I __ going to the park." Choose:',   'am','is','are','was'),
  mcq('Which punctuation ends a question?',  '?','!','.',',' ),
  mcq('Which word has a silent letter?',     'knife','cat','dog','run'),
];}

function qYear3() { return [
  mcq('What is a synonym for "big"?',         'large','small','cold','fast'),
  mcq('What is an antonym for "brave"?',      'cowardly','bold','strong','fierce'),
  mcq('Correct spelling:',                    'necessary','necesary','neccesary','necessery'),
  mcq('Correct spelling:',                    'separate','seperate','seperrate','separete'),
  mcq('A word that replaces a noun is a:',    'pronoun','adverb','adjective','verb'),
  mcq('"The children ___ playing." Choose:',  'were','was','is','be'),
  mcq('Which sentence uses a comma correctly?',
      'I bought milk, bread, and eggs.','I bought milk bread and eggs.','I bought, milk bread and eggs','I bought milk bread, and eggs'),
  mcq('What does the prefix "un-" mean?',     'not','again','before','after'),
  mcq('What does the suffix "-ful" mean?',    'full of','without','having','able to'),
  typed('Spell: a word meaning extremely happy (starts with D):', 'delighted', ['delighted']),
  mcq('Which is NOT a conjunction?',          'table','and','but','because'),
  mcq('What is the root word in "unhappy"?',  'happy','un','unhapp','happ'),
  mcq('Which word is spelt correctly?',       'believe','beleive','belive','beleave'),
  mcq('"A ____ of lions" — collective noun:','pride','group','gang','team'),
  mcq('Which tense is "She will travel"?',    'future','past','present','pluperfect'),
];}

function qYear4() { return [
  mcq('What are homophones?',                  'words that sound the same but have different meanings','words that mean the same','words that are opposites','made-up words'),
  mcq('Which pair are homophones?',            'there / their','big / large','run / ran','happy / glad'),
  mcq('Correct spelling:',                     'conscience','consience','consciense','concience'),
  mcq('Correct spelling:',                     'parliament','parliment','parlamente','parliamant'),
  mcq('What is the correct possessive?',       "the dog's lead","the dogs lead","the dogs' lead","the dog lead"),
  mcq('What does the prefix "mis-" mean?',     'wrongly','again','not','before'),
  mcq('Which word has the prefix "pre-"?',     'preview','review','overvew','subview'),
  mcq('"Despite the rain, ___ went outside." Choose:',  'they','them','their','there'),
  typed('What word means "a word that means the same as another"?','synonym',['synonym']),
  mcq('Which is a compound sentence?',         'I like cats, and my sister likes dogs.','I like cats.','Because I like cats.','Although.'),
  mcq('What punctuation is used in a list?',   'comma','colon','semicolon','full stop'),
  mcq('What is the plural of "cactus"?',       'cacti','cactuses','cactuss','cactis'),
  mcq('Which word means "to copy illegally"?', 'plagiarise','practice','preach','prescribe'),
  mcq('"Running every day __ her fit." Choose:', 'kept','keep','keeps','keeping'),
  mcq('Identify the modal verb: "You should eat vegetables."','should','eat','vegetables','you'),
];}

function qYear5() { return [
  mcq('What is a relative clause?',           'A clause that gives more information about a noun','A type of noun','A verb phrase','A kind of adjective'),
  mcq('Which sentence uses a semicolon correctly?','I love summer; the days are long.','I love; summer the days are long.','I; love summer the days are long.','I love summer the; days are long.'),
  mcq('Correct spelling:',                    'accommodate','accomodate','acommodate','acomodate'),
  mcq('Correct spelling:',                    'occurrence','occurence','occurrance','ocurrence'),
  typed('What literary device is "The wind whispered"?','personification',['personification']),
  mcq('What is a metaphor?',                  'Saying something IS something else','Comparing using like or as','A repeated beginning sound','A made-up word'),
  mcq('What is a simile?',                    'A comparison using "like" or "as"','A type of noun','A repeated vowel sound','A shortened word'),
  mcq('Correct spelling:',                    'definitely','definately','definitley','definitelyy'),
  mcq('What is the subjunctive mood?',        'Used for hypothetical or wished-for situations','Past tense','A type of question','A describing word'),
  mcq('"If I ____ you, I would help." Choose:','were','was','am','be'),
  mcq('What is alliteration?',                'Repetition of the same consonant sound at the start of words','Rhyming words','Exaggeration','A figure of speech'),
  mcq('Which is an example of alliteration?', 'Peter Piper picked peppers','The moon is round','She runs fast','He said hello'),
  mcq('Correct spelling:',                    'exaggerate','exagerate','exxagerate','exaggerrate'),
  mcq('What word class is "however"?',        'adverb','adjective','noun','verb'),
  mcq('Identify the passive voice:',          'The cake was eaten by the child.','The child ate the cake.','She baked a cake.','They love cakes.'),
];}

function qYear6() { return [
  mcq('What is a parenthesis?',               'Extra information added to a sentence using brackets, dashes or commas','A type of verb','A form of punctuation','A kind of noun'),
  mcq('Which uses parenthesis correctly?',    'My friend — who lives nearby — is kind.','My friend, who — lives nearby is kind.','— My friend who lives nearby is — kind.','My friend who lives, nearby — is kind.'),
  typed('What literary device involves obvious exaggeration?','hyperbole',['hyperbole']),
  mcq('What is onomatopoeia?',                'A word that sounds like what it describes','A figure of speech using comparison','A repeated sound pattern','A type of noun'),
  mcq('"The sizzling sausages" — which device?','alliteration','metaphor','onomatopoeia','personification'),
  mcq('"The thunder roared angrily" — which device?','personification','simile','alliteration','hyperbole'),
  mcq('Correct spelling:',                    'bureaucracy','beaurocracy','bureacracy','buerocracy'),
  mcq('Correct spelling:',                    'Mediterranean','Mediteranean','Mediterranian','Mediterrenean'),
  mcq('What is a subordinate clause?',        'A clause that cannot stand alone and depends on the main clause','A main clause','A type of sentence','An independent clause'),
  mcq('Identify the subjunctive:',            'I suggest that he be present.','He is present.','He was present.','He will be present.'),
  mcq('Which is an example of a rhetorical question?','Isn\'t that obvious?','What is 2+2?','Where are you?','Who came last?'),
  mcq('What is a euphemism?',                 'A mild word used instead of a harsh one','An exaggeration','A comparison','A repeated sound'),
  mcq('What does "verbose" mean?',            'Using more words than necessary','Brief and to the point','Full of errors','Very creative'),
  mcq('Identify the correct use of a colon:', 'There is one rule: never lie.','There is: one rule never lie.','There is one: rule never lie.','There: is one rule never lie.'),
  mcq('"Despite his fears, he performed brilliantly." What does "despite" show?','contrast/concession','addition','cause','time'),
];}
