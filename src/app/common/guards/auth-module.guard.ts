import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '@common/services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthModuleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.authService.splToken;
    if (token && !this.authService.user) {
      return this.authService.authConnect().pipe(
        switchMap(() => this.router.navigateByUrl('/')),
        catchError(() => of(true))
      );
    } else if (!token && !this.authService.user) {
      return true;
    }
    return false;
  }
}
