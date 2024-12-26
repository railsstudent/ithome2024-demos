import { afterNextRender, afterRenderEffect, ChangeDetectionStrategy, Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { ChartDataType, initializeChart } from './chart';
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
      <canvas #canvas></canvas>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
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

  data = signal<ChartDataType[]>([
    { year: 2022, count: 30 },
    { year: 2023, count: 4 },
  ]);

  barColor = signal('red');
  numBars = signal(0);

  chart: Chart | null = null;
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas')
  nativeElement = computed(() => this.canvas().nativeElement);
  chartData = genChartData(15);
   
  constructor() {
    afterNextRender({
      write: () => {
        console.log('afterNextRender write is called');
        this.chart = this.chart = initializeChart(this.nativeElement(), this.data(), this.barColor());
      }
    });

    afterRenderEffect({
      earlyRead: () => {
        const index = this.chartData();
        return typeof index === 'undefined' ? undefined : { year: 2024 + index, count: Math.floor(Math.random() * 20) + 2 } as ChartDataType;
      },
      write: (randomData) => {
        console.log('write is called');

        const chartData = randomData();
        if (chartData) {
          this.chart?.data?.labels?.push(chartData.year);
          this.chart?.data?.datasets.forEach((dataset) => dataset.data.push(chartData.count));
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
