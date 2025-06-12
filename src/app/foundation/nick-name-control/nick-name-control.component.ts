// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { accountNicknameValidator } from './accountNickname-validator.service';




// 2. Component Selector
@Component({
	selector: 'app-nick-name-control',
	templateUrl: './nick-name-control.component.html',
	styleUrls: ['./nick-name-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NickNameControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NickNameControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef,
		private accountNicknameValidator: accountNicknameValidator
	) {
		super(controlContainer, changeDetectorRef);
	}
	protected readonly maxLength: any = "35";
	protected readonly minLength: any = "1";
	// protected readonly pattern: any = /^[ A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@\[\\\]^~]{1,35}$/;
	// protected readonly pattern: any = /^[A-Za-z0-9 !#$%&'()*+-/:;<=>@[\]~]{1,35}$/;
	//protected readonly pattern: any = /^(?!.* {2})(?!.* $)[a-zA-Z0-9 ]{1,35}$/;
	protected readonly pattern: any = /^[a-zA-Z0-9 ]{1,35}$/;
    
	// event methods
	override doPreInit(): void {
		this.addDependencies(this.dependencyField);
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));
		// this.addAsyncValidatorFn(this.accountNicknameValidator.accountNicknameValidation(this.commonControlEvent, this.dependentValuesMap));
		this.addPKList(['currentNickname']);
		this.addDependencies(['currentNickname']);
	}

	// 8. End
}