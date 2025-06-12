// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  BeneAdviceControlService  }  from './bene-advice-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-bene-advice-control',
templateUrl: './bene-advice-control.component.html',
styleUrls: ['./bene-advice-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BeneAdviceControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BeneAdviceControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private beneAdviceControlService: BeneAdviceControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "1";
	 protected  readonly minLength : any = "1";
	 protected  readonly pattern : any = /^(?:Y\b|N\b)$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	   this.setDataSource(this.beneAdviceControlService);

	} 
	
	// 8. End
}