const readline = require('readline');
const input = readline.createInterface(process.stdin);


const question = () =>
  new Promise((resolve) => input.question("", (answer) => resolve(answer)));

module.exports = {
  question
}
