// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import {  DomesticpurposeService  } from '../domesticpurpose-service/domesticpurpose.service';
import { TransferTypeValidaton } from './transferTypeValidator';


// 2. Component Selector
@Component({
selector: 'app-domestic-purpose-list',
templateUrl: './domestic-purpose-list.component.html',
styleUrls: ['./domestic-purpose-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DomesticPurposeListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DomesticPurposeListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private domesticpurposeService: DomesticpurposeService
	, private transferTypeValidator: TransferTypeValidaton
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
		this.setCriteriaMode('contains');
		this.addPKList(['serviceCode']);
		this.setDataSource(this.domesticpurposeService);
		this.addDependencies(['currency', 'amount']);
		if (this.formMode != 'VIEW') {
			this.addAsyncValidatorFn(this.transferTypeValidator.transferTypeValidation(this.commonControlEvent, this.dependentValuesMap));
		}
		this.setDropdownMode('SEARCHABLE');
	} 
	
	// 8. End
}