import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { buttonClick, getElement } from './test/button-test.util';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should increase the counter by 1', () => {  
    const value: HTMLParagraphElement = getElement(fixture, '[id="value"]').nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const el = getElement(fixture, '[id="increase"]');      
    buttonClick(el, fixture, value, 'Value: 1');
  });

  it('should increase the counter by 2 after 2 button clicks', () => {  
    const value: HTMLParagraphElement = getElement(fixture, '[id="value"]').nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const el = getElement(fixture, '[id="increase"]');
    buttonClick(el, fixture, value, 'Value: 1');
    buttonClick(el, fixture, value, 'Value: 2');
  });

  it('should decrease the counter by 1 after a button click', () => {  
    const value: HTMLParagraphElement = getElement(fixture, '[id="value"]').nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const el = getElement(fixture, '[id="decrease"]');    
    buttonClick(el, fixture, value, 'Value: -1');
  });

  it('should decrease the counter by 2 after 2 button clicks', () => {
    const value: HTMLParagraphElement = getElement(fixture, '[id="value"]').nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const el = getElement(fixture, '[id="decrease"]');
    buttonClick(el, fixture, value, 'Value: -1');
    buttonClick(el, fixture, value, 'Value: -2');
  });

  it('should increase the counter by 2', () => {  
    const value: HTMLParagraphElement = getElement(fixture, '[id="value"]').nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const el = getElement(fixture, '[id="increase2"]');
    buttonClick(el, fixture, value, 'Value: 2');
  });

  it('should decrease the counter by 2', () => {
    const value: HTMLParagraphElement = getElement(fixture, '[id="value"]').nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const el = getElement(fixture, '[id="decrease2"]');
    buttonClick(el, fixture, value, 'Value: -2');
  });

  // it('should log the value', () => {
  //   const appService = TestBed.inject(AppService);
  //   const spy = spyOn(appService, 'log');
  //   fixture.detectChanges();
    
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });

  // it('should log the value 2 times', () => {
  //   const value: HTMLDivElement = fixture.debugElement.query(
  //     By.css('[id="value"]'),
  //   ).nativeElement;

  //   const appService = TestBed.inject(AppService);
  //   const spy = spyOn(appService, 'log');
  //   fixture.detectChanges();
    
  //   expect(spy).toHaveBeenCalledTimes(1);

  //   const key = '[id="decrease2"]';
  //   fixture.debugElement.query(By.css(key)).nativeElement.click();
  //   fixture.detectChanges();

  //   expect(value.textContent).toBe('Value: -2');

  //   // Why is the test result not 2?
  //   // expect(spy).toHaveBeenCalledTimes(2);
  // });

  it('should reset the counter to 0', () => {
    const value: HTMLParagraphElement = getElement(fixture, '[id="value"]').nativeElement;
    expect(value.textContent).toBe('Value: 0');
    
    const el = getElement(fixture, '[id="increase2"]');
    buttonClick(el, fixture, value, 'Value: 2');
    buttonClick(el, fixture, value, 'Value: 4');

    const elReset = getElement(fixture, '[id="reset"]');
    buttonClick(elReset, fixture, value, 'Value: 0');
  });

  it('should update the child component', () => {
    const value: HTMLParagraphElement = getElement(fixture, '[id="value"]').nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const el = getElement(fixture, '[id="increase2"]');
    buttonClick(el, fixture, value, 'Value: 2');

    const count: HTMLParagraphElement = getElement(fixture, '[data-testId="count"]').nativeElement;
    const double: HTMLParagraphElement = getElement(fixture, '[data-testId="double"]').nativeElement;
    expect(count.textContent).toBe('Count: 2');
    expect(double.textContent).toBe('Double: 4');
  });
});
