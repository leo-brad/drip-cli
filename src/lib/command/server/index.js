import path from 'path';
import help from './help';
import main from './main';
import checkPath from '~/lib/util/checkPath';

export default function server(...param) {
  checkPath(path.resolve('.drip', 'local', 'drip-server'));
  const [one, ...rest] = param;
  switch (one) {
    case '--help':
      help(...rest);
      break;
    default:
      main(...rest);
      break;
  }
}
