// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  BudgetFrequencyControlService  }  from './budget-frequency-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-budget-frequency-control',
templateUrl: './budget-frequency-control.component.html',
styleUrls: ['./budget-frequency-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BudgetFrequencyControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BudgetFrequencyControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private budgetFrequencyControlService: BudgetFrequencyControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.budgetFrequencyControlService);

	} 
	
	// 8. End
}