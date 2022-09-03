const calendars = document.getElementById('calendars');

for (let course in assignments) {
  const entries = assignments[course];

  const div = document.createElement('div');
  div.className = 'mb-5';
  
  const courseTitle = document.createElement('p');
  courseTitle.textContent = course;
  courseTitle.style.fontSize = '1.25rem';
  div.appendChild(courseTitle);

  const calendarContainer = document.createElement('div');
  const barWidth = 45;
  const xAxisWidth = 39;
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
  const data = {
    labels: titles,
    datasets: [{
      label: 'Weekly Sales',
      data: dueDates,
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
      //   'rgba(54, 162, 235, 0.2)',
      //   'rgba(255, 206, 86, 0.2)',
      //   'rgba(75, 192, 192, 0.2)',
      //   'rgba(153, 102, 255, 0.2)',
      //   'rgba(255, 159, 64, 0.2)',
      //   'rgba(0, 0, 0, 0.2)'
      ],
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
