import { Component } from '@angular/core';
import { SoulTab } from '@common/enums/soul-tab';

@Component({
  selector: 'app-soul-market',
  templateUrl: './soul-market.component.html',
  styleUrls: ['./soul-market.component.scss']
})
export class SoulMarketComponent {
  public currentTab: SoulTab = SoulTab.SOULS_BUY;
  public SoulTab = SoulTab;

  constructor() {}

  public handleChangePageValue(value: SoulTab): void {
    this.currentTab = value;
  }
}
