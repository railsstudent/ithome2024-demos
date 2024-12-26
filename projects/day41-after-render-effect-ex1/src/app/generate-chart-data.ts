import { toSignal } from '@angular/core/rxjs-interop';
import { take, timer } from 'rxjs';

export function genChartData(numBars: number) {
  return toSignal(timer(100, 1000)
    .pipe(
      take(numBars),
      // For experiment, I create the random data in the earlyRead phase
      // map((i) => ({ year: 2024 + i, count: Math.floor(Math.random() * 20) + 2 }))
    ), { initialValue: undefined });
}
