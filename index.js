const readline = require('readline');

const bekleSoruSorCevapAL = async (soru) => {
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
  };
  
  module.exports = { bekleSoruSorCevapAL }
