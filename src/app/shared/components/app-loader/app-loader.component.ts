import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLoaderComponent {}
