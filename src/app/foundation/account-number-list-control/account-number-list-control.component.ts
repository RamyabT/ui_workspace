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
import { ValidatorService } from '@fpx/core';
import { CasaaccountService } from '../casaaccount-service/casaaccount.service';


// 2. Component Selector
@Component({
selector: 'app-account-number-list-control',
templateUrl: './account-number-list-control.component.html',
styleUrls: ['./account-number-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => AccountNumberListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class AccountNumberListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private casaaccountService: CasaaccountService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}

	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['accountNumber']);
	this.setDataSource(this.casaaccountService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.casaaccountService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}