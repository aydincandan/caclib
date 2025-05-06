// bu kodlar her ne kadar burada çalışsalarda 6/Mayıs/2025 de  C:\ops2\zilli3nodemailer\Back-End-NodeMiddle-npmjs.com\_npmjs\afterbuild>'den kopyalanmıştır.
// bu kodlar her ne kadar burada çalışsalarda 6/Mayıs/2025 de  C:\ops2\zilli3nodemailer\Back-End-NodeMiddle-npmjs.com\_npmjs\afterbuild>'den kopyalanmıştır.
// bu kodlar her ne kadar burada çalışsalarda 6/Mayıs/2025 de  C:\ops2\zilli3nodemailer\Back-End-NodeMiddle-npmjs.com\_npmjs\afterbuild>'den kopyalanmıştır.
// bu kodlar her ne kadar burada çalışsalarda 6/Mayıs/2025 de  C:\ops2\zilli3nodemailer\Back-End-NodeMiddle-npmjs.com\_npmjs\afterbuild>'den kopyalanmıştır.
// bu kodlar her ne kadar burada çalışsalarda 6/Mayıs/2025 de  C:\ops2\zilli3nodemailer\Back-End-NodeMiddle-npmjs.com\_npmjs\afterbuild>'den kopyalanmıştır.
// bu kodlar her ne kadar burada çalışsalarda 6/Mayıs/2025 de  C:\ops2\zilli3nodemailer\Back-End-NodeMiddle-npmjs.com\_npmjs\afterbuild>'den kopyalanmıştır.
// bu kodlar her ne kadar burada çalışsalarda 6/Mayıs/2025 de  C:\ops2\zilli3nodemailer\Back-End-NodeMiddle-npmjs.com\_npmjs\afterbuild>'den kopyalanmıştır.
// bu kodlar her ne kadar burada çalışsalarda 6/Mayıs/2025 de  C:\ops2\zilli3nodemailer\Back-End-NodeMiddle-npmjs.com\_npmjs\afterbuild>'den kopyalanmıştır.
// bu kodlar her ne kadar burada çalışsalarda 6/Mayıs/2025 de  C:\ops2\zilli3nodemailer\Back-End-NodeMiddle-npmjs.com\_npmjs\afterbuild>'den kopyalanmıştır.

import fs from 'fs-extra';
import path from 'path';

// https://chatgpt.com/share/67e7c8d9-d474-8011-a56d-85cbe6263b65   package.json'a    "type": "module",  eklemek.

export async function copyFiles_AsyncAwait(kaynak, hedef) {
  try {
    await fs.copy(kaynak, hedef)
    return 'success! copyFilesAsyncAwait-(hello from npm)'
  } catch (err) {
    console.log(err)
    return err
  }
}

// :
export function copyFiles_AsyncWithPromises(kaynak, hedef) {
  return fs.copy(kaynak, hedef)
    .then(() => {
      console.log('success! copyFiles_AsyncWithPromises-(hello from npm)');
      return 'success!';
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}

// :
export function copyFiles_AsyncWithCallbacks(kaynak, hedef) {
  fs.copy(kaynak, hedef, err => {
    if (err) return console.log(err)
    console.log('success! copyFiles_AsyncWithCallbacks-(hello from npm)')
    return err
  })
}

// :
export function copyFiles_Sync(kaynak, hedef) {
  try {
    fs.copySync(kaynak, hedef)
    return 'success! copyFiles_Sync'
  } catch (err) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxx-(hello from npm)", err)
    return err
  }
}

// delete kaynak
export function deleteFiles_Sync(kaynak) {
  try {
    fs.removeSync(kaynak)
    return 'success! deleteFiles_Sync'
  } catch (err) {
    console.log("yyyyyyyyyyyyyyyyyyyyyyy-(hello from npm) bak return err")
    return err
  }
}









export default class Dosyama {

  static startnew(dosyaAdi, info) {
    fs.writeFileSync(dosyaAdi, info + '\n', 'utf8');
  }

  static dosyayaYaz(dosyaAdi, ...degerler) {
    // `degerler` parametresi, tüm verilen değerleri bir dizi olarak alır
    const output = degerler.map(deger => {
      // Karmaşık veri türleri için JSON.stringify kullanıyoruz
      return typeof deger === 'object' ? JSON.stringify(deger) : deger;
    }).join(' ') + '\n'; // Değerleri birleştirip her çağrı için yeni bir satır ekliyoruz

    // Esas Dosyaya yazma işlemi
    fs.appendFileSync(dosyaAdi, output, 'utf8');

    return output.trimEnd('\n');
  }

  // `yaz` metodunu tanımlıyoruz
  static yaz(dosyaAdi, ...degerler) {
    // Yalnızca dosyaya yaz
    const output = this.dosyayaYaz(dosyaAdi, ...degerler);
  }

  // `goster` metodunu tanımlıyoruz
  static goster(...degerler) {
    // Yalnızca göster Ekrana yaz
    console.log(...degerler);
  }

  // `yazgoster` metodunu tanımlıyoruz
  static yazgoster(dosyaAdi, ...degerler) {

    this.yaz(dosyaAdi, ...degerler);
    this.goster(...degerler);

  }

  // `yazgoster` == `gosteryaz`
  static gosteryaz(dosyaAdi, ...degerler) {
    this.yazgoster(dosyaAdi, ...degerler);
  }
}

export const processFilesForHtml = (dir, MIDDLEOBJ, resultlogfile, isNew) => {
  const promise = new Promise((resolve) => {

    if (isNew) {
      Dosyama.startnew(resultlogfile, "-- startnew -- at -- " + new Date().toLocaleString());
    }

    const processDirectory_for_html_ = (directory) => {
      fs.readdirSync(directory).forEach(file => {
        const filepath = path.join(directory, file);
        if (fs.lstatSync(filepath).isDirectory()) {
          if (!filepath.includes('wp-content')) processDirectory_for_html_(filepath);
        } else if (path.extname(filepath) === '.html') {

          const content = fs.readFileSync(filepath, 'utf-8');

          MIDDLEOBJ(content, filepath, resultlogfile, isNew);

        }
      });
    };

    processDirectory_for_html_(dir);
    resolve(); // İşlem bittiğinde resolve çağrısı yapılır
  });



  // Özel onEnd metodunu ekliyoruz
  promise.onEnd = (callback) => {
    return promise.then(callback);
  };

  if (isNew == true) {
    Dosyama.yazgoster(resultlogfile, "-- end --");
    Dosyama.yazgoster(resultlogfile, "");
  }

  return promise;
};
