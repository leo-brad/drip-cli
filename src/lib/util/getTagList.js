export default function getTagList(pkgPath) {
  const shells = [];
  shells.push('cd ' + pkgPath);
  shells.push('git tag -l');
  let tags = execSync(shells.join('&&')).toString().split('\n');
  tags = tags.slice(0, tags.length - 1);
  return tags;
}
