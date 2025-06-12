// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  AcknowledgementControlService  }  from './acknowledgement-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-acknowledgement-control',
templateUrl: './acknowledgement-control.component.html',
styleUrls: ['./acknowledgement-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => AcknowledgementControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class AcknowledgementControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private acknowledgementControlService: AcknowledgementControlService
	) {
	super(controlContainer,changeDetectorRef);
	}

   @Input() textPosition: any = "after"; 
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.acknowledgementControlService);

	} 
	
	// 8. End
}