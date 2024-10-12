import { ErrorHandler, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { ERROR_DIALOG_TOKEN } from './errors/error-token.constant';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: ERROR_DIALOG_TOKEN,
      useValue: { show: signal(false) }
    }
  ]
}
