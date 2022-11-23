import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Association = {
  id: number;
  name: string;
  members: AssociationMember[];
};

export type AssociationMember = {
  lastname: string;
  firstname: string;
  age: number;
  role: string;
};

@Injectable({
  providedIn: 'root',
})
export class AssociationsService {
  constructor(private http: HttpClient) {}

  getAssociations(): Observable<Association[]> {
    return this.http.get<Association[]>('http://localhost:3000/associations');
  }
}
