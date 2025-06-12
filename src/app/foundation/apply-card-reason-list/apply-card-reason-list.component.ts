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

import {  ApplycardreasonService  } from '../applycardreason-service/applycardreason.service';


// 2. Component Selector
@Component({
selector: 'app-apply-card-reason-list',
templateUrl: './apply-card-reason-list.component.html',
styleUrls: ['./apply-card-reason-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ApplyCardReasonListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ApplyCardReasonListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private applycardreasonService: ApplycardreasonService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
	this.setDataSource(this.applycardreasonService);
	} 
	
	// 8. End
}