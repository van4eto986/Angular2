import { Component } from '@angular/core';

import { Product } from '../../models/product.model';
import Data from '../../data/data.service';
import {EventService} from '../../data/event.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  product: any;

  constructor(private data: Data, private router: Router, private eventService: EventService){
    this.product = new Product();
  }

  onSubmit(productFromForm){
    productFromForm = this.product;

    let isValidImage;
    
    if(this.product.image.startsWith('http')){
      isValidImage = true;
    }else{
      isValidImage = false;
    }

    console.log(this.product);

    if(this.product.price > 0 && isValidImage){
        this.data.addProduct(this.product)
          .subscribe(res => {
            this.eventService.triggerNotificationFetched(res.message, res.success);
            this.router.navigateByUrl(`products/details/${res.product.id}`)
        }); 
    }else{
      this.eventService.triggerNotificationFetched('Wrong form!', false);
    }    
  } 
}