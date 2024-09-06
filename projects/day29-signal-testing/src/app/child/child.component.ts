import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: `
    <p>child works!</p>
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  count = input(0);
  double = computed(() => this.count() * 2);
} 
