import parseConfig from '~/lib/util/parseConfig';

let config;

export default function getConfig() {
  if (config === undefined) {
    const local = parseConfig('.drip/local/config');
    const project = parseConfig('.drip/project/config');
    config = { ...local, ...project, };
  }
  return config;
}
