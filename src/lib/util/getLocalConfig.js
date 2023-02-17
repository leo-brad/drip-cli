import path from 'path';
import parseConfig from '~/lib/util/parseConfig';

let config;

export default function getLocalConfig() {
  if (config === undefined) {
    config = parseConfig(path.join(process.env.HOME, '.drip', 'config'));
  }
  return config;
}
