import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import Data from '../../data/data.service';
import { EventService } from '../../data/event.service';

@Component({
  selector: 'animal-details',
  templateUrl: './animals-details.component.html',
  styleUrls: ['./animals-details.component.css']

})
export class AnimalDetailsComponent implements OnInit {
  animalId: number;
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
        this.animalId = params['id'];
        console.log(this.animalId);
      });

    this.dataBase
      .findAnimalById(this.animalId)
      .then(data => {this.data = data;});

    this.dataBase
      .getComments(this.animalId)
      .then(res => {this.comments = res;});
  }

  delete(animalId){
    this.dataBase
    .deleteAnimal(animalId)
    .subscribe(res => {
      this.eventService.triggerNotificationFetched(res.message, res.success);
      this.router.navigateByUrl('/animals/all');
    });
  }

  createComment(animalId){
    this.router.navigateByUrl(`animals/details/${animalId}/comment/create`);
  }

  createReaction(animalId){
    this.router.navigateByUrl(`animals/details/${animalId}/reaction/create`);
  }
}