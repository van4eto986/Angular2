import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AllComponent } from './components/home/all.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { UserProfileComponent } from './components/users/profile/user-profile.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/products-details.component';
import { ProductReactionComponent } from './components/products/product-reaction.component';
import { ProductCommentComponent } from './components/products/product-comment.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SearchComponent } from './components/home/search/search.component';
import { UserService } from './data/user.service';
import { EventService } from './data/event.service';
import { LoggedInGuard } from './directives/logged.in.guard';

const routes: Routes = [
  { path: 'products/all', component: AllComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, },
  { path: 'stats', component: StatisticsComponent },
  { path: 'products/create', component: ProductsComponent, canActivate: [LoggedInGuard] },
  { path: 'products/details/:id', component: ProductDetailsComponent, canActivate: [LoggedInGuard] },
  { path: 'products/mine', component: UserProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'products/details/:id/reaction/create', component: ProductReactionComponent, canActivate: [LoggedInGuard] },
  { path: 'products/details/:id/comment/create', component: ProductCommentComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductReactionComponent,
    ProductCommentComponent,
    AllComponent,
    StatisticsComponent,
    SearchComponent
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