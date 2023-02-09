import net from 'net';
import global from '~/obj/global';

class Socket {
  constructor() {
    const [ip, port] = global.location.split(':');
    this.socket = net.connect(parseInt(port), ip);
  }

  request(data, type) {
    const { socket, } = this;
    socket.write(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      socket.on('data', (data) => {
        switch (type) {
          case 'buffer':
            resolve(data);
            break;
          default:
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

  end() {
    this.socket.end();
  }
}

export default Socket;
