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

import {  PreferredPurposeOfAccountService  } from '../preferredPurposeOfAccount-service/preferredPurposeOfAccount.service';


// 2. Component Selector
@Component({
selector: 'app-preferred-purpose-of-account',
templateUrl: './preferred-purpose-of-account.component.html',
styleUrls: ['./preferred-purpose-of-account.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PreferredPurposeOfAccountComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PreferredPurposeOfAccountComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private preferredPurposeOfAccountService: PreferredPurposeOfAccountService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
	this.setDataSource(this.preferredPurposeOfAccountService);
	} 
	
	// 8. End
}