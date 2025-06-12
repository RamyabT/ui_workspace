// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  TenorControlService  }  from './tenor-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-tenor-control',
templateUrl: './tenor-control.component.html',
styleUrls: ['./tenor-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => TenorControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class TenorControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private tenorControlService: TenorControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.tenorControlService);

	} 
	
	// 8. End
}