import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  private apiUrl = 'https://motivational-phrases-6jnq5ysi5-benjamins-projects-1248670c.vercel.app/api/phrases';
  constructor(private http: HttpClient) { }

  getrandomPhrase(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
