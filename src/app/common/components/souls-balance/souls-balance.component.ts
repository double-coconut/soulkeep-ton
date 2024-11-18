import { Component, inject } from '@angular/core';
import { AuthService } from '@common/services/auth.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-souls-balance',
  standalone: true,
  templateUrl: './souls-balance.component.html',
  imports: [CommonModule, DecimalPipe, RouterLink],
  styleUrls: ['./souls-balance.component.scss']
})
export class SoulsBalanceComponent {
  public authService: AuthService = inject(AuthService);
}
