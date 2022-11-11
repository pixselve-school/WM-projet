import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from "../api-helper.service";
import { TokenStorageService } from "../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  async login(): Promise<void> {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    const response = await this.api.post({ endpoint: '/auth/login', data: { username, password }, });
    this.tokenStorageService.save(response.access_token);
  }

  constructor(private api: ApiHelperService, private tokenStorageService: TokenStorageService,) {
  }

  ngOnInit(): void {
  }

}
