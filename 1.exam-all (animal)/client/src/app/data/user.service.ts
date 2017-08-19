// user.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { EventService} from './event.service'
import { Router } from '@angular/router';

@Injectable() 
export class UserService {
  token;
  user;

  constructor(private eventService: EventService, private router: Router) {
  }

  setUser(user) {
    this.user = user; 
  }

  getUser() {
    return this.user;
  }

  setToken(token) {
    this.token = token;
    this.eventService.triggerUserLoggedIn(this.user.name);
  }
  
  getToken() {
    return this.token;
  }

  isLoggedIn() {
    return !!this.token;  //samo za nawigaciq
  }

  logout(){
    this.token = '';
    this.setToken(this.token)
    this.user = {};
    this.router.navigateByUrl('/');
  }
}