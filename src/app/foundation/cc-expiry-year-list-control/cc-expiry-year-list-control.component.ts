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
import { CreditcardexpiryyearService } from '../creditcardexpiryyear-service/creditcardexpiryyear.service';
//import { CreditcardexpiryyearService } from 'src/app/credit-cards/creditcardexpiryyear-service/creditcardexpiryyear.service';

//import {  CreditcardexpiryyearService  } from '../creditcardexpiryyear-service/creditcardexpiryyear.service';


// 2. Component Selector
@Component({
selector: 'app-cc-expiry-year-list-control',
templateUrl: './cc-expiry-year-list-control.component.html',
styleUrls: ['./cc-expiry-year-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CCExpiryYearListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CCExpiryYearListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private creditcardexpiryyearService: CreditcardexpiryyearService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
	this.setDataSource(this.creditcardexpiryyearService);
	} 
	
	// 8. End
}