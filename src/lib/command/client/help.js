import optionTip from '~/lib/util/optionTip';

export default function help(...param) {
  console.log([
    optionTip('p', 'port', 'Appoint drip client connect concrete socket port.'),
  ].join('\n'));
}
