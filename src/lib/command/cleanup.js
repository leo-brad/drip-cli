import fs from 'fs';
import path from 'path';
import { execSync, } from 'child_process';
import iteratorPackagePath from '~/lib/util/iteratorPackagePath';
import getVersionHash from '~/lib/util/getVersionHash';
import getLatestVersion from '~/lib/util/getLatestVersion';

export default function cleanup(...param) {
  const packagePath = path.join('.drip', 'local', 'package');
  const versionHash = getVersionHash();
  iteratorPackagePath((p) => {
    const pkgPath = path.join(packagePath, p);
    let shells = [];
    shells.push('cd ' + pkgPath);
    let version = versionHash[p];
    if (version === '') {
      version = getLatestVersion(pkgPath);
    }
    shells.push('git checkout ' + version);
    shells.push('git stash');
    fs.rmSync(path.join(pkgPath, '.git'), { recursive: true, });
    shells = [];
    shells.push('git init');
    shells.push('git add --all');
    shells.push('git commit -m "' + version +  '"');
    shells.push('git tag ' + version + ' master');
  });
}
