import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '@common/services/loader.service';
import { WithDelayPipe } from '@common/pipes/with-delay.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, WithDelayPipe],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
@UntilDestroy()
export class LoadingComponent implements OnInit {
  @Input() forceShow: boolean = false;
  @Output() handleStartButtonClick: EventEmitter<void> =
    new EventEmitter<void>();
  public loadingProgress: number = 0;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    if (this.forceShow) {
      this.illustrativeLoading();
    } else {
      this.detectLoaderProgress();
    }
  }

  public hideLoader(): void {
    if (this.forceShow) {
      this.handleStartButtonClick.emit();
    } else {
      this.loaderService.changeLoadingState(false);
      if (this.loaderService.isSoundAllowed()) {
      }
    }
  }

  private detectLoaderProgress(): void {
    this.loaderService.progressStatus$
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.loadingProgress = Math.min(
          Math.max(this.loadingProgress, res.progress),
          100
        );
      });
  }

  private illustrativeLoading(): void {
    timer(0, 5)
      .pipe(
        untilDestroyed(this),
        map((d) => d * 10),
        takeWhile((val) => val <= 100)
      )
      .subscribe(
        (res) =>
          (this.loadingProgress = Math.min(
            Math.max(this.loadingProgress, res),
            100
          ))
      );
  }
}
