var links = [
  'b66dc2f6f2d3a809d00b9a889519bb789487f800c769a232c9bb760ed080c47305bff16ddbf642dfe2ac8dfb896a6511982c7d6a7192076c03c4d37acdb5b01e7488bbeba4f0d52cf76d2f0b2f40b9d7a3f7c8dc1bcea41a7246fed2042017d9a570808ecb40f954844b7d8385e36d2cdcf59dcaccb613127d60eba88aa58d2275a09f77e4f5aadae2f201ddeffe2aaf',
  'b65be892ba548a6f46182fc2dfbc4d56f6dec127875eefc3dcb82ecd5729a142338fa1ef084ccbd9adac4149c773b55f5ceae9c013edf5d4f2c54d031d92721e070fc78cb2f4ac04adab1dd20288740caa7edcddbdd1dab64d7eb4e33bdc8f198fd7393967359b42ddbf6ff7a25912e0',
  '7eddb0caeeebbc5bf83bbf967df7165b3733af916f29d7fee7eb68825ad930fa05f0922c2faee9fabba62bd5ecddbe55f3c06e8ac802e9f2da1a2ab1b73769e46fbfae69218a1353b9c00527c66fa0453cb40a4ae222cb774561ecc8efdb11b0',
  'be4954492f87d7dc3356f956970ee0c99ced78235afe21f7c34b2fe50d85424a4e7488669c93edba0778f8d4217b0edc2ccf987da8793d27743443ea0b017fc884638c89974c32b6b62dae1d88a48f8e1fdba092156c2903154055eaecc75579',
  '2ff464496414c5b8c46271651b8650ac48202722c959db3803b6f4b2fd22c7c7589068b0aded6ebd0f6d85d407cca50be995fe76ed15f6344fc54c89f81d954d9fdd3624aacf50d1a5b00363519aecee0ece35558d1c5435b35dc621aeb6bee3',
  '89bd312582aa0fdaa4977e95bc2f4211a08bc1a520194e19e78b38c07ffb174a9f235ac69fce67923d9c248f3902c8fa882d554246ba8563356d89f176a0c61e984bc0154c4e15861b7f99b83663029fa48527869b2795467ef9a9f45af5986fd11851f6cac946316ccae5be0627f827',
  '50c776a7d840f867e69ef5c18b57707de20a057fb4d2f5769f54d1a119435de1f884ada230d434eb258e7f3fa2fae66525d516441170a503298f121059e3a4ddc458ec6002dea50d23b8e223957d02d5a5530e2a5c34fec2a97472321c4c31f0082baca64f0f2212e8c981b1bbdb5c97',
  '6a707e1d4592473cfb577c1a2474341a32f9338750e53b7f72ec504f4f8f81cb258c4b576ce3d2bb3b22333123272fb9098baef01c267741b4601338475a4593a7dd6d48a774bd0ec92d7828cb81206af4888fb2e3fbd9f72a39a87b3f5a7e6f4488d3d6c15dea7b27965084605d261a',
  'd75c26420d755c0bc255dcedb96919da391fda585c15269222104227f64e9a0d6c6955d24a23bf344ed4b5ee2574bc5525815e873d988f77fdaeddb5c2aaeee049431bb05b0292f19e7a2e4137ac677576625b8bfa69a51284c9edbc6a612e1e',
  '69daa2bafed8142230b3ae3db8714e7123516d85540bca06c6550ec7814ade4f9cdef1e730a803d91ecef9f5ce02060b452873fd260d62ab12be271dd54787cb',
  '3272f1c75c143a43e1f1ea691c2c7356f7d6584277cc8b1475716d5d7ee53f05172488ed0f687e6a41d96cb4ea1378948262fc8bfdc66521361abd3fbfe18cdf',
  'b7668ae5a3932fa4b14d106df766f77e34f5c690ccdb72bf97bc806f0cd452353c941a3ace8539eae9b39c7b23977a811ff5e7346150480f77808968e9fbe22cf6b7d7896d64d44e02cee4fea96069418044c4a7cc5de960fef3e08e795046c5d16e1515bbbb1d17b0a39f3d63b1fd5a',
  '1101a477a03fcf278187175622f89dc994e8ad0abea0a3a5e9701cf4dad75ce89428f87a51b4dfdcbbcbe84e060f262eb2109a1258edb2acbb54994d6a3b9e18e2c953df948536994155ff076701e812bf519edacf2acd3fa935f8f79f11aa834b8f625cda7f4ccef9a8b97c330ebe5886fa791ca6dcd015e3dd40e41e2a21581baea9800ed31906578b7504997c721d',
];

function run() {
  var path = (window.location.pathname + window.location.search).substr(1);
  if(path.indexOf('enc/') === 0) {
    path = path.substring(path.indexOf('/', 1) + 1);
    var key = path.substring(0, path.indexOf('/'));
    var value = path.substring(path.indexOf('/') + 1);

    window.onload = function() {
      document.getElementsByClassName('footer')[0].innerHTML += '<br/><input type="text" readonly="readonly" onclick="this.select()" style="font-size: 15px; width: 100%" value="' + encrypt(key, value) + '">';
    }
  } else if(path.indexOf('dec/') === 0) {
    var key = path.substring(path.indexOf('/', 1) + 1);
    
    var val = get_val(key);

    window.onload = function() {
      if(val) {
        document.getElementsByClassName('footer')[0].innerHTML += '<br/><input type="text" readonly="readonly" onclick="this.select()" style="font-size: 15px; width: 100%" value="' + val + '">';
      } else {
        document.title = '404 - Not Found';
      }
    }
  } else if(!goto(path)) {
    window.onload = function() {
      document.title = '404 - Not Found';
    }
  }
}

