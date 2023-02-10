import getPkgHash from '~/lib/util/getPkgHash';
import getConfig from '~/lib/util/getConfig';

export default function iteratorConfigPackage(method) {
  const config = getConfig();
  const {
    packages,
  } = config;
  packages.forEach(method);
}
