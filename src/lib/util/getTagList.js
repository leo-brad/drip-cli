import { execSync, } from 'child_process';
import path from 'path';
import checkDependence from '~/lib/util/checkDependence';
import help from '~/lib/command/help';

export default function getTagList(pkgPath) {
  checkDependence(['cd', 'git']);
  const shells = [];
  shells.push('cd ' + pkgPath);
  shells.push('git tag -l');
  let tags = execSync(shells.join('&&')).toString().split('\n');
  tags = tags.slice(0, tags.length - 1);
  return tags;
}
