import path from 'path';


export function URLisAfile(url) {
    // URL'nin son kısmından uzantıyı al (örneğin `.jpg`)
    const parsed = path.posix.parse(url);
    return parsed.ext.length > 0;
}
// Renk kodları (ANSI)
export const renkler = {
    sari: '\x1b[33m',     // Yellow
    yesil: '\x1b[32m',    // Green
    kirmizi: '\x1b[31m',  // Red
    mavi: '\x1b[34m',     // Blue
    sifirla: '\x1b[0m'    // Reset (önemli!)
};


// --------- src/lib/trimHelpers.js ---------
// ref : https://chatgpt.com/share/6859a4bc-75b4-8011-838a-801cb993e721

/**
 * Baştan belirli bir karakteri kırpar
 * @param {string} str - İşlenecek metin
 * @param {string} char - Kırpılacak karakter (özel karakter ise kaçışsız girilmeli, örn: "." değil "\\.")
 * @returns {string}
 */
export function trimStartChar(str, char) {
  const escaped = escapeRegExp(char);
  const regex = new RegExp(`^(${escaped})+`);
  return str.replace(regex, '');
}

/**
 * Sondan belirli bir karakteri kırpar
 * @param {string} str
 * @param {string} char
 * @returns {string}
 */
export function trimEndChar(str, char) {
  const escaped = escapeRegExp(char);
  const regex = new RegExp(`(${escaped})+$`);
  return str.replace(regex, '');
}

/**
 * Hem baştan hem sondan belirli bir karakteri kırpar
 * @param {string} str
 * @param {string} char
 * @returns {string}
 */
export function trimChar(str, char) {
  const escaped = escapeRegExp(char);
  const regex = new RegExp(`^(${escaped})+|(${escaped})+$`, 'g');
  return str.replace(regex, '');
}

/**
 * Regex için karakter kaçışı
 * @param {string} str
 * @returns {string}
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// --------- src/lib/trimHelpers.js ---------


// --------- src/lib/toLocalISOString.js ---------
// https://chatgpt.com/share/68678762-2518-8011-92a4-57b1cb57098f

/**
 * Converts a Date to a local ISO-like string (without timezone info)
 * @param {Date} [date] - Optional Date object, defaults to new Date()
 * @returns {string} - Local ISO-like string
 */
function toLocalISOString(date = new Date()) {
  const pad = (n, len = 2) => String(n).padStart(len, '0');

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join('-') + 'T' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join(':') + '.' + pad(date.getMilliseconds(), 3);
}

// ESM export
export { toLocalISOString };

// CommonJS export support (Node.js ortamları için)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    toLocalISOString,
  };
}

// https://chatgpt.com/share/68678762-2518-8011-92a4-57b1cb57098f

// --------- src/lib/toLocalISOString.js ---------
