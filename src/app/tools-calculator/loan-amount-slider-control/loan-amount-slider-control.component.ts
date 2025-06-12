// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-loan-amount-slider-control',
templateUrl: './loan-amount-slider-control.component.html',
styleUrls: ['./loan-amount-slider-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LoanAmountSliderControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoanAmountSliderControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

	@Input() override min!:number;
	@Input() override max!:number;
	@Input() step!: string;
	@Input() currencyCode: string="";
	// event methods
	override doPreInit(): void {
	// dependency fields   Variables
	   
	this.addDependencies(['currency']);
	  //this.setHelper(this.loanAmountSliderControlHelper);

	} 
	
	// 8. End
}