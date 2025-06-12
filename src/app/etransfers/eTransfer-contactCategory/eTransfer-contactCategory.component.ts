// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  eTransferContactCategoryService  }  from './eTransfer-contactCategory.service';
	

// 2. Component Selector
@Component({
selector: 'app-eTransfer-contactCategory',
templateUrl: './eTransfer-contactCategory.component.html',
styleUrls: ['./eTransfer-contactCategory.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => eTransferContactCategoryComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class eTransferContactCategoryComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private eTransferContactCategoryService: eTransferContactCategoryService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.eTransferContactCategoryService);

	} 
	
	// 8. End
}