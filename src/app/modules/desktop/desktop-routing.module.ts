import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@general/modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'soul-market',
    loadChildren: () =>
      import('../general/modules/soul-market/soul-market.module').then(
        (m) => m.SoulMarketModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesktopRoutingModule {
}
