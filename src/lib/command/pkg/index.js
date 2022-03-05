import add from './add';

export default function pkg(...param) {
  const [one, ...rest] = param;
  switch (one) {
    case 'add':
      add(...rest);
      break;
    default:
      break;
  }
}
