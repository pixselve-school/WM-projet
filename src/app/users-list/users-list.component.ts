import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  dataSource: { id: string, lastname: string, firstname: string, age: string }[] = [];

  firstname = new FormControl("", [Validators.required]);
  lastname = new FormControl("", [Validators.required]);
  age = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const resquest: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
    resquest.toPromise().then(response => this.dataSource = response.body);

  }

  get meanAge(): number {
    return this.dataSource.reduce((acc, user) => acc + Number(user.age), 0) / this.dataSource.length;
  }

  get minAge(): number {
    return this.dataSource.reduce((acc, user) => Math.min(acc, Number(user.age)), Number.MAX_SAFE_INTEGER);
  }

  get maxAge(): number {
    return this.dataSource.reduce((acc, user) => Math.max(acc, Number(user.age)), 0);
  }

}
