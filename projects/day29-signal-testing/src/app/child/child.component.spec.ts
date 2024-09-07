import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildComponent } from './child.component';
import { getElement } from '../test/button-test.util';

describe('ChildComponent', () => {
  let fixture: ComponentFixture<ChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildComponent);
    fixture.detectChanges();
  });

  it('should update the signal input', () => {
    const count: HTMLParagraphElement = getElement(fixture, '[data-testId="count"]').nativeElement;
    const double: HTMLParagraphElement = getElement(fixture, '[data-testId="double"]').nativeElement;
    expect(count.textContent).toBe('Count: 0');  
    expect(double.textContent).toBe('Double: 0');

    fixture.componentRef.setInput('count', 1);  
    fixture.detectChanges();

    expect(count.textContent).toBe('Count: 1');
    expect(double.textContent).toBe('Double: 2');

    fixture.componentRef.setInput('count', -2);  
    fixture.detectChanges();

    expect(count.textContent).toBe('Count: -2');
    expect(double.textContent).toBe('Double: -4');
  });
});
