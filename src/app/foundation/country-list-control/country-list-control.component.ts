// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { ValidatorService } from '@fpx/core';
import {  CountryService  } from '../country-service/country.service';


// 2. Component Selector
@Component({
selector: 'app-country-list-control',
templateUrl: './country-list-control.component.html',
styleUrls: ['./country-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CountryListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CountryListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private countryService: CountryService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['countryCode']);
	this.setDataSource(this.countryService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.countryService,this.formControlName,this.attributesMap));
	this.setDropdownMode('SEARCHABLE');
	} 
	
	// 8. End
}