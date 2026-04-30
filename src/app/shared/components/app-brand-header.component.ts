import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-brand-header',
  templateUrl: './app-brand-header.component.html',
  styleUrl: './app-brand-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBrandHeaderComponent {}
