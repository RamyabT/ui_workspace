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

import {  MainSourceOfIncomeService  } from '../mainSourceOfIncome-service/mainSourceOfIncome.service';


// 2. Component Selector
@Component({
selector: 'app-main-source-of-income',
templateUrl: './main-source-of-income.component.html',
styleUrls: ['./main-source-of-income.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => MainSourceOfIncomeComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class MainSourceOfIncomeComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private mainSourceOfIncomeService: MainSourceOfIncomeService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['code','applicantId']);
	this.setDataSource(this.mainSourceOfIncomeService);
	} 
	
	// 8. End
}