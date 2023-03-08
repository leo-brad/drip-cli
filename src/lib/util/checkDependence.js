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

function singleResolve(status, resolve) {
  status.count += 1;
  if (status.count >= 3) {
    resolve();
  }
}

export default async function checkDependence(dependencies, quit) {
  let error = 0;
  for (let i = 0; i < dependencies.length; i += 1) {
    const d = dependencies[i];
    const status = { count: 0, err: 0, };
    await new Promise((resolve, reject) => {
      exec(d, (error) => {
        if (error !== null) {
          status.err += 1;
          singleResolve(status, resolve);
        } else {
          singleResolve(status, resolve);
        }
      });
      exec(d + ' --help', (error) => {
        if (error !== null) {
          status.err += 1;
          singleResolve(status, resolve);
        } else {
          singleResolve(status, resolve);
        }
      });
      exec(d + ' -rf', (error) => {
        if (error !== null) {
          status.err += 1;
          singleResolve(status, resolve);
        } else {
          singleResolve(status, resolve);
        }
      });
    });
    if (status.err >= 3) {
      error += 1;
      showError(d, error);
    }
  }
  if (error > 0) {
    return process.exit(0);
  } else {
    return true;
  }
}
