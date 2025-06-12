// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  ScheduleTypeFormControlService  }  from './schedule-type-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-schedule-type-control',
templateUrl: './schedule-type-control.component.html',
styleUrls: ['./schedule-type-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ScheduleTypeFormControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ScheduleTypeFormControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private scheduleTypeFormControlService: ScheduleTypeFormControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
		this.addDependencies(['serviceCode']);
		
	   this.setDataSource(this.scheduleTypeFormControlService);

	} 
	
	// 8. End
}