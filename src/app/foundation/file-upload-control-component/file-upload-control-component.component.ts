// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-file-upload-control-component',
templateUrl: './file-upload-control-component.component.html',
styleUrls: ['./file-upload-control-component.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => FileUploadControlComponentComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class FileUploadControlComponentComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

   @Input() maxSize: any;
   @Input() minSize: any;
   @Input() extensions: any;
 	// event methods
	override doPreInit(): void {

	} 
	
	// 8. End
}