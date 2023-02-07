import commandTip from '~/lib/util/commandTip';

export default function help(...param) {
  commandTip('client', 'Start drip client program.',
    [
      ['p', 'port', 'Appoint drip client connect concrete socket port.'],
    ]
  );
}
