// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-amount-control',
templateUrl: './amount-control.component.html',
styleUrls: ['./amount-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => AmountControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class AmountControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

  @Input() CurrencyList!: any[];
  @Input() isCurrEditable!: boolean;
  @Input() defaultFetch!: boolean;
  @Input() initCurrency!: any;
  @Input() amountInWords!: any;
	// event methods
	override doPreInit(): void {

	} 
	
	// 8. End
}