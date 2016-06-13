import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { DataService } from '../shared/services/data.service';
import { UserService } from '../shared/services/user.service';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { RequestsGridComponent } from './requestsGrid.component'
import { newRequestComponent } from './newRequest.component'
import { IRequests } from '../shared/interfaces';
import { Subject } from 'rxjs/Subject';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as _ from 'lodash';

@Component({ 
  moduleId: module.id,
  selector: 'requests', 
  templateUrl: 'requests.component.html',
  directives: [ROUTER_DIRECTIVES, FilterTextboxComponent, 
               RequestsGridComponent, newRequestComponent]           
})

export class RequestsComponent implements OnInit {

  title: string;
  filterText: string;
  requests: IRequests[] = [];
  username: string;
  filteredRequests: IRequests[] = [];
  searchString = new Subject<string>();
  public realClose: Function;
  items: FirebaseListObservable<any[]>;
  
  @ViewChild(newRequestComponent) newRequest: any;

  constructor(private dataService: DataService, af: AngularFire, private router: Router, private userService: UserService) {
    if (!this.userService.getUser() || this.userService.getUser() == '') {
      this.router.navigate(['/']);
    } 
     this.username = this.userService.getUser();
     this.items = af.database.list('/items', {
       query: {
         limitToLast: 20
       }
     });
     this.items.subscribe(items => {
       this.filteredRequests = _.sortBy(items, 'requestTime'); 
     });
     
  }
  
  ngOnInit() {
    this.title = 'Requests';
    this.filterText = 'Filter Requests:';
  }


  onRequestSubmit(newRequest: any){
     this.items.push(newRequest);
  }
  
  filterChanged(data: string) {
     this.items.subscribe(items => {
       this.filteredRequests = items.filter(item => {
         return JSON.stringify(item).indexOf(data) > -1;
       })
    });
  }

}

