import { Directive, ElementRef, HostListener, Input, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';
 
@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';
  private tooltipComponent: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  @HostListener('click')
  onClick() {
    if (this.tooltipComponent) {
      // If the tooltip is already shown, remove it
      this.removeTooltip();
    } else {
      // Create and show the tooltip
      this.showTooltip();
    }
  }

  private showTooltip() {
    const tooltipFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.tooltipComponent = tooltipFactory.create(this.injector);

    this.tooltipComponent.instance.text = this.tooltipText;
    const rect = this.el.nativeElement.getBoundingClientRect();

    // Position the tooltip below the clicked element
    this.tooltipComponent.instance.position = {
      left: rect.left + (rect.width / 2) - 50, // Center the tooltip
      top: rect.bottom + 5 // Positioning it just below the button
    };

    this.appRef.attachView(this.tooltipComponent.hostView);
    document.body.appendChild(this.tooltipComponent.location.nativeElement);
    
    // Add fade-out effect for tooltips
    setTimeout(() => {
      if (this.tooltipComponent) {
        this.tooltipComponent.location.nativeElement.style.opacity = '1'; // Set visible
      }
    }, 0);
  }

  private removeTooltip() {
    if (this.tooltipComponent) {
      this.appRef.detachView(this.tooltipComponent.hostView);
      this.tooltipComponent.destroy();
      this.tooltipComponent = null;
    }
  }
}
