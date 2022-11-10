import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from "../api-helper.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.post({endpoint: '/auth/login', data: { username, password },}).then(response => console.log(response));
  }

  constructor(private api: ApiHelperService) {
  }

  ngOnInit(): void {
  }

}
