let currentChart = null;

function initializeChart(chartElementId, chartData, chartLabels) {
  const existingCanvas = document.getElementById(chartElementId);
  if (existingCanvas) {
    existingCanvas.remove();
  }

  const newCanvas = document.createElement("canvas");
  newCanvas.id = chartElementId;

  document.querySelector(".chart-container").appendChild(newCanvas);

  const ctx = newCanvas.getContext("2d");

  if (currentChart) {
    currentChart.destroy();
  }

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

export { initializeChart };
