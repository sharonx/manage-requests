import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';


@Component({ 
  moduleId: module.id,
  selector: 'login', 
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  username: string;


  constructor(private router: Router, private userService: UserService) { 

     
  }
  
  ngOnInit() {
   
  }


  assignUser(data: string) {
    this.userService.setUser(data);
    this.router.navigate(['/requests']);
  }
}

