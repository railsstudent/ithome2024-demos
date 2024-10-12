import { InjectionToken, WritableSignal } from '@angular/core';

type ErrorDialog = {
  show: WritableSignal<boolean>
}

export const ERROR_DIALOG_TOKEN = new InjectionToken<ErrorDialog>('ERROR_DIALOG_TOKEN');