import help from './help';
import main from './main';

export default function client(...param) {
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
