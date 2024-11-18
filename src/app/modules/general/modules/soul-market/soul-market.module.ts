import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoulMarketComponent } from './soul-market.component';
import { CountDownPipe } from '@common/pipes/count-down.pipe';
import { SoulsBalanceComponent } from '@common/components/souls-balance/souls-balance.component';
import { TabButtonsComponent } from '@general/components/tab-buttons/tab-buttons.component';
import { SoulsBuyComponent } from './components/souls-buy/souls-buy.component';
import { SoulMarketRoutingModule } from '@general/modules/soul-market/soul-market-routing.module';
import { SortPipe } from '@common/pipes/sort';

@NgModule({
  declarations: [SoulMarketComponent, SoulsBuyComponent],
  imports: [
    CommonModule,
    CountDownPipe,
    SoulsBalanceComponent,
    TabButtonsComponent,
    SoulMarketRoutingModule,
    SortPipe
  ]
})
export class SoulMarketModule {}
