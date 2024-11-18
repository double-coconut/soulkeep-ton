import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SoulTab } from '@common/enums/soul-tab';

@Component({
  selector: 'app-tab-buttons',
  templateUrl: './tab-buttons.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./tab-buttons.component.scss']
})
export class TabButtonsComponent {
  private location: Location = inject(Location);

  @Input() public buttonsClass: string = '';
  @Input() public buttonsText: SoulTab[] = [];
  @Input() public buttonValue: SoulTab = this.buttonsText[0];

  @Output() changeBottom: EventEmitter<SoulTab> = new EventEmitter<SoulTab>();

  public disabledButtons: string[] = [];

  public handleSoul(type: SoulTab): void {
    this.changeBottom.emit(type);
  }

  public handleBack(): void {
    this.location.back();
  }
}
