// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  SourceOfIncomeControlService  }  from './source-of-income-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-source-of-income-control',
templateUrl: './source-of-income-control.component.html',
styleUrls: ['./source-of-income-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => SourceOfIncomeControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class SourceOfIncomeControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private sourceOfIncomeControlService: SourceOfIncomeControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.sourceOfIncomeControlService);

	} 
	
	// 8. End
}