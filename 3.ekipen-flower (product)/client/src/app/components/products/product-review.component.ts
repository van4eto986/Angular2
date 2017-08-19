import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ProductReview } from '../../models/product-review.model';

import Data from '../../data/data.service';
import { EventService } from '../../data/event.service';

@Component({
  selector: 'product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  productReview: ProductReview;
  productId: number;

  constructor( 
    private dataBase: Data,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.productReview = new ProductReview();    
  }

  ngOnInit(){
     this.activatedRoute.params.subscribe((params: Params) => {
        this.productId = params['id'];
        //console.log(this.productId);
      });
  }

  onSubmit(productReviewForm){
    productReviewForm = this.productReview;   

    this.dataBase
      .addReviewOfProduct(this.productReview, this.productId)
      .subscribe(res => {
        this.eventService.triggerNotificationFetched(res.message, res.success);        
      });
      
    this.router.navigateByUrl(`products/details/${this.productId}`); 
  }
}