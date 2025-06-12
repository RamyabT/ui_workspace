// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DeviceDetectorService } from '@dep/core';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-mobile-number-control',
templateUrl: './mobile-number-control.component.html',
styleUrls: ['./mobile-number-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => MobileNumberControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class MobileNumberControlComponent extends BaseFpxControlComponent {
	@ViewChild('fpxControlMobileNumber') fpxControlMobileNumber : ElementRef | any;
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,
		private _deviceMgr: DeviceDetectorService,
		private _renderer: Renderer2
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "10";
	 protected  readonly minLength : any = "10";
	 protected  readonly pattern : any = /^[0-9]{10,10}$/;
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));
	} 

	override doPostInit(): void {
		if(!this._deviceMgr.isDesktop()){
			//  && this._deviceMgr.getDeviceInfo().os.toLowerCase() == "ios"
			let el = this.fpxControlMobileNumber?.fpxInput?.nativeElement;
			this._renderer.setAttribute(el, 'inputMode', 'numeric');
			}
		}
	
	// 8. End
}