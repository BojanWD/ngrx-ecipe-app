import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse): Observable<never> {
  console.error(`An error occurred: ${error.message}`);

  return throwError(
    () =>
      'There was an unexpected error! Please contact the IT support for more details.'
  );
}
