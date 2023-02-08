import global from '~/obj/global';

class Socket {
  constructor() {
    const [ip, port] = global.location.split(':');
    this.socket = net.connect(parseInt(port), ip);
  }

  request(data) {
    const { socket, } = this;
    socket.write(data);
    return new Promise((resolve, reject) => {
      socket.on('data', (data) => {
        resolve(data.toString());
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
