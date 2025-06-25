const socket = io();

socket.on('sensor-data', data => {
  document.getElementById('temp').textContent = `${data.temperature} °C`;
  document.getElementById('humidity').textContent = `${data.humidity} %`;
  document.getElementById('irrigation').textContent = data.irrigation;
});

socket.on('irrigation-updated', status => {
  document.getElementById('irrigation').textContent = status;
});

function toggleIrrigation() {
  socket.emit('toggle-irrigation');
}