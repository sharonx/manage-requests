import { Component, ViewChild, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRequests } from '../shared/interfaces';
import { UserService } from '../shared/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'new-request',
  templateUrl: 'newRequest.component.html',
  directives: [MODAL_DIRECTIVES]
})
export class newRequestComponent {
  @ViewChild('modal')
  modal: ModalComponent;
  newRequest: any = {};
  requester: string;
  @Output() onRequestSubmit= new EventEmitter();
  constructor(private userService: UserService) { 
    this.requester = this.userService.getUser();
    this.newRequest = {requester: this.requester};
  }
  
  ngOnInit() {
    
  }

  dismiss() {
    this.modal.dismiss();
  }
  
  addRepo() {
    if (!this.newRequest.repos) {
      this.newRequest.repos = [{name: '', branch: ''}];
    } else{
      this.newRequest.repos.push({name: '', branch: ''});
    }
  }
  
  deleteRepo(repo: Object) {
    this.newRequest.repos = this.newRequest.repos.filter(function(item: any) {
      return item !== repo;
    });
  }
  close() {
    this.newRequest.requestTime = new Date().toLocaleString();
    this.onRequestSubmit.emit(this.newRequest);
    console.log('new request', this.newRequest);
    this.newRequest = {requester: this.requester};
    this.modal.close();
  }
}