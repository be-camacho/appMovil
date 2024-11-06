import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ZenquoteService {
  private apiUrl = 'http://localhost:3000/api/random'; // Usa el servidor intermedio

  constructor(private http: HttpClient) {}

  getRandomQuote(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
