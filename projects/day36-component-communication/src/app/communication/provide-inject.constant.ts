import { InjectionToken } from '@angular/core';
import { ProvideInjectToken } from './types/provide-inject.type';

export const PROVIDE_INJECT_TOKEN = new InjectionToken<ProvideInjectToken>('PROVIDE_INJECT_TOKEN');