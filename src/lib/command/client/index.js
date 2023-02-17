import path from 'path';
import help from './help';
import main from './main';
import checkPath from '~/lib/util/checkPath';
import h from '~/lib/command/help';

export default function client(...param) {
  checkPath(path.join(process.env.HOME, '.drip', 'command', 'drip-client'), h);
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
