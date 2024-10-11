import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: 'test',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
