// argsHelperV3.ts :: https://chatgpt.com/share/68416b88-c4f8-8011-a67c-969b35431307
// bu dosya diğer öncülleri için lider pozisyonundadır. MASTER. öncüllerini kullanmak istersen, buna benzet.
/**
 * Hem eski stil (array), hem yeni stil (options object) argüman desteği.
 */
export function getArgsWithNoDefaults(optionsOrArray = {}) {
    let options;
    // Geriye dönük destek: Eğer dizi geldiyse, options objesi haline getir
    if (Array.isArray(optionsOrArray)) {
        options = { defaults: optionsOrArray };
    }
    else {
        options = optionsOrArray;
    }
    const { defaults = [], helpText = "" } = options;
    const positionalArgs = [];
    const namedArgs = {};
    const rawArgs = process.argv.slice(1); // console.log("rawArgs", rawArgs);
    // Yardım ekranı (--help veya -h)
    if (rawArgs.includes('--help') || rawArgs.includes('-h')) {
        console.log("🆘 Yardım:");
        console.log(helpText || "(Yardım metni tanımlı değil)");
        process.exit(0);
    }
    // Argümanları ayrıştır
    for (let i = 0; i < rawArgs.length; i++) {
        const arg = rawArgs[i];
        if (arg.startsWith('--')) {
            const [key, value = "true"] = arg.slice(2).split('=');
            namedArgs[key] = value;
        }
        else if (arg.startsWith('-')) {
            const key = arg.slice(1);
            const next = rawArgs[i + 1];
            if (next && !next.startsWith('-')) {
                namedArgs[key] = next;
                i++;
            }
            else {
                namedArgs[key] = true;
            }
        }
        else {
            positionalArgs.push(arg);
        }
    }
    // // Hata kontrolü: çok fazla pozisyonel argüman varsa uyar
    // if (positionalArgs.length > defaults.length) {
    //   console.warn(`⚠️  Beklenenden fazla pozisyonel argüman verildi. İlk ${defaults.length} tanesi kullanılacak.`);
    // }
    // const filledArgs = defaults.map((def, i) => positionalArgs[i] || def);
    const filledArgs = positionalArgs;
    return {
        positional: filledArgs,
        named: namedArgs
    };
}
