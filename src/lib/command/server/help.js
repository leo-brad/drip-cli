import commandTip from '~/lib/util/commandTip';

export default function help(...param) {
  commandTip('server', 'Start drip server program.',
    [
      ['p', 'port', 'Appoint drip client run concrete socket port.'],
    ]
  );
}
