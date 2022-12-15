import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './users.service';
import { Association } from './associations.service';
import { environment } from '../environments/environment';

export type Role = {
  name: string;
  user: User;
  association: Association;
  associationId: number;
  userId: number;
};

export type CreateRole = {
  idAssociation: number;
  idUser: number;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  createRole(role: CreateRole): Observable<Role> {
    return this.http.post<Role>(`${environment.backendUrl}/roles`, role);
  }

  createRoles(roles: CreateRole[]): Observable<Role[]> {
    // using for loop
    const observables = [];
    for (const role of roles) {
      observables.push(this.createRole(role));
    }
    return forkJoin(observables);
  }

  editRole(role: CreateRole): Observable<Role> {
    return this.http.put<Role>(
      `${environment.backendUrl}/roles/${role.idUser}/${role.idAssociation}`,
      { name: role.name }
    );
  }
}
