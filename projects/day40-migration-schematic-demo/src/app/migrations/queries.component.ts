import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-queries',
  standalone: true,
  imports: [],
  template: `
    <h2>ViewChild, ContentChild, ContentChildren</h2>
    <p>queries works!</p>
    <ng-content select="[header]">A</ng-content>
    <ng-content>B</ng-content>
    <div>Appendheader: {{ appendHeader }}</div>
    <div>List: {{ list }}</div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueriesComponent implements AfterContentInit {
  name = 'ViewChild, ContentChild, ContentChildren';

  @ContentChild('header') header!: ElementRef<HTMLDivElement>;
  @ContentChildren('p') body!: QueryList<ElementRef<HTMLParagraphElement>>;

  appendHeader = '';
  list = '';

  ngAfterContentInit(): void {
    this.appendHeader = `${this.header.nativeElement.textContent} Appended`;
    this.list = this.body.map((p) => p.nativeElement.textContent).join('---');
  }
}
