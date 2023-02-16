import chalk from 'chalk';
import path from 'path';
import commandTip from '~/lib/util/commandTip';

export default function help() {
  console.log([
    commandTip('list', 'List All don\'t be install command yet.'),
  ].join('\n'));
}
