// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  RetailSplitTypeControlService  }  from './retail-split-type-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-retail-split-type-control',
templateUrl: './retail-split-type-control.component.html',
styleUrls: ['./retail-split-type-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RetailSplitTypeControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RetailSplitTypeControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private retailSplitTypeControlService: RetailSplitTypeControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.retailSplitTypeControlService);

	} 
	
	// 8. End
}