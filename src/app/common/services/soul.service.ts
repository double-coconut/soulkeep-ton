import { Injectable } from '@angular/core';
import { Observable, repeat, take } from 'rxjs';
import { environment } from '@environment/environment';
import { filter, finalize } from 'rxjs/operators';
import { LoaderService } from '@common/services/loader.service';
import { HttpClient } from '@angular/common/http';
import { Soul } from '@common/type/soul';
import { TransactionStatus } from '@common/enums/transactionStatus';
import { Transaction } from '@common/type/soul-buy';

@Injectable({ providedIn: 'root' })
export class SoulService {
  constructor(private loaderService: LoaderService, private http: HttpClient) {}

  public getSoulMarkets(): Observable<Soul[]> {
    this.loaderService.showLoadingOverlay();
    return this.http
      .get<Soul[]>(`${environment.baseApi}/client/soul-markets`)
      .pipe(finalize(() => this.loaderService.hideLoadingOverlay()));
  }

  public buySouls(id: number): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${environment.baseApi}/client/soul-markets/${id}`,
      {}
    );
  }

  public fetchTransactions(): Observable<void> {
    return this.http.put<void>(
      `${environment.baseApi}/client/transactions`,
      {}
    );
  }

  public checkSoulTransactionStatus(
    transactionId: number
  ): Observable<{ status: TransactionStatus }> {
    return this.http
      .get<{
        status: TransactionStatus;
      }>(`${environment.baseApi}/client/transactions/${transactionId}/status`)
      .pipe(
        repeat({ delay: 3000 }),
        filter((res) => res.status !== TransactionStatus.PENDING),
        take(1)
      );
  }
}
