import { Injector, linkedSignal, resource, Signal, ValueEqualityFn, WritableSignal } from '@angular/core';

const sleep = (ms: number, signal?: AbortSignal): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const onAbort = () => {
        clearTimeout(timeoutId);
        reject(new Error('Aborted'));
      };
  
      const timeoutId = setTimeout(() => {
        signal?.removeEventListener('abort', onAbort);
        resolve();
      }, ms);
  
      signal?.addEventListener('abort', onAbort);
    });
};

export type DebouncedOptions<T> = {
    readonly timeoutMs: number;
    readonly equal?: ValueEqualityFn<T>;
    readonly injector?: Injector;
    readonly computation: (
      source: NoInfer<T | undefined>,
      previous?: {
        source: NoInfer<T | undefined>;
        value: NoInfer<T>;
      }
    ) => T;
  };
  
  export const debounced = <T>(
    source: Signal<T>,
    options: DebouncedOptions<T>
  ): WritableSignal<T> => {
    const debouncedResource = resource({
      request: source,
      loader: async ({ request, abortSignal }) => {
        await sleep(options.timeoutMs, abortSignal);
        return request;
      },
      equal: options.equal,
      injector: options.injector,
    });
  
    return linkedSignal<T | undefined, T>({
      source: debouncedResource.value,
      computation: options.computation,
      equal: options.equal,
    });
};
  
  