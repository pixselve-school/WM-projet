import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";

export type VerificationResult = {
  title: string;
  message: string;
};

export type VerificationBody = {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http: HttpClient) {}

  async verify(token: string): Promise<Observable<HttpResponse<any>>> {
    let body: VerificationBody = { token: token };
    return this.http.post<HttpResponse<any>>(`${environment.backendUrl}/verification`, body);
  }
}
