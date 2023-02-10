import path from 'path';
import fs from 'fs';

export default function copyIgnore(src, dest, regexp) {
  fs.readdirSync(src).forEach((p) => {
    const fullPath = path.resolve(src, p);
    if (!regexp.test(p)) {
      if (fs.statSync(fullPath).isDirectory()) {
        fs.cpSync(fullPath, path.join(dest, p));
      } else {
        fs.copyFileSync(fullPath, path.join(dest, p));
      }
    }
  });
}
