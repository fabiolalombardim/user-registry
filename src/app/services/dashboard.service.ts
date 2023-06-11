import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private config: ConfigService, private http: HttpClient) { }

  apiURL = this.config.apiEndpoint

    // Read
    loadUsers() {
      return this.http.get<User[]>(`${this.apiURL}`);
    }
}
