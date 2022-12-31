import help from './help';

export default function server(...param) {
  const [one, ...rest] = param;
  switch (one) {
    case 'help':
      add(...rest);
      break;
    default:
      break;
  }
}
