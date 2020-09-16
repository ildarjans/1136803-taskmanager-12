import flatpickr from 'flatpickr';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import {
  getCurrentDate,
  getDateWeekBefore,
  sortTasksAscOrder
} from '../utils/tasks.js';
import {
  countTasksInDateRange,
  getUniqItems,
  countTasksForEachColor,
  convertColorNamesToHEX,
  getFormatedUniqTaskDates,
  countTasksForEachDate,
  filterTasksInDateRange,
  parseFormatedDates
} from '../utils/stats.js';

function createStatsTemplate(data) {
  const {tasks, dateFrom, dateTo} = data;
  const countTasks = countTasksInDateRange(tasks, dateFrom, dateTo);
  return (
    `<section class="statistic container">
      <div class="statistic__line">
        <div class="statistic__period">
          <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

          <div class="statistic-input-wrap">
            <input
              class="statistic__period-input"
              type="text"
              placeholder="01 Feb - 08 Feb"
            />
          </div>

          <p class="statistic__period-result">
            In total for the specified period
            <span class="statistic__task-found">${countTasks}</span> tasks were fulfilled.
          </p>
        </div>
        <div class="statistic__line-graphic">
          <canvas class="statistic__days" width="550" height="150"></canvas>
        </div>
      </div>

      <div class="statistic__circle">
        <div class="statistic__colors-wrap">
          <canvas class="statistic__colors" width="400" height="300"></canvas>
        </div>
      </div>
    </section>`
  );
}

function renderDaysChart(dayCtx, tasks, dateFrom, dateTo) {
  const tasksInDateRange = filterTasksInDateRange(tasks, dateFrom, dateTo);
  const sortedTasks = tasksInDateRange.sort(sortTasksAscOrder);
  const tasksDueDates = sortedTasks.map((task) => task.dueDate);
  const uniqDates = getFormatedUniqTaskDates(tasksDueDates);
  const countedTasksByDate = countTasksForEachDate(parseFormatedDates(uniqDates), sortedTasks);
  return new Chart(dayCtx, {
    plugins: [ChartDataLabels],
    type: `line`,
    data: {
      labels: uniqDates, // Сюда нужно передать названия дней
      datasets: [{
        data: countedTasksByDate, // Сюда нужно передать в том же порядке количество задач по каждому дню
        backgroundColor: `transparent`,
        borderColor: `#000000`,
        borderWidth: 1,
        lineTension: 0,
        pointRadius: 8,
        pointHoverRadius: 8,
        pointBackgroundColor: `#000000`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 8
          },
          color: `#ffffff`
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: false
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            fontStyle: `bold`,
            fontColor: `#000000`
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          top: 10
        }
      },
      tooltips: {
        enabled: false
      }
    }
  });
}

function renderColorsChart(colorCtx, tasks) {
  const allColors = tasks.map((task) => task.color);
  const uniqColors = getUniqItems(allColors);
  const countedTasksByColors = countTasksForEachColor(uniqColors, tasks);
  const uniqHEXColors = convertColorNamesToHEX(uniqColors);
  return new Chart(colorCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: uniqColors,
      datasets: [{
        data: countedTasksByColors,
        backgroundColor: uniqHEXColors
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
}

export default class StatsView extends SmartView {
  constructor(tasks) {
    super();
    this._data = this._convertTaskToData(tasks);
    this._datepicker = null;
    this._dayChart = null;
    this._colorChart = null;

    this._changeDataHandler = this._changeDataHandler.bind(this);
  }

  init(tasks) {
    this._data = this._convertTaskToData(tasks);
    this.restoreHandlers();
  }

  resetElement() {
    super.resetElement();

    if (this._dayChart || this._colorChart) {
      this._dayChart = null;
      this._colorChart = null;
    }

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  restoreHandlers() {
    this._setDatepicker();
    this._setCharts();
  }

  _convertTaskToData(tasks) {
    const dateTo = getCurrentDate();
    const dateFrom = getDateWeekBefore(dateTo);
    return {tasks, dateFrom, dateTo};
  }

  _changeDataHandler([dateFrom, dateTo]) {
    if (!dateFrom || !dateTo) {
      return;
    }

    this.updateData({
      dateFrom,
      dateTo
    });
  }

  _getTemplate() {
    return createStatsTemplate(this._data);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
        this.getElement()
          .querySelector(`.statistic__period-input`),
        {
          mode: `range`,
          dateFormat: `j F`,
          defaultDate: [this._data.dateFrom, this._data.dateTo],
          onChange: this._changeDataHandler,
        }
    );
  }

  _setCharts() {
    if (this._dayChart || this._colorChart) {
      this._dayChart = null;
      this._colorChart = null;
    }

    const {tasks, dateFrom, dateTo} = this._data;
    const colorCxt = this.getElement().querySelector(`.statistic__colors`).getContext(`2d`);
    const dayCxt = this.getElement().querySelector(`.statistic__days`).getContext(`2d`);

    this._colorChart = renderColorsChart(colorCxt, tasks);
    this._dayChart = renderDaysChart(dayCxt, tasks, dateFrom, dateTo);

  }
}
