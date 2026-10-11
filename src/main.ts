import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowser()
  .bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()] })
  // A bootstrap failure must leave a trace; without it the app is just a
  // blank page with nothing in the console.
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
