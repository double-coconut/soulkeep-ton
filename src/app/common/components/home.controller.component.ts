import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { League, User, UserAvatar } from '@common/type/level';
import { PopupService } from '@common/services/popup.service';
import { AuthService } from '@common/services/auth.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, switchMap } from 'rxjs';
import { levelsCount } from '@common/utils/data';
import { InfoPopupComponent } from '../../popups/info-popup/info-popup.component';

@Component({
  selector: 'app-home-controller',
  standalone: true,
  template: ``
})
@UntilDestroy()
export class HomeControllerComponent implements OnInit {
  @ViewChild('bgVideo', { static: true, read: ElementRef })
  bgVideoRef?: ElementRef<HTMLVideoElement>;
  public clientMe?: User;
  public gatewayLevel?: string;
  protected readonly levelsCount = levelsCount;

  protected router: Router = inject(Router);
  protected authService: AuthService = inject(AuthService);
  protected popupService: PopupService = inject(PopupService);
  public currentLeague?: League;
  public userAvatar$?: Observable<UserAvatar>;

  async ngOnInit(): Promise<void> {
    this.clientMe = this.authService.user!;
    this.currentLeague = this.clientMe?.league as League;
    const clientLevel = this.clientMe?.level?.order ?? 0;
    this.gatewayLevel = `Gateway Level ${clientLevel}/${levelsCount}`;
  }

  public goToSurvey(): void {
    window.open(
      'https://doublecoconut.freshdesk.com/support/solutions/articles/42000108034',
      '_blank'
    );
  }

  public handleLogout(): void {
    this.popupService
      .openModal(InfoPopupComponent, {
        title: 'Are you sure you want to log out?',
        acceptText: 'YES',
        rejectText: 'NO'
      })
      .close$.pipe(
        filter((res) => !!res),
        switchMap(() => this.authService.logout())
      )
      .subscribe();
  }
}
