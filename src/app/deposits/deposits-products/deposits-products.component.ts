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

import {  DepositProductsService  } from '../depositProducts-service/depositProducts.service';


// 2. Component Selector
@Component({
selector: 'app-deposits-products',
templateUrl: './deposits-products.component.html',
styleUrls: ['./deposits-products.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DepositsProductsComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DepositsProductsComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private depositProductsService: DepositProductsService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['productCode']);
	// dependency fields   Variables
	   
	this.addDependencies(['productCode']);
	this.setDataSource(this.depositProductsService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.depositProductsService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}