import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoulMarketComponent } from './soul-market.component';

const routes: Routes = [
  {
    path: '',
    component: SoulMarketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoulMarketRoutingModule {}
