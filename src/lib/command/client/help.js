import commandTip from '~/lib/util/commandTip';

export default function help(...param) {
  commandTip('clinet',
    [
      ['p', 'port', 'Appoint drip client connect concrete socket port.'],
    ]
  );
}
