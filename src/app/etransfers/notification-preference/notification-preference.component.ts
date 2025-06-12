// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  NotificationPreferenceService  }  from './notification-preference.service';
	

// 2. Component Selector
@Component({
selector: 'app-notification-preference',
templateUrl: './notification-preference.component.html',
styleUrls: ['./notification-preference.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => NotificationPreferenceComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class NotificationPreferenceComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private notificationPreferenceService: NotificationPreferenceService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
		this.addDependencies(['serviceCode']);
	   this.setDataSource(this.notificationPreferenceService);

	} 
	
	// 8. End
}