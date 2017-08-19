import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AllComponent } from './components/home/all.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { UserProfileComponent } from './components/users/profile/user-profile.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { AnimalDetailsComponent } from './components/animals/animals-details.component';
import { AnimalReactionComponent } from './components/animals/animal-reaction.component';
import { AnimalCommentComponent } from './components/animals/animal-comment.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SearchComponent } from './components/home/search/search.component';
import { UserService } from './data/user.service';
import { EventService } from './data/event.service';
import { LoggedInGuard } from './directives/logged.in.guard';

const routes: Routes = [
  { path: 'animals/all', component: AllComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, },
  { path: 'stats', component: StatisticsComponent },
  { path: 'animals/create', component: AnimalsComponent, canActivate: [LoggedInGuard] },
  { path: 'animals/details/:id', component: AnimalDetailsComponent, canActivate: [LoggedInGuard] },
  { path: 'animals/mine', component: UserProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'animals/details/:id/reaction/create', component: AnimalReactionComponent, canActivate: [LoggedInGuard] },
  { path: 'animals/details/:id/comment/create', component: AnimalCommentComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    AnimalsComponent,
    AnimalDetailsComponent,
    AnimalReactionComponent,
    AnimalCommentComponent,
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