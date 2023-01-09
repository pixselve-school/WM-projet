import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async login(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    try {
      const response = await this.api.post({
        endpoint: '/auth/login',
        data: { username: this.username.value, password: this.password.value },
      });
      this.tokenStorageService.save(
        response.access_token,
        +(this.username.value ?? '-1')
      );
      if (!this.tokenStorageService.isLogged()) new Error('Not logged in');
      // redirect to /users
      await this.router.navigate(['/users']);
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        if (e.status === 401) {
          this.snackBar.open('😖 Incorrect password', 'Close');
          return;
        } else if (e.status === 404) {
          this.snackBar.open('😖 Incorrect email', 'Close');
          return;
        } else if(e.status === 403) {
          this.snackBar.open('😖 Your email is not verified', 'Close');
          return;
        }
      }
      this.snackBar.open('😖 An unknown error occurred', 'Close');
    }
  }

  ngOnInit(): void {}
}
