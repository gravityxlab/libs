import io from 'socket.io-client';
import {
  Chart,
  CombinationChart,
  ms,
  format,
  bar,
  line,
  candlestick
} from '../../../src';
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

const settings = {
  'time': { 
    type: line,
    xAxis: {
      unit: 't',
      interval: ms('15m'),
      tickIntervalCount: 8,
      label: (value) => format(value, 'HH:mm'),
    },
    yAxis: {
      unit: 'usd',
    },
    gradient: true
  },
  '2h'  : {
    type: candlestick,
    xAxis: {
      unit: 't',
      interval: ms('24h'),
      tickIntervalCount: 12,
      label: (value) => format(value, 'MM/DD'),
    },
    yAxis: {
      unit: 'usd',
    },
  },
};

const canvas = document.getElementById('chart');
canvas.style.backgroundColor = '#1B1D23';
canvas.width = 500;
canvas.height = 300;

const canvas1 = document.getElementById('combination-chart');
canvas1.style.backgroundColor = '#1B1D23';
canvas1.width = 500;
canvas1.height = 300;

const chart = new Chart(
  canvas.getContext('2d'), 
  settings[interval] || settings.time
);

const chart1 = new Chart(
  canvas1.getContext('2d'), 
  {
    type: bar,
    color: '#F6465D',
    xAxis: {
      unit: 't',
      interval: ms('6m'),
      tickIntervalCount: 12,
      label: (value) => format(value, 'HH:mm'),
    },
    yAxis: {
      unit: 'usd',
    },
  }
);

const $price = document.getElementById('price');

const socket = io('http://localhost:3000', {
  withCredentials: true,
});

socket.on('eth:price-history', (data) => {
  chart.dataStash.set(data);
  chart1.dataStash.set(data);
  
  const previous = data[data.length - 2];
  const latest = data[data.length - 1];

  $price.innerText = latest.usd;
  $price.style.color = latest.usd > previous.usd ? '#F6465D' : '#2DBC85';
});

socket.on('eth:price', (data) => {
  chart.dataStash.add(data.latest);
  chart1.dataStash.add(data.latest);
  $price.innerText = data.latest.usd;
  $price.style.color = data.latest.usd > data.previous.usd ? '#F6465D' : '#2DBC85';
});
