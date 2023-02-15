import OptionTip from '~/lib/util/OptionTip';

export default function commandTip(name, fun, options) {
  const lines = [
    'drip ' + name + ' ' + fun,
  ];
  options.forEach((p) => {
    const [simple, complex, tip] = p;
    lines.push(OptionTip(simple, complex, tip));
  });
  lines.push('');
  console.log(lines.join('\n'));
}

