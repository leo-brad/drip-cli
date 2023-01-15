import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export function diffAddPackage(pkgs) {
  const ans = [];
  const packagesPath = path.join('.drip', 'local', 'package');
  const hash = {};
  if (fs.existsSync(packagesPath)) {
    fs.readdirSync(packagesPath).forEach((p) => {
      hash[p] = true;
    });
  }
  pkgs.forEach((p) => {
    if (!hash[p]) {
      ans.push(p);
    }
  });
  return ans;
}

export function diffPlusPackage(pkgs) {
  const ans = [];
  const packagesPath = path.join('.drip', 'local', 'package');
  const hash = {};
  pkgs.forEach((p) => {
    hash[p] = true;
  });
  if (fs.existsSync(packagesPath)) {
    fs.readdirSync(packagesPath).forEach((p) => {
      if (!hash[p]) {
        ans.push(p);
      }
    });
  }
  return ans;
}


export function rmPackage(pkg) {
  const packagePath = path.join('.drip', 'local', 'package', pkg);
  if (fs.existsSync(packagePath)) {
    fs.rmdirSync(packagePath, { recursive: true });
    console.log('Package ' + '\'' + pkg + '\'' + ' remove successful...');
  }
}

export function installPackage(pkg) {
  const [_, name, url] = pkg.match(/^\[(\w+)\]\(([\w\-\.\/\:]+)\)$/);
  const packagePath = path.join('.drip', 'local', 'package', name);
  if (!fs.existsSync(packagePath)) {
    try {
      execSync(
        'git clone ' + url + ' ' + '.drip/local/package/' + name + '/',
      );
    } catch (e) {
      console.error(chalk.bold('Execution `git clone` fail; please check package address.'));
    }
    console.log('Package ' + '\'' + pkg + '\'' + ' install successful...');
  } else {
    console.error('Package ' + '\'' + pkg + '\'' + ' already installed...');
  }
}
