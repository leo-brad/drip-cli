import path from 'path';
import help from './help';
import main from './main';
import checkPath from '~/lib/util/checkPath';
import h from '~/lib/command/help';
import checkDependence from '~/lib/util/checkDependence';
import checkGitInit from '~/lib/util/checkGitInit';

export default async function server(...param) {
  await checkDependence(['git']);
  checkGitInit();
  checkPath(path.join(process.env.HOME, '.drip', 'command', 'server'), h);
  checkPath(path.resolve('.drip'), h);
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
