/* md5.js - MD5 Message-Digest
 * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
 * Version: 2.0.0
 * LastModified: May 13 2002
 *
 * This program is free software.  You can redistribute it and/or modify
 * it without any warranty.  This library calculates the MD5 based on RFC1321.
 * See RFC1321 for more information and algorism.
 */

/* Interface:
 * md5_128bits = MD5_hash(data);
 * md5_hexstr = MD5_hexhash(data);
 */

/* ChangeLog
 * 2002/05/13: Version 2.0.0 released
 * NOTICE: API is changed.
 * 2002/04/15: Bug fix about MD5 length.
 */


//    md5_T[i] = parseInt(Math.abs(Math.sin(i)) * 4294967296.0);
var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db,
		      0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613,
		      0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1,
		      0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e,
		      0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51,
		      0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681,
		      0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87,
		      0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9,
		      0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122,
		      0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60,
		      0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085,
		      0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8,
		      0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7,
		      0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d,
		      0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314,
		      0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb,
		      0xeb86d391);

var MD5_round1 = new Array(new Array( 0, 7, 1), new Array( 1,12, 2),
			   new Array( 2,17, 3), new Array( 3,22, 4),
			   new Array( 4, 7, 5), new Array( 5,12, 6),
			   new Array( 6,17, 7), new Array( 7,22, 8),
			   new Array( 8, 7, 9), new Array( 9,12,10),
			   new Array(10,17,11), new Array(11,22,12),
			   new Array(12, 7,13), new Array(13,12,14),
			   new Array(14,17,15), new Array(15,22,16));

var MD5_round2 = new Array(new Array( 1, 5,17), new Array( 6, 9,18),
			   new Array(11,14,19), new Array( 0,20,20),
			   new Array( 5, 5,21), new Array(10, 9,22),
			   new Array(15,14,23), new Array( 4,20,24),
			   new Array( 9, 5,25), new Array(14, 9,26),
			   new Array( 3,14,27), new Array( 8,20,28),
			   new Array(13, 5,29), new Array( 2, 9,30),
			   new Array( 7,14,31), new Array(12,20,32));

var MD5_round3 = new Array(new Array( 5, 4,33), new Array( 8,11,34),
			   new Array(11,16,35), new Array(14,23,36),
			   new Array( 1, 4,37), new Array( 4,11,38),
			   new Array( 7,16,39), new Array(10,23,40),
			   new Array(13, 4,41), new Array( 0,11,42),
			   new Array( 3,16,43), new Array( 6,23,44),
			   new Array( 9, 4,45), new Array(12,11,46),
			   new Array(15,16,47), new Array( 2,23,48));

var MD5_round4 = new Array(new Array( 0, 6,49), new Array( 7,10,50),
			   new Array(14,15,51), new Array( 5,21,52),
			   new Array(12, 6,53), new Array( 3,10,54),
			   new Array(10,15,55), new Array( 1,21,56),
			   new Array( 8, 6,57), new Array(15,10,58),
			   new Array( 6,15,59), new Array(13,21,60),
			   new Array( 4, 6,61), new Array(11,10,62),
			   new Array( 2,15,63), new Array( 9,21,64));

function MD5_F(x, y, z) { return (x & y) | (~x & z); }
function MD5_G(x, y, z) { return (x & z) | (y & ~z); }
function MD5_H(x, y, z) { return x ^ y ^ z;          }
function MD5_I(x, y, z) { return y ^ (x | ~z);       }

var MD5_round = new Array(new Array(MD5_F, MD5_round1),
			  new Array(MD5_G, MD5_round2),
			  new Array(MD5_H, MD5_round3),
			  new Array(MD5_I, MD5_round4));

function MD5_pack(n32) {
  return String.fromCharCode(n32 & 0xff) +
	 String.fromCharCode((n32 >>> 8) & 0xff) +
	 String.fromCharCode((n32 >>> 16) & 0xff) +
	 String.fromCharCode((n32 >>> 24) & 0xff);
}

