import help from './help';

export default function client(...param) {
  const [one, ...rest] = param;
  switch (one) {
    case 'help':
      add(...rest);
      break;
    default:
      break;
  }
}
