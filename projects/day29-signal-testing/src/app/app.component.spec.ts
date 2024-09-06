import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should increase the counter by 1', () => {  
    const value: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[id="value"]'),
    ).nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const key = '[id="increase"]';
    const el = fixture.debugElement.query(By.css(key));      
    el.nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: 1');
  });

  it('should increase the counter by 2 after 2 button clicks', () => {  
    const value: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[id="value"]'),
    ).nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const key = '[id="increase"]';
    const el = fixture.debugElement.query(By.css(key));
    el.nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: 1');

    el.nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: 2');
  });

  it('should decrease the counter by 1 after a button click', () => {  
    const value: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[id="value"]'),
    ).nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const key = '[id="decrease"]';
    fixture.debugElement.query(By.css(key)).nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: -1');
  });

  it('should decrease the counter by 2 after 2 button clicks', () => {
    const value: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[id="value"]'),
    ).nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const key = '[id="decrease"]';
    const el = fixture.debugElement.query(By.css(key));
    el.nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: -1');

    el.nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: -2');
  });

  it('should increase the counter by 2', () => {  
    const value: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[id="value"]'),
    ).nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const key = '[id="increase2"]';
    fixture.debugElement.query(By.css(key)).nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: 2');
  });

  it('should decrease the counter by 2', () => {
    const value: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[id="value"]'),
    ).nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const key = '[id="decrease2"]';
    fixture.debugElement.query(By.css(key)).nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: -2');
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
    const value: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[id="value"]'),
    ).nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const key = '[id="increase2"]';
    const el = fixture.debugElement.query(By.css(key));
    el.nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: 2');

    el.nativeElement.click();
    fixture.detectChanges();

    expect(value.textContent).toBe('Value: 4');

    const resetKey = '[id="reset"]';
    const elReset = fixture.debugElement.query(By.css(resetKey));
    elReset.nativeElement.click();
    fixture.detectChanges();

    expect(value.textContent).toBe('Value: 0');
  });

  it('should update the child component', () => {
    const value: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[id="value"]'),
    ).nativeElement;
    expect(value.textContent).toBe('Value: 0');
  
    const key = '[id="increase2"]';
    const el = fixture.debugElement.query(By.css(key));
    el.nativeElement.click();
    fixture.detectChanges();
  
    expect(value.textContent).toBe('Value: 2');

    const count: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[data-testId="count"]')
    ).nativeElement;
    const double: HTMLParagraphElement = fixture.debugElement.query(
      By.css('[data-testId="double"]')
    ).nativeElement;

    expect(count.textContent).toBe('Count: 2');
    expect(double.textContent).toBe('Double: 4');
  });
});
