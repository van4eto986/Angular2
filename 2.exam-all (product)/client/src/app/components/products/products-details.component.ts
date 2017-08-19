import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import Data from '../../data/data.service';
import { EventService } from '../../data/event.service';

@Component({
  selector: 'product-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']

})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  data = {name:'', id:'', category:'', image:''};
  comments;
    
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataBase: Data,
    private router: Router,
    private eventService: EventService
  ){}

  ngOnInit(){
    
    this.activatedRoute.params.subscribe((params: Params) => {
        this.productId = params['id'];
        console.log(this.productId);
      });

    this.dataBase
      .findProductById(this.productId)
      .then(data => {this.data = data;});

    this.dataBase
      .getComments(this.productId)
      .then(res => {this.comments = res;});
  }

  delete(productId){
    this.dataBase
    .deleteProduct(productId)
    .subscribe(res => {
      this.eventService.triggerNotificationFetched(res.message, res.success);
      this.router.navigateByUrl('/products/all');
    });
  }

  createComment(productId){
    this.router.navigateByUrl(`products/details/${productId}/comment/create`);
  }

  createReaction(productId){
    this.router.navigateByUrl(`products/details/${productId}/reaction/create`);
  }
}