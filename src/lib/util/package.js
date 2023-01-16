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
  pkgs.forEach((pkg) => {
    const [_, name] = pkg.match(/^\[(\w+)\]\(([\w\-\.\/\:]+)\)$/);
    if (!hash[name]) {
      ans.push(pkg);
    }
  });
  return ans;
}

export function diffPlusPackage(pkgs) {
  const ans = [];
  const packagesPath = path.join('.drip', 'local', 'package');
  const hash = {};
  pkgs.forEach((pkg) => {
    const [_, name] = pkg.match(/^\[(\w+)\]\(([\w\-\.\/\:]+)\)$/);
    hash[name] = true;
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

function clonePackage(location, url) {
  try {
    execSync(
      'git clone ' + url + ' ' + location,
    );
  } catch (e) {
    console.error(chalk.bold('Execution `git clone` fail; please check package address.'));
  }
}

function installPackageCrossLocal(name, url) {
  const local = path.join(process.env.HOME, '.drip', 'package', name);
  if (!fs.existsSync(local)) {
    clonePackage(local, url);
  }
  fs.cpSync(local, path.join('.drip/local/package', name) + '/', {
    recursive: true,
  });
}

export function installPackage(pkg) {
  const [_, name, url] = pkg.match(/^\[(\w+)\]\(([\w\-\.\/\:]+)\)$/);
  const packagePath = path.join('.drip', 'local', 'package', name);
  if (!fs.existsSync(packagePath)) {
    installPackageCrossLocal(name, url);
    console.log('Package ' + '\'' + name + '\'' + ' install successful...');
  } else {
    console.error('Package ' + '\'' + name + '\'' + ' already installed...');
  }
}