function MD5_unpack(s4) {
  return  s4.charCodeAt(0)        |
	 (s4.charCodeAt(1) <<  8) |
	 (s4.charCodeAt(2) << 16) |
	 (s4.charCodeAt(3) << 24);
}

function MD5_number(n) {
  while (n < 0)
    n += 4294967296;
  while (n > 4294967295)
    n -= 4294967296;
  return n;
}

function MD5_apply_round(x, s, f, abcd, r) {
  var a, b, c, d;
  var kk, ss, ii;
  var t, u;

  a = abcd[0];
  b = abcd[1];
  c = abcd[2];
  d = abcd[3];
  kk = r[0];
  ss = r[1];
  ii = r[2];

  u = f(s[b], s[c], s[d]);
  t = s[a] + u + x[kk] + MD5_T[ii];
  t = MD5_number(t);
  t = ((t<<ss) | (t>>>(32-ss)));
  t += s[b];
  s[a] = MD5_number(t);
}

function MD5_hash(data) {
  var abcd, x, state, s;
  var len, index, padLen, f, r;
  var i, j, k;
  var tmp;

  state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
  len = data.length;
  index = len & 0x3f;
  padLen = (index < 56) ? (56 - index) : (120 - index);
  if(padLen > 0) {
    data += "\x80";
    for(i = 0; i < padLen - 1; i++)
      data += "\x00";
  }
  data += MD5_pack(len * 8);
  data += MD5_pack(0);
  len  += padLen + 8;
  abcd = new Array(0, 1, 2, 3);
  x    = new Array(16);
  s    = new Array(4);

  for(k = 0; k < len; k += 64) {
    for(i = 0, j = k; i < 16; i++, j += 4) {
      x[i] = data.charCodeAt(j) |
	    (data.charCodeAt(j + 1) <<  8) |
	    (data.charCodeAt(j + 2) << 16) |
	    (data.charCodeAt(j + 3) << 24);
    }
    for(i = 0; i < 4; i++)
      s[i] = state[i];
    for(i = 0; i < 4; i++) {
      f = MD5_round[i][0];
      r = MD5_round[i][1];
      for(j = 0; j < 16; j++) {
	MD5_apply_round(x, s, f, abcd, r[j]);
	tmp = abcd[0];
	abcd[0] = abcd[3];
	abcd[3] = abcd[2];
	abcd[2] = abcd[1];
	abcd[1] = tmp;
      }
    }

    for(i = 0; i < 4; i++) {
      state[i] += s[i];
      state[i] = MD5_number(state[i]);
    }
  }

  return MD5_pack(state[0]) +
	 MD5_pack(state[1]) +
	 MD5_pack(state[2]) +
	 MD5_pack(state[3]);
}

MD5_hexhash = function(data) {
    var i, out, c;
    var bit128;

    bit128 = MD5_hash(data);
    out = "";
    for(i = 0; i < 16; i++) {
	c = bit128.charCodeAt(i);
	out += "0123456789abcdef".charAt((c>>4) & 0xf);
	out += "0123456789abcdef".charAt(c & 0xf);
    }
    return out;
};

utf2bytestr = function(text) {
    var k, ref, result, results;
    result = "";
    if (text === null) {
	return result;
    }
    (function() {
	results = [];
	for (var k = 0, ref = text.length; 0 <= ref ? k < ref : k > ref; 0 <= ref ? k++ : k--){ results.push(k); }
	return results;
    }).apply(this).forEach(function(i) {
	var c;
	c = text.charCodeAt(i);
	if (c <= 0x7f) {
            return result += String.fromCharCode(c);
	} else {
            if (c <= 0x07ff) {
		result += String.fromCharCode(((c >> 6) & 0x1F) | 0xC0);
		return result += String.fromCharCode((c & 0x3F) | 0x80);
            } else {
		result += String.fromCharCode(((c >> 12) & 0x0F) | 0xE0);
		result += String.fromCharCode(((c >> 6) & 0x3F) | 0x80);
		return result += String.fromCharCode((c & 0x3F) | 0x80);
            }
	}
    });
    return result;
};

