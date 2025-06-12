// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  UploadTypeService  }  from './upload-type.service';
	

// 2. Component Selector
@Component({
selector: 'app-upload-type',
templateUrl: './upload-type.component.html',
styleUrls: ['./upload-type.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => UploadTypeComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class UploadTypeComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private uploadTypeService: UploadTypeService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.uploadTypeService);

	} 
	
	// 8. End
}