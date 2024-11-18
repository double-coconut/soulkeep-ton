import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PopupService } from '@common/services/popup.service';
import { LoaderService } from '@common/services/loader.service';
import { SoulService } from '@common/services/soul.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('popup', { read: ViewContainerRef, static: true })
  entry!: ViewContainerRef;
  public showLoader: boolean = true;

  constructor(
    private loaderService: LoaderService,
    private popupService: PopupService,
    private soulService: SoulService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.popupService.entry = this.entry;
    this.initLoaderData();
    this.initCssVariables();
    this.soulService.fetchTransactions().subscribe();
  }

  private initLoaderData(): void {
    this.loaderService.showLoader$.subscribe((showLoader) => {
      this.showLoader = showLoader;
      this.cd.detectChanges();
    });
  }

  @HostListener('window:resize', ['$event'])
  private handleResize(): void {
    this.initCssVariables();
  }

  private initCssVariables(): void {
    const root = document.documentElement;
    const vh = document.body.clientHeight;
    const vw = document.body.clientWidth;

    if (!root || !vh || !vw) {
      return;
    }

    root.style.setProperty('--vw', vw.toString());
    root.style.setProperty('--vh', vh.toString());
  }
}
