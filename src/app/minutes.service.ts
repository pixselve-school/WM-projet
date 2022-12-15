import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Minute } from './associations.service';
import { environment } from '../environments/environment';

export type CreateMinute = {
  date: string;
  idVoters: number[];
  content: string;
  idAssociation: string;
};

@Injectable({
  providedIn: 'root',
})
export class MinutesService {
  constructor(private http: HttpClient) {}

  createMinute(data: CreateMinute): Observable<Minute> {
    return this.http.post<Minute>(`${environment.backendUrl}/minutes`, data);
  }
}
