import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { LoggedLayoutComponent } from './logged-layout/logged-layout.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AssociationDetailComponent } from './association-detail/association-detail.component';
import { VerificationComponent } from "./verification/verification.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'verify',
    component: VerificationComponent,
  },
  {
    path: '',
    component: LoggedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/:id',
        component: UserDetailComponent,
      },
      {
        path: 'associations',
        component: AssociationsListComponent,
      },
      {
        path: 'associations/:id',
        component: AssociationDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
