import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<div>It works</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'day43-toSignal-equal';
}
