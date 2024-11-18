import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePopup } from '@common/components/base-popup';
import { ImageBlobPipe } from '@common/pipes/image-blob.pipe';

@Component({
  selector: 'app-info-popup',
  standalone: true,
  imports: [CommonModule, ImageBlobPipe],
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent extends BasePopup {
  constructor() {
    super();
  }
}
