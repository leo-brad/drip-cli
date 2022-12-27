import installPackage from '~/lib/util/installPackage';

export default function add(...param) {
  const [pkg, ...rest] = param;
  installPackage(pkg);
}
