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
  diffAddPackage(packages).forEach((pkg) => {
    installPackage(pkg);
  });
  diffPlusPackage(packages).forEach((pkg) => {
    rmPackage(pkg);
  });
}
