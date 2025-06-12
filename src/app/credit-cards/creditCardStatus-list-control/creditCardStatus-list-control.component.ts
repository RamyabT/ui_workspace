// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  CreditCardStatusListControlService  }  from './creditCardStatus-list-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-creditCardStatus-list-control',
templateUrl: './creditCardStatus-list-control.component.html',
styleUrls: ['./creditCardStatus-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CreditCardStatusListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CreditCardStatusListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private creditCardStatusListControlService: CreditCardStatusListControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.creditCardStatusListControlService);

	} 
	
	// 8. End
}