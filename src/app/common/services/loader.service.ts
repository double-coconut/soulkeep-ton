import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface PreloadResponse {
  loadedItems?: number;
  numItems?: number;
  progress: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private showLoaderSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public showLoader$: Observable<boolean> = this.showLoaderSub.asObservable();
  private loadingOverlaySub: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public loadingOverlay$: Observable<boolean> =
    this.loadingOverlaySub.asObservable();
  private progressStatusSub: BehaviorSubject<PreloadResponse> =
    new BehaviorSubject<PreloadResponse>({ progress: 0 });
  public progressStatus$: Observable<PreloadResponse> =
    this.progressStatusSub.asObservable();
  private currentPercent: number = 0;
  private allowSound: boolean = true;

  constructor() {}

  public changeLoadingState(val: boolean): void {
    this.showLoaderSub.next(val);
  }

  public updateProgress(val: PreloadResponse): void {
    this.currentPercent = val.progress;
    this.progressStatusSub.next(val);
    if (val.progress >= 100) {
      this.progressStatusSub.next({ progress: 100 });
    }
  }

  public updateSoundPermission(isAllowed: boolean): void {
    this.allowSound = isAllowed;
  }

  public getCurrentPercent(): number {
    return this.currentPercent;
  }

  public isSoundAllowed(): boolean {
    return this.allowSound;
  }

  public showLoadingOverlay(): void {
    this.loadingOverlaySub.next(true);
  }

  public hideLoadingOverlay(): void {
    this.loadingOverlaySub.next(false);
  }
}
