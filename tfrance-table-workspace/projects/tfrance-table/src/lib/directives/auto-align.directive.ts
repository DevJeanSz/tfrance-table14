import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'td, th', // aplica em todos os tds e ths
  standalone: true
})
export class AutoAlignDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const observer = new MutationObserver(() => this.checkAndAlign());

    observer.observe(this.el.nativeElement, {
      childList: true,
      characterData: true,
      subtree: true
    });

    this.checkAndAlign(); // primeira verificação
  }

  private checkAndAlign(): void {
    const text = this.el.nativeElement.textContent?.trim();

    const isNumeric = text && !isNaN(Number(text));

    this.renderer.setStyle(
      this.el.nativeElement,
      'text-align',
      isNumeric ? 'end' : 'start'
    );
  }
}
