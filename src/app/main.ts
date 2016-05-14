import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';


bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://ops-requests.firebaseio.com')
]);