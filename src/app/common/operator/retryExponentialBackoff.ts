import { delayWhen, Observable, retryWhen, scan, timer } from 'rxjs';

export function retryExponentialBackoff<T>(
  initialDelay: number = 100,
  maximalDelay: number = 5000,
): (source$: Observable<T>) => Observable<T> {
  return (source$) =>
    source$.pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((delay) => Math.min(maximalDelay, delay * 2), initialDelay),
          delayWhen((delay) => timer(delay)),
        ),
      ),
    );
}
