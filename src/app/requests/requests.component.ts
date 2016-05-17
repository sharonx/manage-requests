import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
//import { Observable } from 'rxjs/Observable';

import { DataService } from '../shared/services/data.service';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
// import { RequestsCardComponent } from './requestsCard.component';
import { RequestsGridComponent } from './requestsGrid.component'
import { newRequestComponent } from './newRequest.component'
import { IRequests } from '../shared/interfaces';
import { Subject } from 'rxjs/Subject';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
  filteredRequests: IRequests[] = [];
  searchString = new Subject<string>();
  public realClose: Function;
  items: FirebaseListObservable<any[]>;
  
  @ViewChild(newRequestComponent) newRequest: any;

  constructor(private dataService: DataService, af: AngularFire) { 
    
     this.items = af.database.list('/items');
     this.items.subscribe(items => {
      this.filteredRequests = items; 
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

