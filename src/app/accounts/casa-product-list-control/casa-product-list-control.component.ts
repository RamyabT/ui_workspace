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

import {  CasaproductsService  } from '../casaproducts-service/casaproducts.service';
import { CasaProductListControlHelper } from './casa-product-list-control.helper';


// 2. Component Selector
@Component({
selector: 'app-casa-product-list-control',
templateUrl: './casa-product-list-control.component.html',
styleUrls: ['./casa-product-list-control.component.scss'],
providers: [
	CasaProductListControlHelper,
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CasaProductListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CasaProductListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private casaproductsService: CasaproductsService
  ,private _validatorService:ValidatorService,
  private _productListControlHelper:CasaProductListControlHelper
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['productCode']);
	// dependency fields   Variables
	this.setHelper(this._productListControlHelper);
	this.addDependencies(['groupCode','productCode']);
	this.setDataSource(this.casaproductsService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.casaproductsService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}