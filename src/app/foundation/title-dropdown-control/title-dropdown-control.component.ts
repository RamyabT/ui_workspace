// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  titledropdowncontrolService  }  from './title-dropdown-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-title-dropdown-control',
templateUrl: './title-dropdown-control.component.html',
styleUrls: ['./title-dropdown-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => titledropdowncontrolComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class titledropdowncontrolComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private titledropdowncontrolService: titledropdowncontrolService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.titledropdowncontrolService);

	} 
	
	// 8. End
}