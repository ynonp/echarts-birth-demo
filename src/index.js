import data from './births.json';
import _ from 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm'

window.data = data;
const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var app = {};
var option;
console.log(_.random(10))
const dataByMonth = _.chain(data).groupBy('mother_age').mapValues(
  row => _.chain(row).groupBy('birth_month').mapValues(v => v.length).value()
).value()

const series = _.toPairs(dataByMonth).map(([mother_age, entries]) => ({
    name: mother_age,
    type: "bar",
    stack: "total",
    label: {
      show: true,
    },
    emphasis: {
      focus: "series",
    },
    data: Object.values(entries),
  })
)
window.data = dataByMonth;

option = {
  tooltip: {
    trigger: "axis",    
    axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {},
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: Object.values(months),
  },
  series: series,
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
