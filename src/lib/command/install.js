import getConfig from '~/lib/util/getConfig';
import installPackage from '~/lib/util/installPackage';

export default function install(...param) {
  const [one, ...rest] = param;
  const config = getConfig();
  const { core: { packages, }, } = config;
  packages.forEach((plugin) => {
    installPackage(plugin);
  });
}
