import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SortByDirective } from '../shared/directives/sortby.directive';
import { Sorter } from '../shared/utils/sorter';
import { TrackByService } from '../shared/services/trackby.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { IRequests } from '../shared/interfaces';
import * as _ from 'lodash';
import { UserService } from '../shared/services/user.service';

@Component({ 
  moduleId: module.id,
  selector: 'requests-grid', 
  templateUrl: 'requestsGrid.component.html',
  directives: [ROUTER_DIRECTIVES, SortByDirective],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush ,
})
export class RequestsGridComponent implements OnInit {

  @Input() requests: IRequests[];
  @Input() items: FirebaseListObservable<any>;
  username: string;
  sortAsc: boolean = true;
  oldProp: string;

  constructor(private sorter: Sorter, private userService: UserService) {
    this.username = this.userService.getUser();
  }
   
  ngOnInit() {
    
  }
  
  delete(key: any) {
    this.items.remove(key);
  }
  
  sort(prop: string) {
    if (prop !== this.oldProp) {
      this.sortAsc = true;
    } else {
      this.sortAsc = !this.sortAsc
    }

    if (this.sortAsc) {
      this.requests = _.sortBy(this.requests, prop);
    }
    else {
      this.requests = _.sortBy(this.requests, prop).reverse();
    }
    this.oldProp = prop; 
  }

}
