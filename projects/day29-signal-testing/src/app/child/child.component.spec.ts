import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the signal input', () => {
    const count: HTMLParagraphElement = fixture.debugElement
      .query(By.css('[data-testId="count"]')).nativeElement;
    expect(count.textContent).toBe('Count: 0');
  
    const double: HTMLParagraphElement = fixture.debugElement
      .query(By.css('[data-testId="double"]')).nativeElement;
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
