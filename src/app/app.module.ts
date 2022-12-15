import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenHttpInterceptor } from './interceptors/token.interceptor';
import { NavComponent } from './nav/nav.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { NgOptimizedImage } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { LoggedLayoutComponent } from './logged-layout/logged-layout.component';
import { SearchUserComponent } from './users-list/search-user/search-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { NewAssociationDialogComponent } from './associations-list/new-association-dialog/new-association-dialog.component';
import { AssociationCardComponent } from './user-detail/association-card/association-card.component';
import { AssociationDetailComponent } from './association-detail/association-detail.component';
import { SearchAssociationComponent } from './associations-list/search-association/search-association.component';
import { EditRoleModalComponent } from './association-detail/edit-role-modal/edit-role-modal.component';
import { NewMinuteDialogComponent } from './association-detail/new-minute-dialog/new-minute-dialog.component';
import { AddUserModalComponent } from './association-detail/add-user-modal/add-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavComponent,
    ProfileComponent,
    LoggedLayoutComponent,
    SearchUserComponent,
    UserDetailComponent,
    AssociationsListComponent,
    NewAssociationDialogComponent,
    AssociationCardComponent,
    AssociationDetailComponent,
    SearchAssociationComponent,
    EditRoleModalComponent,
    NewMinuteDialogComponent,
    AddUserModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    NgOptimizedImage,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
