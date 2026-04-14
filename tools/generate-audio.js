#!/usr/bin/env node
// ── Happy Games — ElevenLabs Audio Generator ──────────────────────────────
// Generates premium TTS audio files for all quiz questions and answers.
// Run once (or after adding new questions) to populate audio/tts/
//
// Setup:
//   1.  cp tools/.env.example tools/.env
//   2.  Add your ElevenLabs API key and preferred Voice ID to tools/.env
//   3.  npm install dotenv node-fetch   (or: npm install in /tools)
//   4.  node tools/generate-audio.js
//
// Outputs:
//   audio/tts/*.mp3          — one file per unique spoken text
//   audio/tts/manifest.json  — hash → filename map read by speech.js
// ──────────────────────────────────────────────────────────────────────────

'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');
const https = require('https');

// ── Load .env ──────────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

const API_KEY  = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'XB0fDUnXU5powFXDhCwa'; // Charlotte (UK female)
const MODEL    = process.env.ELEVENLABS_MODEL     || 'eleven_multilingual_v2';

if (!API_KEY) {
  console.error('\n❌  ELEVENLABS_API_KEY not set. Copy tools/.env.example to tools/.env and add your key.\n');
  process.exit(1);
}

const ROOT         = path.join(__dirname, '..');
const OUTPUT_DIR   = path.join(ROOT, 'audio', 'tts');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

// ── Ensure output directory exists ────────────────────────────────────────
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Load existing manifest (for resume capability) ────────────────────────
let manifest = {};
if (fs.existsSync(MANIFEST_PATH)) {
  try { manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')); } catch {}
}

// ── Hash function (must match speech.js _hash) ────────────────────────────
function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h |= 0;
  }
  return (h >>> 0).toString(36);
}

