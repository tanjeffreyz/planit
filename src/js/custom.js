/////////////////////
//    Constants    //
/////////////////////
const BAR_WIDTH = 45;
const X_AXIS_HEIGHT = 39;
const Y_AXIS_WIDTH = 12;
const COLORS = [
  [54, 162, 235],
  [255, 206, 86],
  [75, 192, 192],
  [153, 102, 255],
  [255, 159, 64]
];
const CALENDARS = document.getElementById('calendars');
const charts = [];


////////////////////////////
//    Global Variables    //
////////////////////////////
let parsedAssignments = [];
let numDays = 7;
let reference = getToday();


////////////////////////////
//    Helper Functions    //
////////////////////////////
function getStartOfWeek() {
  const startOfWeek = new Date();      // This week's Monday at 12:00 AM
  const day = startOfWeek.getDay() || 7;
  if (day !== 1) {
    startOfWeek.setHours(-24 * (day - 1));
  } else {
    startOfWeek.setHours(0);
  }
  startOfWeek.setMinutes(0);
  startOfWeek.setSeconds(0);
  return startOfWeek;
}

function getToday() {
  const today = new Date();     // Today at 12:00 AM
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  return today;
}

function msToDays(ms) {
  return ms / (1000 * 60 * 60 * 24);
}

function getCalendarContainerId(i) {
  return `chart-container-${i}`;
}

function calendarHeightForEntries(presentEntries) {
  return Math.max(presentEntries.length, 1) * BAR_WIDTH + X_AXIS_HEIGHT;
}

function formatDaysHours(days, hours) {
  const plural = (value) => (value !== 1 ? 's' : '');
  let result = '';
  if (days > 0) {
    result += `${days} day${plural(days)}`;
  }
  if (hours > 0) {
    if (days > 0) {
      result += ', ';
    }
    if (hours >= 1) {
      const value = Math.floor(hours);
      result += `${value} hour${plural(value)}`;
    } else {
      const value = Math.floor(60 * hours);
      result += `${value} minute${plural(value)}`;
    }
  }
  return result;
}

function updateParsedAssignments() {
  parsedAssignments = [];
  for (const [i, courseName] of Object.entries(Object.keys(assignments))) {
    const entries = assignments[courseName];    // Get assignment list for this course

    const presentEntries = [];    // List of assignments that are due on or after today
    const titles = [];
    const dueDates = [];
    const backgroundColors = [];
    const borderColors = [];
    const color = COLORS[i % COLORS.length];
    const background = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`;
    const border = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1.0)`;
    const inactiveBackground = `rgba(0, 0, 0, 0.05)`;
    for (let entry of entries) {
      const dueDate = new Date(entry.dueDate);
      const daysFromReference = msToDays(dueDate - reference);
      if (daysFromReference > 0) {
        presentEntries.push(entry);
        titles.push(entry.title);
        dueDates.push(Math.min(daysFromReference, numDays));
        if (!entry.submitted) {
          if (daysFromReference > numDays) {
            // No border for assignments that extend past display window
            backgroundColors.push(background);
            borderColors.push(background);
          } else {
            backgroundColors.push(background);
            borderColors.push(border);
          }
        } else {
          backgroundColors.push(inactiveBackground);
          borderColors.push(inactiveBackground);
        }
      }
    }
    parsedAssignments.push({
      presentEntries, 
      titles, 
      dueDates, 
      backgroundColors, 
      borderColors
    });
  }
}


