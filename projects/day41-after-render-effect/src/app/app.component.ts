import { afterNextRender, afterRenderEffect, ChangeDetectionStrategy, Component, computed, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { initializeChart } from './chart';
import { genChartData } from './generate-chart-data';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <h1>Hello from AfterRenderEffect!</h1>
    <div style="width: 400px;">
      <div>
        <label>
          Bar Color:
          <select [(ngModel)]="barColor">
            @for (c of barColors(); track c.id) {
              <option [value]="c.id">{{ c.color }}</option>
            }
          </select>
        </label>
      </div>
      <div>
        <label>
          Number of bars:
          <input type="number" [(ngModel)]="numBars" min="1" max="10" />
        </label>
      </div>
      <canvas #canvas></canvas>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  chart: Chart | null = null;
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas')
  nativeElement = computed(() => this.canvas().nativeElement);

  barColors = signal([
    { id: 'red', color: 'Red' },
    { id: 'pink', color: 'Pink' },
    { id: 'magenta', color: 'Magenta' },
    { id: 'rebeccapurple', color: 'Rebecca Purple' },
    { id: 'cyan', color: 'Cyan' },
    { id: 'blue', color: 'Blue' },
    { id: 'green', color: 'Green' },
    { id: 'yellow', color: 'Yellow' }
  ]);

  data = signal([
    { year: 2022, count: 30 },
    { year: 2023, count: 4 },
  ]);

  barColor = signal('red');
  numBars = signal(0);
  chartData = genChartData(this.numBars);
  
  constructor() {
    afterNextRender({
      write: () => {
        console.log('afterNextRender write is called');
        this.chart = initializeChart(this.nativeElement(), this.data(), this.barColor());
      }
    });

    afterRenderEffect({
      write: () => {
        console.log('write is called');

        const chartData = this.chart?.data;
        const data = this.chartData();
        if (data && chartData) {
          const { year, count } = data;

          // the timer restarts, we need to redraw the chart
          if (year === 2024) {
            chartData.labels = this.data().map(row => row.year);
            chartData.datasets[0].data = this.data().map(row => row.count);
          } 

          chartData.labels?.push(year);
          chartData.datasets.forEach((dataset) => dataset.data.push(count));
          this.chart?.update();
        }

        return chartData;
      }
    }); 

    afterRenderEffect({
      write: () => {
        console.log('write barColor is called');

        this.chart?.data.datasets.forEach((dataset) => dataset.backgroundColor = this.barColor());
        this.chart?.update();
        return this.barColor();
      }
    }); 
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
