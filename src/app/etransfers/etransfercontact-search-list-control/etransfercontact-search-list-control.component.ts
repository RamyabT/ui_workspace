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

import {  EtransfercontactService  } from '../etransfercontact-service/etransfercontact.service';
import { EtransferContactFetchValidatorService } from './etransfer-contact-validator.service';
import { EtransfercontactSearchListControlHelper } from './etransfercontact-search-list-control.helper';
import { Etransfercontact } from '../etransfercontact-service/etransfercontact.model';
import { AppConfigService } from '@dep/services';


// 2. Component Selector
@Component({
selector: 'app-etransfercontact-search-list-control',
templateUrl: './etransfercontact-search-list-control.component.html',
styleUrls: ['./etransfercontact-search-list-control.component.scss'],
providers: [
	EtransfercontactSearchListControlHelper,
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => EtransfercontactSearchListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class EtransfercontactSearchListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(
		public EtransfercontactSearchListControlHelper:EtransfercontactSearchListControlHelper,
		private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private etransfercontactService: EtransfercontactService
  ,private _validatorService:EtransferContactFetchValidatorService,
  private _appConfig: AppConfigService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
		this.setHelper(this.EtransfercontactSearchListControlHelper);
	      
	
    this.addPKList(['beneId']);
	this.setDataSource(this.etransfercontactService);
    this.addAsyncValidatorFn(this._validatorService.etransferContactFetchValidation(this.commonControlEvent, this.dependentValuesMap));
	this.setDropdownMode('SEARCHABLE');
	} 
	// 8. End
}