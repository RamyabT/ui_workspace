import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { VerifyOtpFormHelper, VerifyOtpFormState } from './verify-otp-form.helper';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ObVerifyTFAService } from '../verifytfa-service/verify-tfa.service';

@Component({
  selector: 'app-verify-otp-form',
  templateUrl: './verify-otp-form.component.html',
  styleUrls: ['./verify-otp-form.component.scss'],
  providers: [VerifyOtpFormHelper, ObVerifyTFAService]
})
export class VerifyOtpFormComponent extends BaseFpxFormComponent<VerifyOtpFormHelper, VerifyOtpFormState> {

  constructor(
    _formBuilder: FormBuilder, 
    _route: Router, 
    @Optional() _controlContainer: ControlContainer,
     _otpFormHelper: VerifyOtpFormHelper,
     private _verifyTFAService:ObVerifyTFAService) {
    super(_formBuilder, _route, _controlContainer, _otpFormHelper);
    this.setServiceCode("OBVERIFYTFA");
  }

  override doPreInit(){
    this.addFormControl('otp', '', [Validators.required], [], 'change');
    this.addFormControl('reqRef', '', []);
    this.addFormControl('serviceCode', '', []);
    this.setDataService(this._verifyTFAService);

  }

}
