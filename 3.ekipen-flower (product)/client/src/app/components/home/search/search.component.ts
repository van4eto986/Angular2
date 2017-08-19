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
  search: Search;
  searchResult: Array<{}>;  
  @Output() sendProductInfoToHome = new EventEmitter<Array<{}>>()

  constructor(private dataBase: Data, private eventService: EventService){
    this.search = new Search(); 
  }

  onSubmit(searchForm){ 
    searchForm = this.search; 
    this.dataBase
      .searchProduct(this.search)
      .then(data => {
        this.searchResult = data;
        this.sendProductInfoToHome.emit(this.searchResult);
        if(data.length > 0){
          this.eventService.triggerNotificationFetched('Search Success!', true);
        }else{
          this.eventService.triggerNotificationFetched('Nothing found!', false);
        }
      })
  }
}