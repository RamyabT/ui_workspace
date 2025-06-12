// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-cc-limit-amount',
templateUrl: './cc-limit-amount.component.html',
styleUrls: ['./cc-limit-amount.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CCAmountSliderComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CCAmountSliderComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Input() override min: number | string | null = 0;
	@Input() override max :  number | string | null = 0;
	@Input() step!: string ;
	@Input() currencyCode: string="";
	// event methods
	override doPreInit(): void {
	  //this.setHelper(this.cCAmountSliderHelper);

	} 
	
	// 8. End
}