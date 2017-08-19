import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user.model';
import { UserService } from '../../../data/user.service';
import Data from '../../../data/data.service';
import {EventService} from '../../../data/event.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User;
  
  constructor(
    private data: Data,
    private router: Router, 
    private userService: UserService,    
    private eventService: EventService
  ){
    this.user = new User();
    console.log(this.userService.isLoggedIn())
  }

  onSubmit(){ 
    this.data.registerUser(this.user)
    .subscribe(res => {
      if(res.success) {
      this.eventService.triggerStatisticChanged('');
      this.eventService.triggerNotificationFetched(res.message, res.success);
      this.router.navigateByUrl('/login');
      } else {
        this.eventService.triggerNotificationFetched(res.message, res.success);
      }
    });
  }
}