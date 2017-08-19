import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { AnimalReaction } from '../../models/animal-reaction.model';

import Data from '../../data/data.service';
import { EventService } from '../../data/event.service';

@Component({
  selector: 'animal-comment',
  templateUrl: './animal-comment.component.html',
  styleUrls: ['./animal-comment.component.css']
})
export class AnimalCommentComponent implements OnInit {
  message: string;
  animalId: number;

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
        this.animalId = params['id'];
      });
  }

  onSubmit(){
    this.dataBase.addCommentOfAnimal(this.message, this.animalId)
      .subscribe(res => {
        this.eventService.triggerNotificationFetched(res.message, res.success);  
        if(res.success == true) {
            this.router.navigateByUrl(`animals/details/${this.animalId}`);      
        }
      });
      
  }
}