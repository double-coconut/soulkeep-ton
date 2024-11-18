import {
  ComponentRef,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PopupService {
  private componentRef!: ComponentRef<any>;
  private componentSubscriber!: Subject<string>;
  public entry?: ViewContainerRef | null;

  constructor() {}

  public openModal<T>(
    component: Type<T>,
    inputData?: any,
    entry?: ViewContainerRef
  ) {
    this.entry = entry || this.entry;
    if (!this.entry) {
      return;
    }
    this.entry.clear();
    this.componentRef = this.entry.createComponent(component);
    this.entry.element.nativeElement.parentNode.classList.add(
      'webPopup-container'
    );
    this.componentRef.instance.inputData = inputData;
    this.componentRef.instance.close$.subscribe((data: any) =>
      this.closeModal(data)
    );
    this.componentSubscriber = new Subject<string>();
    // return this.componentSubscriber.asObservable();
    return this.componentRef.instance;
  }

  closeModal(data: any) {
    this.entry?.element.nativeElement.parentNode.classList.remove(
      'webPopup-container'
    );
    this.componentSubscriber?.next(data);
    this.componentSubscriber?.complete();
    this.componentRef?.destroy();
  }
}
