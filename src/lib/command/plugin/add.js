import { execSync, } from 'child_process';
import installPlugin from '~/lib/util/installPlugin';

export default function add(...param) {
  const [plugin, ...rest] = param;
  installPlugin(plugin);
}
