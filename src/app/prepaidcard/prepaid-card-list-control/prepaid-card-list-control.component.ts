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
import { PpCardService } from '../ppCard-service/ppCard.service';

//import {  PpCardService  } from '../ppCard-service/ppCard.service';


// 2. Component Selector
@Component({
selector: 'app-prepaid-card-list-control',
templateUrl: './prepaid-card-list-control.component.html',
styleUrls: ['./prepaid-card-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PrepaidCardListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PrepaidCardListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private ppCardService: PpCardService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['cardReference']);
	this.setDataSource(this.ppCardService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.ppCardService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}