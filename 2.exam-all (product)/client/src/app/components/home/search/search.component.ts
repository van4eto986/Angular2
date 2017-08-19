import { Component, Output, EventEmitter } from '@angular/core';

import { Search } from '../../../models/search.model';
import Data from '../../../data/data.service';
import { EventService } from '../../../data/event.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  search: Search; //formata
  @Output() sendProductInfoToAll = new EventEmitter  

  constructor(private data: Data, private eventService: EventService){
    this.search = new Search();
  }

  onSubmit(){ 
    this.data
      .searchProduct(this.search)
      .then(res => {
        this.sendProductInfoToAll.emit({res: res, search: this.search});
        if(res.length > 0){
          this.eventService.triggerNotificationFetched('Search Success!', true);
        }else{
          this.eventService.triggerNotificationFetched('Nothing found!', false);
        }
      })
  }
}