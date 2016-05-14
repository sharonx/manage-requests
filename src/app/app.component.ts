import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { RequestsComponent } from './requests/requests.component';
import { APP_PROVIDERS } from './app.providers';

@Component({ 
  moduleId: module.id,
  selector: 'app-container',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
  providers: [ APP_PROVIDERS ]
})
@Routes([
  { path: '/', component: RequestsComponent },
  { path: '/requests', component: RequestsComponent }
])
export class AppComponent {
  
  constructor(private router: Router) {

  }
  
}