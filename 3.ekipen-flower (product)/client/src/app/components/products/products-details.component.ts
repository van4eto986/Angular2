import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import Data from '../../data/data.service';
import { EventService } from '../../data/event.service';
import { UserService} from '../../data/user.service'

@Component({
  selector: 'product-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']

})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  data = {name:'', id:'', category:'', image:''};
  reviewsData = {};
  isCreator = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataBase: Data,
    private router: Router,
    private eventService: EventService,
    private userService: UserService 
  ){}

  ngOnInit(){
    
    this.activatedRoute.params.subscribe((params: Params) => {
        this.productId = params['id'];
        console.log(this.productId);
      });

    this.dataBase
      .findProductById(this.productId)
      .then(data => {
        this.data = data; 
        //console.log(this.userService.getUser())
        this.isCreator = data.createdBy === this.userService.getUser().email ? true : false;
      });
      
    this.dataBase
      .getReviewsForProduct(this.productId)
      .then(data => this.reviewsData = data);     
  }

  getProductId(productId){
    this.router.navigateByUrl(`products/details/${productId}/reviews/create`);
  }

  like(productId){
    this.dataBase
      .postLike(productId)
      .subscribe(res => {
        this.eventService.triggerNotificationFetched(res.message, res.success);
        this.router.navigateByUrl('/');
      });
  }

  delete(productId){
    this.dataBase
    .deleteProduct(productId)
    .subscribe(res => {
      this.eventService.triggerNotificationFetched(res.message, res.success);
      this.router.navigateByUrl('/');
    });    
  }

  buyProduct(productId){
    this.router.navigateByUrl(`product/purchase/${productId}`);
    
  }
}