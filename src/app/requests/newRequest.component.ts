import { Component, ViewChild, EventEmitter, OnInit, Output } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRequests } from '../shared/interfaces';

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
  @Output() onRequestSubmit= new EventEmitter();
  constructor() { 
    
  }
  
  OnInit() {
    this.newRequest = {};
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
  
  close() {
    this.newRequest.requestTime = new Date().toLocaleString();
    this.onRequestSubmit.emit(this.newRequest);
    console.log('new request', this.newRequest);
    this.newRequest = {};
    this.modal.close();
  }
}