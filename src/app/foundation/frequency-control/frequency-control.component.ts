// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  FrequencyControlService  }  from './frequency-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-frequency-control',
templateUrl: './frequency-control.component.html',
styleUrls: ['./frequency-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => FrequencyControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class FrequencyControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private frequencyControlService: FrequencyControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
		this.addDependencies(['serviceCode']);
	   this.setDataSource(this.frequencyControlService);

	} 
	
	// 8. End
}