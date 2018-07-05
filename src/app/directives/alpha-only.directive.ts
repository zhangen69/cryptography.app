import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAlphaOnly]'
})
export class AlphaOnlyDirective {
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^[a-zA-Z ]/g);

  constructor(private el: ElementRef) { }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    if (event.key && !String(event.key).match(this.regex)) {
      event.preventDefault();
    }
  }
}
