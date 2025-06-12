// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  PreferredMailingAddressService  }  from './preferred-mailing-address.service';
	

// 2. Component Selector
@Component({
selector: 'app-preferred-mailing-address',
templateUrl: './preferred-mailing-address.component.html',
styleUrls: ['./preferred-mailing-address.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PreferredMailingAddressComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PreferredMailingAddressComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private preferredMailingAddressService: PreferredMailingAddressService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.preferredMailingAddressService);

	} 
	
	// 8. End
}