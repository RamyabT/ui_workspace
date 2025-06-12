// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { ChargesValidator } from './charges-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-charges-control',
templateUrl: './charges-control.component.html',
styleUrls: ['./charges-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ChargesControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ChargesControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,
		private chargesValidator:ChargesValidator
	) {
	super(controlContainer,changeDetectorRef);
	}

  @Input() CurrencyList!: any[];
  @Input() isCurrEditable!: boolean;
  @Input() defaultFetch!: boolean;
  @Input() initCurrency!: any;
  @Input() amountInWords!:any
	// event methods
	override doPreInit(): void {
		this.addPKList(['chargesAmount']);
		
	} 
	
	// 8. End
}