import commandTip from '~/lib/util/commandTip';
import optionTip from '~/lib/util/optionTip';

export default function help(...param) {
  console.log([
    optionTip('p', 'port', 'Appoint drip client run concrete socket port.'),
  ].join('\n'));
}