///////////////////////
//    Main Script    //
///////////////////////
function init() {
  updateParsedAssignments();
  for (const [i, courseName] of Object.entries(Object.keys(assignments))) {
    // Parse data
    const { presentEntries, titles, dueDates, backgroundColors, borderColors } = parsedAssignments[i];

    // Prepare HTML for charts
    const div = document.createElement('div');
    div.className = 'mb-5';
    
    const courseTitle = document.createElement('p');
    courseTitle.textContent = courseName;
    courseTitle.style.fontSize = '1.25rem';
    div.appendChild(courseTitle);

    const calendarContainer = document.createElement('div');
    calendarContainer.id = getCalendarContainerId(i);
    calendarContainer.style.height = `${calendarHeightForEntries(presentEntries)}px`;
    calendarContainer.style.marginRight = `${Y_AXIS_WIDTH}px`;

    const canvas = document.createElement('canvas');
    calendarContainer.appendChild(canvas);

    div.appendChild(calendarContainer);
    CALENDARS.appendChild(div);

    // Display barchart of assignments
    const data = {
      labels: titles,
      datasets: [{
        label: 'Days Left',
        data: dueDates,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 1.0
      }]
    };

    const config = {
      type: 'bar',
      data,
      options: {
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            max: numDays,
            grid: {
              drawBorder: false
            },
            ticks: {
              autoSkip: false,
              align: 'end',
              callback: (val, i) => {
                const date = new Date(getToday().getTime());
                date.setHours(24 * (i - 1));
                const dateString = date.toLocaleDateString('en-us', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                });
                return i > 0 ? dateString : '';
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              mirror: true
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          annotation: {
            annotations: {
              now: {
                yMin: -1,       // Left-aligns all vertical axes!
                borderColor: 'rgb(0, 0, 0, 0)',
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const presentEntries = parsedAssignments[i].presentEntries;
                const date = new Date(presentEntries[context.dataIndex].dueDate);
                const diff = msToDays(date - (new Date()));

                // Display time remaining
                if (diff <= 0) {
                  return 'Due date has passed';
                } else {
                  const days = Math.floor(diff);
                  const hours = 24 * (diff - days);
                  return formatDaysHours(days, hours) + ' left';
                }
              },
              afterLabel: (context) => {
                const presentEntries = parsedAssignments[i].presentEntries;
                const date = new Date(presentEntries[context.dataIndex].dueDate);
                const dateString = date.toLocaleDateString('en-us', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                });
                const timeString = date.toLocaleTimeString('en-us', {
                  hour: 'numeric',
                  minute: '2-digit'
                });
                return `${dateString} @ ${timeString}`;
              }
            }
          }
        }
      },
      plugins: [
        {
          id: 'drawNowAnnotation',
          beforeDraw: (chart) => {
            const now = new Date();
            reference = getToday();
            const daysToDueDate = msToDays(now - reference);

            // Draw transparent red box to indicate elapsed time
            const ctx = chart.ctx;
            const xAxis = chart.scales.x;
            const yAxis = chart.scales.y;
            const tickWidth = xAxis.getPixelForTick(1) - xAxis.getPixelForTick(0);
            ctx.fillStyle = 'rgb(255, 0, 0, 0.1)';
            ctx.fillRect(yAxis.right, yAxis.top, tickWidth * daysToDueDate, yAxis.bottom - yAxis.top);
          }
        },
        {
          id: 'centerAlignLabels',
          beforeDraw: (chart) => {
            const tickTolerance = 10;
            const xAxis = chart.scales.x;
            chart.tickWidth = xAxis.getPixelForTick(1) - xAxis.getPixelForTick(0);

            // Find width of widest label
            let largestLabelWidth = 0;
            Chart.helpers.each(xAxis.ticks, function(tick) {
              largestLabelWidth = Math.max(chart.ctx.measureText(tick.label).width);
            });

            // Use default label behavior if centered horizontal label too wide for gap
            if (largestLabelWidth < chart.tickWidth - tickTolerance) {
              xAxis.options.ticks.display = false;
              chart.isWide = true;
            } else {
              chart.isWide = false;
            }
          },
          afterDraw: (chart) => {
            const xAxis = chart.scales.x;
            if (chart.isWide) {
              const yPadding = 18;
              const ctx = chart.ctx;
              Chart.helpers.each(xAxis.ticks, function(tick, index) {
                const xPos = xAxis.getPixelForTick(index);
                const yPos = xAxis.top;
                
                // Draw centered label
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
                ctx.fillText(tick.label, xPos - (chart.tickWidth / 2.0), yPos + yPadding);
              });
            }
            xAxis.options.ticks.display = true;
          }
        }
      ]
    };

    const chart = new Chart(
      canvas,
      config
    );

    // Visit link to assignment on click
    canvas.onclick = (e) => {
      const options = {
        intersect: true, 
        axis: 'y'
      };
      const points = chart.getElementsAtEventForMode(e, 'nearest', options, true);
      if (points.length > 0) {
        const point = points[0];
        const presentEntries = parsedAssignments[i].presentEntries;
        window.open(presentEntries[point.index].link, '_blank').focus();
      }
    };
    charts.push(chart);
    // console.log(canvas.clientHeight - chart.chartArea.height);     // Calculate height of x-axis labels
  }
}


function refresh(recurse=false) {
  // Update reference
  reference = getToday();

  // Display current time
  const now = new Date();
  const dateString = now.toLocaleDateString('en-us', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  const timeString = now.toLocaleTimeString('en-us', {
    hour: 'numeric',
    minute: '2-digit'
  });
  document.getElementById('now').textContent = `${dateString} - ${timeString}`;

  // Refresh charts
  updateParsedAssignments();
  for (let i = 0; i < charts.length; i++) {
    const { presentEntries, titles, dueDates, backgroundColors, borderColors } = parsedAssignments[i];
    const chart = charts[i];

    // Update data
    chart.data.labels = titles;
    const dataset = chart.data.datasets[0];
    dataset.data = dueDates;
    dataset.backgroundColor = backgroundColors;
    dataset.borderColor = borderColors;

    // Don't show y-axis ticks if no assignments
    const yTicks = chart.options.scales.y.ticks;
    if (presentEntries.length > 0) {
      delete yTicks.callback;
    } else {
      yTicks.callback = (val, i) => '';
    }

    // Update calendar height
    const calendarContainer = document.getElementById(getCalendarContainerId(i));
    calendarContainer.style.height = `${calendarHeightForEntries(presentEntries)}px`;

    chart.update();
  }

  console.log('Refreshed');
  if (recurse) {
    setTimeout(() => refresh(recurse), 1000);
  }
}


// Generate charts and periodically refresh
init();
refresh(recurse=true);
