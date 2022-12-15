import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Role } from './roles.service';
import { User } from './users.service';

export type Association = {
  id: number;
  name: string;
  members: AssociationMember[];
};

export type AssociationMember = {
  id: number;
  lastname: string;
  firstname: string;
  age: number;
  role: string;
};

export type NewAssociation = {
  name: string;
  idUsers: number[];
};

export type Minute = {
  id: number;
  content: string;
  date: string;
  association: Association;
  voters: User[];
};

@Injectable({
  providedIn: 'root',
})
export class AssociationsService {
  constructor(private http: HttpClient) {}

  getAssociations(): Observable<Association[]> {
    return this.http.get<Association[]>(
      `${environment.backendUrl}/associations`
    );
  }

  newAssociation(association: NewAssociation): Observable<Association> {
    return this.http.post<Association>(
      `${environment.backendUrl}/associations`,
      association
    );
  }

  getAssociation(id: number): Observable<Association> {
    return this.http.get<Association>(
      `${environment.backendUrl}/associations/${id}`
    );
  }

  deleteAssociation(id: number): Observable<Association> {
    return this.http.delete<Association>(
      `${environment.backendUrl}/associations/${id}`
    );
  }

  getRoles(id: number): Observable<Role[]> {
    return this.http.get<Role[]>(
      `${environment.backendUrl}/associations/${id}/roles`
    );
  }

  updateMembers(
    idAssociation: number,
    idUsers: number[]
  ): Observable<Association> {
    return this.http.put<Association>(
      `${environment.backendUrl}/associations/${idAssociation}`,
      { idUsers }
    );
  }

  getMinutes(id: number): Observable<Minute[]> {
    return this.http.get<Minute[]>(
      `${environment.backendUrl}/associations/${id}/minutes`
    );
  }
}
