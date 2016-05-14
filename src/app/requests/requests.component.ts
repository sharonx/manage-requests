import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
//import { Observable } from 'rxjs/Observable';

import { DataService } from '../shared/services/data.service';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
// import { RequestsCardComponent } from './requestsCard.component';
import { RequestsGridComponent } from './requestsGrid.component'
import { newRequestComponent } from './newRequest.component'
import { IRequests } from '../shared/interfaces';

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
  public realClose: Function;
  
  
  @ViewChild(newRequestComponent) newRequest: any;

  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    this.title = 'Requests';
    this.filterText = 'Filter Requests:';

   
    this.dataService.getRequests()
        .subscribe((requests: IRequests[]) => {
          this.requests = requests;
          this.filteredRequests = requests;
        });
  }


  onRequestSubmit(newRequest: any){
    this.requests = this.requests.concat(newRequest);
    this.filteredRequests = this.requests;
  }
  
  filterChanged(data: string) {
    if (data && this.requests) {
        data = data.toUpperCase();
        let props = ['requester', 'verifyDetails'];
        let filtered = this.requests.filter(item => {
            let match = false;
            for (let prop of props) {
                if (item[prop].toString().toUpperCase().indexOf(data) > -1) {
                  match = true;
                  break;
                }
            };
            return match;
        });
        this.filteredRequests = filtered;
    }
    else {
      this.filteredRequests = this.requests;
    }
  }

}

