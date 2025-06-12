// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-salary-monthly-income',
templateUrl: './salary-monthly-income.component.html',
styleUrls: ['./salary-monthly-income.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => SalaryMonthlyIncomeComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class SalaryMonthlyIncomeComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {

	} 
	Onkeypressevents(event:any): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		  return false;
	} 
		return true;
	
	  }
	// 8. End
}