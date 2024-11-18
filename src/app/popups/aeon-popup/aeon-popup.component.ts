import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePopup } from '@common/components/base-popup';
import { SafeUrlPipe } from '@common/pipes/safe-url.pipe';

@Component({
  selector: 'app-aeon-popup',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './aeon-popup.component.html',
  styleUrls: ['./aeon-popup.component.scss']
})
export class AeonPopupComponent extends BasePopup {
  constructor() {
    super();
  }
}
