// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-signature-image-upload-control',
templateUrl: './signature-image-upload-control.component.html',
styleUrls: ['./signature-image-upload-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => SignatureImageUploadControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class SignatureImageUploadControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

   @Input() maxSize: any;
   @Input() minSize: any;
   @Input() extensions: any;
   @Input() resultInBase64: boolean = false;

 
	// event methods
	override doPreInit(): void {

	
 
	} 
	   
	
	// 8. End
}