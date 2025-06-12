// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-dc-amount-slider',
templateUrl: './dc-amount-slider.component.html',
styleUrls: ['./dc-amount-slider.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DCAmountSliderControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DCAmountSliderControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

	// @Input() min:number;
	// @Input() max:number;
	// @Input() step: number;
	// @Input() currencyCode: string="";
	@Input() override min: number | string | null = 0;
	@Input() override max :  number | string | null = 0;
	@Input() step!: string ;
	@Input() currencyCode: string="";

	// event methods
	override doPreInit(): void {
	  //this.setHelper(this.dCAmountSliderControlHelper);

	} 
	
	// 8. End
}