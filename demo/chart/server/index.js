const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');


const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST'],
  credentials: true,
}

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions
});

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  const webpackDevServer = require('../webpack-dev-server.js');
  webpackDevServer(app);
} else {
  app.use(express.static('dist'));
}

const db = { 
  data: [
    {
      "t": 1725525000001,
      "usd": 2411.32,
      "cpu": 50,
      "memory": 40,
    },
    {
      "t": 1725525090001,
      "usd": 2415.32,
      "cpu": 50,
      "memory": 40,
    }
  ]
};

io.on('connection', (socket) => {
  socket.emit('eth:price-history', db.data);
});

const tickRate = 50;
const sendPrice = () => {
  const previous = db.data[db.data.length - 1];

  const latest = {
    t: previous.t + 30_000,
    usd: previous.usd + Math.floor(Math.random() * 21) - 10,
    cpu: Math.max(Math.min(previous.cpu + Math.floor(Math.random() * 5) - 2, 100), 40),
    memory: Math.max(Math.min(previous.memory + Math.floor(Math.random() * 5) - 2, 100), 40),
  };

  db.data.push(latest);
  io.emit('eth:price', {
    latest,
    previous,
  });
  
  setTimeout(sendPrice, tickRate);
};

sendPrice();

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});


