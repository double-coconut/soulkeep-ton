import { Component } from '@angular/core';
import { HomeControllerComponent } from '@common/components/home.controller.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HomeControllerComponent {}
