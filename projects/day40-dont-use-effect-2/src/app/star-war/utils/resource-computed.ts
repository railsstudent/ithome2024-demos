import { computed, Injector, ResourceLoaderParams, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export function createRxResourceComputed<R, T, W>(requestSignal: WritableSignal<R>,
    loader: (params: ResourceLoaderParams<R>) => Observable<T>,
    evaluateComputed: (param: T | undefined) => W,
    injector?: Injector
  ) {
    const myResource = rxResource({
      request: () => requestSignal(),
      loader,
      injector  
    });
  
    return computed(() => {
      const value = myResource.value();
      return evaluateComputed(value)
    });
}