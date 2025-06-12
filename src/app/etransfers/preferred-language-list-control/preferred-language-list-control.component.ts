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

import {  PreferredlanguageService  } from '../preferredlanguage-service/preferredlanguage.service';


// 2. Component Selector
@Component({
selector: 'app-preferred-language-list-control',
templateUrl: './preferred-language-list-control.component.html',
styleUrls: ['./preferred-language-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PreferredLanguageListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PreferredLanguageListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private preferredlanguageService: PreferredlanguageService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	      
	   
    this.addPKList(['id','code','applnCode','tenantId']);
	this.setDataSource(this.preferredlanguageService);
	} 
	
	// 8. End
}