import * as readline from 'readline/promises';
import { stdin as input, stdout as output, } from 'process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

function initalCapital(string) {
  return string.substring(0, 1).toUpperCase() + string.substring(1, string.length);
}

export default async function create(...param) {
  const rl = readline.createInterface({ input, output, });
  const name = await rl.question(chalk.bold('Name of new drip package project?\n'));
  rl.close();
  const templatePath = path.resolve('.', 'drip-package-' + name);
  fs.cpSync(
    path.join(process.env.HOME, '.drip', 'asset', 'drip-package-template'),
    templatePath, { recursive: true, },
  );
  fs.writeFileSync(path.join(templatePath, 'package.json'), [
    '{',
    '  "name": "drip-package-' + name + '",',
    '  "version": "1.0.0",',
    '  "description": "A drip ' + name + ' package.",',
    '  "main": "index.js",',
    '  "scripts": {',
    '  "build": "gulp build",',
    '    "run": "yarn run build && node dist/index.js",',
    '    "dev": "webpack serve --config webpack.config.dev.js",',
    '    "pro": "webpack --config webpack.config.pro.js",',
    '    "lint": "eslint ./src"',
    '  },',
    '  "dependencies": {',
    '    "@babel/preset-react": "^7.16.7",',
    '    "@fortawesome/fontawesome-free": "^5.15.4",',
    '    "react": "18.2.0",',
    '    "react-dom": "18.2.0"',
    '  },',
    '  "devDependencies": {',
    '    "@babel/cli": "^7.16.7",',
    '    "@babel/core": "^7.16.7",',
    '    "@babel/preset-env": "^7.16.7",',
    '    "@babel/register": "^7.18.9",',
    '    "autoprefixer": "^10.4.1",',
    '    "babel-cli": "^6.26.0",',
    '    "babel-loader": "^8.2.3",',
    '    "babel-plugin-root-import": "^6.6.0",',
    '    "css-loader": "^6.5.1",',
    '    "eslint": "^8.6.0",',
    '    "eslint-plugin-import": "^2.25.4",',
    '    "eslint-plugin-react": "^7.28.0",',
    '    "file-loader": "^6.2.0",',
    '    "gulp": "^4.0.2",',
    '    "gulp-babel": "^8.0.0",',
    '    "html-webpack-plugin": "^5.5.0",',
    '    "jest": "^27.4.5",',
    '    "normalize.css": "^8.0.1",',
    '    "postcss": "^8.4.5",',
    '    "postcss-loader": "^6.2.1",',
    '    "style-loader": "^3.3.1",',
    '    "sugarss": "^4.0.1",',
    '    "webpack": "^5.65.0",',
    '    "webpack-cli": "^4.9.1",',
    '    "webpack-dev-server": "^4.7.2"',
    '  }',
    '}',
  ].join('\n'));
  fs.mkdirSync(
    path.join(
      templatePath,
      path.join('src', 'render', 'script', 'component', initalCapital(name))
    )
  );
  fs.writeFileSync(
    path.join(
      templatePath,
      path.join('src', 'render', 'script', 'component', initalCapital(name), 'index.js')
    ), [
    `import React from 'react';`,
    `import ReactDOM from 'react-dom/client';`,
    `import OfflineResize from '~/render/script/component/OfflineResize';`,
    ``,
    `class ` + initalCapital(name) + ` extends OfflineResize {`,
    `}`,
    ``,
    `export default Node;`,
  ].join('\n'));
  fs.writeFileSync(
    path.join(templatePath, path.join('src', 'render', 'index.js')
    ), [
      `import Node from '~/render/script/component/` + initalCapital(name) + `';`,
      ``,
      `window.module = {`,
      `  name: '` + name + `',`,
      `  exports: ` + initalCapital(name) + `,`,
      `};`,
  ].join('\n'));
  fs.writeFileSync(path.join(templatePath, path.join('src', 'render', 'dev.js')), [
    `import '~/render/style/index.css';`,
    `import ReactDOM from 'react-dom/client';`,
    `import React from 'react';`,
    `import ` + initalCapital(name) + ` from '~/render/script/component/` + initalCapital(name) + `';`,
    `import Emitter from '~/render/script/class/Emitter';`,
    ``,
    `const data = [];`,
    `const emitter = new Emitter();`,
    `const share = {`,
    `  focus: true,`,
    `  emitter,`,
    `};`,
    ``,
    `const root = ReactDOM.createRoot(document.getElementById('root'));`,
    `root.render(<` + initalCapital(name) + ` instance="[` + name + `]:` + name + `1" data={data} share={share} />);`,
  ].join('\n'));
  console.log(chalk.bold('Project drip-package-' + name + ' init successful') + '...');
}
