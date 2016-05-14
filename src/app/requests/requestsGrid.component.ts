import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SortByDirective } from '../shared/directives/sortby.directive';
import { Sorter } from '../shared/utils/sorter';
import { TrackByService } from '../shared/services/trackby.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({ 
  moduleId: module.id,
  selector: 'requests-grid', 
  templateUrl: 'requestsGrid.component.html',
  directives: [ROUTER_DIRECTIVES, SortByDirective],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class RequestsGridComponent implements OnInit {

  @Input() requests: any[] = [];
  items: FirebaseListObservable<any[]>;
  constructor(private sorter: Sorter, af: AngularFire) {
    this.items = af.database.list('/items');
  }
   
  ngOnInit() {
    
  }

  sort(prop: string) {
      this.sorter.sort(this.requests, prop);
  }

}
