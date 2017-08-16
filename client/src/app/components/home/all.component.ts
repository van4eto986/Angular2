import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../data/user.service'
import Data from '../../data/data.service';
import { Search } from '../../models/search.model';

@Component({
  selector: 'all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'] 
})
export class AllComponent implements OnInit {
  data: any = [];
   token; 
   currentPage: number = 1; 
   enableNextPage: boolean = true;  
   search: Search;

  constructor(private dataBase: Data, private router: Router,private userService: UserService ){
    this.search = new Search();
  } 
  
  ngOnInit(){
    this.dataBase.getAllData().then(data => {this.data = data;});
    this.token = this.userService.getToken();
  }  

  getAnimalId(animal){
    let animalId = animal.id;   
    this.router.navigateByUrl(`animals/details/${animalId}`);
  }

  animalInfoReceived(data){    
    this.data = data.res;
    this.search = data.search;
  }

  previousPage(){
    if(this.currentPage>1) {
      this.currentPage = this.currentPage-1;
      this.dataBase.getAllDataByPage(this.currentPage, this.search).then(data => {
        this.data = data;
        this.enableNextPage = true;
        
      });
    }
  }

  nextPage(){
    if(this.enableNextPage) {
      this.currentPage = this.currentPage+1;
      this.dataBase.getAllDataByPage(this.currentPage, this.search).then(data => {
        this.data = data;
        if(!data.length) {
          this.enableNextPage = false;
        } else {
          this.enableNextPage = true;
        }
      });
    }
  }

}