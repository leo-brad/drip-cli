import chalk from 'chalk';
import path from 'path';
import commandTip from '~/lib/util/commandTip';

export default function help() {
  console.log([
    commandTip('list', 'List All don\'t be install command yet.'),
    commandTip('add', 'Add command which don\'t be install yet.'),
    commandTip('remove', 'Remove command which had be install already.'),
    commandTip('upgrade', 'Choose upgrade command which had be install already.'),
  ].join('\n'));
}
