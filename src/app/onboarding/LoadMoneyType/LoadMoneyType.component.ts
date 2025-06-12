// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  LoadMoneyTypeService  }  from './LoadMoneyType.service';
	

// 2. Component Selector
@Component({
selector: 'app-LoadMoneyType',
templateUrl: './LoadMoneyType.component.html',
styleUrls: ['./LoadMoneyType.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LoadMoneyTypeComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoadMoneyTypeComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private loadMoneyTypeService: LoadMoneyTypeService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.loadMoneyTypeService);

	} 
	
	// 8. End
}