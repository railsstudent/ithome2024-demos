import { Signal, linkedSignal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap, timer, take, map } from 'rxjs';

export function genChartData(numBars: Signal<number>) {
    const year = toSignal(toObservable(numBars).pipe(
      filter((v) => v >= 1 && v <= 10),
      switchMap((numBars) => timer(100, 1000).pipe(
        take(numBars),
        map((i) => 2024 + i)
      ))
    ), { initialValue: -1 });
  
    return linkedSignal({
      source: year,
      computation: (year) => year > 0 ? { year, count: Math.floor(Math.random() * 20) + 2 } : undefined,
    }).asReadonly();
}
