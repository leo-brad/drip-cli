export default function pkg(...param) {
  const [one, ...rest] = param;
  switch (one) {
    case '--help':
      help();
      break;
  }
}
