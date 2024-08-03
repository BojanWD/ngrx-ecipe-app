import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse): Observable<never> {
  return throwError(
    () => `${error.message}! Please contact the IT support for more details.`
  );
}
