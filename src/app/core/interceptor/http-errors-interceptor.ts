import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { DEFAULT_API_ERROR, HTTP_ERRORS } from "../constants/project-constatns";
import { ToastService } from "../service/toaster.service";


export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error) => {
      console.log(error)
      let errorText =
        error?.error?.message || error?.statusText || DEFAULT_API_ERROR;
      if (error instanceof ErrorEvent) {
        errorText = error.error;
      } else {
        switch (error.status) {
          case 400:
            errorText =
              error.error.message || error.statusText || HTTP_ERRORS[400];
            break;
          case 401:
            errorText =
              error.error.message || error.statusText || HTTP_ERRORS[401];
            break;
          case 403:
            errorText =
              error.error.message || error.statusText || HTTP_ERRORS[403];
            break;
          case 404:
            errorText =
              error.error.message || error.statusText || HTTP_ERRORS[404];
            break;
          case 409:
            errorText =
              error.error.message || error.statusText || HTTP_ERRORS[409];
            break;
          case 419:
            errorText =
              error.error.message || error.statusText || HTTP_ERRORS[419];
            break;
          case 422:
            errorText =
              error.error.message || error.statusText || HTTP_ERRORS[422];
            break;
          case 500:
            errorText =
              error.error.message || error.statusText || HTTP_ERRORS[500];
            break;
          default:
            errorText = DEFAULT_API_ERROR;
        }
      }
      //toast-message for error
      toastService.showError(errorText,'Error',5000);
      return throwError(() => new HttpErrorResponse(error));
    }),
  );
};
