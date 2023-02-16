import path from 'path';
import fs from 'fs';
import help from '~/lib/command/help';
import askQuestion from '~/lib/util/askQuestion';
import parseOption from '~/lib/util/parseOption';
import checkPath from '~/lib/util/checkPath';

function cancelInit() {
  console.log('Drip init cancel...');
}

function finishInit() {
  console.error('Current project drip init finish...');
}

async function confirmInit() {
  const dripDir = path.join(process.env.HOME, '.drip');
  fs.cpSync(
    path.join(dripDir, 'asset/.drip/'), '.drip/',
    {
      recursive: true,
      filter: (src) => !src.match(/\.gitkeep$/),
    },
  );
  console.log('Drip install on ' + process.cwd() + '...');
}

export default async function init(...param) {
  const options = parseOption(...param);
  if (!fs.existsSync('.drip/')) {
    let result;
    if (options.y || options.yes) {
      result = true;
    } else {
      result = await askQuestion(
        'Are your sure install drip in current directory.'
      );
    }
    if (result) {
      await confirmInit();
    } else {
      cancelInit();
    }
  }
  finishInit();
}
