import add from './add';
import list from './list';
import help from './help';

export default async function command(...param) {
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
      help();
      break;
  }
}
