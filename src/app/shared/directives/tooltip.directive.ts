import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') tooltip: string | any;
  @Input() placement: string;
  @Input() delay: string;
  offset = 10;
  tooltipElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) { this.hide(); }
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltipElement, 'ng-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.tooltipElement, 'ng-tooltip-show');
    window.setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.removeChild(document.body, this.tooltipElement);
      }
      this.tooltipElement = null;
    }, parseInt(this.delay, 0));
  }

  create() {
    this.tooltipElement = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltip) // textNode
    );

    this.renderer.appendChild(document.body, this.tooltipElement);
    // this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);

    this.renderer.addClass(this.tooltipElement, 'ng-tooltip');
    this.renderer.addClass(this.tooltipElement, `ng-tooltip-${this.placement || 'top'}`);

    this.renderer.setStyle(this.tooltipElement, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltipElement, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltipElement, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltipElement, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }
}
