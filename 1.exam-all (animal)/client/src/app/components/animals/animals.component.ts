import { Component } from '@angular/core';

import { Animal } from '../../models/animal.model';
import Data from '../../data/data.service';
import {EventService} from '../../data/event.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent{
  animal: any;

  constructor(private data: Data, private router: Router, private eventService: EventService){
    this.animal = new Animal();
  }

  onSubmit(animalFromForm){
    animalFromForm = this.animal;

   
    let isValidImage;
    
    if(this.animal.image.startsWith('http')){
      isValidImage = true;
    }else{
      isValidImage = false;
    }

    console.log(this.animal);

    if(this.animal.price > 0 && isValidImage){
        this.data.addAnimal(this.animal)
          .subscribe(res => {
            this.eventService.triggerNotificationFetched(res.message, res.success);
            this.router.navigateByUrl('/animals/all');
            });
    }else{
      this.eventService.triggerNotificationFetched('Wrong form!', false);
    }    
  } 
}