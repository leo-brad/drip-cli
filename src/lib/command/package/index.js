export default function package(...param) {
  const [one, ...rest] = param;
  switch (one) {
    case '--help':
      add(...rest);
      break;
    case 'cleanup':
      cleanup(...rest);
      break;
  }
}
