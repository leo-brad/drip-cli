import getConfig from '~/lib/util/getConfig';

let hash;

export default function getPkgHash() {
  const config = getConfig();
  const {
    packages,
  } = config;
  if (hash === undefined) {
    hash = {};
    packages.forEach((p) => {
      hash[name] = p;
    });
  }
  return hash;
}
