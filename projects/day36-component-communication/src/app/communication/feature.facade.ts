import { Feature } from "./types/feature.type";
import { Signal } from '@angular/core';

export interface FeatureFacade {
  setSecretValue(value: string): void;
  secretValue: Signal<string>;

  setFeature(feature: Feature | null): void;
  feature: Signal<Feature | null>;
  featureName: Signal<String>;
}