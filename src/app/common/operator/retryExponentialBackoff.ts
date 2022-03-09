import { delayWhen, Observable, retryWhen, scan, timer } from 'rxjs';

export function retryExponentialBackoff<T>(
  initialDelay: number = 100,
  incrementalDelay: number = 100,
  maximumDelay: number = 5000,
): (errors$: Observable<T>) => Observable<any> {
  return (errors$) =>
    errors$.pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((errorCount) => errorCount + 1, 0),
          delayWhen((errorCount) =>
            timer(Math.min(maximumDelay, initialDelay + 2 ** errorCount * incrementalDelay)),
          ),
        ),
      ),
    );
}
