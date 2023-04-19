import chalk from 'chalk';
import commandTip from '~/lib/util/commandTip';

export default function help(...param) {
  console.log([
    commandTip('create', 'Create new drip package project.'),
    commandTip('upload', 'Upload package related file.'),
  ].join('\n'));
}
