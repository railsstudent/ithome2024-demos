import { Chart } from 'chart.js/auto';

export type ChartDataType = { 
  year: number, 
  count: number 
}

export function initializeChart(canvas: HTMLCanvasElement, data: ChartDataType[], backgroundColor: string) {
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
