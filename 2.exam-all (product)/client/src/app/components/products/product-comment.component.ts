import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ProductReaction } from '../../models/product-reaction.model';

import Data from '../../data/data.service';
import { EventService } from '../../data/event.service';

@Component({ 
  selector: 'product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.css']
})
export class ProductCommentComponent implements OnInit {
  message: string;
  productId: number;

  constructor( 
    private dataBase: Data,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {    
    this.message = '';
  }

  ngOnInit(){
     this.activatedRoute.params.subscribe((params: Params) => {
        this.productId = params['id'];
      });
  }

  onSubmit(){
    this.dataBase.addCommentOfProduct(this.message, this.productId)
      .subscribe(res => {
        this.eventService.triggerNotificationFetched(res.message, res.success);  
        if(res.success == true) {
            this.router.navigateByUrl(`products/details/${this.productId}`);      
        }
      });
      
  }
}