// Happy Games – Language Game Data
// Languages: Spanish, French, Mandarin Chinese, German, Japanese, Hindi
// Categories: Greetings, Numbers, Food, Colours, Family, School
'use strict';

const LANGUAGE_DATA = {
  spanish: {
    name:'Spanish', flag:'🇪🇸', nativeName:'Español',
    funFact:'Spanish is spoken by over 500 million people across the world — it\'s the second most spoken language on Earth!',
    categories:{
      greetings:[
        { en:'Hello',               target:'Hola',             phonetic:'OH-la' },
        { en:'Good morning',        target:'Buenos días',       phonetic:'BWEH-nos DEE-as' },
        { en:'Good afternoon',      target:'Buenas tardes',     phonetic:'BWEH-nas TAR-des' },
        { en:'Good night',          target:'Buenas noches',     phonetic:'BWEH-nas NOH-ches' },
        { en:'Goodbye',             target:'Adiós',             phonetic:'ah-DYOS' },
        { en:'Thank you',           target:'Gracias',           phonetic:'GRAH-syahs' },
        { en:'Please',              target:'Por favor',         phonetic:'por fah-VOR' },
        { en:'Excuse me',           target:'Perdón',            phonetic:'per-DON' },
        { en:'How are you?',        target:'¿Cómo estás?',      phonetic:'KOH-mo es-TAS' },
        { en:'My name is...',       target:'Me llamo...',       phonetic:'meh YAH-mo' }
      ],
      numbers:[
        { en:'One',    target:'Uno',    phonetic:'OO-no' },
        { en:'Two',    target:'Dos',    phonetic:'dohs' },
        { en:'Three',  target:'Tres',   phonetic:'trehs' },
        { en:'Four',   target:'Cuatro', phonetic:'KWAH-troh' },
        { en:'Five',   target:'Cinco',  phonetic:'SEEN-koh' },
        { en:'Six',    target:'Seis',   phonetic:'sehs' },
        { en:'Seven',  target:'Siete',  phonetic:'SYEH-teh' },
        { en:'Eight',  target:'Ocho',   phonetic:'OH-choh' },
        { en:'Nine',   target:'Nueve',  phonetic:'NWEH-veh' },
        { en:'Ten',    target:'Diez',   phonetic:'dyehs' }
      ],
      food:[
        { en:'Water',     target:'Agua',      phonetic:'AH-gwah' },
        { en:'Bread',     target:'Pan',        phonetic:'pan' },
        { en:'Milk',      target:'Leche',      phonetic:'LEH-cheh' },
        { en:'Apple',     target:'Manzana',    phonetic:'man-SAH-nah' },
        { en:'Chicken',   target:'Pollo',      phonetic:'POH-yoh' },
        { en:'Rice',      target:'Arroz',      phonetic:'ah-ROHS' },
        { en:'Egg',       target:'Huevo',      phonetic:'WEH-voh' },
        { en:'Fish',      target:'Pescado',    phonetic:'pes-KAH-doh' },
        { en:'Cake',      target:'Pastel',     phonetic:'pas-TEL' },
        { en:'Orange',    target:'Naranja',    phonetic:'nah-RAHN-hah' }
      ],
      colours:[
        { en:'Red',    target:'Rojo',     phonetic:'ROH-hoh' },
        { en:'Blue',   target:'Azul',     phonetic:'ah-SOOL' },
        { en:'Yellow', target:'Amarillo', phonetic:'ah-mah-REE-yoh' },
        { en:'Green',  target:'Verde',    phonetic:'BER-deh' },
        { en:'Black',  target:'Negro',    phonetic:'NEH-groh' },
        { en:'White',  target:'Blanco',   phonetic:'BLAHN-koh' },
        { en:'Pink',   target:'Rosa',     phonetic:'ROH-sah' },
        { en:'Purple', target:'Morado',   phonetic:'moh-RAH-doh' },
        { en:'Orange', target:'Naranja',  phonetic:'nah-RAHN-hah' },
        { en:'Brown',  target:'Marrón',   phonetic:'mah-RON' }
      ],
      family:[
        { en:'Mother',      target:'Madre',        phonetic:'MAH-dreh' },
        { en:'Father',      target:'Padre',         phonetic:'PAH-dreh' },
        { en:'Brother',     target:'Hermano',       phonetic:'er-MAH-noh' },
        { en:'Sister',      target:'Hermana',       phonetic:'er-MAH-nah' },
        { en:'Grandmother', target:'Abuela',        phonetic:'ah-BWEH-lah' },
        { en:'Grandfather', target:'Abuelo',        phonetic:'ah-BWEH-loh' },
        { en:'Baby',        target:'Bebé',          phonetic:'beh-BEH' },
        { en:'Friend',      target:'Amigo / Amiga', phonetic:'ah-MEE-goh' },
        { en:'Boy',         target:'Niño',          phonetic:'NEE-nyoh' },
        { en:'Girl',        target:'Niña',          phonetic:'NEE-nyah' }
      ],
      school:[
        { en:'Book',      target:'Libro',      phonetic:'LEE-broh' },
        { en:'Pencil',    target:'Lápiz',      phonetic:'LAH-pees' },
        { en:'Teacher',   target:'Maestro/a',  phonetic:'mah-EHS-troh' },
        { en:'School',    target:'Escuela',    phonetic:'es-KWEH-lah' },
        { en:'Classroom', target:'Aula',       phonetic:'OW-lah' },
        { en:'Chair',     target:'Silla',      phonetic:'SEE-yah' },
        { en:'Table',     target:'Mesa',       phonetic:'MEH-sah' },
        { en:'Bag',       target:'Mochila',    phonetic:'moh-CHEE-lah' },
        { en:'Ruler',     target:'Regla',      phonetic:'REH-glah' },
        { en:'Friend',    target:'Compañero',  phonetic:'kom-pah-NYEH-roh' }
      ]
    }
  },

  french: {
    name:'French', flag:'🇫🇷', nativeName:'Français',
    funFact:'French is spoken on all five continents and is an official language of 29 countries. It\'s the language of love, fashion and cooking!',
    categories:{
      greetings:[
        { en:'Hello',          target:'Bonjour',          phonetic:'bon-ZHOOR' },
        { en:'Good evening',   target:'Bonsoir',          phonetic:'bon-SWAHR' },
        { en:'Good night',     target:'Bonne nuit',       phonetic:'bon NWEE' },
        { en:'Goodbye',        target:'Au revoir',        phonetic:'oh ruh-VWAHR' },
        { en:'Thank you',      target:'Merci',            phonetic:'mer-SEE' },
        { en:'Please',         target:"S'il vous plaît",  phonetic:'seel voo PLAY' },
        { en:'Excuse me',      target:'Excusez-moi',      phonetic:'ex-koo-ZAY mwah' },
        { en:'How are you?',   target:'Comment ça va ?',  phonetic:'ko-mahn sah VAH' },
        { en:'Very well',      target:'Très bien',        phonetic:'treh byan' },
        { en:'My name is...', target:"Je m'appelle...",   phonetic:'zhuh mah-PEL' }
      ],
      numbers:[
        { en:'One',   target:'Un / Une',  phonetic:'uhn / OON' },
        { en:'Two',   target:'Deux',      phonetic:'duh' },
        { en:'Three', target:'Trois',     phonetic:'twah' },
        { en:'Four',  target:'Quatre',    phonetic:'KAH-truh' },
        { en:'Five',  target:'Cinq',      phonetic:'sank' },
        { en:'Six',   target:'Six',       phonetic:'sees' },
        { en:'Seven', target:'Sept',      phonetic:'set' },
        { en:'Eight', target:'Huit',      phonetic:'weet' },
        { en:'Nine',  target:'Neuf',      phonetic:'nuhf' },
        { en:'Ten',   target:'Dix',       phonetic:'dees' }
      ],
      food:[
        { en:'Water',     target:'Eau',        phonetic:'oh' },
        { en:'Bread',     target:'Pain',       phonetic:'pan' },
        { en:'Milk',      target:'Lait',       phonetic:'lay' },
        { en:'Apple',     target:'Pomme',      phonetic:'pom' },
        { en:'Chicken',   target:'Poulet',     phonetic:'poo-LAY' },
        { en:'Cheese',    target:'Fromage',    phonetic:'froh-MAZH' },
        { en:'Egg',       target:'Œuf',        phonetic:'uhf' },
        { en:'Fish',      target:'Poisson',    phonetic:'pwah-SON' },
        { en:'Cake',      target:'Gâteau',     phonetic:'gah-TOH' },
        { en:'Chocolate', target:'Chocolat',   phonetic:'shoh-koh-LAH' }
      ],
      colours:[
        { en:'Red',    target:'Rouge',          phonetic:'roozh' },
        { en:'Blue',   target:'Bleu',           phonetic:'bluh' },
        { en:'Yellow', target:'Jaune',          phonetic:'zhohn' },
        { en:'Green',  target:'Vert / Verte',   phonetic:'vair / vert' },
        { en:'Black',  target:'Noir / Noire',   phonetic:'nwahr' },
        { en:'White',  target:'Blanc / Blanche',phonetic:'blahn / blansh' },
        { en:'Pink',   target:'Rose',           phonetic:'rohz' },
        { en:'Purple', target:'Violet',         phonetic:'vyoh-LAY' },
        { en:'Orange', target:'Orange',         phonetic:'oh-RAHNZH' },
        { en:'Brown',  target:'Marron',         phonetic:'mah-RON' }
      ],
      family:[
        { en:'Mother',      target:'Mère',        phonetic:'mair' },
        { en:'Father',      target:'Père',        phonetic:'pair' },
        { en:'Brother',     target:'Frère',       phonetic:'frair' },
        { en:'Sister',      target:'Sœur',        phonetic:'suhr' },
        { en:'Grandmother', target:'Grand-mère',  phonetic:'grahn-MAIR' },
        { en:'Grandfather', target:'Grand-père',  phonetic:'grahn-PAIR' },
        { en:'Baby',        target:'Bébé',        phonetic:'bay-BAY' },
        { en:'Friend (m)',  target:'Ami',         phonetic:'ah-MEE' },
        { en:'Boy',         target:'Garçon',      phonetic:'gar-SON' },
        { en:'Girl',        target:'Fille',       phonetic:'fee' }
      ],
      school:[
        { en:'Book',      target:'Livre',       phonetic:'lee-vruh' },
        { en:'Pencil',    target:'Crayon',      phonetic:'kreh-YON' },
        { en:'Teacher',   target:'Professeur',  phonetic:'proh-feh-SUHR' },
        { en:'School',    target:'École',       phonetic:'ay-KOL' },
        { en:'Classroom', target:'Classe',      phonetic:'klass' },
        { en:'Chair',     target:'Chaise',      phonetic:'shez' },
        { en:'Table',     target:'Table',       phonetic:'TAH-bluh' },
        { en:'Bag',       target:'Sac',         phonetic:'sak' },
        { en:'Ruler',     target:'Règle',       phonetic:'REH-gluh' },
        { en:'Pen',       target:'Stylo',       phonetic:'stee-LOH' }
      ]
    }
  },

  mandarin: {
    name:'Mandarin Chinese', flag:'🇨🇳', nativeName:'普通话 (Pǔtōnghuà)',
    funFact:'Mandarin is the most spoken language in the world by native speakers — over 900 million people! Chinese characters are over 3,000 years old.',
    categories:{
      greetings:[
        { en:'Hello',            target:'你好 (Nǐ hǎo)',        phonetic:'Nee HOW' },
        { en:'Good morning',     target:'早上好 (Zǎo shang hǎo)',phonetic:'Dzow shung HOW' },
        { en:'Good night',       target:'晚安 (Wǎn ān)',         phonetic:'Wahn AHN' },
        { en:'Goodbye',          target:'再见 (Zàijiàn)',         phonetic:'Dzai JYEN' },
        { en:'Thank you',        target:'谢谢 (Xièxiè)',          phonetic:'Shyeh-SHYEH' },
        { en:'Please',           target:'请 (Qǐng)',              phonetic:'Ching' },
        { en:'Excuse me / Sorry',target:'对不起 (Duìbuqǐ)',       phonetic:'Dway-boo-CHEE' },
        { en:'How are you?',     target:'你好吗？(Nǐ hǎo ma?)',   phonetic:'Nee HOW mah?' },
        { en:'I am fine',        target:'我很好 (Wǒ hěn hǎo)',    phonetic:'Woh hun HOW' },
        { en:'My name is...',   target:'我叫... (Wǒ jiào...)',   phonetic:'Woh JYOW...' }
      ],
      numbers:[
        { en:'One',   target:'一 (Yī)',  phonetic:'Yee' },
        { en:'Two',   target:'二 (Èr)',  phonetic:'Ar' },
        { en:'Three', target:'三 (Sān)', phonetic:'Sahn' },
        { en:'Four',  target:'四 (Sì)',  phonetic:'Suh' },
        { en:'Five',  target:'五 (Wǔ)', phonetic:'Woo' },
        { en:'Six',   target:'六 (Liù)',phonetic:'Lyoh' },
        { en:'Seven', target:'七 (Qī)', phonetic:'Chee' },
        { en:'Eight', target:'八 (Bā)', phonetic:'Bah' },
        { en:'Nine',  target:'九 (Jiǔ)',phonetic:'Jyoh' },
        { en:'Ten',   target:'十 (Shí)',phonetic:'Sher' }
      ],
      food:[
        { en:'Water',    target:'水 (Shuǐ)',        phonetic:'Shway' },
        { en:'Rice',     target:'米饭 (Mǐfàn)',      phonetic:'Mee-FAHN' },
        { en:'Noodles',  target:'面条 (Miàntiáo)',   phonetic:'Myen-TYOW' },
        { en:'Apple',    target:'苹果 (Píngguǒ)',    phonetic:'Ping-GWOH' },
        { en:'Milk',     target:'牛奶 (Niúnǎi)',     phonetic:'Nyoh-NAY' },
        { en:'Chicken',  target:'鸡肉 (Jī ròu)',     phonetic:'Jee ROH' },
        { en:'Egg',      target:'鸡蛋 (Jīdàn)',      phonetic:'Jee DAHN' },
        { en:'Fish',     target:'鱼 (Yú)',           phonetic:'Yoo' },
        { en:'Tea',      target:'茶 (Chá)',          phonetic:'Chah' },
        { en:'Bread',    target:'面包 (Miànbāo)',    phonetic:'Myen-BOW' }
      ],
      colours:[
        { en:'Red',    target:'红色 (Hóng sè)',  phonetic:'Hong SUH' },
        { en:'Blue',   target:'蓝色 (Lán sè)',   phonetic:'Lahn SUH' },
        { en:'Yellow', target:'黄色 (Huáng sè)', phonetic:'Hwang SUH' },
        { en:'Green',  target:'绿色 (Lǜ sè)',   phonetic:'Lyoo SUH' },
        { en:'Black',  target:'黑色 (Hēi sè)',   phonetic:'Hay SUH' },
        { en:'White',  target:'白色 (Bái sè)',   phonetic:'By SUH' },
        { en:'Pink',   target:'粉红 (Fěnhóng)',  phonetic:'Fun-HONG' },
        { en:'Purple', target:'紫色 (Zǐ sè)',    phonetic:'Dzuh SUH' },
        { en:'Orange', target:'橙色 (Chéng sè)', phonetic:'Chung SUH' },
        { en:'Brown',  target:'棕色 (Zōng sè)',  phonetic:'Dzong SUH' }
      ],
      family:[
        { en:'Mother',            target:'妈妈 (Māma)',     phonetic:'Mah-MAH' },
        { en:'Father',            target:'爸爸 (Bàba)',     phonetic:'Bah-BAH' },
        { en:'Older brother',     target:'哥哥 (Gēgē)',     phonetic:'Guh-GUH' },
        { en:'Older sister',      target:'姐姐 (Jiějiě)',   phonetic:'Jyeh-JYEH' },
        { en:'Grandmother (mum side)', target:'外婆 (Wàipó)',phonetic:'Why-POR' },
        { en:'Grandfather (mum side)', target:'外公 (Wàigōng)',phonetic:'Why-GONG' },
        { en:'Baby',              target:'宝宝 (Bǎobao)',   phonetic:'Bow-BOW' },
        { en:'Friend',            target:'朋友 (Péngyǒu)', phonetic:'Pung-YOH' },
        { en:'Boy',               target:'男孩 (Nán hái)', phonetic:'Nahn HY' },
        { en:'Girl',              target:'女孩 (Nǚ hái)',  phonetic:'Nyoo HY' }
      ],
      school:[
        { en:'Book',      target:'书 (Shū)',         phonetic:'Shoo' },
        { en:'Pencil',    target:'铅笔 (Qiānbǐ)',    phonetic:'Chyen-BEE' },
        { en:'Teacher',   target:'老师 (Lǎoshī)',    phonetic:'Lao-SHER' },
        { en:'School',    target:'学校 (Xuéxiào)',   phonetic:'Shweh-SHYOW' },
        { en:'Study',     target:'学习 (Xuéxí)',     phonetic:'Shweh-SHEE' },
        { en:'Write',     target:'写字 (Xiě zì)',    phonetic:'Shyeh-DZUH' },
        { en:'Read',      target:'读书 (Dúshū)',     phonetic:'Doo-SHOO' },
        { en:'Bag',       target:'书包 (Shūbāo)',    phonetic:'Shoo-BOW' },
        { en:'Pen',       target:'钢笔 (Gāngbǐ)',   phonetic:'Gahng-BEE' },
        { en:'Homework',  target:'作业 (Zuòyè)',     phonetic:'Dzwoh-YEH' }
      ]
    }
  },

  german: {
    name:'German', flag:'🇩🇪', nativeName:'Deutsch',
    funFact:'German is spoken by over 100 million people across Europe. It\'s the most widely spoken native language in the European Union!',
    categories:{
      greetings:[
        { en:'Hello',               target:'Hallo',               phonetic:'HAH-loh' },
        { en:'Good morning',        target:'Guten Morgen',         phonetic:'GOO-ten MOR-gen' },
        { en:'Good afternoon',      target:'Guten Tag',            phonetic:'GOO-ten TAHK' },
        { en:'Good evening',        target:'Guten Abend',          phonetic:'GOO-ten AH-bent' },
        { en:'Goodbye',             target:'Auf Wiedersehen',      phonetic:'owf VEE-der-zay-en' },
        { en:'Thank you',           target:'Danke',                phonetic:'DAHN-keh' },
        { en:'Please',              target:'Bitte',                phonetic:'BIT-teh' },
        { en:'Excuse me',           target:'Entschuldigung',       phonetic:'ent-SHOOL-di-goong' },
        { en:'How are you?',        target:'Wie geht es dir?',     phonetic:'vee gayt es deer' },
        { en:'My name is...',       target:'Ich heiße...',         phonetic:'ikh HY-seh' }
      ],
      numbers:[
        { en:'One',   target:'Eins',   phonetic:'eynss' },
        { en:'Two',   target:'Zwei',   phonetic:'tsvye' },
        { en:'Three', target:'Drei',   phonetic:'dry' },
        { en:'Four',  target:'Vier',   phonetic:'feer' },
        { en:'Five',  target:'Fünf',   phonetic:'fewnf' },
        { en:'Six',   target:'Sechs',  phonetic:'zeks' },
        { en:'Seven', target:'Sieben', phonetic:'ZEE-ben' },
        { en:'Eight', target:'Acht',   phonetic:'ahkt' },
        { en:'Nine',  target:'Neun',   phonetic:'noyn' },
        { en:'Ten',   target:'Zehn',   phonetic:'tsayn' }
      ],
      food:[
        { en:'Water',   target:'Wasser',   phonetic:'VAH-ser' },
        { en:'Bread',   target:'Brot',     phonetic:'broht' },
        { en:'Milk',    target:'Milch',    phonetic:'milkh' },
        { en:'Apple',   target:'Apfel',    phonetic:'AHP-fel' },
        { en:'Chicken', target:'Hähnchen', phonetic:'HAYN-khen' },
        { en:'Rice',    target:'Reis',     phonetic:'ryss' },
        { en:'Egg',     target:'Ei',       phonetic:'eye' },
        { en:'Fish',    target:'Fisch',    phonetic:'fish' },
        { en:'Cake',    target:'Kuchen',   phonetic:'KOO-khen' },
        { en:'Orange',  target:'Orange',   phonetic:'oh-RAHN-zheh' }
      ],
      colours:[
        { en:'Red',    target:'Rot',    phonetic:'roht' },
        { en:'Blue',   target:'Blau',   phonetic:'blow' },
        { en:'Yellow', target:'Gelb',   phonetic:'gelp' },
        { en:'Green',  target:'Grün',   phonetic:'grewn' },
        { en:'Black',  target:'Schwarz',phonetic:'shvarts' },
        { en:'White',  target:'Weiß',   phonetic:'vyce' },
        { en:'Pink',   target:'Rosa',   phonetic:'ROH-zah' },
        { en:'Purple', target:'Lila',   phonetic:'LEE-lah' },
        { en:'Orange', target:'Orange', phonetic:'oh-RAHN-zheh' },
        { en:'Brown',  target:'Braun',  phonetic:'brown' }
      ],
      family:[
        { en:'Mother',      target:'Mutter',          phonetic:'MOO-ter' },
        { en:'Father',      target:'Vater',            phonetic:'FAH-ter' },
        { en:'Brother',     target:'Bruder',           phonetic:'BROO-der' },
        { en:'Sister',      target:'Schwester',        phonetic:'SHVES-ter' },
        { en:'Grandmother', target:'Oma',              phonetic:'OH-mah' },
        { en:'Grandfather', target:'Opa',              phonetic:'OH-pah' },
        { en:'Baby',        target:'Baby',             phonetic:'BAY-bee' },
        { en:'Friend',      target:'Freund / Freundin',phonetic:'froynt' },
        { en:'Boy',         target:'Junge',            phonetic:'YOONG-eh' },
        { en:'Girl',        target:'Mädchen',          phonetic:'MAYD-khen' }
      ],
      school:[
        { en:'School',    target:'Schule',         phonetic:'SHOO-leh' },
        { en:'Book',      target:'Buch',           phonetic:'bookh' },
        { en:'Pencil',    target:'Bleistift',      phonetic:'BLY-shtift' },
        { en:'Teacher',   target:'Lehrer/in',      phonetic:'LAY-rer' },
        { en:'Student',   target:'Schüler/in',     phonetic:'SHEW-ler' },
        { en:'Write',     target:'Schreiben',      phonetic:'SHRY-ben' },
        { en:'Read',      target:'Lesen',          phonetic:'LAY-zen' },
        { en:'Learn',     target:'Lernen',         phonetic:'LAIR-nen' },
        { en:'Bag',       target:'Tasche',         phonetic:'TAH-sheh' },
        { en:'Classroom', target:'Klassenzimmer',  phonetic:'KLAS-en-tsim-er' }
      ]
    }
  },

  japanese: {
    name:'Japanese', flag:'🇯🇵', nativeName:'日本語',
    funFact:'Japanese has three writing systems — Hiragana, Katakana and Kanji — and over 125 million speakers. Manga and anime have made it one of the most popular languages to learn worldwide!',
    categories:{
      greetings:[
        { en:'Hello',             target:'こんにちは',         phonetic:'kon-nee-chee-WAH' },
        { en:'Good morning',      target:'おはようございます', phonetic:'oh-hah-YOH goh-zai-mahs' },
        { en:'Good evening',      target:'こんばんは',         phonetic:'kon-bahn-WAH' },
        { en:'Goodbye',           target:'さようなら',         phonetic:'sah-yoh-NAH-rah' },
        { en:'Thank you',         target:'ありがとう',         phonetic:'ah-ree-GAH-toh' },
        { en:'Please',            target:'おねがいします',     phonetic:'oh-neh-gai-shee-mahs' },
        { en:'Excuse me',         target:'すみません',         phonetic:'soo-mee-MAH-sen' },
        { en:'How are you?',      target:'お元気ですか？',     phonetic:'oh-GEN-kee des-KAH' },
        { en:'I am fine',         target:'元気です',           phonetic:'GEN-kee des' },
        { en:'Nice to meet you',  target:'はじめまして',       phonetic:'hah-jee-meh-MASH-teh' }
      ],
      numbers:[
        { en:'One',   target:'いち', phonetic:'ee-chee' },
        { en:'Two',   target:'に',   phonetic:'nee' },
        { en:'Three', target:'さん', phonetic:'sahn' },
        { en:'Four',  target:'よん', phonetic:'yohn' },
        { en:'Five',  target:'ご',   phonetic:'goh' },
        { en:'Six',   target:'ろく', phonetic:'roh-koo' },
        { en:'Seven', target:'なな', phonetic:'nah-nah' },
        { en:'Eight', target:'はち', phonetic:'hah-chee' },
        { en:'Nine',  target:'きゅう',phonetic:'kyoo' },
        { en:'Ten',   target:'じゅう',phonetic:'joo' }
      ],
      food:[
        { en:'Water',   target:'みず',     phonetic:'mee-zoo' },
        { en:'Rice',    target:'ごはん',   phonetic:'goh-hahn' },
        { en:'Bread',   target:'パン',     phonetic:'pahn' },
        { en:'Egg',     target:'たまご',   phonetic:'tah-mah-goh' },
        { en:'Fish',    target:'さかな',   phonetic:'sah-kah-nah' },
        { en:'Chicken', target:'とりにく', phonetic:'toh-ree-nee-koo' },
        { en:'Milk',    target:'ぎゅうにゅう',phonetic:'gyoo-nyoo' },
        { en:'Apple',   target:'りんご',   phonetic:'reen-goh' },
        { en:'Cake',    target:'ケーキ',   phonetic:'kay-kee' },
        { en:'Sushi',   target:'すし',     phonetic:'soo-shee' }
      ],
      colours:[
        { en:'Red',    target:'あか',     phonetic:'ah-kah' },
        { en:'Blue',   target:'あお',     phonetic:'ah-oh' },
        { en:'Yellow', target:'きいろ',   phonetic:'kee-ee-roh' },
        { en:'Green',  target:'みどり',   phonetic:'mee-doh-ree' },
        { en:'Black',  target:'くろ',     phonetic:'koo-roh' },
        { en:'White',  target:'しろ',     phonetic:'shee-roh' },
        { en:'Pink',   target:'ピンク',   phonetic:'peen-koo' },
        { en:'Purple', target:'むらさき', phonetic:'moo-rah-sah-kee' },
        { en:'Orange', target:'オレンジ', phonetic:'oh-ren-jee' },
        { en:'Brown',  target:'ちゃいろ', phonetic:'chah-ee-roh' }
      ],
      family:[
        { en:'Mother',      target:'おかあさん', phonetic:'oh-kah-sahn' },
        { en:'Father',      target:'おとうさん', phonetic:'oh-toh-sahn' },
        { en:'Older brother',target:'おにいさん',phonetic:'oh-nee-sahn' },
        { en:'Older sister', target:'おねえさん',phonetic:'oh-neh-sahn' },
        { en:'Grandmother', target:'おばあさん', phonetic:'oh-bah-sahn' },
        { en:'Grandfather', target:'おじいさん', phonetic:'oh-jee-sahn' },
        { en:'Baby',        target:'あかちゃん', phonetic:'ah-kah-chahn' },
        { en:'Friend',      target:'ともだち',   phonetic:'toh-moh-dah-chee' },
        { en:'Child',       target:'こども',     phonetic:'koh-doh-moh' },
        { en:'Family',      target:'かぞく',     phonetic:'kah-zoh-koo' }
      ],
      school:[
        { en:'School',    target:'がっこう',   phonetic:'gahk-koh' },
        { en:'Book',      target:'ほん',       phonetic:'hohn' },
        { en:'Pencil',    target:'えんぴつ',   phonetic:'en-pee-tsoo' },
        { en:'Teacher',   target:'せんせい',   phonetic:'sen-say' },
        { en:'Student',   target:'せいと',     phonetic:'say-toh' },
        { en:'Write',     target:'かく',       phonetic:'kah-koo' },
        { en:'Read',      target:'よむ',       phonetic:'yoh-moo' },
        { en:'Learn',     target:'まなぶ',     phonetic:'mah-nah-boo' },
        { en:'Bag',       target:'かばん',     phonetic:'kah-bahn' },
        { en:'Classroom', target:'きょうしつ', phonetic:'kyoh-shee-tsoo' }
      ]
    }
  },

  hindi: {
    name:'Hindi', flag:'🇮🇳', nativeName:'हिन्दी',
    funFact:'Hindi is spoken by over 600 million people and is one of the official languages of India. It\'s written in the beautiful Devanagari script, which reads from left to right!',
    categories:{
      greetings:[
        { en:'Hello',         target:'नमस्ते',          phonetic:'nah-MAS-tay' },
        { en:'Good morning',  target:'सुप्रभात',         phonetic:'soo-PRAH-baht' },
        { en:'Good evening',  target:'शुभ संध्या',       phonetic:'shoobh SAHND-hyah' },
        { en:'Goodbye',       target:'अलविदा',           phonetic:'al-VEE-dah' },
        { en:'Thank you',     target:'धन्यवाद',          phonetic:'DHAN-yah-vahd' },
        { en:'Please',        target:'कृपया',            phonetic:'KREE-pah-yah' },
        { en:'Excuse me',     target:'माफ़ कीजिए',        phonetic:'maaf KEE-jee-yeh' },
        { en:'How are you?',  target:'आप कैसे हैं?',     phonetic:'aap KAI-say hain' },
        { en:'I am fine',     target:'मैं ठीक हूँ',      phonetic:'main THEEK hoon' },
        { en:'My name is...', target:'मेरा नाम ... है',  phonetic:'MAY-rah naam ... hay' }
      ],
      numbers:[
        { en:'One',   target:'एक',   phonetic:'ek' },
        { en:'Two',   target:'दो',   phonetic:'doh' },
        { en:'Three', target:'तीन',  phonetic:'teen' },
        { en:'Four',  target:'चार',  phonetic:'chaar' },
        { en:'Five',  target:'पाँच', phonetic:'paanch' },
        { en:'Six',   target:'छह',   phonetic:'chhah' },
        { en:'Seven', target:'सात',  phonetic:'saht' },
        { en:'Eight', target:'आठ',   phonetic:'aath' },
        { en:'Nine',  target:'नौ',   phonetic:'now' },
        { en:'Ten',   target:'दस',   phonetic:'dahs' }
      ],
      food:[
        { en:'Water',   target:'पानी',   phonetic:'PAH-nee' },
        { en:'Rice',    target:'चावल',   phonetic:'CHAH-val' },
        { en:'Bread',   target:'रोटी',   phonetic:'ROH-tee' },
        { en:'Milk',    target:'दूध',    phonetic:'doodh' },
        { en:'Apple',   target:'सेब',    phonetic:'seb' },
        { en:'Chicken', target:'मुर्गी', phonetic:'MUR-gee' },
        { en:'Fish',    target:'मछली',   phonetic:'MACH-lee' },
        { en:'Egg',     target:'अंडा',   phonetic:'AN-dah' },
        { en:'Mango',   target:'आम',     phonetic:'ahm' },
        { en:'Sweet',   target:'मिठाई',  phonetic:'mee-THAI' }
      ],
      colours:[
        { en:'Red',    target:'लाल',    phonetic:'laal' },
        { en:'Blue',   target:'नीला',   phonetic:'NEE-lah' },
        { en:'Yellow', target:'पीला',   phonetic:'PEE-lah' },
        { en:'Green',  target:'हरा',    phonetic:'HAH-rah' },
        { en:'Black',  target:'काला',   phonetic:'KAH-lah' },
        { en:'White',  target:'सफ़ेद',  phonetic:'SAH-fed' },
        { en:'Pink',   target:'गुलाबी', phonetic:'goo-LAH-bee' },
        { en:'Purple', target:'बैंगनी', phonetic:'BAIN-gah-nee' },
        { en:'Orange', target:'नारंगी', phonetic:'nah-RAN-gee' },
        { en:'Brown',  target:'भूरा',   phonetic:'BHOO-rah' }
      ],
      family:[
        { en:'Mother',      target:'माँ',      phonetic:'maa' },
        { en:'Father',      target:'पिताजी',   phonetic:'pee-TAH-jee' },
        { en:'Brother',     target:'भाई',      phonetic:'bhai' },
        { en:'Sister',      target:'बहन',      phonetic:'BAH-hen' },
        { en:'Grandmother', target:'दादी',     phonetic:'DAH-dee' },
        { en:'Grandfather', target:'दादा',     phonetic:'DAH-dah' },
        { en:'Baby',        target:'बच्चा',    phonetic:'BAH-chah' },
        { en:'Friend',      target:'दोस्त',    phonetic:'dohst' },
        { en:'Family',      target:'परिवार',   phonetic:'pah-ree-VAAR' },
        { en:'Uncle',       target:'चाचा',     phonetic:'CHAH-chah' }
      ],
      school:[
        { en:'School',    target:'विद्यालय',  phonetic:'vid-YAH-lay' },
        { en:'Book',      target:'किताब',     phonetic:'kee-TAAB' },
        { en:'Pencil',    target:'पेंसिल',    phonetic:'PEN-sil' },
        { en:'Teacher',   target:'शिक्षक',    phonetic:'SHIK-shak' },
        { en:'Student',   target:'छात्र',     phonetic:'CHHAH-trah' },
        { en:'Write',     target:'लिखना',     phonetic:'LIKH-nah' },
        { en:'Read',      target:'पढ़ना',      phonetic:'PARHD-nah' },
        { en:'Learn',     target:'सीखना',     phonetic:'SEEKH-nah' },
        { en:'Bag',       target:'बस्ता',     phonetic:'BAS-tah' },
        { en:'Classroom', target:'कक्षा',     phonetic:'KAHK-shah' }
      ]
    }
  }
};
