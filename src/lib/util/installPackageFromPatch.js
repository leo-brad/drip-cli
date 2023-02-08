import path from 'path';

export default function installPackageFromPatch(patch, version, local) {
  const shells = [];
  shells.push('cd ' + local);
  shells.push('echo ' + patch + '| git apply');
  shells.push('git init');
  shells.push('git add --all');
  shells.push('git commit -m "' + version + '"');
  shells.push('git tag ' + version + ' master');
  execSync(shells.join('&&'));
}
