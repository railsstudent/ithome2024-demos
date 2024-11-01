import { ChangeDetectionStrategy, Component, ElementRef, computed, contentChild, contentChildren } from '@angular/core';

@Component({
  selector: 'app-queries',
  standalone: true,
  imports: [],
  template: `
    <h2>ViewChild, ContentChild, ContentChildren</h2>
    <p>queries works!</p>
    <ng-content select="[header]">A</ng-content>
    <ng-content>B</ng-content>
    <div>Appendheader: {{ appendHeader() }}</div>
    <div>List: {{ list() }}</div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueriesComponent {
  name = 'ViewChild, ContentChild, ContentChildren';

  readonly header = contentChild.required<ElementRef<HTMLDivElement>>('header');
  readonly body = contentChildren<ElementRef<HTMLParagraphElement>>('p');

  appendHeader = computed(() => `${this.header().nativeElement.textContent} Appended`);
  list = computed(() => this.body().map((p) => p.nativeElement.textContent).join('---'));
}
