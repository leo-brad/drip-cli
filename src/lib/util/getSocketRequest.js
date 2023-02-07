export default async function getSocketResponse(request) {
  const socket = net.connect(3001, '127.0.0.1');
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
