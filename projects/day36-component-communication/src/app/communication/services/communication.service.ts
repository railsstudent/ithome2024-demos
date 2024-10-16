import { computed, Injectable, signal } from '@angular/core';
import { FeatureFacade } from '../feature.facade';
import { Feature } from '../types/feature.type';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService implements FeatureFacade {
  #secretValue = signal('');
  secretValue = this.#secretValue.asReadonly();

  #feature = signal<Feature | null>(null);
  feature = this.#feature.asReadonly();
  featureName = computed(() => {
    const feature = this.feature() || { name: '', isShown: false };
    return feature.isShown ? feature.name : '';
  });

  setSecretValue(value: string): void {
    this.#secretValue.set(value);
  }
  
  setFeature(feature: Feature | null): void {
    this.#feature.set(feature);
  }
}