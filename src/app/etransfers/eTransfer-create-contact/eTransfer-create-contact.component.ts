// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  eTransferCreateContactService  }  from './eTransfer-create-contact.service';
	

// 2. Component Selector
@Component({
selector: 'app-eTransfer-create-contact',
templateUrl: './eTransfer-create-contact.component.html',
styleUrls: ['./eTransfer-create-contact.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => eTransferCreateContactComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class eTransferCreateContactComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private eTransferCreateContactService: eTransferCreateContactService
	) {
	super(controlContainer,changeDetectorRef);
	}

   @Input() textPosition: any = "after"; 
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.eTransferCreateContactService);

	} 
	
	// 8. End
}