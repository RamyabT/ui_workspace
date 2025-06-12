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

import {  ChargesborneService  } from '../chargesborne-service/chargesborne.service';
import { ChargesValidator } from 'src/app/foundation/charges-control/charges-validator.service';


// 2. Component Selector
@Component({
selector: 'app-charges-borne-control',
templateUrl: './charges-borne-control.component.html',
styleUrls: ['./charges-borne-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ChargesBornecontrolComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ChargesBornecontrolComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private chargesborneService: ChargesborneService,
	private chargesValidator:ChargesValidator
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
		// this.addDependencies(this.dependencyField);
    this.addPKList(['lovId','code']);
	this.addDependencies(['amount', 'currency', 'serviceCode','fromAccount','toAccount','accountBalance']);
	this.addAsyncValidatorFn(this.chargesValidator.chargesValidation(this.commonControlEvent, this.dependentValuesMap));
	this.setDataSource(this.chargesborneService);

	} 
	
	// 8. End
}