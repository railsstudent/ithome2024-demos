import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const buttonClick = <T>(el: DebugElement, fixture: ComponentFixture<T>, 
    target: HTMLElement, expected: string) => {    

    el.nativeElement.click();
    fixture.detectChanges();
    expect(target.textContent).toBe(expected);
}

export const getElement = <T>(fixture: ComponentFixture<T>, key: string): DebugElement => {
    return fixture.debugElement.query(By.css(key));
}