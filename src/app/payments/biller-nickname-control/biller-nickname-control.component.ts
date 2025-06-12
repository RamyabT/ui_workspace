// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { BillerNicknameValidator } from './nickName-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-biller-nickname-control',
templateUrl: './biller-nickname-control.component.html',
styleUrls: ['./biller-nickname-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BillerNickNameControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BillerNickNameControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,private nickNameValidator:BillerNicknameValidator
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "100";
	 protected  readonly minLength : any = "0";
	 protected  readonly pattern : any = /^[a-zA-Z0-9\s]{0,100}$/;; 
	//  protected  readonly pattern : any = /^([A-Za-z0-9]+ )+[A-Za-z0-9]+$|^[A-Za-z0-9]{0,100}$/;;
	// event methods
	override doPreInit(): void {
	// this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	// this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	if(this.getRoutingParam('operationMode') !== 'D'){
		this.dependentValuesMap.set('formMode',this.getRoutingParam('operationMode'))
		this.addAsyncValidatorFn(this.nickNameValidator.nickNameValidation(this.commonControlEvent,this.dependentValuesMap));
	}
	} 
	
	// 8. End
}