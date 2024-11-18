import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { Observable, of, switchMap } from "rxjs";
import { AuthService } from "@common/services/auth.service";
import { catchError } from "rxjs/operators";
import { LoaderService } from "@common/services/loader.service";
import { SK_REF_ID } from "@common/utils/consts";

@Injectable({
  providedIn: 'root'
})
export class MainModuleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  canActivate(route: ActivatedRouteSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.authService.splToken;
    const skRefId = route.queryParamMap.get(SK_REF_ID);
    if (token && !this.authService.user) {
      return this.authService.authConnect().pipe(
        switchMap(() => {
          this.loaderService.changeLoadingState(false);
          if (skRefId) {
            return this.router.navigateByUrl(skRefId);
          }
          return of(true);
        }),
        catchError(() => this.router.navigateByUrl('auth'))
      );
    } else if (token && this.authService.user) {
      this.loaderService.changeLoadingState(false);
      if (skRefId) {
        return this.router.navigateByUrl(skRefId);
      }
      return true;
    }
    return this.router.navigateByUrl('auth');
  }
}
