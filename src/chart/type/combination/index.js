const combination = (...charts) => charts.reduce((acc, chart) => {
  acc[chart.type] = chart;
  return acc;
}, {});

export { combination };