import { exec, } from 'child_process';
import os from 'os';
import chalk from 'chalk';

function showCommandTip(command, d) {
  return  ' Use `' + chalk.bold(command + ' ' + d) + '` install related dependence.';
}

function showPlatformTip(d) {
  switch (os.platform()) {
    case 'darwin':
      console.log(' - ' + showCommandTip('brew install', d));
      break;
    case 'freebsd':
      console.log(' - ' + showCommandTip('pkg install', d));
      break;
    case 'linux':
      console.log([
        '  - ' + chalk.bold('Gentoo') + ':',
        '',
        '  ' + showCommandTip('emerge --ask', d),
        '',
        '  - ' + chalk.bold('Archlinux') + ':',
        '',
        '  - ' + chalk.bold('Ubuntu') + ':',
        '',
        '  ' + showCommandTip('pacman -S', d),
      ].join('\n'));
      break;
    case 'openbsd':
    case 'sunos':
    case 'win32':
      console.log('Search command line program download and install.');
    default:
      break;
  }
}

function showError(dependence, number) {
  console.log([
    '',
    chalk.bold('Dependence check error number ') + '[' + chalk.bold(number) + ']' + ':',
    '',
    'Command line program `' + chalk.bold(dependence) + '` don\'t be installed.',
    '',
    chalk.bold('Prossible help') + ':',
    '',
  ].join('\n'));
  showPlatformTip(dependence);
  console.log('');
}

export default async function checkDependence(dependencies) {
  let error = 0;
  for (let i = 0; i < dependencies.length; i += 1) {
    const d = dependencies[i];
    let err = 0;
    await new Promise((resolve, reject) => {
      exec(d, (error) => {
        if (error !== null) {
          err += 1;
          resolve();
        } else {
          resolve();
        }
      });
      exec(d + ' --help', (error) => {
        if (error !== null) {
          err += 1;
          resolve();
        } else {
          resolve();
        }
      });
    });
    if (err >= 2) {
      error += 1;
      showError(d, error);
    }
  }
  if (error > 0) {
    process.exit(0);
  }
}
