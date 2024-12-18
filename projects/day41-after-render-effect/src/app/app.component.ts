import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `<div>Testing</div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'day41-afterRenderEffect';
}
