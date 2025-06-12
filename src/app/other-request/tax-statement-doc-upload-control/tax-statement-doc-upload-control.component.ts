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

import {  TaxstatementdocuploadService  } from '../taxstatementdocupload-service/taxstatementdocupload.service';


// 2. Component Selector
@Component({
selector: 'app-tax-statement-doc-upload-control',
templateUrl: './tax-statement-doc-upload-control.component.html',
styleUrls: ['./tax-statement-doc-upload-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => TaxStatementDocUploadComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class TaxStatementDocUploadComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private taxstatementdocuploadService: TaxstatementdocuploadService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['inventoryNumber','serialNo']);
	this.setDataSource(this.taxstatementdocuploadService);
	} 
	
	// 8. End
}