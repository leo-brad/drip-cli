import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import chalk from 'chalk';

export default async function askQuestion(question) {
  const rl = readline.createInterface({ input, output, });
  const answer = await rl.question(
    chalk.bold(question) +
    'yes[' + chalk.bold('Y') + ']/no[' + chalk.bold('N') + ']?\n',
  );
  let result;
  switch (answer.toLowerCase()) {
    case 'y':
    case 'yes':
      result = true;
      break;
    case 'n':
    case 'no':
      result = false;
      break;
    default:
      result = false;
      break;
  }
  return result;
}
