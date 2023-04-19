import help from '~/lib/command/help';
import init from '~/lib/command/init';
import pkg from '~/lib/command/package';
import start from '~/lib/command/start';
import install from '~/lib/command/install';
import client from '~/lib/command/client';
import server from '~/lib/command/server';
import cleanup from '~/lib/command/cleanup';
import upgrade from '~/lib/command/upgrade';
import command from '~/lib/command/command';

async function main() {
  const [_1, _2, one, ...rest] = process.argv;
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
      await install(...rest);
      break;
    case 'client':
      client(...rest);
      break;
    case 'server':
      await server(...rest);
      break;
    case 'package':
      await pkg(...rest);
      break;
    case 'upgrade':
      await upgrade(...rest);
      break;
    case 'cleanup':
      await cleanup(...rest);
      break;
    case 'command':
      await command(...rest);
      break;
    default:
      help(...rest);
      break;
  }
  process.exit(0);
}

main();
