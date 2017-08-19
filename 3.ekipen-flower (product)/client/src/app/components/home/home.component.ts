import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Data from '../../data/data.service';
import { UserService } from '../../data/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  data: any = [];    
  token;

  constructor(
    private dataBase: Data, 
    private router: Router, 
    private userService: UserService
  ){} 
  
  ngOnInit(){
    this.dataBase.getHomeData().then(data => {this.data = data;}); 
    this.token = this.userService.getToken();    
  }  

  getProductId(product){
    this.userService.setUser(product.createdBy);
    let productId = product.id;   
    this.router.navigateByUrl(`products/details/${productId}`);
  }

  productInfoReceived(productsInfo){     
    this.data = productsInfo;    
  }
}