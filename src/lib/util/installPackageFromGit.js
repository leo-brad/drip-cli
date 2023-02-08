export default function installPackageFromGit(version) {
  const shells = [];
  shells.push('git checkout ' + version);
  shells.push('git stash');
}

