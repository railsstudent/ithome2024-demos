import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-child',
    imports: [],
    template: `
    <p>Child works!</p>
    <p data-testId="count">Count: {{ count() }}</p>
    <p data-testId="double">Double: {{ double() }}</p>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  count = input(0);
  double = computed(() => this.count() * 2);
} 
