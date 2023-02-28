import path from 'path';
import parseConfig from '~/lib/util/parseConfig';

let config;

export default function getConfig() {
  if (config === undefined) {
    const local = parseConfig(path.resolve('.drip', 'local', 'config'));
    const project = parseConfig(path.resolve('.drip', 'project', 'config'));
    config = { ...project, ...local,  };
  }
  return config;
}
