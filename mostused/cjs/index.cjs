const path = require('path');

function URLisAfile(url) {
    // URL'nin son kısmından uzantıyı al (örneğin `.jpg`)
    const parsed = path.posix.parse(url);
    return parsed.ext.length > 0;
}
// Renk kodları (ANSI)
const renkler = {
    sari: '\x1b[33m',     // Yellow
    yesil: '\x1b[32m',    // Green
    kirmizi: '\x1b[31m',  // Red
    mavi: '\x1b[34m',     // Blue
    sifirla: '\x1b[0m'    // Reset (önemli!)
};


// --------- src/lib/trimHelpers.cjs ---------
// ref : https://chatgpt.com/share/6859a4bc-75b4-8011-838a-801cb993e721

function trimStartChar(str, char) {
  const escaped = escapeRegExp(char);
  const regex = new RegExp(`^(${escaped})+`);
  return str.replace(regex, '');
}

function trimEndChar(str, char) {
  const escaped = escapeRegExp(char);
  const regex = new RegExp(`(${escaped})+$`);
  return str.replace(regex, '');
}

function trimChar(str, char) {
  const escaped = escapeRegExp(char);
  const regex = new RegExp(`^(${escaped})+|(${escaped})+$`, 'g');
  return str.replace(regex, '');
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// --------- src/lib/trimHelpers.cjs ---------


module.exports = { URLisAfile, renkler, trimStartChar,
  trimEndChar,
  trimChar }
