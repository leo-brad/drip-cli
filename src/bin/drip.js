import help from '~/lib/command/help';
import init from '~/lib/command/init';
import start from '~/lib/command/start';
import plugin from '~/lib/command/plugin';
import install from '~/lib/command/install';

const [_1, _2, one, ...rest] = process.argv;

async function main() {
  switch (one) {
    case 'init':
      await init(...rest);
      break;
    case 'start':
      await start(...rest);
      break;
    case 'plugin':
      plugin(...rest);
      break;
    case 'install':
      install(...rest);
      break;
    case '--help':
      help(...rest);
      break;
    default:
      help(...rest);
      break;
  }
  process.exit(0);
}

main();
