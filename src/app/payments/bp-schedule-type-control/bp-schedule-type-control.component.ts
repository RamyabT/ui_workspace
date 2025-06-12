// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  BpScheduleTypeFormControlService  }  from './bp-schedule-type-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-bp-schedule-type-control',
templateUrl: './bp-schedule-type-control.component.html',
styleUrls: ['./bp-schedule-type-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BpScheduleTypeFormControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BpScheduleTypeFormControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private bpScheduleTypeFormControlService: BpScheduleTypeFormControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.bpScheduleTypeFormControlService);

	} 
	
	// 8. End
}