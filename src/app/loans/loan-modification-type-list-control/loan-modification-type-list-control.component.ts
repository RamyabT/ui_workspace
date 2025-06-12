// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  LoanModificationTypeControlService  }  from './loan-modification-type-list-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-loan-modification-type-list-control',
templateUrl: './loan-modification-type-list-control.component.html',
styleUrls: ['./loan-modification-type-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LoanModificationTypeControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoanModificationTypeControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private loanModificationTypeControlService: LoanModificationTypeControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.loanModificationTypeControlService);

	} 
	
	// 8. End
}