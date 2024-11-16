import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  private apiUrl = 'https://motivational-phrases-api.vercel.app/api/phrases';
  constructor(private http: HttpClient) { }

  getRandomPhrase(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}
