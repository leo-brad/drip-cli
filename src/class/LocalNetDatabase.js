import fs from 'fs';
import path from 'path';

function checkPkgPath(pkgPath) {
  if (!fs.existsSync(pkgPath)) {
    fs.mkdirSync(pkgPath);
  }
}

class LocalNetDatabase {
  constructor() {
    const dbPath = path.join(process.env.HOME, '.drip', 'db', 'local-net');
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath);
    }
    this.dbPath = dbPath;
  }

  empty() {
    const { dbPath, } = this;
    if (fs.existsSync(dbPath)) {
      fs.rmSync(dbPath, { recursive: true, });
    }
  }

  add(pkg, tag) {
    const { dbPath, } = this;
    const pkgPath = path.join(dbPath, pkg);
    checkPkgPath(pkgPath);
    const tagPath = path.join(pkgPath, tag);
    if (!fs.existsSync(tagPath)) {
      fs.writeFileSync(tagPath, Buffer.from(String(1)));
    } else {
      let count = parseInt(fs.readFileSync(pkgPath).toString());
      count += 1;
      fs.writeFileSync(tagPath, Buffer.from(String(count)));
    }
  }

  plus(pkg, tag) {
    const { dbPath, } = this;
    const pkgPath = path.join(dbPath, pkg);
    checkPkgPath(pkgPath);
    const tagPath = path.join(pkgPath, tag);
    if (!fs.existsSync(tagPath)) {
      fs.writeFileSync(tagPath, Buffer.from(String(1)));
    } else {
      let count = parseInt(fs.readFileSync(tagPath).toString());
      count -= 1;
      fs.writeFileSync(tagPath, Buffer.from(String(count)));
    }
  }

  get(pkg, tag) {
    const { dbPath, } = this;
    const pkgPath = path.join(dbPath, pkg);
    checkPkgPath(pkgPath);
    const tagPath = path.join(pkgPath, tag);
    let count = 0;
    if (fs.existsSync(tagPath)) {
      count = parseInt(fs.readFileSync(tagPath).toString());
    }
    return count;
  }

  clear(pkg) {
    const { dbPath, } = this;
    const pkgPath = path.join(dbPath, pkg);
    if (fs.existsSync(pkgPath)) {
      fs.rmSync(pkgPath, { recursive: true, });
    }
  }
}

export default LocalNetDatabase;
