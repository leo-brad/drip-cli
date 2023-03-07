import { execSync, } from 'child_process';
import chalk from 'chalk';

export default function checkGitInit() {
  try {
    execSync('git status');
  } catch (e) {
    console.log([
      '',
      chalk.bold('Check git status error') + ':',
      '',
      'Drip need use `' + chalk.bold('git') + '` get file content change message.',
      '',
      chalk.bold('Useful comment') + ':',
      '',
      '  - Please use `' + chalk.bold('git init') + '` initial current project as a git project.',
      '',
    ].join('\n'));
    process.exit(0);
  }
}

