import io from 'socket.io-client';
import Chart from '../../src/chart/renderer';
import './index.css';

const chart = new Chart({
  id: 'canvas',
  width: 500,
  height: 300,
  x: 't',
  y: 'usd',
  type: 'line',
});

const $price = document.getElementById('price');

const socket = io('http://localhost:3000', {
  withCredentials: true,
});

socket.on('eth:price-history', (data) => {
  chart.data = data;
  const previous = data[data.length - 2];
  const latest = data[data.length - 1];

  $price.innerText = latest.usd;
  $price.style.color = latest.usd > previous.usd ? '#2DBC85' : '#F6465D';
});

socket.on('eth:price', (data) => {
  chart.data = [...chart._data, data.latest];
  $price.innerText = data.latest.usd;
  $price.style.color = data.latest.usd > data.previous.usd ? '#2DBC85' : '#F6465D';
});
