// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  rpContactMethodControlService  }  from './rp-contactmethod-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-rp-contactmethod-control',
templateUrl: './rp-contactmethod-control.component.html',
styleUrls: ['./rp-contactmethod-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => rpContactMethodControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class rpContactMethodControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private rpContactMethodControlService: rpContactMethodControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.rpContactMethodControlService);

	} 
	
	// 8. End
}