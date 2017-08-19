import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { UserProfileComponent } from './components/users/profile/user-profile.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/products-details.component';
import { ProductReviewComponent } from './components/products/product-review.component';


import { UserService } from './data/user.service';
import { EventService } from './data/event.service';
import { LoggedInGuard } from './directives/logged.in.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, /*canActivate: [LoggedInGuard]*/ },
  { path: 'new-product', component: ProductsComponent, canActivate: [LoggedInGuard] },
  { path: 'products/details/:id', component: ProductDetailsComponent, canActivate: [LoggedInGuard] },
  { path: 'products/mine', component: UserProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'products/details/:id/reviews/create', component: ProductReviewComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductReviewComponent
  ],
  imports:[
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [RouterModule],
  providers: [UserService, LoggedInGuard, EventService]
})
export class AppRoutesModule {}