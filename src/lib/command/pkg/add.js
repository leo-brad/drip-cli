import installPackage from '~/lib/util/installPlugin';

export default function add(...param) {
  const [pkg, ...rest] = param;
  installPackage(pkg);
}
