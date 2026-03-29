// argsHelperV3.ts :: https://chatgpt.com/share/68416b88-c4f8-8011-a67c-969b35431307
// bu dosya diğer öncülleri için lider pozisyonundadır. MASTER. öncüllerini kullanmak istersen, buna benzet.
/**
 * Hem eski stil (array), hem yeni stil (options object) argüman desteği.
 * Boşluklu Argüman Sorunu bu v4 ile ÇÖZÜLDÜ : https://chatgpt.com/share/69c648b2-932c-8333-9bf4-5ba20491f2d7
 */
export function getArgsWithNoDefaults(optionsOrArray = {}) {
    let options;

    if (Array.isArray(optionsOrArray)) {
        options = { defaults: optionsOrArray };
    } else {
        options = optionsOrArray;
    }

    const { defaults = [], helpText = "" } = options;

    const positionalArgs = [];
    const namedArgs = {};

    const rawArgs = process.argv.slice(2);

    // Help
    if (rawArgs.includes('--help') || rawArgs.includes('-h')) {
        console.log("🆘 Yardım:");
        console.log(helpText || "(Yardım metni tanımlı değil)");
        process.exit(0);
    }

    for (let i = 0; i < rawArgs.length; i++) {
        let arg = rawArgs[i];

        // --------------------
        // LONG FLAGS (--key)
        // --------------------
        if (arg.startsWith('--')) {
            let key = arg.slice(2);
            let value = "true";

            // --key=value
            if (key.includes('=')) {
                [key, value] = key.split('=');

                // --key= value
                if (value === '' && rawArgs[i + 1] && !rawArgs[i + 1].startsWith('-')) {
                    value = rawArgs[i + 1];
                    i++;
                }
            }
            // --key = value  OR  --key value
            else {
                const next = rawArgs[i + 1];
                const next2 = rawArgs[i + 2];

                // --key = value
                if (next === '=') {
                    value = next2 && !next2.startsWith('-') ? next2 : "true";
                    i += 2;
                }
                // --key value
                else if (next && !next.startsWith('-')) {
                    value = next;
                    i++;
                }
            }

            // "=value" fix
            if (typeof value === 'string' && value.startsWith('=')) {
                value = value.slice(1);
            }

            namedArgs[key] = value.trim();
        }

        // --------------------
        // SHORT FLAGS (-k)
        // --------------------
        else if (arg.startsWith('-')) {
            const key = arg.slice(1);
            const next = rawArgs[i + 1];

            if (next && !next.startsWith('-')) {
                namedArgs[key] = next;
                i++;
            } else {
                namedArgs[key] = true;
            }
        }

        // --------------------
        // POSITIONAL
        // --------------------
        else {
            positionalArgs.push(arg);
        }
    }

    return {
        positional: positionalArgs,
        named: namedArgs
    };
}

