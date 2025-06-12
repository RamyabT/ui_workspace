// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  LoanNoOfInstallmentsService  }  from './loan-no-of-installments-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-loan-no-of-installments-control',
templateUrl: './loan-no-of-installments-control.component.html',
styleUrls: ['./loan-no-of-installments-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LoanNoOfInstallmentsComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoanNoOfInstallmentsComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private loanNoOfInstallmentsService: LoanNoOfInstallmentsService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.loanNoOfInstallmentsService);

	} 
	
	// 8. End
}