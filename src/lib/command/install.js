import path from 'path';
import getConfig from '~/lib/util/getConfig';
import {
  rmPackage,
  diffAddPackage,
  diffPlusPackage,
} from '~/lib/util/package';
import installPackage from '~/lib/util/installPackage';
import getVersionHash from '~/lib/util/getVersionHash';
import checkPath from '~/lib/util/checkPath';
import global from '~/obj/global';

export default async function install(...param) {
  checkPath(path.resolve('.drip'), help);
  const [one, ...rest] = param;
  const { packages, packageFileServer, } = getConfig();
  global.location = packageFileServer;
  let count = 0;
  const plus = diffPlusPackage(packages);
  const h1 = {};
  plus.forEach((pkg) => {
    h1[pkg] = true;
  });
  const h2 = {};
  await new Promise((resolve, reject) => {
    const diffAdd = diffAddPackage(packages);
    if (diffAdd.length > 0) {
      diffAdd.forEach(async (pkg, i) => {
        if (!h1[pkg]) {
          await installPackage(pkg);
          count += 1;
        }
        h2[pkg] = true;
        if (i === packages.length - 1) {
          resolve();
        }
      });
    } else {
      resolve();
    }
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
