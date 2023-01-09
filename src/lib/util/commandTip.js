import chalk from 'chalk';

export default function commandTip(name, options) {
  const lines = [
    '',
    '[' + chalk.bold('Drip ' + name) + ']' + chalk.bold(' command line tip') + ':',
    '',
  ];
  options.forEach((p) => {
    const [simple, complex, tip] = p;
    lines.push('  -' + chalk.bold(simple) + ', --' + chalk.bold(complex) + '  ' + tip);
  });
  lines.push('');
  console.log(lines.join('\n'));
}

