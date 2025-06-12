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

import {  NotificationprefService  } from '../notificationpref-service/notificationpref.service';


// 2. Component Selector
@Component({
selector: 'app-notification-pref',
templateUrl: './notification-pref.component.html',
styleUrls: ['./notification-pref.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => notificationprefComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class notificationprefComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private notificationprefService: NotificationprefService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	   
    this.addPKList(['id','code','tenantId']);
	this.setDataSource(this.notificationprefService);
	} 
	
	// 8. End
}