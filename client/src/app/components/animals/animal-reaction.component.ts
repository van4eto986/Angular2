import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { AnimalReaction } from '../../models/animal-reaction.model';

import Data from '../../data/data.service';
import { EventService } from '../../data/event.service';

@Component({
  selector: 'animal-reaction',
  templateUrl: './animal-reaction.component.html',
  styleUrls: ['./animal-reaction.component.css']
})
export class AnimalReactionComponent implements OnInit {
  animalReaction: {};
  animalId: number;

  constructor( 
    private dataBase: Data,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {    
    this.animalReaction = {type:''};
  }

  ngOnInit(){
     this.activatedRoute.params.subscribe((params: Params) => {
        this.animalId = params['id'];
      });
  }

  onSubmit(){
    this.dataBase.addReactionOfAnimal(this.animalReaction, this.animalId)
      .subscribe(res => {
        this.eventService.triggerNotificationFetched(res.message, res.success); 
        if(res.success == true) { 
          this.router.navigateByUrl(`animals/details/${this.animalId}`);   
        }   
      });
      
  }
}