import { execSync, } from 'child_process';
import net from 'net';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import iteratorPackagePath from '~/lib/util/iteratorPackagePath';
import getPkgHash from '~/lib/util/getPkgHash';

export function diffAddPackage(pkgs) {
  const ans = [];
  const hash = {};
  iteratorPackagePath((p) => {
    hash[p] = true;
  });
  pkgs.forEach((p) => {
    const { pkg, } = p;
    if (!hash[pkg]) {
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
    const { pkg, } = p;
    hash[pkg] = true;
  });
  if (fs.existsSync(packagesPath)) {
    const pkgHash = getPkgHash();
    fs.readdirSync(packagesPath).forEach((p) => {
      if (!hash[p]) {
        ans.push(pkgHash[p]);
      }
    });
  }
  return ans;
}

export function rmPackage(pkg) {
  const packagePath = path.join('.drip', 'local', 'package', pkg);
  if (fs.existsSync(packagePath)) {
    fs.rmSync(packagePath, { recursive: true });
    console.log('Package ' + '\'' + pkg + '\'' + ' remove successful...');
  }
}
