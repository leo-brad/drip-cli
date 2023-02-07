import path from 'path';
import getConfig from '~/lib/util/getConfig';
import {
  rmPackage,
  installPackage,
  diffAddPackage,
  diffPlusPackage,
} from '~/lib/util/package';

export default async function install(...param) {
  const [one, ...rest] = param;
  const { packages, } = getConfig();
  let count = 0;
  const plus = diffPlusPackage(packages);
  const h1 = {};
  plus.forEach((pkg) => {
    h1[pkg] = true;
  });
  const h2 = {};
  diffAddPackage(packages).forEach(async (pkg) => {
    if (!h1[pkg]) {
      await installPackage(pkg);
      count += 1;
    }
    h2[pkg] = true;
  });
  plus.forEach((pkg) => {
    if (!h2[pkg]) {
      rmPackage(pkg);
      count += 1;
    }
  });
  if (count === 0) {
    console.log('Nothing change...');
  }
}
