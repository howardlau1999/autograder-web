import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // A bootstrap failure must leave a trace; without it the app is just a
  // blank page with nothing in the console.
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
