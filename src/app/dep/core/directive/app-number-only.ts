import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (event.key === '.' || !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}