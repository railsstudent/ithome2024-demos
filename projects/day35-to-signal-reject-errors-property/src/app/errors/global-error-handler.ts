import { ErrorHandler, inject, Injectable } from "@angular/core";
import { ERROR_DIALOG_TOKEN } from "./error-token.constant";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  modal = inject(ERROR_DIALOG_TOKEN);

  handleError(error: any) {
    console.error('in GlobalErrorHandler', error);
    this.modal.show.set(true);
  }
}