import help from '~/lib/command/help';
import init from '~/lib/command/init';
import pkg from '~/lib/command/pkg';
import start from '~/lib/command/start';
import install from '~/lib/command/install';
import client from '~/lib/command/client';
import server from '~/lib/command/server';

const [_1, _2, one, ...rest] = process.argv;

async function main() {
  switch (one) {
    case 'init':
      await init(...rest);
      break;
    case 'start':
      await start(...rest);
      break;
    case 'package':
      pkg(...rest);
      break;
    case 'install':
      install(...rest);
      break;
    case 'client':
      client(...rest);
      break;
    case 'server':
      server(...rest);
      break;
    default:
      help(...rest);
      break;
  }
  process.exit(0);
}

main();
