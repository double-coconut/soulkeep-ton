import { Component, inject, OnInit } from '@angular/core';
import { SoulService } from '@common/services/soul.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { EMPTY, Observable, throwError } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoaderService } from '@common/services/loader.service';
import { Soul } from '@common/type/soul';
import { User } from '@common/type/level';
import { AuthService } from '@common/services/auth.service';
import { InfoPopupComponent } from '../../../../../../popups/info-popup/info-popup.component';
import { PopupService } from '@common/services/popup.service';
import { Transaction } from '@common/type/soul-buy';
import { AeonPopupComponent } from '../../../../../../popups/aeon-popup/aeon-popup.component';
import { TransactionStatus } from '@common/enums/transactionStatus';

@Component({
  selector: 'app-souls-buy',
  templateUrl: './souls-buy.component.html',
  styleUrls: ['./souls-buy.component.scss']
})
@UntilDestroy()
export class SoulsBuyComponent implements OnInit {
  public souls?: Soul[];
  private soulService: SoulService = inject(SoulService);
  private loaderService: LoaderService = inject(LoaderService);
  private authService: AuthService = inject(AuthService);
  private popupService: PopupService = inject(PopupService);

  constructor() {}

  ngOnInit(): void {
    this.initSoulsMarket();
  }

  public initSoulsMarket(): void {
    this.soulService
      .getSoulMarkets()
      .pipe(
        catchError((e) => {
          this.loaderService.hideLoadingOverlay();
          return throwError(e);
        }),
        untilDestroyed(this)
      )
      .subscribe((souls) => (this.souls = souls));
  }

  public handleBySouls(id: number): void {
    this.loaderService.showLoadingOverlay();
    this.soulService
      .buySouls(id)
      .pipe(
        switchMap((transaction: Transaction) => {
          this.loaderService.hideLoadingOverlay();
          return this.popupService.openModal(AeonPopupComponent, {
            transaction
          }).close$;
        }),
        switchMap((id) =>
          this.soulService.checkSoulTransactionStatus(id as number)
        ),
        switchMap((res) => {
          this.loaderService.hideLoadingOverlay();
          if (res?.status === TransactionStatus.RESOLVED) {
            return this.fetchBalancesAndUpdateUser();
          }
          this.showPurchaseErrorPopup();
          return EMPTY;
        }),
        catchError((e) => {
          this.loaderService.hideLoadingOverlay();
          this.showPurchaseErrorPopup();
          return throwError(e);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private fetchBalancesAndUpdateUser(): Observable<User> {
    return this.authService.updateUser().pipe(
      tap(() => this.loaderService.hideLoadingOverlay()),
      tap(() => this.authService.updateUser()),
      tap(() => this.loaderService.hideLoadingOverlay()),
      tap(() => this.showPurchaseSuccessPopup())
    );
  }

  private showPurchaseSuccessPopup(): void {
    this.popupService.openModal(InfoPopupComponent, {
      title: 'SUCCESSFUL PURCHASE'
    });
  }

  private showPurchaseErrorPopup(): void {
    this.popupService.openModal(InfoPopupComponent, {
      title: 'Something went wrong, please try again.'
    });
  }
}
