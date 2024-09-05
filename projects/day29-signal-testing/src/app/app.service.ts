import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  counter = signal(0);

  increase(num = 1) {
    this.counter.update((prev) => prev + num);
  }

  decrease(num = 1) {
    this.counter.update((prev) => prev - num);
  }

  reset() {
    this.counter.set(0);
  }
}
