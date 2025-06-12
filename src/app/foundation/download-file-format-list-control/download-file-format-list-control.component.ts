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

import {  DownloadfileformatlistService  } from '../downloadfileformatlist-service/downloadfileformatlist.service';


// 2. Component Selector
@Component({
selector: 'app-download-file-format-list-control',
templateUrl: './download-file-format-list-control.component.html',
styleUrls: ['./download-file-format-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DownloadFileFormatListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DownloadFileFormatListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private downloadfileformatlistService: DownloadfileformatlistService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	   
    this.addPKList(['id','code','applicationCode']);
	this.setDataSource(this.downloadfileformatlistService);
	} 
	
	// 8. End
}