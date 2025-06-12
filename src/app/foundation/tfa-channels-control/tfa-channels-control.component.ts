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

import {  TfachannelsService  } from '../tfachannels-service/tfachannels.service';
import { TFAChannelsControlHelper } from './tfa-channels-control.helper';


// 2. Component Selector
@Component({
selector: 'app-tfa-channels-control',
templateUrl: './tfa-channels-control.component.html',
styleUrls: ['./tfa-channels-control.component.scss'],
providers: [
	TFAChannelsControlHelper,
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => TFAChannelsControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class TFAChannelsControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private tfachannelsService: TfachannelsService
	) {
	super(controlContainer,changeDetectorRef);
	}

	// event methods
	override doPreInit(): void {
	      
	this.addDependencies(['reqRef']); 
    this.addPKList(['applicationCode','channelCode']);
	this.setDataSource(this.tfachannelsService);
	} 
	
	// 8. End
}