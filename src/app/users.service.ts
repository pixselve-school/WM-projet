import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export type User = {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  age: number;
};

export type EditUser = {
  email?: string;
  lastname?: string;
  firstname?: string;
  age?: number;
  password?: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getOneUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.backendUrl}/users/${id}`);
  }

  updateUser(id: number, user: EditUser): Observable<User> {
    return this.http.put<User>(`${environment.backendUrl}/users/${id}`, user);
  }
}
