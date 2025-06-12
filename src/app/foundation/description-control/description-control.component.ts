// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-description-control',
templateUrl: './description-control.component.html',
styleUrls: ['./description-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DescriptionControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DescriptionControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly pattern : any = /[A-Za-z0-9 \s]$/;
	 @Input() maxLength : any = "100";
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	} 
	
	// 8. End
}