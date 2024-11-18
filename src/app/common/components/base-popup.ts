import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';

@Directive()
export class BasePopup {
  @Output() close$ = new EventEmitter<any>();

  @Input() inputData: any;

  protected cd: ChangeDetectorRef = inject(ChangeDetectorRef);
}
