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


// 2. Component Selector
@Component({
selector: 'app-eTransfer-contact-list',
templateUrl: './eTransfer-contact-list.component.html',
styleUrls: ['./eTransfer-contact-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => eTransferContactListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class eTransferContactListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private etransfercontactService: EtransfercontactService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['tenantId','beneId']);
	this.setDataSource(this.etransfercontactService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.etransfercontactService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}