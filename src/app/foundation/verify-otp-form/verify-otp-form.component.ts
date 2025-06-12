import { Component, inject, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { VerifyOtpFormHelper, VerifyOtpFormState } from './verify-otp-form.helper';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerifyTFAService } from '../verifytfa-service/verify-tfa.service';
import { ObVerifyTFAService } from 'src/app/onboarding/verifytfa-service/verify-tfa.service';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-verify-otp-form',
  templateUrl: './verify-otp-form.component.html',
  styleUrls: ['./verify-otp-form.component.scss'],
  providers: [VerifyOtpFormHelper, VerifyTFAService, ObVerifyTFAService]
})

export class VerifyOtpFormComponent extends BaseFpxFormComponent<VerifyOtpFormHelper, VerifyOtpFormState> {
  @ViewChild('otpField', {static: false}) otpField!: any;
  private _renderer: Renderer2 = inject(Renderer2);
  
  protected readonly otpPattern : any = /^[0-9]{6}$/;

  constructor(
    _formBuilder: FormBuilder, 
    _route: Router, 
    @Optional() _controlContainer: ControlContainer,
     _otpFormHelper: VerifyOtpFormHelper,
     private _verifyTFAService:VerifyTFAService,
     private _deviceMgr: DeviceDetectorService
    ) {
    super(_formBuilder, _route, _controlContainer, _otpFormHelper)
  }

  override doPreInit(){
    this.addFormControl('otp', '', [Validators.required, Validators.pattern(this.otpPattern)], [], 'change');
    // this.addFormControl('reqRef', '', [Validators.required]);
    // this.addFormControl('serviceCode', '', [Validators.required]);
    this.setDataService(this._verifyTFAService);
  }

  protected override doPostInit(): void {
    if(!this._deviceMgr.isDesktop() && this._deviceMgr.getDeviceInfo().os.toLowerCase() == "ios"){
      let el = this.otpField?.fpxInput.nativeElement;
      this._renderer.setAttribute(el, 'type', 'text');
      this._renderer.setAttribute(el, 'autocomplete', 'one-time-code');
    }
  }

}
