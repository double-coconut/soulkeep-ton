import { NgModule } from '@angular/core';
import { LandingComponent } from '@general/modules/landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '@general/components/loading/loading.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, LoadingComponent],
  declarations: [LandingComponent]
})
export class LandingModule {}