// console.log(MD5_hexhash(utf2bytestr("yocchib")));

var ids = [
    "ytanaka",
    "yocchib",
    "yobi825",
    "ynglozjj",
    "yamato",
    "yamada_tatsushi",
    "yamada@simple-palm.com",
    "yamada.tatsushi",
    "yagi-s",
    "y10440_password",
    "xxxxx",
    "xxxx",
    "xxx@example.com",
    "wiss2013",
    "warenosyo",
    "twitter2016muesaka",
    "trysail",
    "toyo",
    "tomoya2326",
    "tomo_car",
    "tkyknyd",
    "therion",
    "theramin_pass",
    "testtest",
    "test_twitter",
    "test@example.com",
    "test1111111",
    "test",
    "tessst",
    "tenten",
    "tania",
    "tanaka",
    "tamaguitar",
    "takumibaba",
    "takuantoansu",
    "takeda",
    "takecian",
    "takaaki_test",
    "syuhei",
    "suznao2",
    "suznao",
    "suchi",
    "stella",
    "sptoksaty",
    "soya",
    "smnok",
    "shun800",
    "shoya",
    "shokai",
    "sho102405",
    "shintaro",
    "shi6aken",
    "shi3z",
    "shehai",
    "secondtest",
    "saxsir",
    "sawai-test",
    "sasakiarara",
    "sample",
    "saki_O",
    "ryou",
    "ryoma",
    "ryokkkke",
    "reoshin",
    "renshu",
    "rakuten_bank",
    "psatykpaayl",
    "poyo",
    "passwotukutteruyo",
    "passwords2016",
    "password",
    "passtonum",
    "passsono2dayon48faofd",
    "passdegozaru4895hswer",
    "pass",
    "padyleaf",
    "oyofacebook",
    "oyoTwitter",
    "osamu",
    "okumura_kaisya",
    "numtopass",
    "nota",
    "nokotaso",
    "nkoz",
    "nishiotest",
    "nishio",
    "nikezono",
    "niconico",
    "nekobato",
    "napo0703@gmail.com",
    "napo",
    "nagayama",
    "myaccount",
    "myaaaicey",
    "mutronix",
    "murayama-subject",
    "mstdn",
    "moucami",
    "moritapass",
    "morimoto",
    "millionlive",
    "miko",
    "matumoto_bank",
    "masuifamily",
    "masuie",
    "masui_e",
    "masui@pitecan.com9",
    "masui@pitecan.com8",
    "masui@pitecan.com7",
    "masui@pitecan.com6",
    "masui@pitecan.com5",
    "masui@pitecan.com4",
    "masui@pitecan.com3",
    "masui@pitecan.com2",
    "masui@pitecan.com10",
    "masui@pitecan.com1",
    "masui@pitecan.com",
    "masui2015",
    "masui2",
    "masui1",
    "masui",
    "makingpassdayo4909smb",
    "lsitfke",
    "life-visa",
    "levi1128strauss@gmail.com",
    "kyanny",
    "kusigahama",
    "kuboon",
    "ktnyt",
    "kouki",
    "kosei",
    "korehausb2youdayo4n98sr",
    "kobayashi",
    "knote0721@gmail.com",
    "kitaguchi",
    "kenmaz",
    "keisuke",
    "kbys",
    "kazumaaa1123",
    "kawaakami",
    "katokato",
    "kaoru",
    "kamitsuji",
    "kamba",
    "ka",
    "k12u",
    "jw10ofamano",
    "jojporg",
    "johndoe@example.com",
    "jf3koa",
    "isoHootsuite",
    "inouedaisuke",
    "ichitamiura",
    "hykwtakumin@gmail.com",
    "hykwtakumin",
    "howto",
    "hotel",
    "hogehoge",
    "hogee",
    "hoge",
    "hogawara",
    "hk",
    "hiroyuki",
    "hikaru",
    "hamham",
    "gongaro",
    "gha10771",
    "gergesg",
    "garyu",
    "fzw",
    "fshin2000",
    "facebook",
    "exampleyuta2",
    "exampleyuta",
    "exampleb",
    "example",
    "evah",
    "episodas",
    "enohpdaeh",
    "dtrpeohjk",
    "drngman",
    "drikin",
    "dog",
    "dddd",
    "ccccc",
    "bsittfkly",
    "brigadier",
    "boushi",
    "bbbbb",
    "bbb",
    "barry123jp",
    "axatakesatake",
    "axatake",
    "ardbeg1958",
    "aqram",
    "amazon_stkayy@gmail.com",
    "amazon",
    "akiyama",
    "abc",
    "aaaaa",
    "a",
    "Yodobashi_masui@pitecan.com",
    "Yodobashi_masui",
    "ViewCard_masui711",
    "ValueDomain_tmasui",
    "VPASS_masui@pitecan.com",
    "Twitter_masui@pitecan.com",
    "Twitter_masui",
    "Twitter",
    "Tumblr_masui@pitecan.com",
    "Takumiboo",
    "Slack_masuilab",
    "Slack_hayakawa_loilo",
    "Skype_toshiyukimasui",
    "Skype_masui",
    "Sakura_wgs42570",
    "SakuTest1234",
    "Ryosuke_Nakayama",
    "ResearchGate_masui@pitecan.com",
    "ResearchGate_masui",
    "Prestia_masui711",
    "Pinterest_masui@pitecan.com",
    "Nishio_Sample",
    "Nikkei_masui@pitecan.com",
    "Niconico_masui@pitecan.com",
    "Nakayama_amazon",
    "NHK_masui@pitecan.com",
    "MyTwitterAccount",
    "MyAccount",
    "MizuhoDirect_masui",
    "MizuhoDirect_1029503774",
    "Masui_Twitter",
    "MasuiTwitterdddd",
    "MasuiTwitter",
    "LinkedIn_masui@pitecan.com",
    "KeioJP_masui@keio.jp",
    "Karin",
    "JohnDoe@example.com",
    "Hulu_masui@pitecan.com",
    "Heroku_masui@pitecan.com",
    "Hatena_masui@pitecan.com",
    "Gyazo_masui@sfc.keio.ac.jp",
    "Gyazo_masui@pitecan.com",
    "Gyazo",
    "Google_masui",
    "Gmail_hykwtakumin",
    "Gmail_hayakawa_loilo",
    "Github_hykwtakumin",
    "GitHub_masui@pitecan.com",
    "GitHub_masui",
    "GSuite_masui@pitecan.com",
    "Facebook_masui@pitecan.com",
    "Facebook_masui",
    "Facebook_hayakawa",
    "Example",
    "EM",
    "Dropbox_masui@pitecan.com",
    "Bank_masui",
    "Aska",
    "Apple_masui@sfc.keio.ac.jp",
    "Amazon_yanagi@fun.ac.jp",
    "Amazon_takeda@style.co.jp",
    "Amazon_stkayy@gmail.com",
    "Amazon_masui@pitecan.com",
    "Amazon_masui",
    "Amazon_karin.03k35@gmail.com",
    "Amazon_johndoe@example.com",
    "Amazon_john@example.com",
    "Amazon_john@example",
    "Amazon_hykwtakumin@gmail.com",
    "Amazon_hykwtakumin",
    "Amazon_JohnOe",
    "Amazon_JohnDoe@exa",
    "Amazon_JohnDoe",
    "Amazon",
    "AVI2018",
    "8th942u8fhioioiotrf6qpz",
    "82bk",
    "7th5328jfdo1kro3nvhderf",
    "6thdesugrghrea89324jbnd",
    "39rocket",
    "320o_pass",
    "320o",
    "14dNori",
    "123",
    "10fi552"
];

for(var i=0;i<ids.length;i++){
    console.log(`  id['${MD5_hexhash(utf2bytestr(ids[i]))}'] = "${ids[i]}"`);
}

