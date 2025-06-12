// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileOpenerService } from '@dep/native';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-terms-control',
templateUrl: './terms-control.component.html',
styleUrls: ['./terms-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => TermsConditionsControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class TermsConditionsControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef, private _fileOpenerService:FileOpenerService
	) {
	super(controlContainer,changeDetectorRef);
	}

   @Input() textPosition: any = "after"; 
	 protected  readonly maxLength : any = "1";
	 protected  readonly minLength : any = "1";
	 protected  readonly pattern : any = /^(?:Y\b|N\b)$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	navToLink($event:any){
		this._fileOpenerService.openLink($event.linkValue);
	  }
	// 8. End
}