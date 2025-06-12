// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  pcUnblockReasonService  }  from './pcUnblockReason.service';
	

// 2. Component Selector
@Component({
selector: 'app-pcUnblockReason',
templateUrl: './pcUnblockReason.component.html',
styleUrls: ['./pcUnblockReason.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => pcUnblockReasonComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class pcUnblockReasonComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private pcUnblockReasonService: pcUnblockReasonService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.pcUnblockReasonService);

	} 
	
	// 8. End
}