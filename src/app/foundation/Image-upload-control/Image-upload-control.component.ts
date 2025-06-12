// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-Image-upload-control',
templateUrl: './Image-upload-control.component.html',
styleUrls: ['./Image-upload-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ImageUploadComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ImageUploadComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

   @Input() maxSize: any;
   @Input() minSize: any;
   @Input() extensions: any;
 	 protected  readonly minLength : any = "3";
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.minLength(this.minLength));

	} 
	
	// 8. End
}