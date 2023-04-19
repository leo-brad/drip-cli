import chalk from 'chalk';
import optionTip from '~/lib/util/optionTip';

export default function help(...param) {
  console.log([
    optionTip('c', 'create', 'Create new drip package project.', true),
    optionTip('u', 'upload', 'Upload drip package related file.', true),
  ].join('\n'));
}
