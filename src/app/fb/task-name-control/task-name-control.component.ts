// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-task-name-control',
templateUrl: './task-name-control.component.html',
styleUrls: ['./task-name-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => TaskNameControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class TaskNameControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly pattern : any = /^[a-zA-Z0-9_.-]{1,50}$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}