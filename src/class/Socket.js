import net from 'net';
import global from '~/obj/global';

function requestSerial(socket, data, dataType) {
  socket.write(JSON.stringify(data));
  return new Promise((resolve, reject) => {
    const buffer = [];
    socket.on('data', (data) => {
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

function requestOne(socket, data, dataType) {
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
    const [ip, port] = global.location.split(':');
    this.socket = net.connect({
      ip,
      noDelay: true,
      keepAlive: true,
      port: parseInt(port),
    });
  }

  request(data, parseType, dataType) {
    const { socket, } = this;
    switch (parseType) {
      case 'serail':
        return requestSerial(socket, data, dataType);
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

export default Socket;
