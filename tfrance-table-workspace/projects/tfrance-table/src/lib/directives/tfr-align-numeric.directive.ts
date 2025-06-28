import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[tfrAlignNumeric]',
  standalone: true
})
export class TfrAlignNumericDirective implements OnChanges {
  @Input() tfrAlignNumeric: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const value = this.tfrAlignNumeric;

    const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

    this.renderer.setStyle(
      this.el.nativeElement,
      'text-align',
      isNumeric ? 'end' : 'start'
    );
  }
}
