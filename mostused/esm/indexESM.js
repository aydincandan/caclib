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