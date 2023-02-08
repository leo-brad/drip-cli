import path from 'path';

export default function installPackageFromTar(tar, version, local) {
  const shells = [];
  shells.push('cd ' + local);
  shells.push('echo ' + tar + '| tar xf');
  shells.push('git init');
  shells.push('git add --all');
  shells.push('git commit -m "' + version + '"');
  shells.push('git tag ' + version + ' master');
  execSync(shells.join('&&'));
}
