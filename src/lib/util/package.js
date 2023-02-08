import { execSync, } from 'child_process';
import net from 'net';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import Socket from '~/lib/util/Socket';
import getConfig from '~/lib/util/getConfig';
import compareVersion from '~/lib/util/compareVersion';
import getLatestVersion from '~/lib/util/getLatestVersion';
import iteratorPackagePath from '~/lib/util/iteratorPackagePath';

export function diffAddPackage(pkgs) {
  const ans = [];
  const hash = {};
  iteratorPackagePath((p) => {
    hash[p] = true;
  });
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
