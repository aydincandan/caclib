
import * as readline from 'node:readline';

let durumSORUsor = true

const iptal = (trueOrfalse) => {
  durumSORUsor = !trueOrfalse
  // console.log({durumSORUsor, trueOrfalse})
  return durumSORUsor
}

const bekleSoruSorCevapAL = async (soru) => {

  if (durumSORUsor == true) {
    // Create an interface for input and output
    const reedLayn = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const askQuestion = (question) => {
      return new Promise((resolve) => {
        reedLayn.question(question, (answer) => {
          resolve(answer);
        });
      });
    };

    // Get user input using await
    const cevap = await askQuestion(soru);

    // // Print the result
    // console.log(`Hello, ${cevap}!`);

    // Close the readline interface
    reedLayn.close();

    return cevap
  } else {
    // durumSORUsor false ise soru sorup beklemeyiz.
    return ""
  }

};

export { bekleSoruSorCevapAL, iptal }
