import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[uppercase]'
})
export class UppercaseDirective {
  constructor(private ref: ElementRef) { }

  @HostListener('keyup', [ '$event' ])
  onkeyup(event: KeyboardEvent) {
    this.ref.nativeElement.value = this.ref.nativeElement.value.toUpperCase();
  }

}
