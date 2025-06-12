// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  MaturityInstructionsListControlService  }  from './maturity-instructions-list-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-maturity-instructions-list-control',
templateUrl: './maturity-instructions-list-control.component.html',
styleUrls: ['./maturity-instructions-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => MaturityInstructionsListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class MaturityInstructionsListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private maturityInstructionsListControlService: MaturityInstructionsListControlService
	) {
	super(controlContainer,changeDetectorRef);
	}

	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.maturityInstructionsListControlService);

	} 
	
	// 8. End
}