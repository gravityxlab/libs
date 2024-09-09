import io from 'socket.io-client';
import Chart, { CHART_TYPE } from '../../../src/chart/Chart';
import './index.css';

const search = new URLSearchParams(window.location.search);
const interval = search.get('interval');

if (!interval) {
  window.location.href = `${window.location.origin}/?interval=time`;
}

const option = document.querySelector(`[data-interval="${interval}"]`) || document.querySelector('[data-interval="time"]');
option.style.opacity = 1;

Array.from(document.getElementsByTagName('button')).forEach((button) => {
  button.onclick = () => {
    window.location.href = `${window.location.origin}/?interval=${button.getAttribute('data-interval')}`;
  };
});

const chart = new Chart({
  id: 'canvas',
  width: 500,
  height: 300,
  x: 't',
  y: 'usd',
  type: CHART_TYPE.LINE,
});

const $price = document.getElementById('price');

const socket = io('http://localhost:3000', {
  withCredentials: true,
});

socket.on('eth:price-history', (data) => {
  chart.dataStash.set(data);
  const previous = data[data.length - 2];
  const latest = data[data.length - 1];

  $price.innerText = latest.usd;
  $price.style.color = latest.usd > previous.usd ? '#2DBC85' : '#F6465D';
});

socket.on('eth:price', (data) => {
  chart.dataStash.add(data.latest);
  $price.innerText = data.latest.usd;
  $price.style.color = data.latest.usd > data.previous.usd ? '#2DBC85' : '#F6465D';
});
