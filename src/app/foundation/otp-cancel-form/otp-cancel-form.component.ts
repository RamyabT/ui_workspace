import { Component, OnInit } from '@angular/core';
import { BaseFpxFunctionality } from '@fpx/core';

@Component({
  selector: 'app-otp-cancel-form',
  templateUrl: './otp-cancel-form.component.html',
  styleUrls: ['./otp-cancel-form.component.scss']
})
export class OtpCancelFormComponent extends BaseFpxFunctionality implements OnInit {

  protected message: string = "";
  protected description: string = "";
  private requestServiceCode: string = "";

  constructor() {
    super();
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    let errorCode = this.getRoutingParam('errorCode');
    this.requestServiceCode = this.getRoutingParam("serviceCode");

    if(errorCode == "DEPOTPERROR005"){
      this.message = "OtpCancelForm.resendExceeded.message";
      this.description = "OtpCancelForm.resendExceeded.description";
    } else if(errorCode == "DEPOTPERROR003"){
      this.message = "OtpCancelForm.cancelOTP.message";
      this.description = "OtpCancelForm.cancelOTP.description";
    }
    else if(errorCode == "DEPOTPERROR002"){
      this.message = "OtpCancelForm.invalidAttemptReached.message";
      this.description = "OtpCancelForm.invalidAttemptReached.description";
    }
  }

  gotoHome(){
    if(this.requestServiceCode && this.requestServiceCode != 'VERIFYTFA'){
      this._angularRouter.navigate(['welcome']);
    } else {
      if(sessionStorage.getItem('token') && sessionStorage.getItem('token') !== 'undefined'){
        this._angularRouter.navigate(['home']);
      }else{
        this._angularRouter.navigate(['welcome']);      
      }
    }
  }

}