// ── Text preparation (must match speech.js prepareText) ───────────────────
function prepareText(raw) {
  let t = String(raw || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&nbsp;/g,' ').replace(/&#\d+;/g,' ');

  t = t
    .replace(/×/g,' times ').replace(/÷/g,' divided by ')
    .replace(/²/g,' squared ').replace(/³/g,' cubed ')
    .replace(/√/g,' square root of ').replace(/%/g,' percent ')
    .replace(/≠/g,' is not equal to ').replace(/≤/g,' less than or equal to ')
    .replace(/≥/g,' greater than or equal to ')
    .replace(/</g,' less than ').replace(/>/g,' greater than ');

  if (/=\s*\?/.test(t)) {
    t = t.replace(/=\s*\?/,'').trim();
    t = t.replace(/(\d)\s*\+\s*(\d)/g,'$1 plus $2')
         .replace(/(\d)\s*-\s*(\d)/g,'$1 minus $2')
         .replace(/(\d)\s*\*\s*(\d)/g,'$1 times $2');
    if (!/^(what|which|how|why|when|where|who|is|are|does|do|can)/i.test(t))
      t = 'What is ' + t.trim() + '?';
    else
      t = t.trim() + '?';
  } else {
    t = t.replace(/(\d)\s*\+\s*(\d)/g,'$1 plus $2')
         .replace(/(\d)\s*-\s*(\d)/g,'$1 minus $2')
         .replace(/(\d)\s*\*\s*(\d)/g,'$1 times $2')
         .replace(/(\d)\s*=\s*(\d)/g,'$1 equals $2');
  }

  return t.replace(/[_|\\]/g,' ').replace(/\s+/g,' ').trim();
}

// ── Question bank extraction ───────────────────────────────────────────────
const LEVELS = ['reception','year1','year2','year3','year4','year5','year6'];

// Files using getXyzQuestions(level) pattern
const QUIZ_FILES = [
  { file: '../js/questions/english.js',  fn: 'getEnglishQuestions'  },
  { file: '../js/questions/general.js',  fn: 'getGeneralQuestions'  },
  { file: '../js/questions/grammar.js',  fn: 'getGrammarQuestions'  },
  { file: '../js/questions/science.js',  fn: 'getScienceQuestions'  },
  { file: '../js/questions/spelling.js', fn: 'getSpellingQuestions' },
  { file: '../js/questions/riddles.js',  fn: 'getRiddlesQuestions'  },
  { file: '../js/questions/money.js',    fn: 'getMoneyQuestions'    },
  { file: '../js/questions/time.js',     fn: 'getTimeQuestions'     },
];

function evalQuizFile(relPath, funcName) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Skipping ${relPath} — file not found`);
    return new Set();
  }
  const code = fs.readFileSync(fullPath, 'utf8');
  const ctx = { Math, Array, Object, console };
  try {
    vm.runInNewContext(code, ctx);
    const fn = ctx[funcName];
    if (typeof fn !== 'function') {
      console.warn(`  ⚠ ${funcName} not found in ${relPath}`);
      return new Set();
    }
    const texts = new Set();
    for (const level of LEVELS) {
      let qs = [];
      try { qs = fn(level) || []; } catch {}
      for (const q of qs) {
        // Normalise question/answer shapes
        const qText = q.question || q.q;
        if (qText) texts.add(prepareText(qText));
        const ans = q.answers || q.opts || [];
        ans.forEach(a => { if (a) texts.add(prepareText(String(a))); });
      }
    }
    return texts;
  } catch (err) {
    console.warn(`  ⚠ Error evaluating ${relPath}: ${err.message}`);
    return new Set();
  }
}

function extractFeelingsTexts() {
  const fullPath = path.join(ROOT, 'js/questions/feelings.js');
  if (!fs.existsSync(fullPath)) return new Set();
  const code = fs.readFileSync(fullPath, 'utf8');
  const ctx = { 'use strict': undefined };
  const texts = new Set();
  try {
    vm.runInNewContext('"use strict";\n' + code, ctx);
    const data = ctx.FEELINGS_DATA;
    if (!data) return texts;
    (data.questions || []).forEach(q => {
      if (q.prompt)      texts.add(prepareText(q.prompt));
      if (q.explanation) texts.add(prepareText(q.explanation));
      (q.choices || []).forEach(c => texts.add(prepareText(c)));
    });
    (data.affirmations || []).forEach(a => texts.add(prepareText(a)));
  } catch (err) {
    console.warn(`  ⚠ Error extracting feelings: ${err.message}`);
  }
  return texts;
}

function extractSmartLifeTexts() {
  // Extract from smart-life.js using regex (IIFE makes vm tricky)
  const fullPath = path.join(ROOT, 'js/smart-life.js');
  if (!fs.existsSync(fullPath)) return new Set();
  const code = fs.readFileSync(fullPath, 'utf8');
  const texts = new Set();
  // Match q:'...' and opts:['...','...'] patterns
  const qMatches = code.match(/\bq:\s*'((?:[^'\\]|\\.)*)'/g) || [];
  qMatches.forEach(m => {
    const val = m.replace(/^\s*q:\s*'/, '').replace(/'$/, '').replace(/\\'/g, "'");
    texts.add(prepareText(val));
  });
  // Also match double-quoted q values
  const qMatches2 = code.match(/\bq:\s*"((?:[^"\\]|\\.)*)"/g) || [];
  qMatches2.forEach(m => {
    const val = m.replace(/^\s*q:\s*"/, '').replace(/"$/, '').replace(/\\"/g, '"');
    texts.add(prepareText(val));
  });
  return texts;
}

// ── Collect all unique texts ───────────────────────────────────────────────
function collectAllTexts() {
  const all = new Set();

  console.log('\n📚 Extracting quiz questions...');
  for (const { file, fn } of QUIZ_FILES) {
    const name = path.basename(file);
    const set = evalQuizFile(file, fn);
    console.log(`   ${name}: ${set.size} unique texts`);
    set.forEach(t => { if (t) all.add(t); });
  }

  console.log('\n🧠 Extracting Feelings Quest texts...');
  const fSet = extractFeelingsTexts();
  console.log(`   feelings.js: ${fSet.size} texts`);
  fSet.forEach(t => { if (t) all.add(t); });

  console.log('\n🦸 Extracting Smart Life texts...');
  const sSet = extractSmartLifeTexts();
  console.log(`   smart-life.js: ${sSet.size} texts`);
  sSet.forEach(t => { if (t) all.add(t); });

  // Remove empty strings
  all.delete('');
  return all;
}

// ── ElevenLabs API call ────────────────────────────────────────────────────
function generateAudio(text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: { stability: 0.55, similarity_boost: 0.80, style: 0.25, use_speaker_boost: true }
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
        'Accept': 'audio/mpeg'
      }
    };

    const req = https.request(options, res => {
      if (res.statusCode !== 200) {
        let err = '';
        res.on('data', d => err += d);
        res.on('end', () => reject(new Error(`API ${res.statusCode}: ${err}`)));
        return;
      }
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Delay helper ──────────────────────────────────────────────────────────
const delay = ms => new Promise(r => setTimeout(r, ms));

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🎙️  Happy Games — ElevenLabs Audio Generator');
  console.log(`   Voice ID : ${VOICE_ID}`);
  console.log(`   Model    : ${MODEL}`);
  console.log(`   Output   : ${OUTPUT_DIR}\n`);

  const texts = collectAllTexts();
  const toGenerate = [...texts].filter(t => !manifest[hash(t)]);

  console.log(`\n✅ Total unique texts : ${texts.size}`);
  console.log(`⏭️  Already generated : ${texts.size - toGenerate.length}`);
  console.log(`🔨 To generate       : ${toGenerate.length}\n`);

  if (toGenerate.length === 0) {
    console.log('Nothing to do! All texts already have audio.\n');
    return;
  }

  let ok = 0, fail = 0;

  for (let i = 0; i < toGenerate.length; i++) {
    const text = toGenerate[i];
    const key  = hash(text);
    const file = key + '.mp3';
    const outPath = path.join(OUTPUT_DIR, file);
    const pct = Math.round(((i + 1) / toGenerate.length) * 100);

    process.stdout.write(`[${String(i+1).padStart(4)}/${toGenerate.length}] ${pct}% — ${text.substring(0,60).padEnd(60)} `);

    try {
      const audio = await generateAudio(text);
      fs.writeFileSync(outPath, audio);
      manifest[key] = file;
      // Save manifest after every successful generation (resume-safe)
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
      ok++;
      console.log('✅');
    } catch (err) {
      fail++;
      console.log(`❌ ${err.message}`);
    }

    // Rate limiting: 2 req/s to stay within ElevenLabs free tier
    if (i < toGenerate.length - 1) await delay(520);
  }

  console.log(`\n✨ Done! Generated: ${ok}  Failed: ${fail}`);
  console.log(`📄 Manifest: ${MANIFEST_PATH}\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
