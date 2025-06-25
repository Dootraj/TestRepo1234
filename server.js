const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;

let currentTemp = 28;
let currentHumidity = 70;
let irrigationStatus = 'OFF';

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('🟢 Client connected');

  socket.emit('sensor-data', {
    temperature: currentTemp,
    humidity: currentHumidity,
    irrigation: irrigationStatus
  });

  socket.on('toggle-irrigation', () => {
    irrigationStatus = irrigationStatus === 'ON' ? 'OFF' : 'ON';
    io.emit('irrigation-updated', irrigationStatus);
    console.log(`🚿 Irrigation is now ${irrigationStatus}`);
  });

  setInterval(() => {
    currentTemp = 25 + Math.floor(Math.random() * 6);
    currentHumidity = 60 + Math.floor(Math.random() * 15);
    io.emit('sensor-data', {
      temperature: currentTemp,
      humidity: currentHumidity,
      irrigation: irrigationStatus
    });
  }, 5000);
});

http.listen(PORT, () => {
  console.log(`🚀 Dashboard running at http://localhost:${PORT}`);
});