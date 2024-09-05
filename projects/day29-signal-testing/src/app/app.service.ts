import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  #counter = signal(0);

  value = computed(() => this.#counter());

  increase(num = 1) {
    this.#counter.update((prev) => prev + num);
  }

  decrease(num = 1) {
    this.#counter.update((prev) => prev - num);
  }

  reset() {
    this.#counter.set(0);
  }

  log() {
    console.log(this.value());
  }
}
