import { Component, OnInit } from '@angular/core';

import Data from '../../../data/data.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  animals: any;

  constructor(private data: Data){}

  ngOnInit(){
    this.data
      .getProfileInfo()
      .then(res => this.animals = res);
  }
}