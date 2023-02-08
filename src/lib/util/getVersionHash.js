import getConfig from '~/lib/util/getConfig';

let hash;

export default function getVersionHash() {
  const config = getConfig();
  const {
    packages,
  } = config;
  if (hash === undefined) {
    hash = {};
    packages.forEach((p) => {
      let [_, name, _1, version] = p.match(/^\[\w+\]\([\w\-\.\/\:]+\)(.*)$/);
      hash[name] = version;
    });
  }
  return hash;
}
