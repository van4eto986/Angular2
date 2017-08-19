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

  getHomeData(): Promise<Array<{}>>  {
    return this.http
      .get(`${baseUrl}/products/all`)
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

  findProductById(productId){

    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

    return this.http
      .get(`${baseUrl}/products/details/${productId}`, { headers })
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
      /*.subscribe(res => {
        this.eventService.triggerStatisticChanged('');
        this.notificationService.setNotification(res.message);
      }); */   
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
      .get(`${baseUrl}/products/mine`, { headers })
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
         console.log(err);
         return [];
      });
  }

  addProduct(product){
    let body = {
      id: product.id,
      name: product.name,
      category: product.category,
      blossom: product.blossom,
      price: product.price,
      image: product.image
    }

    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

    return this.http
      .post(`${baseUrl}/products/create`, body, { headers })
      .map(res => { 
        this.eventService.triggerStatisticChanged('');
        return res.json(); 
      })
  }

  addReviewOfProduct(productReview, productId){
    let body = {
      rating: productReview.rating,
      comment: productReview.comment
    }

    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

    return this.http
      .post(`${baseUrl}/products/details/${productId}/reviews/create`, body, { headers })
      .map(res => {return res.json()})
      
  }

  getReviewsForProduct(productId){
    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

   return this.http
      .get(`${baseUrl}/products/details/${productId}/reviews`, { headers })
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
         console.log(err);
         return [];
      });
  }

  deleteProduct(productId){
    let token = this.userService.getToken();
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

     return this.http
      .post(`${baseUrl}/products/delete/${productId}/`, {}, { headers })
      .map(res => { this.eventService.triggerStatisticChanged(''); return res.json(); })
      
  }  
  
  postLike(productId){
    let token = this.userService.getToken();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${token}`);

    return this.http
      .post(`${baseUrl}/products/details/${productId}/like`, {}, { headers })
      .map(res => {return res.json()});
      
    }   

  searchProduct(searchProduct): Promise<Array<{}>> {

    let searchRequest = searchProduct.searchParam;      

    return this.http
      .get(`${baseUrl}/products/all?search=${searchRequest}`)      
      .toPromise()
      .then(resp => resp.json())
      .catch(err => { 
        console.log(err);
        return [];
      });
    }
} 