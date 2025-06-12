// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { NicknameValidator } from './nickName-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-bene-nickname-control',
templateUrl: './bene-nickname-control.component.html',
styleUrls: ['./bene-nickname-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BeneNicknameControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BeneNicknameControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,private nickNameValidator:NicknameValidator
	) {
	super(controlContainer,changeDetectorRef);
	}

	 protected  readonly maxLength : any = "35";
	 protected  readonly minLength : any = "1";
	 protected  readonly pattern : any = /^(?! )(?=.*[a-zA-Z])[a-zA-Z0-9\s]{1,35}(?<! )$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	this.addAsyncValidatorFn(this.nickNameValidator.nickNameValidation(this.commonControlEvent,this.dependentValuesMap));

	} 
	
	// 8. End
}