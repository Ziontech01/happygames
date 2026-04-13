'use strict';

const FEELINGS_DATA = {

  sections: [
    { id:'emotion_match',  name:'Emotion Match',         emoji:'🎭', color:'#f97316', desc:'Can you name the feeling?' },
    { id:'coping',         name:'What Should I Do?',      emoji:'🛠️', color:'#10b981', desc:'Pick the best coping skill' },
    { id:'control',        name:'What Can I Control?',    emoji:'⚖️', color:'#6366f1', desc:'Inside or outside my control?' },
    { id:'think',          name:'THINK Before You Speak', emoji:'💭', color:'#ec4899', desc:'Choose your words wisely' },
    { id:'okay_to',        name:"It's Okay To...",        emoji:'🌈', color:'#8b5cf6', desc:'True or false?' },
    { id:'affirmations',   name:'I Am...',                emoji:'⭐', color:'#f59e0b', desc:'Complete the affirmation' }
  ],

  questions: [

    // ── EMOTION MATCH ──────────────────────────────────────────────────────
    { id:'em_01', section:'emotion_match', prompt:'You got a gold star on your drawing! How do you feel?',
      choices:['Sad','Proud','Scared','Angry'], correct:1, emoji:'⭐',
      explanation:'Feeling proud when you do something well is wonderful!' },

    { id:'em_02', section:'emotion_match', prompt:'Your best friend moved to another school. How might you feel?',
      choices:['Excited','Silly','Lonely','Calm'], correct:2, emoji:'😢',
      explanation:'It is normal to feel lonely when someone we care about is far away.' },

    { id:'em_03', section:'emotion_match', prompt:'You are about to go on stage to perform. How might you feel?',
      choices:['Nervous','Proud','Calm','Tired'], correct:0, emoji:'🎭',
      explanation:'Feeling nervous before performing is very common — even grown-ups feel it!' },

    { id:'em_04', section:'emotion_match', prompt:'Someone took your toy without asking. How might you feel?',
      choices:['Happy','Excited','Angry','Peaceful'], correct:2, emoji:'😠',
      explanation:'Feeling angry when something unfair happens is understandable.' },

    { id:'em_05', section:'emotion_match', prompt:'You are going to a birthday party! How do you feel?',
      choices:['Sad','Bored','Excited','Angry'], correct:2, emoji:'🎉',
      explanation:'Feeling excited about fun things is totally natural!' },

    { id:'em_06', section:'emotion_match', prompt:'You are worried about something bad happening. How do you feel?',
      choices:['Happy','Worried','Proud','Silly'], correct:1, emoji:'😟',
      explanation:'Worry is our brain trying to keep us safe. It is okay to feel worried sometimes.' },

    { id:'em_07', section:'emotion_match', prompt:'You finished a really hard puzzle all by yourself! How do you feel?',
      choices:['Scared','Frustrated','Proud','Lonely'], correct:2, emoji:'🧩',
      explanation:'You should feel proud — finishing something hard is a big achievement!' },

    { id:'em_08', section:'emotion_match', prompt:'You heard a loud noise in the dark. How do you feel?',
      choices:['Excited','Happy','Bored','Scared'], correct:3, emoji:'😨',
      explanation:'Feeling scared of unexpected things is our brain protecting us.' },

    { id:'em_09', section:'emotion_match', prompt:'You tripped in front of everyone at school. How do you feel?',
      choices:['Proud','Embarrassed','Excited','Calm'], correct:1, emoji:'😳',
      explanation:'Feeling embarrassed when something awkward happens is completely normal.' },

    { id:'em_10', section:'emotion_match', prompt:'Your brother got a bigger piece of cake than you. How do you feel?',
      choices:['Happy','Jealous','Calm','Brave'], correct:1, emoji:'🎂',
      explanation:'Feeling a little jealous sometimes is human. It is okay — just talk about how you feel.' },

    { id:'em_11', section:'emotion_match', prompt:'You are reading your favourite book in a cosy spot. How do you feel?',
      choices:['Angry','Worried','Calm','Scared'], correct:2, emoji:'📚',
      explanation:'That quiet comfortable feeling is called calm — it feels really nice!' },

    { id:'em_12', section:'emotion_match', prompt:'You are trying to tie your shoes but they keep coming undone. How might you feel?',
      choices:['Proud','Happy','Frustrated','Excited'], correct:2, emoji:'👟',
      explanation:'Feeling frustrated when something is tricky is very normal. Take a breath!' },

    { id:'em_13', section:'emotion_match', prompt:'A new child joined your class and you did not know what to say. How do you feel?',
      choices:['Silly','Shy','Angry','Proud'], correct:1, emoji:'🤝',
      explanation:'Feeling shy around new people is very common. You can just smile to say hello!' },

    { id:'em_14', section:'emotion_match', prompt:'You saw something funny and could not stop giggling. How do you feel?',
      choices:['Happy','Scared','Tired','Worried'], correct:0, emoji:'😂',
      explanation:'Laughing and feeling happy is one of the best feelings ever!' },

    { id:'em_15', section:'emotion_match', prompt:'You stayed up really late and it is hard to focus. How do you feel?',
      choices:['Excited','Proud','Tired','Calm'], correct:2, emoji:'😴',
      explanation:'Tiredness is a signal your body needs rest. Sleep helps us feel better.' },

    { id:'em_16', section:'emotion_match', prompt:'Something happened that you did not expect at all! How do you feel?',
      choices:['Bored','Calm','Surprised','Lonely'], correct:2, emoji:'😲',
      explanation:'Surprises can make us jump! Surprise is an emotion that happens very quickly.' },

    { id:'em_17', section:'emotion_match', prompt:'You helped someone who was upset. How do you feel about yourself?',
      choices:['Embarrassed','Scared','Jealous','Proud'], correct:3, emoji:'🤗',
      explanation:'Helping others feels really good. That proud feeling is your kindness shining!' },

    { id:'em_18', section:'emotion_match', prompt:'You have nobody to sit with at lunch. How might you feel?',
      choices:['Excited','Lonely','Proud','Calm'], correct:1, emoji:'🥺',
      explanation:'Feeling lonely is hard. It is a sign you value friendship — that is beautiful.' },

    { id:'em_19', section:'emotion_match', prompt:'You are about to try something new for the very first time. How might you feel?',
      choices:['Nervous and excited','Only angry','Bored','Disgusted'], correct:0, emoji:'🌟',
      explanation:'You can feel two emotions at once! Nervous-excited is very common before new adventures.' },

    { id:'em_20', section:'emotion_match', prompt:'You made a mistake and let your team down. How might you feel?',
      choices:['Happy','Proud','Guilty / Sorry','Excited'], correct:2, emoji:'😔',
      explanation:'Feeling sorry when you make a mistake shows you care. Mistakes help us grow.' },

    // ── WHAT SHOULD I DO ──────────────────────────────────────────────────
    { id:'cd_01', section:'coping', prompt:'You feel really angry. What is the best thing to do?',
      choices:['Take deep breaths','Hit someone','Break your toys','Shout at everyone'], correct:0, emoji:'😤',
      explanation:'Deep breathing helps calm our body and brain when we are angry.' },

    { id:'cd_02', section:'coping', prompt:'You are feeling sad and want to feel better. What could help?',
      choices:['Stay in bed all day','Talk to someone you trust','Be mean to others','Pretend you are fine'], correct:1, emoji:'😢',
      explanation:'Talking to someone who cares helps us feel less alone.' },

    { id:'cd_03', section:'coping', prompt:'You are so worried you cannot sleep. What could help?',
      choices:['Watch scary videos','Count slowly and breathe deeply','Eat lots of sweets','Worry more'], correct:1, emoji:'😰',
      explanation:'Slow breathing and counting helps calm your worried brain at night.' },

    { id:'cd_04', section:'coping', prompt:'You feel frustrated with a difficult task. What is a good thing to try?',
      choices:['Throw the task away','Take a short break and come back','Give up forever','Blame someone else'], correct:1, emoji:'😤',
      explanation:'Taking a break refreshes your brain and helps you try again with fresh eyes.' },

    { id:'cd_05', section:'coping', prompt:'You feel lonely at school. What could you do?',
      choices:['Be mean to get attention','Smile and say hello to someone','Wait for someone to fix it','Cry loudly'], correct:1, emoji:'🤝',
      explanation:'A simple smile or hello is how friendships begin!' },

    { id:'cd_06', section:'coping', prompt:'You are excited but it is making you feel too hyper. What could help?',
      choices:['Run around with no care','Take deep slow breaths to calm down','Bounce off the walls','Ignore the feeling'], correct:1, emoji:'🤸',
      explanation:'Even good feelings can feel too big sometimes. Breathing helps bring us back to calm.' },

    { id:'cd_07', section:'coping', prompt:'You feel scared about going somewhere new. What could help?',
      choices:['Refuse to go forever','Draw a picture of your feelings','Pretend to be sick','Run away'], correct:1, emoji:'😨',
      explanation:'Drawing or writing how you feel helps your brain process scary feelings.' },

    { id:'cd_08', section:'coping', prompt:'You are feeling bored and restless. What is a good choice?',
      choices:['Break something','Go for a walk or do some stretches','Annoy your sibling','Eat everything in the fridge'], correct:1, emoji:'🚶',
      explanation:'Moving your body helps when you feel restless. A walk can change your whole mood!' },

    { id:'cd_09', section:'coping', prompt:'You feel overwhelmed with too many things to do. What could help?',
      choices:['Do everything at once and panic','Ask an adult for help','Ignore all the tasks','Run away'], correct:1, emoji:'🤯',
      explanation:'Asking for help is brave and smart. Nobody has to do everything alone.' },

    { id:'cd_10', section:'coping', prompt:'You feel embarrassed after making a mistake. What is a kind thing to tell yourself?',
      choices:['I am so stupid','Everyone hates me','Mistakes help me learn and grow','I should give up'], correct:2, emoji:'💪',
      explanation:'Self-kindness is important. Everyone makes mistakes — they are how we get better.' },

    { id:'cd_11', section:'coping', prompt:'You feel upset but do not know why. What could help?',
      choices:['Take it out on others','Sit quietly and notice how your body feels','Scream for no reason','Pretend nothing is wrong'], correct:1, emoji:'🤔',
      explanation:'Sometimes just sitting quietly and noticing your feelings helps you understand them.' },

    { id:'cd_12', section:'coping', prompt:'You feel worried about something that might happen. What should you do?',
      choices:['Assume the worst will definitely happen','Focus on things inside your control','Tell everyone your worries will come true','Give up on the future'], correct:1, emoji:'😟',
      explanation:'When we focus on what we CAN control, we feel less worried.' },

    { id:'cd_13', section:'coping', prompt:'A friend said something that hurt your feelings. What is the best first step?',
      choices:['Say something mean back','Tell them calmly how you feel','Never speak to them again','Spread rumours'], correct:1, emoji:'💬',
      explanation:'Calmly telling someone how their words made you feel is the kindest and bravest choice.' },

    { id:'cd_14', section:'coping', prompt:'You feel nervous before a test. What can help right before you start?',
      choices:['Tell everyone you will fail','Take 3 slow deep breaths','Run out of the room','Distract everyone'], correct:1, emoji:'📝',
      explanation:'Three slow breaths before a test really does calm your nervous system. Try it!' },

    { id:'cd_15', section:'coping', prompt:'You feel angry with your sibling. What should you do before talking to them?',
      choices:['Shout immediately','Calm down first by breathing or counting','Push them','Walk away forever'], correct:1, emoji:'😠',
      explanation:'Calming down first means the conversation will go much better.' },

    { id:'cd_16', section:'coping', prompt:'You feel really upset and overwhelmed. What is a safe way to release the feeling?',
      choices:['Break furniture','Write or draw in your feelings journal','Hit someone','Hold it all in forever'], correct:1, emoji:'📓',
      explanation:'Journalling or drawing is a safe and powerful way to let big feelings out.' },

    { id:'cd_17', section:'coping', prompt:'You feel tired and unhappy. What is something simple that could help?',
      choices:['Stay up all night','Drink some water and rest','Be mean to feel better','Eat lots of sweets'], correct:1, emoji:'💧',
      explanation:'Sometimes tiredness and low mood just need water and rest. Our bodies are clever!' },

    { id:'cd_18', section:'coping', prompt:'You did something you regret. What is the best way to feel better?',
      choices:['Pretend it never happened','Apologise and make it right','Blame someone else','Feel bad forever'], correct:1, emoji:'🙏',
      explanation:'Apologising and making things right is one of the bravest and kindest things you can do.' },

    { id:'cd_19', section:'coping', prompt:'You feel calm and happy right now. What could help you stay that way?',
      choices:['Do something kind for yourself or someone else','Try to make yourself sad','Ignore the feeling','Worry about tomorrow'], correct:0, emoji:'😊',
      explanation:'Enjoying and appreciating calm happy feelings helps them last longer.' },

    { id:'cd_20', section:'coping', prompt:'You feel jealous of a friend. What is a healthy way to handle it?',
      choices:['Be mean to your friend','Celebrate their success and focus on your own strengths','Ignore them forever','Tell everyone you are not lucky'], correct:1, emoji:'🌟',
      explanation:'Everyone has different strengths. Being happy for others AND proud of yourself feels great.' },

    // ── WHAT CAN I CONTROL ────────────────────────────────────────────────
    { id:'ct_01', section:'control', prompt:'Which one is INSIDE your control?',
      choices:["Other people's opinions",'My actions',"Other people's feelings",'What other people say'], correct:1, emoji:'⚖️',
      explanation:'You always get to choose your actions. That is real power!' },

    { id:'ct_02', section:'control', prompt:'Can you control the weather?',
      choices:['Yes always','No, but I can control how I prepare for it','Only sometimes','Yes with magic'], correct:1, emoji:'🌦️',
      explanation:'We cannot change the weather, but we can choose how we respond to it.' },

    { id:'ct_03', section:'control', prompt:"Is your best friend's mood inside your control?",
      choices:['Yes','No, but I can be kind','Yes if I try hard enough','Yes if I give them things'], correct:1, emoji:'😊',
      explanation:"Other people's feelings belong to them. We can be kind, but we cannot control how they feel." },

    { id:'ct_04', section:'control', prompt:'Which of these is INSIDE your control?',
      choices:['Whether my team wins','My effort and how hard I try','What score the teacher gives',"What other players do"], correct:1, emoji:'🏅',
      explanation:'You cannot control the result, but you CAN control how much effort you give.' },

    { id:'ct_05', section:'control', prompt:'Someone is being unkind to you. What is inside YOUR control?',
      choices:['Making them be nice','How I respond and who I tell','Their behaviour','What they think'], correct:1, emoji:'💪',
      explanation:'You cannot change others, but you can choose to walk away, stay calm, and ask for help.' },

    { id:'ct_06', section:'control', prompt:'Is your attitude and how you start your day inside your control?',
      choices:['Yes!','No','Only on good days','Only if everything goes well'], correct:0, emoji:'🌅',
      explanation:'You get to choose your attitude every single day. That is a superpower!' },

    { id:'ct_07', section:'control', prompt:'Can you control what other people think about you?',
      choices:['Yes if I try hard','No, but I can be my best self','Yes if I am perfect','Yes always'], correct:1, emoji:'💭',
      explanation:"We cannot make everyone like us, but we can be kind, honest, and true to ourselves." },

    { id:'ct_08', section:'control', prompt:'Which one is OUTSIDE your control?',
      choices:['How I speak to others','Whether I try my best',"Other people's behaviour",'My own feelings'], correct:2, emoji:'⚖️',
      explanation:"Other people's behaviour is theirs to own, not yours to fix." },

    { id:'ct_09', section:'control', prompt:'Is how much you practise something inside your control?',
      choices:['Yes!','No','Only sometimes','Only if it is easy'], correct:0, emoji:'🎯',
      explanation:'Practice is completely in your control. The more you practise, the better you get!' },

    { id:'ct_10', section:'control', prompt:'Your team lost the game. What is inside your control?',
      choices:["The other team's skill level","The referee's decisions",'How I feel, what I learn, and how I respond',"My teammates' performance"], correct:2, emoji:'⚽',
      explanation:'After a loss, your response is everything. You choose how you move forward.' },

    { id:'ct_11', section:'control', prompt:'True or false: I can control whether I make mistakes.',
      choices:['True','False — everyone makes mistakes and that is okay'], correct:1, emoji:'✅',
      explanation:'Mistakes are part of learning. Nobody can avoid them — and that is actually good!' },

    { id:'ct_12', section:'control', prompt:'Is being kind inside your control?',
      choices:['Yes, always','No','Only when I feel happy','Only for some people'], correct:0, emoji:'💛',
      explanation:'Kindness is always a choice we can make. Even on hard days, we can choose kindness.' },

    { id:'ct_13', section:'control', prompt:'Can you control whether other people are kind to you?',
      choices:['Yes','No, but I can set boundaries and ask for help','Yes if I am nice enough','Yes always'], correct:1, emoji:'🛡️',
      explanation:'You deserve kindness, but cannot control others. You CAN ask for help if someone is unkind.' },

    { id:'ct_14', section:'control', prompt:'Which is in YOUR control?',
      choices:['The traffic outside',"My sister's homework",'How I use my time right now','What the weather does'], correct:2, emoji:'⏰',
      explanation:'How you choose to spend your time is completely up to you.' },

    { id:'ct_15', section:'control', prompt:'True or false: Asking for help is inside my control.',
      choices:['True','False'], correct:0, emoji:'🙋',
      explanation:'Asking for help is always your choice — and it is one of the bravest things you can do.' },

    // ── THINK BEFORE YOU SPEAK ────────────────────────────────────────────
    { id:'th_01', section:'think', prompt:'In THINK, what does the T stand for?',
      choices:['Tired','True','Trendy','Tough'], correct:1, emoji:'🤔',
      explanation:'T = True. Before speaking, ask yourself: Is what I am about to say actually true?' },

    { id:'th_02', section:'think', prompt:'In THINK, what does H stand for?',
      choices:['Helpful','Happy','Honest','Hopeful'], correct:0, emoji:'🤔',
      explanation:'H = Helpful. Ask yourself: Will saying this help the situation or make it worse?' },

    { id:'th_03', section:'think', prompt:'In THINK, what does I stand for?',
      choices:['Important','Interesting','Inspiring','Incredible'], correct:2, emoji:'🤔',
      explanation:'I = Inspiring. Will your words lift someone up or pull them down?' },

    { id:'th_04', section:'think', prompt:'In THINK, what does N stand for?',
      choices:['Nice','Noisy','Necessary','Natural'], correct:2, emoji:'🤔',
      explanation:'N = Necessary. Does this really need to be said right now?' },

    { id:'th_05', section:'think', prompt:'In THINK, what does K stand for?',
      choices:['Keep','Kind','Know','Key'], correct:1, emoji:'🤔',
      explanation:'K = Kind. The most important question: Is what I am about to say kind?' },

    { id:'th_06', section:'think', prompt:"You want to tell someone their drawing looks bad. What should you do first?",
      choices:['Say it immediately','THINK — is it true, helpful, inspiring, necessary, and kind?','Tell someone else instead','Write a mean note'], correct:1, emoji:'🎨',
      explanation:'Pausing to THINK gives us time to choose kinder, more helpful words.' },

    { id:'th_07', section:'think', prompt:'Your friend made a mistake. Which is the THINK-approved way to respond?',
      choices:['"You are so silly for that"','"That is okay — we all make mistakes. Want help?"','"I would never do that"','"Everyone will laugh at you"'], correct:1, emoji:'🤗',
      explanation:'Offering kindness and help after a mistake is exactly what the K in THINK asks for.' },

    { id:'th_08', section:'think', prompt:'Before speaking when you are angry, what is the BEST first step?',
      choices:['Say everything you feel immediately','THINK and calm down first','Walk away without speaking ever','Shout louder'], correct:1, emoji:'😤',
      explanation:'THINK works best when combined with calmness. Take a breath, then think.' },

    { id:'th_09', section:'think', prompt:'Is it always necessary to say everything you are thinking?',
      choices:['Yes, always','No — some thoughts are better kept to yourself','Yes, it is always kind','Yes, it is always true'], correct:1, emoji:'💭',
      explanation:'Not every thought needs to be shared. Choosing what to say is a sign of wisdom.' },

    { id:'th_10', section:'think', prompt:'A classmate has a new haircut you do not like. What is the THINK-approved action?',
      choices:['Tell them you hate it','Stay quiet — it is not kind or necessary to say it','Tell all your friends','Laugh at it'], correct:1, emoji:'✂️',
      explanation:'If something is not kind or necessary, the best choice is often to say nothing.' },

    { id:'th_11', section:'think', prompt:'Which of these passes the THINK check?',
      choices:['"You are the worst at this"','"I noticed you worked really hard on that"','"Nobody wants you here"','"Your ideas are always bad"'], correct:1, emoji:'⭐',
      explanation:'Noticing effort is true, helpful, inspiring, kind, and necessary. Perfect THINK pass!' },

    { id:'th_12', section:'think', prompt:'You heard a rumour about someone. Should you share it?',
      choices:['Yes if it is interesting','THINK first — is it true, kind, and necessary?','Yes to warn people','Yes because everyone will want to know'], correct:1, emoji:'🗣️',
      explanation:'Rumours often hurt people. THINK before sharing anything about someone else.' },

    { id:'th_13', section:'think', prompt:'What is the purpose of the THINK method?',
      choices:['To stop you speaking at all','To help you speak with kindness and care','To make you seem smarter','To win arguments'], correct:1, emoji:'💡',
      explanation:'THINK is about choosing words that help, heal, and support — not hurt.' },

    { id:'th_14', section:'think', prompt:'You are upset and about to send a message. What should you do?',
      choices:['Send it immediately','THINK and wait — calm down before pressing send','Send it and say sorry later','Never send any messages'], correct:1, emoji:'📱',
      explanation:'Waiting until you are calm before sending a message can prevent many regrets.' },

    { id:'th_15', section:'think', prompt:'Which is NOT part of the THINK check?',
      choices:['Is it true?','Is it kind?','Is it trendy?','Is it necessary?'], correct:2, emoji:'❓',
      explanation:'Trendy is not in THINK! Remember: True, Helpful, Inspiring, Necessary, Kind.' },

    // ── IT'S OKAY TO ──────────────────────────────────────────────────────
    { id:'ok_01', section:'okay_to', prompt:"It is okay to make mistakes.",
      choices:['True','False'], correct:0, emoji:'✅',
      explanation:"Everyone makes mistakes — even grown-ups! Mistakes are how we learn and grow." },

    { id:'ok_02', section:'okay_to', prompt:"It is okay to ask for help.",
      choices:['True','False'], correct:0, emoji:'🙋',
      explanation:"Asking for help is one of the bravest and smartest things you can do." },

    { id:'ok_03', section:'okay_to', prompt:"It is okay to feel sad sometimes.",
      choices:['True','False'], correct:0, emoji:'💙',
      explanation:"All feelings are okay. Feeling sad is natural — it means you care about something." },

    { id:'ok_04', section:'okay_to', prompt:"It is NOT okay to have bad days.",
      choices:['True','False — it is totally okay to have bad days'], correct:1, emoji:'🌧️',
      explanation:"Everyone has bad days. They are part of life, and they always pass." },

    { id:'ok_05', section:'okay_to', prompt:"It is okay to start over.",
      choices:['True','False'], correct:0, emoji:'🔄',
      explanation:"Starting over is not giving up — it is being brave enough to try again." },

    { id:'ok_06', section:'okay_to', prompt:"It is okay to not know all the answers.",
      choices:['True','False'], correct:0, emoji:'🤷',
      explanation:"Not knowing is the beginning of learning. Questions are wonderful things!" },

    { id:'ok_07', section:'okay_to', prompt:"It is okay to say no when something makes you uncomfortable.",
      choices:['True','False'], correct:0, emoji:'🛑',
      explanation:"Your feelings and comfort matter. You always have the right to say no." },

    { id:'ok_08', section:'okay_to', prompt:"You should hide your feelings and pretend to be fine.",
      choices:['True','False — you should never have to hide how you feel'], correct:1, emoji:'❤️',
      explanation:"You never have to pretend. Your feelings are real and they matter." },

    { id:'ok_09', section:'okay_to', prompt:"It is okay to be yourself, even if you are different.",
      choices:['True','False'], correct:0, emoji:'🌈',
      explanation:"Your uniqueness is your superpower. There is nobody quite like you!" },

    { id:'ok_10', section:'okay_to', prompt:"It is NOT okay to talk to a trusted adult when you feel very upset.",
      choices:['True','False — you should always feel safe to ask for help'], correct:1, emoji:'🤝',
      explanation:"Talking to a trusted adult when you feel very upset is always okay. They are there to help." },

    // ── AFFIRMATIONS ──────────────────────────────────────────────────────
    { id:'af_01', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['useless','important','forgotten','stupid'], correct:1, emoji:'🌟',
      explanation:'You ARE important. Every day, in every way, you matter.' },

    { id:'af_02', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['invisible','unloved','loved','boring'], correct:2, emoji:'❤️',
      explanation:'You are loved — more than you know.' },

    { id:'af_03', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['weak','brave','scared to try','a failure'], correct:1, emoji:'🦁',
      explanation:'Bravery does not mean having no fear — it means trying anyway. You are brave!' },

    { id:'af_04', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['dumb','not good at learning','too slow','intelligent'], correct:3, emoji:'🧠',
      explanation:'You have a brilliant brain that learns and grows every single day.' },

    { id:'af_05', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['unheard','heard','ignored','not important'], correct:1, emoji:'👂',
      explanation:'Your voice matters. What you think and feel is worth listening to.' },

    { id:'af_06', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['weak','strong','fragile','helpless'], correct:1, emoji:'💪',
      explanation:'You are stronger than you think — especially when things are hard.' },

    { id:'af_07', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['common','just like everyone else','unique','ordinary'], correct:2, emoji:'✨',
      explanation:'There is nobody in the whole world exactly like you. That is amazing!' },

    { id:'af_08', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['mean','unkind','kind','hurtful'], correct:2, emoji:'💛',
      explanation:'Kindness lives inside you. Every time you are kind, the world gets a little better.' },

    { id:'af_09', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['forgotten','unnoticed','invisible','appreciated'], correct:3, emoji:'🌸',
      explanation:'You are appreciated. The things you do matter to the people around you.' },

    { id:'af_10', section:'affirmations', prompt:'Complete the affirmation: I am ___',
      choices:['incapable','unable','not smart enough','capable'], correct:3, emoji:'🚀',
      explanation:'You are absolutely capable. With effort and support, you can achieve incredible things.' }

  ],

  breathing: [
    {
      id: 'lion',
      name: 'Lion Breathing',
      emoji: '🦁',
      color: '#f97316',
      steps: [
        { instruction: 'Sit up tall like a brave lion', action: 'Get ready', duration: 2000 },
        { instruction: 'Breathe in slowly through your nose...', action: 'Breathe IN', duration: 4000 },
        { instruction: 'Open your mouth wide and ROAR it all out!', action: 'ROAR! 🦁', duration: 3000 },
        { instruction: 'Feel how much calmer you are', action: 'Well done!', duration: 2000 }
      ],
      rounds: 3
    },
    {
      id: 'bunny',
      name: 'Bunny Breathing',
      emoji: '🐰',
      color: '#ec4899',
      steps: [
        { instruction: 'Sit still and imagine you are a little bunny', action: 'Get ready', duration: 2000 },
        { instruction: 'Take 3 quick sniffs through your nose — sniff sniff sniff!', action: 'Sniff sniff sniff 🐰', duration: 3000 },
        { instruction: 'Now breathe out slowly through your mouth', action: 'Breathe OUT slowly', duration: 4000 },
        { instruction: 'How calm do you feel?', action: 'Well done!', duration: 2000 }
      ],
      rounds: 3
    },
    {
      id: 'bumble',
      name: 'Bumblebee Breathing',
      emoji: '🐝',
      color: '#f59e0b',
      steps: [
        { instruction: 'Close your eyes gently if you like', action: 'Get ready', duration: 2000 },
        { instruction: 'Take a big breath in through your nose', action: 'Breathe IN', duration: 4000 },
        { instruction: 'As you breathe out, make a humming sound — hmmmmm', action: 'Hmmmm 🐝', duration: 5000 },
        { instruction: 'Feel the gentle vibration. So soothing!', action: 'Well done!', duration: 2000 }
      ],
      rounds: 3
    },
    {
      id: 'croc',
      name: 'Crocodile Breathing',
      emoji: '🐊',
      color: '#10b981',
      steps: [
        { instruction: 'Lie down or sit with your hands on your tummy', action: 'Get ready', duration: 2000 },
        { instruction: 'Breathe in slowly and feel your tummy rise like a crocodile opening its mouth', action: 'Tummy RISES 🐊', duration: 4000 },
        { instruction: 'Breathe out slowly and feel your tummy fall', action: 'Tummy FALLS', duration: 4000 },
        { instruction: 'You are doing brilliantly!', action: 'Well done!', duration: 2000 }
      ],
      rounds: 3
    }
  ],

  grounding: [
    { number: 5, sense: 'SEE',   emoji: '👀', instruction: 'Look around you. Name 5 things you can SEE right now.',   color: '#6366f1' },
    { number: 4, sense: 'TOUCH', emoji: '🖐️', instruction: 'Feel around you. Name 4 things you can TOUCH right now.', color: '#ec4899' },
    { number: 3, sense: 'HEAR',  emoji: '👂', instruction: 'Listen carefully. Name 3 things you can HEAR right now.', color: '#10b981' },
    { number: 2, sense: 'SMELL', emoji: '👃', instruction: 'Notice the air. Name 2 things you can SMELL right now.',  color: '#f97316' },
    { number: 1, sense: 'TASTE', emoji: '👅', instruction: 'Notice your mouth. Name 1 thing you can TASTE right now.', color: '#f59e0b' }
  ],

  affirmations: [
    'I am important',
    'I am loved',
    'I am brave',
    'I am intelligent',
    'I am heard',
    'I am strong',
    'I am unique',
    'I am kind',
    'I am appreciated',
    'I am capable'
  ]

};
