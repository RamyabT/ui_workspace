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
import { DepositsService } from '../deposits-service/deposits.service';

//import {  DepositsService  } from '../deposits-service/deposits.service';


// 2. Component Selector
@Component({
selector: 'app-deposit-acc-number-list-control',
templateUrl: './deposit-acc-number-list-control.component.html',
styleUrls: ['./deposit-acc-number-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DepositAccountListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DepositAccountListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private depositsService: DepositsService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}

	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['accountNumber']);
	this.setDataSource(this.depositsService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.depositsService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}