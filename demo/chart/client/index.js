import io from 'socket.io-client';
import {
  Chart,
  ms,
  format,
  bar,
  line,
  candlestick,
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
    theme: {
      text: '#B7BDC6',
    },
    chart: line.settings({
      gradient: true,
    }),
    axisRight: {
      key: 'usd',
    },
    axisBottom: {
      key: 'time',
      interval: ms('15m'),
      tickIntervalCount: 8,
      label: (value) => format(value, 'HH:mm'),
    },
  },
  '2h'  : {
    chart: candlestick,
    axisRight: {
      key: 'usd',
    },
    axisBottom: {
      key: 'time',
      interval: ms('24h'),
      tickIntervalCount: 12,
      label: (value) => format(value, 'MM/DD'),
    },   
  },
};

const canvas = document.getElementById('chart');
canvas.style.backgroundColor = '#1B1D23';
canvas.width = 500;
canvas.height = 300;

const canvas1 = document.getElementById('combination-chart');
canvas1.style.backgroundColor = '#FFFFFF';
canvas1.width = 500;
canvas1.height = 300;

const chart = new Chart(
  canvas.getContext('2d'), 
  settings[interval] || settings.time
);

const chart1 = new Chart(
  canvas1.getContext('2d'),
  {
    theme: {
      text: '#030712'
    },
    padding: {
      top: 4,
      bottom: 4,
      left: 4,
      right: 4,
    },
    axisRight: {
      range: [0, 6000],
      key: 'socket_count',
      unit: 'USD',
      width: 40,
    },
    axisLeft: {
      range: [0, 100],
      keys: ['cpu', 'memory'],
      unit: '%',
      width: 30,
    },
    axisBottom: {
      key: 'time',
      interval: 12 * ms('5s'),
      tickIntervalCount: 12,
      height: 16,
      label: (value) => format(value, 'HH:mm'),
    },
    config: [
      {
        chart: bar.settings({
          color: '#F6465D'
        }),
        key: 'socket_count',
      },
      {
        chart: line.settings({
          color: '#2DBC85',
          lineWidth: 2,
        }),
        key: 'cpu',
      },
      {
        chart: line.settings({
          lineWidth: 2,
        }),
        key: 'memory',
      }
    ],
  }
);

const $price = document.getElementById('price');

const socket = io('http://localhost:3000', {
  withCredentials: true,
});

socket.on('eth:price-history', (data) => {
  // chart.dataStash.add(data);
  // chart1.dataStash.add(data);
  
  const previous = data[data.length - 2];
  const latest = data[data.length - 1];

  $price.innerText = latest.usd;
  $price.style.color = latest.usd > previous.usd ? '#F6465D' : '#2DBC85';
});

socket.on('eth:price', (data) => {
  // chart.dataStash.add(data.latest);
  // chart1.dataStash.add(data.latest);
  $price.innerText = data.latest.usd;
  $price.style.color = data.latest.usd > data.previous.usd ? '#F6465D' : '#2DBC85';
});

chart1.draw();

fetch('http://localhost:3002/system/usage?start_line_index=800')
  .then(res => res.json())
  .then((json) => {
    chart1.dataStash.add(json.data);
  });
