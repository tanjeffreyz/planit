const barWidth = 45;
const xAxisWidth = 39;
const colors = [
  [255, 26, 104],
  [54, 162, 235],
  [255, 206, 86],
  [75, 192, 192],
  [153, 102, 255],
  [255, 159, 64],
  [0, 0, 0]
];

const calendars = document.getElementById('calendars');

////////////////////////////
//    Helper Functions    //
////////////////////////////
const msToDays = (ms) => {
  return ms / (1000 * 60 * 60 * 24);
}


////////////////////////
//    Main Function   //
////////////////////////
function main(numDays, reference) {
  calendars.innerHTML = '';
  for (const [i, courseName] of Object.entries(Object.keys(assignments))) {
    // Get assignment list for this course
    const entries = assignments[courseName];

    // Prepare data
    const titles = [];
    const dueDates = [];
    const backgroundColors = [];
    const borderColors = [];
    const color = colors[i % colors.length];
    const background = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`;
    const border = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1.0)`;
    const inactiveBackground = `rgba(0, 0, 0, 0.2)`;
    const inactiveBorder = `rgba(0, 0, 0, 0.5)`;
    for (let entry of entries) {
      const dueDate = new Date(entry.dueDate);
      const daysFromReference = msToDays(dueDate - reference);
      if (daysFromReference > 0) {
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
          borderColors.push(inactiveBorder);
        }
      }
    }

    // Prepare HTML for charts
    const div = document.createElement('div');
    div.className = 'mb-5';
    
    const courseTitle = document.createElement('p');
    courseTitle.textContent = courseName;
    courseTitle.style.fontSize = '1.25rem';
    div.appendChild(courseTitle);

    const calendarContainer = document.createElement('div');
    calendarContainer.style.height = `${titles.length * barWidth + xAxisWidth}px`;

    const canvas = document.createElement('canvas');
    calendarContainer.appendChild(canvas);

    div.appendChild(calendarContainer);
    calendars.appendChild(div);

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
            grid: {
              drawBorder: false
            },
            max: numDays
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
          }
        }
      }
    };

    const chart = new Chart(
      canvas,
      config
    );
    // console.log(canvas.clientHeight - chart.chartArea.height);     // Calculate height of x-axis labels
  }
}


////////////////////
//  Main Script   //
////////////////////
const startOfWeek = new Date();   // This week's Monday at 12:00 AM
const day = startOfWeek.getDay() || 7;
if (day !== 1) {
  startOfWeek.setHours(-24 * (day - 1));
} else {
  startOfWeek.setHours(0);
}
startOfWeek.setMinutes(0);
startOfWeek.setSeconds(0);
console.log(startOfWeek);

const today = new Date();     // Today at 12:00 AM
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);

// Run main function
main(7, today);
