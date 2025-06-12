// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  DualNationalityHolderControlService  }  from './dual-nationality-holder-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-dual-nationality-holder-control',
templateUrl: './dual-nationality-holder-control.component.html',
styleUrls: ['./dual-nationality-holder-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DualNationalityHolderControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DualNationalityHolderControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private dualNationalityHolderControlService: DualNationalityHolderControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.dualNationalityHolderControlService);

	} 
	
	// 8. End
}