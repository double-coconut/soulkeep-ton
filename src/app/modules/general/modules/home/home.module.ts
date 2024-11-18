import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ToArrayPipe } from '@common/pipes/to-array.pipe';
import { RouterLink } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SoulsBalanceComponent } from '@common/components/souls-balance/souls-balance.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ToArrayPipe,
    RouterLink,
    NgxSliderModule,
    SoulsBalanceComponent
  ]
})
export class HomeModule {}
