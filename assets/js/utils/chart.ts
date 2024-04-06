import Chart from 'chart.js/auto';

let currentChart: Chart | null = null;

function initializeChart(chartElementId: string, chartData: number[], chartLabels: string[]) {
  const existingCanvas = document.getElementById(chartElementId);
  if (existingCanvas) {
    existingCanvas.remove();
  }

  const newCanvas = document.createElement("canvas");
  newCanvas.id = chartElementId;

  const chartContainer = document.querySelector(".chart-container");
  if (chartContainer) {
    chartContainer.appendChild(newCanvas);
  }

  const ctx = newCanvas.getContext("2d");

  if (currentChart) {
    currentChart.destroy();
  }

  if (ctx) {
    currentChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Biểu đồ doanh số",
            data: chartData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

export { initializeChart };
