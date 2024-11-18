import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModuleGuard } from '@common/guards/main-module.guard';
import { AuthComponent } from '@general/modules/auth/auth/auth.component';
import { AuthModuleGuard } from '@common/guards/auth-module.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/desktop/desktop.module').then((m) => m.DesktopModule),
    canActivate: [MainModuleGuard]
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./modules/general/modules/landing/landing.module').then(
        (m) => m.LandingModule
      ),
    canActivate: [AuthModuleGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () =>
      import('@general/modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthModuleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
