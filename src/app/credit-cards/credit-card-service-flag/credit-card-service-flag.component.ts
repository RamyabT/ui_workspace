// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  CCServiceFlagControlService  }  from './credit-card-service-flag.service';
	

// 2. Component Selector
@Component({
selector: 'app-credit-card-service-flag',
templateUrl: './credit-card-service-flag.component.html',
styleUrls: ['./credit-card-service-flag.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CCServiceFlagControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CCServiceFlagControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private cCServiceFlagControlService: CCServiceFlagControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.cCServiceFlagControlService);

	} 
	
	// 8. End
}