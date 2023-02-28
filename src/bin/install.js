import { execSync, } from 'child_process';
import net from 'net';
import fs from 'fs';
import path from 'path';

function requestSerial(socket, data, dataType, cb) {
  socket.write(JSON.stringify(data));
  return new Promise((resolve, reject) => {
    const buffer = [];
    socket.on('data', (data) => {
      if (typeof cb === 'function') {
        cb(data);
      }
      buffer.push(data);
    });
    socket.on('end', (data) => {
      switch (dataType) {
        case 'buffer':
          resolve(Buffer.concat(buffer));
          break;
        case 'text':
          resolve(Buffer.concat(buffer).toString());
          break;
      }
    });
    socket.on('error', (error) => {
      reject(error);
    });
    socket.on('timeout', () => {
      reject(new Error('[Error] socket connect timeout.'));
    });
  });
}

function requestOne(socket, data, dataType, cb) {
  socket.write(JSON.stringify(data));
  return new Promise((resolve, reject) => {
    const buffer = [];
    socket.on('data', (data) => {
      switch (dataType) {
        case 'buffer':
          resolve(data);
          break;
        case 'text':
          resolve(data.toString());
          break;
      }
    });
    socket.on('error', (error) => {
      reject(error);
    });
    socket.on('timeout', () => {
      reject(new Error('[Error] socket connect timeout.'));
    });
  });
}


class Socket {
  constructor() {
    let ip = '127.0.0.1';
    let port = '3002';
    if (process.env.location !== undefined) {
      const tuple = process.env.location.split(':');
      ip = tuple[0];
      port = tuple[1];
    }
    this.socket = net.connect({
      ip,
      noDelay: true,
      keepAlive: true,
      port: parseInt(port),
    });
  }

  request(data, parseType, dataType, cb) {
    const { socket, } = this;
    switch (parseType) {
      case 'serail':
        return requestSerial(socket, data, dataType, cb);
        break;
      case 'one':
        return requestOne(socket, data, dataType);
        break;
    }
  }

  end() {
    this.socket.end();
  }
}

async function installCliFromTar(tar) {
  const localPath = process.env.HOME;
  const cli = fs.openSync(path.join(localPath, 'cli.tar.gz'), 'a+');
  fs.writeSync(cli, tar);
  fs.fsyncSync(cli);
  const shells = [];
  shells.push('cd ' + localPath);
  shells.push('tar xzf cli.tar.gz');
  shells.push('rm ./cli.tar.gz');
  shells.push('mv cli .drip');
  execSync(shells.join('&&'));
}


async function install() {
  const dripDir = path.join(process.env.HOME, '.drip');
  if (fs.existsSync(dripDir)) {
    console.log(dripDir + ' is already exist.')
  } else {
    console.log('Drip installing...');
    process.stdout.moveCursor(18, -1);
    const socket = new Socket();
    const tar = await socket.request([0, 'cli'], 'serail', 'buffer');
    installCliFromTar(tar);
    const shells = [];
    shells.push('rm $HOME/.drip/package/.gitkeep');
    shells.push('rm $HOME/.drip/db/.gitkeep');
    shells.push('rm $HOME/.drip/command/.gitkeep');
    execSync(shells.join('&&'));
    console.log('\nDrip install in ' + dripDir);
  }
}

install();
