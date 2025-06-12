// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { invalid } from 'moment';

// 2. Component Selector
@Component({
	selector: 'app-captcha-control',
	templateUrl: './captcha-control.component.html',
	styleUrls: ['./captcha-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CaptchaControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptchaControlComponent extends BaseFpxControlComponent {
	@ViewChild('textCanvas', {static: true}) textCanvas!: ElementRef;
	@ViewChild('captchaImage', {static: true}) captchaImage!: ElementRef;
	@Input('size') size: number = 4;

	captchaText: string = '';
	userEnteredCaptcha: string = '';
	captchaValidated: boolean = false;
	
	private readonly CAPTCHA_CHAR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890';
	private textContext: any;
	private captchaImgEl: any;

	//4.  Constructor
	constructor(
		private controlContainer: ControlContainer, 
		changeDetectorRef: ChangeDetectorRef
	) {
		super(controlContainer, changeDetectorRef);
	}
	
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.size));
	}

	override doPostInit(){
		this.textContext = this.textCanvas.nativeElement.getContext('2d');
		this.captchaImgEl = this.captchaImage.nativeElement;
		this.generateCaptcha();
	}

	generateCaptcha(): void {
		let text = "";
		this.textContext.clearRect(0,0, 100, 30);
		this.formControl.reset();

		for(let i = 0; i < this.size; i++){
			text += this.CAPTCHA_CHAR.charAt(Math.floor(Math.random() * this.CAPTCHA_CHAR.length));
		}
		this.captchaText = text;

		text = text.split("").join(" ");
		this.textContext.font = "24px Arial";
		this.textContext.textBaseline = "middle";
		this.textContext.strokeText(text, 8, 16);
		this.captchaImgEl.src = this.textContext.canvas.toDataURL();
	}

	refreshCaptcha() {
		this.generateCaptcha();
	}

	onBlur(){
		console.log("form control value: ", this.formControl.value);
		if(this.formControl.value != this.captchaText){
			this.formControl.setErrors({invalid_captcha: true});
		} else {
			this.formControl.setErrors(null);
		}

		this.onblur();
	}
	// 8. End
}


