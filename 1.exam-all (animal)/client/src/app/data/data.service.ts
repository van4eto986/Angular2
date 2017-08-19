import { Injectable }from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise'; 
import 'rxjs/add/operator/map'; 
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { EventService } from './event.service';

const baseUrl = 'http://localhost:5000';

@Injectable()
export default class Data{
  data; 

  constructor (
    private http: Http, 
    private userService: UserService, 
    private eventService: EventService   
  ) {}

  getAllData(): Promise<Array<{}>>  {
    return this.http
      .get(`${baseUrl}/animals/all`)
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
         console.log(err);
         return [];
      });
  }

  getAllDataByPage(page, search): Promise<Array<{}>>  {
    return this.http
      .get(`${baseUrl}/animals/all?page=${page}&search=${search.searchParam}`)
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
         console.log(err);
         return [];
      });
  }

  getStatistics(){
    return this.http
      .get(`${baseUrl}/stats`)
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
         console.log(err);
         return [];
      });
  }  

  findAnimalById(animalId){

    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

    return this.http
      .get(`${baseUrl}/animals/details/${animalId}`, { headers })
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
         console.log(err);
         return [];
      });
  }
    
  
  registerUser(user){ 
    let body = {     
      name: user.name,
      email: user.email,
      password: user.password
    };    

    return this.http
      .post(`${baseUrl}/auth/signup`, body)
      .map(res => {return res.json()});
  }  

  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = {
      email: user.email,
      password: user.password
    }

    return this.http
      .post(`${baseUrl}/auth/login`, body, { headers })
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this.userService.setUser(res.user);
          this.userService.setToken(res.token);          
        }

        return res;
      });    
  }

  getProfileInfo(): Promise<Array<{}>> { 
    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

   return this.http
      .get(`${baseUrl}/animals/mine`, { headers })
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
         console.log(err);
         return [];
      });
  }

  addAnimal(animal){
    let body = {
      name: animal.name,
      age: animal.age,
      color: animal.color,
      type: animal.type,
      price: animal.price,
      image: animal.image,
      breed: animal.breed
    }
     
    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

    return this.http
      .post(`${baseUrl}/animals/create`, body, { headers })
      .map(res => { 
        this.eventService.triggerStatisticChanged('');
        return res.json(); 
      })
  }

  addReactionOfAnimal(animalreaction, animalId){
    let body = {
      type: animalreaction.type
    }

    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

    return this.http
      .post(`${baseUrl}/animals/details/${animalId}/reaction`, body, { headers })
      .map(res => {return res.json()})
      
  }

  addCommentOfAnimal(message, animalId){
    let body = {
      message: message
    }

    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

    return this.http
      .post(`${baseUrl}/animals/details/${animalId}/comments/create`, body, { headers })
      .map(res => {return res.json()})
      
  }

  getComments(animalId): Promise<Array<{}>> {

    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

    return this.http
      .get(`${baseUrl}/animals/details/${animalId}/comments`, {headers})      
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
        console.log(err);
        return [];
      });
    }

  deleteAnimal(animalId){
    let token = this.userService.getToken();
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

     return this.http
      .post(`${baseUrl}/animals/delete/${animalId}/`, {}, { headers })
      .map(res => { this.eventService.triggerStatisticChanged(''); return res.json(); })
      
  }  
  
  searchAnimal(searchAnimal): Promise<Array<{}>> {

    let searchRequest = searchAnimal.searchParam;      

    return this.http
      .get(`${baseUrl}/animals/all?search=${searchRequest}`)      
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
        console.log(err);
        return [];
      });
    }
} 