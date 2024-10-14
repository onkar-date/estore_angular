import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../interface/User.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  private userSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  constructor(private httpClient: HttpClient) {
    // Initialize with data from localStorage if available
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    this.userSubject = new BehaviorSubject<User | null>(user);
    this.user$ = this.userSubject.asObservable();
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  clearUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    const body = { username, password };

    return this.httpClient.post<User>(`${this.apiUrl}/login`, body).pipe(
      tap((user) => {
        this.setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this.clearUser();
  }
}
