import chalk from 'chalk';

function getBlock(percent, each, all) {
  let block = Math.ceil(percent * each * all / 100);
  if (block > all) {
    block = all;
  }
  return block;
}

function formatePercent(percent) {
  return ' ' + chalk.bold(String(percent).padStart(3, ' ') + '%');
}

export default function loading(percent, title) {
  const col = process.stdout.columns;
  const each = Math.ceil(1 / (col - 5));
  const all = col - 5;
  const blocks = new Array(all);
  const block = getBlock(percent, each, all);
  for (let i = 0; i < blocks.length; i += 1) {
    if (i <= block) {
      blocks[i] = chalk.bgWhite(' ');
    } else {
      blocks[i] = ' ';
    }
  }
  console.clear();
  console.log(chalk.bold(title) + '...');
  console.log(blocks.join('') + formatePercent(percent, each, all));
}
