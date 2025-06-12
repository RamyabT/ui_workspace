// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-tenure-slider-control',
templateUrl: './tenure-slider-control.component.html',
styleUrls: ['./tenure-slider-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => tenureSliderControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class tenureSliderControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

	@Input() override min!:number;
	@Input() override max!:number;
	@Input() step!: string;
	@Input() currencyCode: string="";
	 protected  readonly maxLength : any = "20";
	 protected  readonly minLength : any = "1";
	 protected  readonly pattern : any = /^[0-9.]{1,20}$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	  //this.setHelper(this.tenureSliderControlHelper);

	} 
	
	// 8. End
}