import { Injectable } from '@angular/core';
import { Association } from "./associations.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

export type Event = {
  id: number;
  name: string;
  start: Date;
  end: Date;
  association: Association;
};


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(id: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.backendUrl}/events/association/${id}`);
  }

  deleteEvent(id: number) : Observable<Event> {
    return this.http.delete<Event>(`${environment.backendUrl}/events/${id}`);
  }
}
