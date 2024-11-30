import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interface/User.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {
    // Initialize with data from localStorage if available
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
  }

  login(username: string, password: string): Observable<User> {
    const body = { username, password };

    return this.httpClient.post<User>(`${this.authUrl}/login`, body).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
}
