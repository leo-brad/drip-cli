import path from 'path';
import chalk from 'chalk';
import checkPath from '~/lib/util/checkPath';
import add from './add';
import list from './list';
import help from './help';
import h from '~/lib/command/help';

export default async function command(...param) {
  const dripPath = path.join(process.env.HOME, '.drip');
  checkPath(path.resolve('.drip'), h);
  const [command, ...rest] = param;
  switch (command) {
    case 'add':
      await add(...rest);
      break;
    case 'remove':
      remove(...rest);
      break;
    case 'upgrade':
      upgrade(...rest);
      break;
    case 'list':
      list();
      break;
    default:
      h();
      break;
  }
}
