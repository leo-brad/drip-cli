import path from 'path';
import chalk from 'chalk';
import checkPath from '~/lib/util/checkPath';
import add from './add';
import list from './list';
import remove from './remove';
import help from './help';
import upgrade from './upgrade';
import h from '~/lib/command/help';

export default async function command(...param) {
  checkPath(path.join(process.env.HOME, '.drip', 'command'), h);
  const [command, ...rest] = param;
  switch (command) {
    case 'add':
      await add(...rest);
      break;
    case 'remove':
      remove(...rest);
      break;
    case 'upgrade':
      await upgrade(...rest);
      break;
    case 'list':
      list();
      break;
    default:
      help();
      break;
  }
}
