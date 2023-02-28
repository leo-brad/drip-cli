import getConfig from '~/lib/util/getConfig';

export default async function iteratorConfigPackage(method, finish) {
  const config = getConfig();
  const {
    packages,
  } = config;
  for (let i = 0; i < packages.length; i += 1) {
    await method(packages[i]);
  }
}
