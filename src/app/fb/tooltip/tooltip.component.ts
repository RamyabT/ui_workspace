import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    <div class="tooltip" [ngStyle]="{ 'left': position.left + 'px', 'top': position.top + 'px' }">
      {{ text }}
    </div>
  `,
  styles: [`
    .tooltip {
      position: fixed;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 5px;
      border-radius: 5px;
      z-index: 1000;
      transition: opacity 0.2s ease-in-out;
      opacity: 1;
    }
  `]
})
export class TooltipComponent {
  @Input() text: string = '';
  @Input() position: { left: number; top: number } = { left: 0, top: 0 };
}
