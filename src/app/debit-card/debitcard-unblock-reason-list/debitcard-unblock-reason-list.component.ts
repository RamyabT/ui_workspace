// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  DebitcardUnblockReasonListService  }  from './debitcard-unblock-reason-list.service';
	

// 2. Component Selector
@Component({
selector: 'app-debitcard-unblock-reason-list',
templateUrl: './debitcard-unblock-reason-list.component.html',
styleUrls: ['./debitcard-unblock-reason-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DebitcardUnblockReasonListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DebitcardUnblockReasonListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private debitcardUnblockReasonListService: DebitcardUnblockReasonListService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
		this.addPKList(['reason']);
		this.addDependencies(['otherReason']);
	   this.setDataSource(this.debitcardUnblockReasonListService);

	} 
	
	// 8. End
}