import parseConfig from '~/lib/util/parseConfig';

export default function getConfig() {
  const local = parseConfig('.drip/local/config');
  const project = parseConfig('.drip/project/config');
  return { ...local, ...project, }
}
