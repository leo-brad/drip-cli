import path from 'path';
import help from './help';
import main from './main';
import checkPath from '~/lib/util/checkPath';
import parseOption from '~/lib/util/parseOption';
import h from '~/lib/command/help';

export default function client(...param) {
  checkPath(path.join(process.env.HOME, '.drip', 'command', 'package'), h);
  switch (param[0]) {
    case '--help':
      help();
      break;
    default: {
      const options = parseOption(...param);
      if (options.c || options.create || options.u || options.upload) {
        main(...param);
      } else {
        help();
      }
      break;
    }
  }
}
