import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
}
