import { Component } from '@angular/core';
import { BasePopup } from './base-popup';

@Component({
  template: `
    <div class="modal-content">
      <span (click)="close$.emit()" class="close">&times;</span>
      <p>{{ inputData?.title }}</p>
    </div>
  `,
  styleUrls: ['./success-popup.component.scss'],
  standalone: true,
  imports: []
})
export class SuccessPopupComponent extends BasePopup {}
