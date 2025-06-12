// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  DcCancelReasonListControlService  }  from './dc-cancel-reason-list-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-dc-cancel-reason-list-control',
templateUrl: './dc-cancel-reason-list-control.component.html',
styleUrls: ['./dc-cancel-reason-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DcCancelReasonListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DcCancelReasonListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private dcCancelReasonListControlService: DcCancelReasonListControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.dcCancelReasonListControlService);

	} 
	
	// 8. End
}