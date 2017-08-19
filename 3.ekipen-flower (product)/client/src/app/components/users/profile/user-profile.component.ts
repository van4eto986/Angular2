import { Component, OnInit } from '@angular/core';

import Data from '../../../data/data.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  data: any;

  constructor(private dataBase: Data){}

  ngOnInit(){
    this.dataBase
      .getProfileInfo()
      .then(data => this.data = data);

    console.log(this.data);  
  }
}