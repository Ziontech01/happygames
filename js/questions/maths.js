// ── Maths Question Generator ──────────────────────────────────

function getMathsQuestions(level) {
  const q = [];
  switch (level) {
    case 'reception': return genReception();
    case 'year1':     return genYear1();
    case 'year2':     return genYear2();
    case 'year3':     return genYear3();
    case 'year4':     return genYear4();
    case 'year5':     return genYear5();
    case 'year6':     return genYear6();
    default:          return genYear1();
  }
}

function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function mcq(question, correct, wrong1, wrong2, wrong3, emoji) {
  const answers = shuffle4([correct, wrong1, wrong2, wrong3]);
  return { question, answers, correct: answers.indexOf(correct), emoji: emoji || null };
}

function shuffle4(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Reception: counting, simple addition up to 10
function genReception() {
  const qs = [];
  // Counting
  const emojis = ['🍎','⭐','🌸','🐱','🎈','🦋','🍭','🌈','🐸','🐶'];
  for (let i = 0; i < 5; i++) {
    const n = rnd(1,8);
    const e = emojis[i % emojis.length].repeat(n);
    qs.push(mcq(`How many? ${e}`, String(n), String(n+1), String(n>1?n-1:n+2), String(n+2)));
  }
  // Simple addition
  for (let i = 0; i < 5; i++) {
    const a = rnd(1,5), b = rnd(1,5);
    qs.push(mcq(`${a} + ${b} = ?`, String(a+b), String(a+b+1), String(a+b-1<0?a+b+2:a+b-1), String(a+b+2)));
  }
  // Simple subtraction
  for (let i = 0; i < 5; i++) {
    const a = rnd(3,9), b = rnd(1,a);
    qs.push(mcq(`${a} − ${b} = ?`, String(a-b), String(a-b+1), String(a-b+2), String(a-b>0?a-b-1:a-b+3)));
  }
  // Number recognition
  qs.push(mcq('Which number comes after 5?', '6', '4', '7', '8'));
  qs.push(mcq('Which number comes before 3?', '2', '1', '4', '5'));
  qs.push(mcq('What is 2 + 2?', '4', '3', '5', '6', '🍎🍎+🍎🍎'));
  qs.push(mcq('What is 5 + 0?', '5', '0', '4', '6'));
  qs.push(mcq('What is 10 − 5?', '5', '4', '6', '3', '🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈'));
  return qs;
}

// Year 1: addition/subtraction up to 20
function genYear1() {
  const qs = [];
  for (let i = 0; i < 8; i++) {
    const a = rnd(1,10), b = rnd(1,10);
    qs.push(mcq(`${a} + ${b} = ?`, String(a+b), String(a+b+1), String(a+b+2), String(a+b-1<0?a+b+3:a+b-1)));
  }
  for (let i = 0; i < 5; i++) {
    const a = rnd(5,20), b = rnd(1,a);
    qs.push(mcq(`${a} − ${b} = ?`, String(a-b), String(a-b+1), String(a-b+2), String(a-b+3)));
  }
  // Doubles
  qs.push(mcq('Double 4 is?',  '8',  '6',  '10', '9'));
  qs.push(mcq('Double 7 is?',  '14', '12', '16', '13'));
  qs.push(mcq('Half of 10 is?','5',  '4',  '6',  '8'));
  qs.push(mcq('What is 3 + 7?','10', '9',  '11', '8'));
  qs.push(mcq('What is 15 − 6?','9', '8', '10', '7'));
  return qs;
}

// Year 2: up to 100, x2 x5 x10
function genYear2() {
  const qs = [];
  for (let i = 0; i < 6; i++) {
    const a = rnd(10,50), b = rnd(1,30);
    qs.push(mcq(`${a} + ${b} = ?`, String(a+b), String(a+b+1), String(a+b+10), String(a+b-1)));
  }
  for (let i = 0; i < 4; i++) {
    const a = rnd(20,80), b = rnd(1,20);
    qs.push(mcq(`${a} − ${b} = ?`, String(a-b), String(a-b+1), String(a-b+2), String(a-b-1<0?a-b+3:a-b-1)));
  }
  // × 2, 5, 10
  [2,5,10].forEach(t => {
    const n = rnd(1,10);
    qs.push(mcq(`${n} × ${t} = ?`, String(n*t), String(n*t+t), String(n*t-t<0?n*t+2*t:n*t-t), String(n*t+2*t)));
  });
  qs.push(mcq('What is 50 + 36?','86','85','87','96'));
  qs.push(mcq('What is 70 − 24?','46','44','48','47'));
  qs.push(mcq('What is 4 × 5?','20','15','25','10'));
  qs.push(mcq('What is 30 ÷ 5?','6','5','7','4'));
  return qs;
}

// Year 3: times tables, division
function genYear3() {
  const qs = [];
  const tables = [2,3,4,5,6,8,10];
  for (let i = 0; i < 8; i++) {
    const t = tables[rnd(0,tables.length-1)];
    const n = rnd(1,12);
    qs.push(mcq(`${n} × ${t} = ?`, String(n*t), String(n*t+t), String(n*t-t<0?n*t+2:n*t-t), String(n*t+2*t)));
  }
  for (let i = 0; i < 4; i++) {
    const t = tables[rnd(0,tables.length-1)];
    const n = rnd(1,10);
    qs.push(mcq(`${n*t} ÷ ${t} = ?`, String(n), String(n+1), String(n-1<0?n+2:n-1), String(n+2)));
  }
  qs.push(mcq('What is 7 × 8?',  '56','54','58','63'));
  qs.push(mcq('What is 9 × 6?',  '54','48','56','63'));
  qs.push(mcq('What is 72 ÷ 8?', '9', '8', '10', '7'));
  qs.push(mcq('What is 45 ÷ 9?', '5', '4', '6',  '7'));
  return qs;
}

// Year 4: all tables up to 12, fractions
function genYear4() {
  const qs = [];
  for (let i = 0; i < 6; i++) {
    const t = rnd(2,12), n = rnd(1,12);
    qs.push(mcq(`${n} × ${t} = ?`, String(n*t), String(n*t+t), String(n*t-t<0?n*t+n:n*t-t), String(n*t+2*t)));
  }
  // Fractions
  qs.push(mcq('What is ½ of 48?',  '24','20','28','22'));
  qs.push(mcq('What is ¼ of 100?', '25','20','30','50'));
  qs.push(mcq('What is ⅓ of 30?',  '10','9', '12','15'));
  qs.push(mcq('What is ¾ of 20?',  '15','10','12','18'));
  qs.push(mcq('What is 11 × 11?',  '121','110','122','111'));
  qs.push(mcq('What is 12 × 8?',   '96','88','104','90'));
  qs.push(mcq('What is 144 ÷ 12?', '12','11','13','10'));
  qs.push(mcq('Round 346 to the nearest 100?','300','350','400','200'));
  qs.push(mcq('What is 500 − 247?','253','243','263','247'));
  return qs;
}

// Year 5: percentages, decimals, larger numbers
function genYear5() {
  return [
    mcq('What is 10% of 80?',   '8',   '10',  '18',  '16'),
    mcq('What is 25% of 200?',  '50',  '25',  '75',  '100'),
    mcq('What is 50% of 350?',  '175', '150', '200', '250'),
    mcq('What is 15% of 60?',   '9',   '6',   '12',  '15'),
    mcq('What is 0.5 + 0.7?',   '1.2', '1.0', '0.12','1.3'),
    mcq('What is 3.4 − 1.8?',   '1.6', '1.4', '2.2', '1.8'),
    mcq('What is 2.5 × 4?',     '10',  '8',   '12',  '9'),
    mcq('What is 6.0 ÷ 4?',     '1.5', '1.4', '2.0', '1.2'),
    mcq('What is 1234 + 567?',  '1801','1791','1811','1701'),
    mcq('What is 2000 − 768?',  '1232','1232','1242','1222'),
    mcq('What is 34 × 5?',      '170', '160', '180', '150'),
    mcq('What is 360 ÷ 8?',     '45',  '40',  '50',  '36'),
    mcq('Which is biggest: ½, ¾, ⅓?','¾','½','⅓','all equal'),
    mcq('What is 15²?',         '225', '215', '235', '125'),
    mcq('What is √64?',         '8',   '6',   '9',   '7'),
  ];
}

// Year 6: mixed, BIDMAS, harder
function genYear6() {
  return [
    mcq('What is 15% of 120?',      '18','15','21','12'),
    mcq('What is 3² + 4²?',         '25','13','14','12', '(BIDMAS)'),
    mcq('What is (4 + 6) × 3?',     '30','24','36','18'),
    mcq('What is 2³?',              '8', '6', '9', '16'),
    mcq('What is 4⁴?',              '256','64','128','512'),  // wait - too hard, let's use simpler
    mcq('What is the LCM of 4 and 6?','12','8','24','10'),
    mcq('What is the HCF of 12 and 18?','6','3','9','12'),
    mcq('What is 12.6 × 5?',        '63','60','65','62'),
    mcq('What is 4.5² ?',           '20.25','18','22.5','16'),
    mcq('What is 1000 ÷ 25?',       '40','25','50','30'),
    mcq('What is 0.1 × 0.1?',       '0.01','0.1','1','0.001'),
    mcq('What is −3 + 8?',          '5','−5','11','-11'),
    mcq('What is 3/5 as a decimal?','0.6','0.3','0.5','0.35'),
    mcq('What is 7/10 as a percentage?','70%','7%','17%','0.7'),
    mcq('What is the area of a rectangle 8cm × 6cm?','48cm²','42cm²','56cm²','28cm²'),
  ];
}
