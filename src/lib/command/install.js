import getConfig from '~/lib/util/getConfig';
import installPlugin from '~/lib/util/installPlugin';

export default function install(...param) {
  const [one, ...rest] = param;
  const config = getConfig();
  const {
    core: {
      plugins,
    },
  } = config;
  plugins.forEach((plugin) => {
    installPlugin(plugin);
  });
}
