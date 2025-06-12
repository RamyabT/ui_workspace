// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  GoalDurationFormControlService  }  from './goal-duration-form-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-goal-duration-form-control',
templateUrl: './goal-duration-form-control.component.html',
styleUrls: ['./goal-duration-form-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => GoalDurationFormControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class GoalDurationFormControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private goalDurationFormControlService: GoalDurationFormControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.goalDurationFormControlService);

	} 
	
	// 8. End
}