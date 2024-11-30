import { computed, ResourceLoaderParams, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export function createRxResourceComputed<R, T, W>(requestSignal: WritableSignal<R>,
    loader: (params: ResourceLoaderParams<R>) => Observable<T>,
    evaluateComputed: (param: T | undefined) => W
  ) {
    const myResource = rxResource({
      request: () => requestSignal(),
      loader,  
    });
  
    const data = computed(() => {
      const value = myResource.value();
      return evaluateComputed(value)
    });
  
    return data;
}