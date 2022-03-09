import { delayWhen, Observable, retryWhen, scan, timer } from 'rxjs';

export function retryExponentialBackoff<T>(
  initialDelay: number = 100,
  incrementalDelay: number = 100,
  maximalDelay: number = 5000,
): (source$: Observable<T>) => Observable<T> {
  return (source$) =>
    source$.pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((errorCount) => errorCount + 1, 0),
          delayWhen((errorCount) =>
            timer(Math.min(maximalDelay, initialDelay + 2 ** errorCount * incrementalDelay)),
          ),
        ),
      ),
    );
}
