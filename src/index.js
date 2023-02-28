import { spawn, } from 'child_process';
import fs from 'fs';
import path from 'path';
import parseConfig from '~/lib/util/parseConfig';

const local = parseConfig('./asset/.drip/local/config');
const project = parseConfig('./asset/.drip/project/config');
const config = { ...project, ...local,  };
const localPath = path.join(process.env.HOME, '.drip', 'command', 'local');
//if (fs.existsSync(localPath)) {
  //process.chdir(localPath);
  //spawn(
    //'npx',
    //['electron', 'dist/main.js', JSON.stringify(config), '/tmp/example/'],
    //{ detached: true, },
  //);
//}
