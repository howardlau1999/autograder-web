import { delayWhen, Observable, timer } from 'rxjs';

class TokenBucket {
  tokens: number;

  lastFilled: number;

  fillRate: number;

  fillInterval: number;

  constructor(private frequency: number, private period: number, private capacity: number) {
    this.tokens = frequency;
    this.lastFilled = Date.now();
    this.fillRate = frequency / period;
    this.fillInterval = Math.round(period / frequency);
  }

  take(): number {
    this.fill();
    if (this.tokens > 0) {
      this.tokens -= 1;
      return 0;
    }
    return this.fillInterval - Date.now() + this.lastFilled;
  }

  fill() {
    const now = Date.now();
    const added = Math.round((now - this.lastFilled) * this.fillRate);
    this.lastFilled = now;
    this.tokens = Math.min(this.capacity, this.tokens + added);
  }
}

export function ratelimit<T>(
  frequency: number,
  period: number,
  burst: number,
): (source$: Observable<T>) => Observable<T> {
  const tokenBucket = new TokenBucket(frequency, period, burst);
  return (source$) => {
    return source$.pipe(delayWhen(() => timer(tokenBucket.take())));
  };
}