function goto(key) {
  var link = get_val(key);
  
  if(link) {
    window.location.href = link;
    return true;
  }

  return false;
}

function get_val(key) {
  for(var i = 0; i < links.length; ++i) {
    var val = decrypt(key, links[i]);

    if(val) {
      return val;
    }
  }

  return null;
}

function encrypt(key, plain) {
  var data = encodeURIComponent(plain);

  var res = '';
  if(data.length > 16) {
    for(var i = 0; i < data.length; i += 16) {
      res = res.concat(encrypt_short(key, data.substr(i, 16)));
    }
  } else {
    res = encrypt_short(key, data);
  }

  return SHA256_2(key).concat(res);
}

function decrypt(key, cipher) {
  if(SHA256_2(key) !== cipher.substring(0, 64)) {
    return null;
  }

  var data = cipher.substring(64);
  if(data.length > 32) {
    var res = '';
    for(var i = 0; i < data.length; i += 32) {
      res = res.concat(decrypt_short(key, data.substr(i, 32)));
    }

    res = res.substring(0, res.indexOf('\0'));
    
    return decodeURIComponent(res);
  } else {
    return decodeURIComponent(decrypt_short(key, data));
  }
}

function encrypt_short(key, plain) {
  AES_Init();

  var keyBuf = SHA256_bin(key);
  var block = toBinary(plain);

  AES_ExpandKey(keyBuf);
  AES_Encrypt(block, keyBuf);

  AES_Done();

  return bin2hex(block);
}

function decrypt_short(key, cipher) {
  AES_Init();

  var keyBuf = SHA256_bin(key);
  var block = hex2bin(cipher);

  AES_ExpandKey(keyBuf);
  AES_Decrypt(block, keyBuf);

  AES_Done();

  return toStr(block);
}

function toStr(arr) {
  var res = "";
  for(var i = 0; i < arr.length; ++i) {
    res = res.concat(String.fromCharCode(arr[i]));
  }

  return res;
}

function toBinary(str) {
  var buf = [];

  for(var i = 0; i < str.length; ++i) {
    buf.push(str.charCodeAt(i));
  }

  return buf;
}

function bin2hex(arr) {
  var hex = '0123456789abcdef';
  var res = '';
  for(var i = 0; i < arr.length; ++i) {
    res = res.concat(hex.charAt((arr[i] >> 4) & 0xf))
             .concat(hex.charAt(arr[i] & 0xf));
  }

  return res;
}

function hex2bin(str) {
  var hex = '0123456789abcdef';
  var res = [];
  for(var i = 0; i < str.length; i += 2) {
    res.push((hex.indexOf(str[i]) << 4) | (hex.indexOf(str[i + 1])));
  }

  return res;
}

/**
*
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*
*  Original code by Angel Marin, Paul Johnston.
*
**/
var char_size = 8;

function SHA256_bin(s) {
  s = Utf8Encode(s);
  var intarr = core_sha256(str2binb(s), s.length * char_size);
  var bytearr = [];
  for(var i = 0; i < intarr.length; ++i) {
    bytearr[i * 4 + 0] = (intarr[i] >> 24) & 0xff;
    bytearr[i * 4 + 1] = (intarr[i] >> 16) & 0xff;
    bytearr[i * 4 + 2] = (intarr[i] >> 8) & 0xff;
    bytearr[i * 4 + 3] = intarr[i] & 0xff;
  }

  return bytearr;
}

function safe_add (x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
function R (X, n) { return ( X >>> n ); }
function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

function core_sha256 (m, l) {
  var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
    0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
    0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
    0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
    0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
    0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
    0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
    0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
    0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
    0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
    0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

  var W = new Array(64);
  var a, b, c, d, e, f, g, h, i, j;
  var T1, T2;

  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;

  for ( var i = 0; i<m.length; i+=16 ) {
    a = HASH[0];
    b = HASH[1];
    c = HASH[2];
    d = HASH[3];
    e = HASH[4];
    f = HASH[5];
    g = HASH[6];
    h = HASH[7];

    for ( var j = 0; j<64; j++) {
      if (j < 16) W[j] = m[j + i];
      else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

      T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
      T2 = safe_add(Sigma0256(a), Maj(a, b, c));

      h = g;
      g = f;
      f = e;
      e = safe_add(d, T1);
      d = c;
      c = b;
      b = a;
      a = safe_add(T1, T2);
    }

    HASH[0] = safe_add(a, HASH[0]);
    HASH[1] = safe_add(b, HASH[1]);
    HASH[2] = safe_add(c, HASH[2]);
    HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]);
    HASH[5] = safe_add(f, HASH[5]);
    HASH[6] = safe_add(g, HASH[6]);
    HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
}

function str2binb (str) {
  var bin = Array();
  var mask = (1 << char_size) - 1;
  for(var i = 0; i < str.length * char_size; i += char_size) {
    bin[i>>5] |= (str.charCodeAt(i / char_size) & mask) << (24 - i%32);
  }
  return bin;
}

function Utf8Encode(string) {
  string = string.replace(/\r\n/g,"\n");
  var utftext = "";

  for (var n = 0; n < string.length; n++) {

    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    }
    else if((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    }
    else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }

  return utftext;
}

function binb2hex (binarray) {
  var hex_tab = "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
    hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
}
  
function SHA256(s) {

  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * char_size));
}

function SHA256_2(s) {
  s = Utf8Encode(s);
  return binb2hex(core_sha256(core_sha256(str2binb(s), s.length * char_size), 256));
}
