import { Component, OnInit, OnChanges, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from '../../data/user.service';
import { EventService} from '../../data/event.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn = false; 
  username = "";  

  constructor(
    private userService: UserService,
    private router: Router, 
    private eventService: EventService,   
    public toastr: ToastsManager,
    public vcr: ViewContainerRef 
  ){  
    this.loggedIn = userService.isLoggedIn();
    this.toastr.setRootViewContainerRef(vcr);    
  }

  ngOnInit() {
    this.eventService.userLoggedIn.subscribe(
      (name) => {
        this.loggedIn = this.userService.isLoggedIn();
        this.username=name;
      }
    ); 

    this.eventService.notificationFetched.subscribe(
      (notificationInfo) => {
        let message = notificationInfo.message;
        let status = notificationInfo.status;
        if(status === true){
          this.toastr.success(message, 'Success!');
        }
        if(status === false){
          this.toastr.error(message, 'Error!')
        }
        
      }
    );   
  }

  logout(){
    this.userService.logout();
    this.username = '';
    this.toastr.success('Logout Success!', 'Success!')
  }
  getUser(){
    this.router.navigateByUrl(`animals/mine`);
  }
}