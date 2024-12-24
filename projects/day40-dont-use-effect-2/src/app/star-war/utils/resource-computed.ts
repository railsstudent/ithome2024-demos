import { computed, Injector, ResourceLoaderParams, ValueEqualityFn, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export function createRxResourceComputed<R, T, W>(requestSignal: WritableSignal<R>,
    loader: (params: ResourceLoaderParams<R>) => Observable<T>,
    evaluateComputed: (param: T | undefined) => W,
    injector?: Injector,
    equal?: ValueEqualityFn<T>,
  ) {
    const myResource = rxResource({
      request: () => requestSignal(),
      loader,
      equal,
      injector
    });
  
    return computed(() => evaluateComputed(myResource.value()));
}