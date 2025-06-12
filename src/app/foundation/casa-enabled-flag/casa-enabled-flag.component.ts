// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  CasaEnabledFlagService  }  from './casa-enabled-flag.service';
	

// 2. Component Selector
@Component({
selector: 'app-casa-enabled-flag',
templateUrl: './casa-enabled-flag.component.html',
styleUrls: ['./casa-enabled-flag.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CasaEnabledFlagComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CasaEnabledFlagComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private casaEnabledFlagService: CasaEnabledFlagService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.casaEnabledFlagService);

	} 
	
	// 8. End
}