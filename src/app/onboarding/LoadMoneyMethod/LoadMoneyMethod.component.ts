// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  LoadMoneyMethodService  }  from './LoadMoneyMethod.service';
	

// 2. Component Selector
@Component({
selector: 'app-LoadMoneyMethod',
templateUrl: './LoadMoneyMethod.component.html',
styleUrls: ['./LoadMoneyMethod.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LoadMoneyMethodComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoadMoneyMethodComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private loadMoneyMethodService: LoadMoneyMethodService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.loadMoneyMethodService);

	} 
	
	// 8. End
}