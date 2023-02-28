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
      let { pkg, version, } = p;
      hash[pkg] = version;
    });
  }
  return hash;
}
