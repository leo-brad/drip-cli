import { execSync, } from 'child_process';
import chalk from 'chalk';

function getVersions(v) {
  return v.substring(1, v.length).split('.');
}

function greaterOrEqualVersion(v1, v2) {
  const versions1 = getVersions(v1);
  const versions2 = getVersions(v2);
  let ans = true;
  for (let i = 0; i < versions1.length; i += 1) {
    if (parseInt(versions1[i]) < parseInt(versions2[i])) {
      ans = false;
      break;
    }
  }
  return ans;
}

export function checkVersion() {
  const v = execSync('node -v').toString();
  if (!greaterOrEqualVersion(v.substring(0, v.length - 1), 'v17.7.2')) {
    console.error([
      '',
      chalk.bold('The version of node currently used is lower:'),
      '',
      'please use node version greater or equal than v17.7.2.',
      'use command `' + chalk.bold('node -v') + '` check current version of node.',
      '',
      chalk.bold('the following are possible solutions:'),
      '',
      ' - visit the officical website of node to download and install the latest version node.',
      '   officical website address of node is ' + chalk.bold('https://nodejs.org'),
      '',
      ' - use command line tool `' + chalk.bold('nvm') + '` install and use lastest version node.',
      '   github address of nvm is ' + chalk.bold('https://github.com/nvm-sh/nvm') + '.',
      '',
    ].join('\n'));
    process.exit(0);
  }
}
