import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from "./users-list/users-list.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    component: UsersListComponent
  },
  {
    path: "/login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
