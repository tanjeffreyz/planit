const calendars = document.getElementById('calendars');
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

for (const [i, courseName] of Object.entries(Object.keys(assignments))) {
  const entries = assignments[courseName];

  const div = document.createElement('div');
  div.className = 'mb-5';
  
  const courseTitle = document.createElement('p');
  courseTitle.textContent = courseName;
  courseTitle.style.fontSize = '1.25rem';
  div.appendChild(courseTitle);

  const calendarContainer = document.createElement('div');
  calendarContainer.style.height = `${entries.length * barWidth + xAxisWidth}px`;

  const canvas = document.createElement('canvas');
  calendarContainer.appendChild(canvas);

  div.appendChild(calendarContainer);
  calendars.appendChild(div);

  // Prepare data
  const titles = [];
  const dueDates = [];
  for (let entry of entries) {
    titles.push(entry.title);
    dueDates.push(7);
  }
  
  // Display barchart of assignments
  const color = colors[i % colors.length];
  const data = {
    labels: titles,
    datasets: [{
      label: 'Weekly Sales',
      data: dueDates,
      backgroundColor: [`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`],
      borderColor: [`rgba(${color[0]}, ${color[1]}, ${color[2]}, 1.0)`],
      // borderColor: [
      //   'rgba(255, 26, 104, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)',
      //   'rgba(0, 0, 0, 1)'
      // ],
      borderWidth: 1,
      // barThickness: 33,
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
