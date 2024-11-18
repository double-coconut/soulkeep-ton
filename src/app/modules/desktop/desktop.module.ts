import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopRoutingModule } from './desktop-routing.module';
import { ToArrayPipe } from '@common/pipes/to-array.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, DesktopRoutingModule, ToArrayPipe]
})
export class DesktopModule {}
