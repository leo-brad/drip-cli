import path from 'path';
import getConfig from '~/lib/util/getConfig';
import {
  rmPackage,
  installPackage,
  diffAddPackage,
  diffPlusPackage,
} from '~/lib/util/package';

export default function install(...param) {
  const [one, ...rest] = param;
  const { packages, } = getConfig();
  const plus = diffPlusPackage(packages);
  const h1 = {};
  plus.forEach((pkg) => {
    h1[pkg] = true;
  });
  const h2 = {};
  diffAddPackage(packages).forEach((pkg) => {
    if (!h1[pkg]) {
      installPackage(pkg);
    } else {
      h2[pkg] = true;
    }
  });
  plus.forEach((pkg) => {
    if (!h2[pkg]) {
      rmPackage(pkg);
    }
  });
}
