import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment/environment';
import { InterceptorSkipHeader } from '@common/services/auth.interceptor';
import { User } from '@common/type/level';
import {
  getFromStorage,
  setToStorage,
  StorageKey
} from '@common/utils/storage';
import { LoaderService } from '@common/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user?: User | null;
  public splToken = getFromStorage(StorageKey.Token);

  constructor(private router: Router, private http: HttpClient, private loaderService: LoaderService) {}

  public telegramLogin(user: any): Observable<any> {
    return this.http.post(`${environment.baseApi}/auth/telegram`, user).pipe(
      tap((data: any) => {
        this.user = {
          ...data,
          isDeckTutorialPassed: true,
          isGameTutorialPassed: true
        };
        this.saveToken(data.jwtToken);
      })
    );
  }

  public updateUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseApi}/client/me`).pipe(
      tap(
        (user: User) =>
          (this.user = {
            ...user,
            isDeckTutorialPassed: true,
            isGameTutorialPassed: true
          })
      )
    );
  }

  public logout(): Promise<boolean> {
    this.user = null;
    this.splToken = null;
    localStorage.removeItem('spl:token');
    localStorage.removeItem('soulkeep:token');
    return this.router.navigateByUrl('/landing');
  }

  public authConnect(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.splToken}`)
      .set(InterceptorSkipHeader, 'true');
    return this.http
      .post<User>(`${environment.baseApi}/auth/login`, null, {
        headers
      })
      .pipe(
        tap((user: User) => (this.user = user)),
        catchError((e) => {
          debugger;
          this.logout();
          return throwError(e);
        })
      );
  }

  private saveToken(token: string): void {
    this.splToken = token;
    setToStorage(StorageKey.Token, token);
  }
}
