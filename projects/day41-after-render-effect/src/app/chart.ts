import { Chart } from 'chart.js/auto';

export function initializeChart(canvas: HTMLCanvasElement, data: { year: number, count: number }[], backgroundColor: string) {
    return new Chart(canvas, 
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.count),
              backgroundColor,
            }
          ]
        }
      }
    );
}
