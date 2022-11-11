import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from "../api-helper.service";
import { TokenStorageService } from "../services/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private api: ApiHelperService, private tokenStorageService: TokenStorageService, private router: Router) {
  }

  async login(): Promise<void> {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    try {
      const response = await this.api.post({ endpoint: '/auth/login', data: { username, password }, });
      this.tokenStorageService.save(response.access_token);
      if (!this.tokenStorageService.isLogged()) new Error("Not logged in");
      // redirect to /users
      await this.router.navigate(['/users']);
    } catch (e) {
      console.log(e);
      alert("Identifiant ou mot de passe incorrect");
    }

  }

  ngOnInit(): void {
  }

}
