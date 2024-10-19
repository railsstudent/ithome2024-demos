import { computed, Injectable } from '@angular/core';
import { Feature } from '../types/feature.type';
import { FeatureFacade } from '../feature.facade';
import { signalState, patchState } from '@ngrx/signals';

@Injectable({
  providedIn: 'root'
})
export class SignalStateService implements FeatureFacade {
  #state = signalState<{ secretValue: string, feature: Feature | null }>({
    secretValue: '',
    feature: null,
  });

  secretValue = computed(() => this.#state.secretValue());  
  feature = computed(() => this.#state.feature());
  featureName = computed(() => {
    const feature = this.feature() || { name: '', isShown: false };
    return feature.isShown ? feature.name : '';
  });

  setSecretValue(secretValue: string): void {
    patchState(this.#state, () => ({ secretValue }));
  }
  
  setFeature(feature: Feature | null): void {
    patchState(this.#state, () => ({ feature }))
  }
}