/**
 * Organization: Intellect Design Arena Ltd, Chennai
 * Unit: iGCB
 * Product: Retail Banking Application
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare let window: any;
declare let cordova: any;

if (environment.production) {
  console.log=()=>{}
  enableProdMode();
}

const bootstrap = () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
};

if (typeof window['cordova'] !== 'undefined') {
  document.addEventListener('deviceready', () => {
    (navigator as any).splashscreen.hide();
    if(cordova.InAppBrowser) window.open = cordova.InAppBrowser.open;
    bootstrap();
  }, false);
  document.addEventListener('backbutton', (event) => {
    event.preventDefault();
  }, false);
} else {
  bootstrap();
}
