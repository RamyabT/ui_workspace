// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-salary-or-monthly-income-component',
templateUrl: './salary-or-monthly-income-component.component.html',
styleUrls: ['./salary-or-monthly-income-component.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => SalaryOrMonthlyIncomeComponentComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class SalaryOrMonthlyIncomeComponentComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	protected  readonly maxLength : any = "16";
	protected  readonly minLength : any = "1";
	//  protected  readonly pattern : any = /^[0-9]{8,10}$/;
	protected  readonly pattern : any = /^[\+?\0-9]{1,16}$/;
	// event methods
	override doPreInit(): void {
	  //this.setHelper(this.salaryOrMonthlyIncomeComponentHelper);
	  this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	  this.addSyncValidatorFn(Validators.minLength(this.minLength));
	  this.addSyncValidatorFn(Validators.pattern(this.pattern));
	} 
	
	// 8. End
}