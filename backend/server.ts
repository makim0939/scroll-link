import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();
server.listen(3000, () => console.log('Server running on port 3000'));

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://192.168.10.103:5173',
      'http://10.14.1.137:5173',
      'http://10.14.1.137:5174',
    ],
  },
});

type ClientInfo = {
  id: string;
};
const users = new Map<string, ClientInfo>();
let display: ClientInfo;

io.on('connection', (socket) => {
  console.log('User connected', socket.client.request.headers.origin);
  if (socket.client.request.headers.origin === 'http://localhost:5173') {
    users.set(socket.id, { id: socket.id });
  } else {
    display = { id: socket.id };
  }
  socket.on('scroll', (scrollY) => {
    console.log(scrollY);
    socket.to(display.id).emit('scroll', scrollY);
  });
});
