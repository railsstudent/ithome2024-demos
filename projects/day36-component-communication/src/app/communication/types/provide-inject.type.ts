import { WritableSignal } from '@angular/core';
import { Feature } from './feature.type';

export type ProvideInjectToken = {
  secretValue: WritableSignal<string>;
  feature: WritableSignal<Feature | null>;  
}