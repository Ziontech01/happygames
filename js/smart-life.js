// ── Smart Life Hero: The Everyday Skills Game ─────────────────
// 8 categories, scenario-based questions, positive reinforcement

(function () {
  'use strict';

  const CATEGORIES = {
    morning: {
      name: 'Morning Routine',
      emoji: '🌅',
      color: '#f59e0b',
      badge: '☀️ Early Bird',
      description: 'Starting the day the right way!',
      questions: [
        {
          q: 'It\'s time to get up for school but Mia doesn\'t want to get out of bed. What is the BEST thing to do?',
          opts: ['Pull the duvet back over your head', 'Get up straight away and start getting ready', 'Watch cartoons until mum calls again', 'Ask a sibling to go to school for you'],
          ans: 1,
          explain: '🌟 Getting up right away gives you time to eat, get dressed and feel calm. Rushing makes mornings stressful!'
        },
        {
          q: 'In the morning, which should you do FIRST?',
          opts: ['Check your phone', 'Get washed and dressed', 'Watch TV', 'Eat sweets'],
          ans: 1,
          explain: '🚿 Washing and getting dressed first means you\'re ready for anything the day brings!'
        },
        {
          q: 'Kai forgot to brush his teeth this morning. What might happen?',
          opts: ['Nothing at all', 'His teeth could get cavities and start to hurt', 'His hair might fall out', 'He will grow taller'],
          ans: 1,
          explain: '🦷 Brushing teeth removes bacteria that cause decay. Always brush for 2 minutes — morning AND night!'
        },
        {
          q: 'Why is eating breakfast important?',
          opts: ['It makes you look cool', 'It gives you energy to concentrate and learn at school', 'It is just a rule — it doesn\'t really matter', 'It makes your hair shinier'],
          ans: 1,
          explain: '🍳 Breakfast fuels your brain! Children who eat breakfast focus better and feel happier at school. 🧠'
        },
        {
          q: 'Amara checks her school bag the NIGHT BEFORE. Why is this a good habit?',
          opts: ['It isn\'t — she should check it in the morning when she\'s rushing', 'She won\'t forget anything and mornings will be calmer', 'She likes tidying her room', 'Teachers like bags checked at night'],
          ans: 1,
          explain: '🎒 Checking your bag the night before means no panics in the morning. Preparation = confidence!'
        },
        {
          q: 'It\'s raining. Tom can\'t find his raincoat. What should he do?',
          opts: ['Go to school without a coat and get soaked', 'Tell mum calmly and ask for help finding it', 'Refuse to go to school', 'Blame his sister'],
          ans: 1,
          explain: '🌧️ Staying calm and asking for help is always the best response when things go wrong!'
        },
      ]
    },
    school: {
      name: 'School Behaviour',
      emoji: '🏫',
      color: '#3b82f6',
      badge: '🌟 Star Pupil',
      description: 'Being your best at school!',
      questions: [
        {
          q: 'Your teacher is explaining something and you don\'t understand. What should you do?',
          opts: ['Say nothing and pretend you understand', 'Start talking to your friend', 'Put your hand up and politely ask for help', 'Give up and do nothing'],
          ans: 2,
          explain: '🙋 Asking questions is a sign of intelligence, not weakness. Your teacher is there to help you!'
        },
        {
          q: 'A classmate is being left out at break time. What is the KINDEST thing to do?',
          opts: ['Ignore them — it\'s not your problem', 'Invite them to play or come and sit with them', 'Point and laugh with your friends', 'Tell a teacher straight away without talking to them first'],
          ans: 1,
          explain: '❤️ Including others makes EVERYONE feel better — including you! Kindness is always the right choice.'
        },
        {
          q: 'You finish your work early. What is the BEST thing to do?',
          opts: ['Start talking loudly to friends', 'Do nothing and wait for everyone else', 'Read a book, draw, or do extension work quietly', 'Run around the classroom'],
          ans: 2,
          explain: '📚 Using extra time wisely shows maturity. It also means you learn even more!'
        },
        {
          q: 'Someone keeps copying your work without asking. What should you do?',
          opts: ['Let them copy — it doesn\'t matter', 'Shout at them in front of everyone', 'Calmly tell them it\'s not okay and ask them to do their own work', 'Let them see it but copy wrong answers to trick them'],
          ans: 2,
          explain: '💬 Solving problems calmly without getting angry or being unkind shows real maturity!'
        },
        {
          q: 'Why should you arrive at school ON TIME?',
          opts: ['Because teachers get angry if you\'re late', 'Because you miss important instructions and learning at the start', 'Because the gate closes and you can\'t get in', 'There\'s no real reason'],
          ans: 1,
          explain: '⏰ Starting on time means you catch all the important parts of the lesson. It also shows respect for your teacher and class!'
        },
        {
          q: 'A friend tells you a secret that worries you — they said they are very sad and don\'t want to come to school. What should you do?',
          opts: ['Keep the secret no matter what — friends come first', 'Tell a trusted adult like a teacher or parent', 'Post about it online', 'Ignore it — everyone feels sad sometimes'],
          ans: 1,
          explain: '💛 Some secrets are too big to keep alone. Telling a trusted adult keeps your friend safe — that\'s what true friends do!'
        },
      ]
    },
    afterschool: {
      name: 'After School',
      emoji: '🎒',
      color: '#8b5cf6',
      badge: '🎯 Afternoon Pro',
      description: 'Making the most of your time after school!',
      questions: [
        {
          q: 'Jayden gets home from school feeling tired. What should he do FIRST?',
          opts: ['Start playing video games immediately', 'Have a healthy snack and a short rest, then do homework', 'Go back out to play until dark', 'Go straight to sleep until dinner'],
          ans: 1,
          explain: '🍎 A healthy snack and short rest helps your brain recover and focus better for homework!'
        },
        {
          q: 'Sophie keeps putting off her homework until it\'s nearly bedtime. Why is this a problem?',
          opts: ['It isn\'t — doing it late is fine', 'She gets tired, makes mistakes, and feels stressed before bed', 'Teachers never notice', 'Homework isn\'t important'],
          ans: 1,
          explain: '📝 Doing homework earlier means your brain is fresh, your work is better, and bedtime is calm!'
        },
        {
          q: 'How much screen time is healthy for children each day?',
          opts: ['As much as you want', 'No screen time ever', 'About 1–2 hours of recreational screen time', 'Only on weekends'],
          ans: 2,
          explain: '📱 Experts suggest around 1–2 hours of fun screen time. Too much can affect sleep, mood and exercise!'
        },
        {
          q: 'Noah doesn\'t want to do his reading homework. His mum says he must. What should Noah do?',
          opts: ['Argue and refuse', 'Do it quickly while watching TV', 'Do it properly — reading helps him get smarter every day', 'Do it and then complain for an hour'],
          ans: 2,
          explain: '📖 Reading daily — even for just 20 minutes — makes you smarter, a better speller and a better writer!'
        },
        {
          q: 'Why is outdoor play or exercise important after school?',
          opts: ['It uses up energy so you\'re not hyper', 'It helps your body stay healthy and your brain reset', 'It\'s only important for PE lessons', 'It isn\'t — sitting inside is just as good'],
          ans: 1,
          explain: '⚽ Moving your body releases happy chemicals in your brain (endorphins)! It helps you sleep better too.'
        },
        {
          q: 'Chloe\'s chores are to tidy her room and set the table. She wants to play first. What\'s the wisest choice?',
          opts: ['Play first and skip the chores', 'Do the chores first, then enjoy playing with a clear conscience', 'Pretend she forgot', 'Do only the easy chore'],
          ans: 1,
          explain: '✅ "Work before play" means you can relax fully knowing your responsibilities are done! This is called self-discipline.'
        },
      ]
    },
    cleantidy: {
      name: 'Clean & Tidy',
      emoji: '🧹',
      color: '#06b6d4',
      badge: '✨ Tidy Champion',
      description: 'Keeping things neat and organised!',
      questions: [
        {
          q: 'Grace leaves her clothes all over the floor. What problem might this cause?',
          opts: ['No problem — mum will tidy it', 'She can\'t find things, her room smells, and it\'s unsafe to walk through', 'The dog might eat them', 'Her clothes will get wrinkles'],
          ans: 1,
          explain: '🧺 A tidy space = a tidy mind! It\'s easier to find things, and your home looks nice for everyone.'
        },
        {
          q: 'After cooking a snack, what should you do with your mess?',
          opts: ['Leave it — someone else will clean it', 'Clean it up straight away and put things back', 'Cover it with a cloth', 'Only clean it if someone is watching'],
          ans: 1,
          explain: '🍽️ Cleaning up after yourself is called taking responsibility. Everyone in the home deserves a clean space!'
        },
        {
          q: 'Why should you make your bed in the morning?',
          opts: ['Only to make parents happy', 'It starts your day with a small achievement and keeps your room tidy', 'Because the bed police will check', 'It makes your room bigger'],
          ans: 1,
          explain: '🛏️ Making your bed starts the day with a win! It also makes your room look tidy and helps you feel organised. 💪'
        },
        {
          q: 'Leon finds mouldy food in his room. What should he do?',
          opts: ['Hide it under the bed', 'Throw it in the bin and tell a parent — mould can make you unwell', 'Give it to the dog', 'Leave it — it will go away by itself'],
          ans: 1,
          explain: '🦠 Mould is a type of fungus that can cause breathing problems. Throw it away and keep food only in kitchens!'
        },
        {
          q: 'How often should you wash your clothes?',
          opts: ['Once a month', 'When they smell or after wearing (especially PE kit)', 'Never — clothes clean themselves', 'Only in summer'],
          ans: 1,
          explain: '👕 Wearing clean clothes keeps bacteria and bad smells away. PE kit should be washed after every use!'
        },
        {
          q: 'Eva finds it hard to keep her room tidy. What strategy would help most?',
          opts: ['Only tidy once a year', 'Tidy for 10 minutes every day instead of doing a big tidy weekly', 'Move everything under the bed', 'Get rid of all her things'],
          ans: 1,
          explain: '🗂️ Little and often is the secret! 10 minutes of daily tidying stops things getting out of control. 🧹'
        },
      ]
    },
    hygiene: {
      name: 'Bathroom & Hygiene',
      emoji: '🚿',
      color: '#10b981',
      badge: '💎 Squeaky Clean',
      description: 'Taking care of your body!',
      questions: [
        {
          q: 'How long should you brush your teeth for?',
          opts: ['5 seconds', '30 seconds', '2 minutes', '10 minutes'],
          ans: 2,
          explain: '🦷 2 minutes — that\'s the time recommended by dentists! Use a timer or a tooth-brushing song!'
        },
        {
          q: 'When MUST you wash your hands?',
          opts: ['Only before eating', 'After the toilet, before eating, after touching animals, after sneezing', 'Once a day', 'Only when they look dirty'],
          ans: 1,
          explain: '🧼 Germs are invisible! Washing hands for 20 seconds with soap removes bacteria and viruses. It stops illness spreading!'
        },
        {
          q: 'How often should you shower or bathe?',
          opts: ['Once a week is enough', 'Every day or at least every other day, especially after PE', 'Only in summer', 'Never — it dries your skin'],
          ans: 1,
          explain: '🚿 Showering removes sweat, dead skin and bacteria that cause body odour. Your body works hard — keep it clean!'
        },
        {
          q: 'Zara has a cold and sneezes. What is the BEST thing to do?',
          opts: ['Sneeze onto your hands', 'Sneeze into your sleeve or a tissue, then wash hands', 'Hold the sneeze in', 'Sneeze at a friend as a joke'],
          ans: 1,
          explain: '🤧 Sneezing into your sleeve (the "Dracula sneeze") stops germs spreading through the air and onto surfaces!'
        },
        {
          q: 'Why should you change your underwear every day?',
          opts: ['To keep manufacturers in business', 'Bacteria build up from sweat and can cause infections and odour', 'It\'s just a rule with no reason', 'To use more laundry powder'],
          ans: 1,
          explain: '🩲 Fresh underwear every day keeps bacteria away and prevents skin infections and unpleasant smells!'
        },
        {
          q: 'Ben notices his nails are getting long and dirty underneath. What should he do?',
          opts: ['Leave them — long nails are cool', 'Clean and trim them — dirty nails carry bacteria into your food', 'Paint over them to hide the dirt', 'Ask his mum to do it when he\'s 18'],
          ans: 1,
          explain: '💅 Short, clean nails prevent bacteria from getting into food and causing illness. Clean them with a nail brush!'
        },
      ]
    },
    safety: {
      name: 'Safety',
      emoji: '🦺',
      color: '#ef4444',
      badge: '🦸 Safety Hero',
      description: 'Keeping yourself and others safe!',
      questions: [
        {
          q: 'A stranger online asks for your name, school and home address. What should you do?',
          opts: ['Tell them — they seem friendly', 'Never share personal information online and tell a trusted adult immediately', 'Only tell them your first name', 'Ask them for their information first'],
          ans: 1,
          explain: '🔒 NEVER share personal details online. A friendly stranger is still a stranger. Tell a parent or trusted adult straight away!'
        },
        {
          q: 'You are home alone and someone knocks at the door claiming to be from the gas company. What do you do?',
          opts: ['Let them in to check the boiler', 'Don\'t open the door — call a parent and wait for them to return', 'Shout that a parent is coming', 'Open the door but stand in the way'],
          ans: 1,
          explain: '🚪 Never open the door to strangers when home alone. Call a parent or trusted adult. Real utility workers can return!'
        },
        {
          q: 'You see something sharp and rusty on the playground. What do you do?',
          opts: ['Pick it up and investigate it', 'Leave it but tell a teacher or adult straight away', 'Kick it into a bush', 'Show all your friends'],
          ans: 1,
          explain: '⚠️ Sharp or rusty objects can cause serious injury and infection. Always tell an adult — that\'s the safe and responsible thing!'
        },
        {
          q: 'Whilst crossing the road, your phone buzzes. What should you do?',
          opts: ['Check it quickly — it might be important', 'Ignore it until you are safely on the pavement', 'Stop in the middle of the road to read it', 'Run to the other side faster'],
          ans: 1,
          explain: '🚦 Roads are dangerous. ALWAYS give full attention when crossing — no phone, no headphones. Your safety comes first!'
        },
        {
          q: 'What is the UK emergency services number?',
          opts: ['111', '999', '0800 111', '112'],
          ans: 1,
          explain: '🚨 999 is the UK emergency number for Police, Fire, and Ambulance. Only call if there is a real emergency!'
        },
        {
          q: 'Your friend dares you to climb a tall tree in the park. You feel unsafe. What do you do?',
          opts: ['Climb it anyway — you don\'t want to look scared', 'Say no firmly — it\'s okay to refuse unsafe dares', 'Climb halfway to show you\'re brave', 'Ask an adult to watch while you climb'],
          ans: 1,
          explain: '🌳 Real bravery is knowing when to say NO! Peer pressure is never a good reason to take dangerous risks.'
        },
      ]
    },
    kindness: {
      name: 'Kindness',
      emoji: '💛',
      color: '#f59e0b',
      badge: '❤️ Kindness Hero',
      description: 'Making the world a better place!',
      questions: [
        {
          q: 'A new student joins your class and doesn\'t know anyone. What is the KINDEST thing to do?',
          opts: ['Wait to see if they make friends on their own', 'Go over, introduce yourself and include them in your group', 'Stare at them without speaking', 'Ask why they moved school'],
          ans: 1,
          explain: '🤝 Being the first to be kind is a superpower. One friendly face can make all the difference to someone new!'
        },
        {
          q: 'Your friend is upset because she didn\'t do well in a test. What do you say?',
          opts: ['"Ha, I got better than you!"', '"Everyone struggles sometimes — you can try again and I\'ll help you practice."', '"Why didn\'t you revise?"', '"I knew you\'d fail."'],
          ans: 1,
          explain: '💪 A true friend lifts you up when you\'re down. Encouragement is one of the best gifts you can give!'
        },
        {
          q: 'You see someone dropping litter in the park. What could you do?',
          opts: ['Ignore it — it\'s not your problem', 'Politely say: "Excuse me, I think you dropped something."', 'Pick up their litter angrily and throw it at them', 'Take a photo and post it online to embarrass them'],
          ans: 1,
          explain: '🌍 Kindness includes caring for our environment. A polite, calm reminder can make a difference without causing conflict!'
        },
        {
          q: 'You get the last biscuit. Your little brother sees it and looks disappointed. What do you do?',
          opts: ['Eat it quickly before he can ask', 'Offer to share or break it in half', 'Hide it and eat it in your room', 'Eat it but say "sorry"'],
          ans: 1,
          explain: '🍪 Sharing is caring! It might feel like you\'re losing something, but you\'re gaining kindness — and that always feels better!'
        },
        {
          q: 'Someone in your class is being bullied with unkind names. You witness it. What do you do?',
          opts: ['Laugh along so the bully likes you', 'Do nothing — it\'s not your business', 'Refuse to join in, support the victim, and tell a trusted adult', 'Video it on your phone'],
          ans: 2,
          explain: '🦸 Being an "upstander" (not a bystander) is incredibly brave. Victims of bullying need allies. Always tell an adult!'
        },
        {
          q: 'You receive a gift you don\'t really like. What is the KIND response?',
          opts: ['Say "I hate this!" in front of everyone', 'Say "I already have this" and look unhappy', 'Thank them sincerely — the thought behind the gift matters most', 'Say nothing and put it straight in the bin'],
          ans: 2,
          explain: '🎁 Gratitude is a form of kindness. The person spent time and money to give you something — always say thank you warmly!'
        },
      ]
    },
    night: {
      name: 'Night Routine',
      emoji: '🌙',
      color: '#6366f1',
      badge: '😴 Sleep Master',
      description: 'Winding down for a great sleep!',
      questions: [
        {
          q: 'How many hours of sleep do children aged 6–12 need each night?',
          opts: ['4–5 hours', '6–7 hours', '9–11 hours', '12–14 hours'],
          ans: 2,
          explain: '😴 Children aged 6–12 need 9–11 hours of sleep to grow, learn and feel well. Your brain processes the day\'s learning while you sleep!'
        },
        {
          q: 'Ella plays on her tablet until 11pm and then feels tired at school. What should she change?',
          opts: ['Go to bed even later', 'Turn off screens 1 hour before bed and have a calm routine', 'Drink coffee to stay awake', 'Nap at school instead'],
          ans: 1,
          explain: '📵 Screens produce blue light that tricks your brain into thinking it\'s daytime! Turning them off 1 hour before bed helps you fall asleep faster.'
        },
        {
          q: 'What is the BEST bedtime snack if you\'re hungry?',
          opts: ['A bag of crisps', 'Fizzy drinks and sweets', 'A banana or glass of warm milk', 'A large pizza'],
          ans: 2,
          explain: '🍌 Bananas contain magnesium and tryptophan which help your body relax. Warm milk also has sleep-promoting nutrients!'
        },
        {
          q: 'Jake can\'t fall asleep because he\'s worrying about school. What might help?',
          opts: ['Stare at the ceiling and worry more', 'Write down his worries in a journal, then take slow deep breaths', 'Watch an exciting film', 'Text his friends to tell them'],
          ans: 1,
          explain: '📓 Writing worries down "parks" them outside your head. Deep breathing activates your body\'s calm response. 🧘'
        },
        {
          q: 'Why is a bedtime routine important?',
          opts: ['It isn\'t — you can just sleep whenever', 'It signals your body it\'s time to wind down, leading to faster and deeper sleep', 'It\'s only for babies', 'Parents make you do it to be boring'],
          ans: 1,
          explain: '🌙 Your body loves routine! Bath → teeth → story → lights out signals your brain to release melatonin — the sleep hormone!'
        },
        {
          q: 'What should your bedroom be like for a good night\'s sleep?',
          opts: ['Bright with lots of noise', 'Dark, cool and quiet', 'Warm with the TV on', 'Very hot with the radio on'],
          ans: 1,
          explain: '🛏️ The ideal sleep environment is dark (melatonin loves dark!), cool (around 18°C) and quiet. Your body sleeps best this way!'
        },
      ]
    }
  };

  let currentCategory = null;
  let questions = [];
  let current = 0;
  let score = 0;
  let startTime = null;
  let answered = false;

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    renderCategoryScreen();
    hideLoading();
  }

  function hideLoading() {
    const ov = document.getElementById('loading-overlay');
    if (ov) ov.classList.add('hidden');
  }

  // ── Category Screen ──────────────────────────────────────────
  function renderCategoryScreen() {
    const root = document.getElementById('slh-root');
    root.innerHTML = `
      <div style="text-align:center;padding:32px 20px">
        <div style="font-size:3.5rem;margin-bottom:10px">🦸</div>
        <div style="font-family:'Fredoka One',cursive;font-size:2rem;color:#1A1A2E;margin-bottom:6px">Smart Life Hero</div>
        <p style="color:#6B7280;font-weight:600;margin-bottom:8px">Learn the everyday skills that make life awesome!</p>
        <p style="color:#a855f7;font-weight:700;font-size:.9rem;margin-bottom:28px">Pick a life skill category to begin ✨</p>
        <div class="slh-cat-grid">
          ${Object.entries(CATEGORIES).map(([key, cat]) => `
            <div class="slh-cat-card" onclick="SmartLifeHero.startCategory('${key}')"
                 style="border-left:5px solid ${cat.color}">
              <div class="slh-cat-emoji">${cat.emoji}</div>
              <div>
                <div class="slh-cat-name">${cat.name}</div>
                <div class="slh-cat-desc">${cat.description}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // ── Start Category ────────────────────────────────────────────
  function startCategory(catKey) {
    currentCategory = catKey;
    const cat = CATEGORIES[catKey];
    questions = [...cat.questions].sort(() => Math.random() - 0.5);
    current = 0;
    score = 0;
    startTime = Date.now();
    answered = false;
    window.SFX?.play('click');
    showQuestion();
  }

  // ── Show Question ─────────────────────────────────────────────
  function showQuestion() {
    if (current >= questions.length) { endCategory(); return; }
    const cat = CATEGORIES[currentCategory];
    const q = questions[current];
    answered = false;

    const root = document.getElementById('slh-root');
    root.innerHTML = `
      <div style="max-width:640px;margin:0 auto;padding:24px 20px">
        <div class="matching-header" style="margin-bottom:16px">
          <button class="btn btn-outline" style="color:#667eea;border-color:#667eea;font-size:.8rem"
                  onclick="SmartLifeHero.backToMenu()">← Back</button>
          <div style="font-family:'Fredoka One',cursive;font-size:1.1rem;color:#1A1A2E">${cat.emoji} ${cat.name}</div>
          <div style="font-weight:800;font-size:.9rem;color:#667eea">⭐ ${score}/${current}</div>
        </div>

        <div style="background:#fff;border-radius:20px;box-shadow:0 4px 20px rgba(0,0,0,.08);padding:24px;margin-bottom:16px">
          <div style="font-size:.78rem;font-weight:800;color:#aaa;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">
            Scenario ${current + 1} of ${questions.length}
          </div>
          <div style="font-family:'Fredoka One',cursive;font-size:1.35rem;color:#1A1A2E;line-height:1.4">
            ${q.q}
          </div>
        </div>

        <div class="slh-answers" id="slh-answers">
          ${q.opts.map((opt, i) => `
            <button class="slh-answer-btn" id="slh-opt-${i}" onclick="SmartLifeHero.choose(${i})">
              <span class="slh-answer-letter">${'ABCD'[i]}</span>
              <span>${opt}</span>
            </button>`).join('')}
        </div>
        <div class="feedback-bar" id="slh-feedback" style="margin-top:12px"></div>
      </div>`;
  }

  // ── Choose Answer ─────────────────────────────────────────────
  function choose(idx) {
    if (answered) return;
    answered = true;
    const q = questions[current];
    const correct = idx === q.ans;
    if (correct) score++;

    // Style buttons
    document.querySelectorAll('.slh-answer-btn').forEach(b => b.disabled = true);
    const chosenBtn = document.getElementById(`slh-opt-${idx}`);
    const correctBtn = document.getElementById(`slh-opt-${q.ans}`);
    if (chosenBtn) chosenBtn.classList.add(correct ? 'slh-correct' : 'slh-wrong');
    if (!correct && correctBtn) correctBtn.classList.add('slh-correct');

    // Feedback
    const fb = document.getElementById('slh-feedback');
    if (fb) {
      fb.textContent = q.explain;
      fb.className = 'feedback-bar show ' + (correct ? 'correct' : 'wrong');
    }

    window.SFX?.play(correct ? 'quiz_correct' : 'quiz_wrong');
    setTimeout(() => { current++; showQuestion(); }, correct ? 2000 : 3500);
  }

  // ── End Category ──────────────────────────────────────────────
  async function endCategory() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const cat = CATEGORIES[currentCategory];
    const pct = Math.round((score / questions.length) * 100);
    const perfect = score === questions.length;

    window.SFX?.play(pct >= 80 ? 'win' : pct >= 60 ? 'draw' : 'lose');

    const root = document.getElementById('slh-root');
    root.innerHTML = `
      <div style="text-align:center;padding:40px 24px;max-width:500px;margin:0 auto">
        <div style="font-size:4.5rem;margin-bottom:12px;animation:float 2s ease-in-out infinite">
          ${pct === 100 ? '🏆' : pct >= 80 ? '⭐' : pct >= 60 ? '💪' : '🌱'}
        </div>
        <div style="font-family:'Fredoka One',cursive;font-size:2rem;color:#1A1A2E;margin-bottom:6px">
          ${perfect ? 'Perfect Score!' : pct >= 80 ? 'Amazing!' : pct >= 60 ? 'Well Done!' : 'Keep Learning!'}
        </div>
        <div style="background:linear-gradient(135deg,${cat.color}22,${cat.color}11);
             border:2px solid ${cat.color}44;border-radius:14px;padding:12px 20px;margin-bottom:20px;display:inline-block">
          <div style="font-size:1.3rem">🏅 ${cat.badge}</div>
          <div style="font-size:.85rem;font-weight:700;color:#1A1A2E;margin-top:4px">You earned this badge!</div>
        </div>
        <div class="quiz-stats-grid" style="margin-bottom:24px">
          <div class="quiz-stat"><div class="quiz-stat-val">${score}/${questions.length}</div><div class="quiz-stat-lbl">✅ Correct</div></div>
          <div class="quiz-stat"><div class="quiz-stat-val">${pct}%</div><div class="quiz-stat-lbl">🎯 Score</div></div>
          <div class="quiz-stat"><div class="quiz-stat-val">${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,'0')}</div><div class="quiz-stat-lbl">⏱️ Time</div></div>
        </div>
        <div style="background:#f9fafb;border-radius:14px;padding:14px 18px;margin-bottom:24px;text-align:left">
          <div style="font-weight:800;color:#1A1A2E;margin-bottom:8px">💡 Life Skill Unlocked:</div>
          <div style="font-size:.9rem;color:#6B7280;font-weight:600;line-height:1.6">${cat.description} — Now you know how to handle <strong>${cat.name}</strong> like a pro! ⭐</div>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary btn-lg" onclick="SmartLifeHero.startCategory('${currentCategory}')">🔄 Try Again</button>
          <button class="btn btn-secondary" onclick="SmartLifeHero.backToMenu()">🦸 More Categories</button>
        </div>
      </div>`;

    try {
      await saveResult({
        gameType: 'smart-life',
        outcome:  'quiz',
        category: currentCategory,
        level: 'all',
        score,
        total: questions.length,
        percent: pct,
        duration: elapsed,
        timeStr: `${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,'0')}`
      });
    } catch(e) {}
  }

  function backToMenu() {
    window.SFX?.play('click');
    renderCategoryScreen();
  }

  window.SmartLifeHero = { init, startCategory, choose, backToMenu };
})();
