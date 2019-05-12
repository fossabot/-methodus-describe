
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
let methodType = 'Http';
if (window.location.host === 'localhost:4200') {
  methodType = 'Mock';
}
(window as any).METHODUS_CONFIG = { transport: methodType, methodType };

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'reflect-metadata';

if (environment.production) {
  enableProdMode();
}

if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');

}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));




