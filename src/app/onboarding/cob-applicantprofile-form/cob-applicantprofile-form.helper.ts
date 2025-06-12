import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { ObapplicantprofileService } from '../obapplicantprofile-service/obapplicantprofile.service';
import { Obapplicantprofile } from '../obapplicantprofile-service/obapplicantprofile.model';
import { AppConfigService, UserAuthService } from "@dep/services";
import { AppRoutingModule } from "src/app/app-routing.module";

export class CobApplicantProfileFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;

	  //  password:any={
	  //   visibilityChange: boolean =false,
 		// autoComplete: boolean=false;
	  //  } 
	  //  confirmPassword:any={
	  //   visibilityChange: boolean =false,
 		// autoComplete: boolean=false;
	  //  } 
    header:any={
      text:"Please enter a new User ID and password for your account"
     }
    password:any;
    lengthValid: boolean = false;
    alphaNumaricValid: boolean = false;
    mustContainLetters: boolean = false;
    lowerCaseValid: boolean = false;
    specialCharValid: boolean = false;
    numaricValid: boolean = false;
    sequenceValid: boolean = false;
    spaceAllowed: boolean = false;
    space: boolean = false;
    alplhabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    numeric = "0123456789";
    UPPERCASE = /[A-Z]/;
    LOWERCASE = /[a-z]/;
    SPECIALCHARS = /[!@#$%^&*]+/;
    LETTER_RULE = /^[a-zA-Z0-9!@#$%^&*]+$/;
    ONLY_NUMARIC = /[0-9]/;
}


@Injectable()
export class CobApplicantProfileFormHelper extends BaseFpxFormHelper<CobApplicantProfileFormState>{
  password: any;
  serviceCodeRoute:any;
   constructor( private cobApplicantProfileFormService: ObapplicantprofileService,private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig:AppConfigService,
   private _userAuth:UserAuthService) 
    {
        super(new CobApplicantProfileFormState());
    }
   
  override doPreInit(): void {
    this.addResetHandler('reset', this._onReset);
 this.setServiceCode("RETAILAPPLICANTPROFILE");
//  this.formGroup.removeControl('applicantId');
 this.serviceCodeRoute=this.getRoutingParam('serviceCode');
 if(this.serviceCodeRoute == 'RETAILSELFREG' ){
 this.setServiceCode("RETAILSELFREG");
 }
 
 }
 private _onReset = () => {
  this.formGroup.reset();
  this.handleFormOnLoad();
}
 public handleFormOnLoad() {
 
    if(this.getRoutingParam('serviceCode')=="RETAILMIGRATEDUSER"){
      // if(this.getRoutingParam('serviceCode')=="RETAILSELFREG"){
    this.setValue('userName',this._appConfig.getData('username'));
    this.setReadonly('userName',true);
    }

    let reqRef = this.getRoutingParam('reqRef');
    if(reqRef){
        let payload: any = {
          applicantId: reqRef
        }
      this.cobApplicantProfileFormService.findByKey(payload)().subscribe({
        next:(res:any) => {
          if(res?.userName){
            this.setValue("applicantId",reqRef)
            this.setValue('userName', res?.userName);
            this.setReadonly('userName', true);
          }else{
            this.formGroup.removeControl('applicantId');
          }
        }
      })
    }
 }
 private handleRoleDescOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup,
) => {
  this.password=value;
  formGroup.get("confirmPassword")?.reset();
    if (value.length >= 8 && value.length <= 32) this.state.lengthValid = true;
    else this.state.lengthValid = false;
    this.state.mustContainLetters = value && this.state.UPPERCASE.test(value) &&
     this.state.LOWERCASE.test(value) && this.state.ONLY_NUMARIC.test(value) &&
     this.state.LETTER_RULE.test(value)&&
      this.state.SPECIALCHARS.test(value);
    this.checkSeqenceAppears(value);
    if (value) this.state.space = !(/\s/.test(value));
    else this.state.space = false;
if(!this.state.lengthValid || !this.state.mustContainLetters || !this.state.mustContainLetters || !this.state.space || !this.state.sequenceValid){
  this.setErrors('password', "passwd");
}

};

checkSeqenceAppears(value: any) {
  if (value.length > 0) this.state.sequenceValid = true;
  else this.state.sequenceValid = false;
  if (value.length < 4) return;
  let valueArray = value
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split("");
  for (let i = 0; i < valueArray.length; i++) {
    if (i + 4 > valueArray.length) return;
    let searchString = valueArray
      .slice(i, i + 4)
      .slice()
      .sort()
      .toString()
      .replaceAll(",", "");
    if (
      this.state.alplhabet.toLowerCase().includes(searchString) ||
      this.state.numeric.includes(searchString)
    ) {
      this.state.sequenceValid = false;
      return;
    }
  }
}

private handlePasswordOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup,
) => {
  if (status === "VALID") {
    if (value != this.password ) {
      this.setErrors('confirmPassword', "passwordval")
    }
  }
};

private usernameValidationOnvalueChange: BaseFpxControlEventHandler = (
payload:any
) => {
payload
}


  public override doPostInit(): void {
    this.addValueChangeHandler(
      "password",
      this.handleRoleDescOnvalueChange
    );
    
    this.addValueChangeHandler(
      "confirmPassword",
      this.handlePasswordOnvalueChange
    );
    this.addControlEventHandler(
      "userName",
      this.usernameValidationOnvalueChange
    );
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Obapplicantprofile):any {
     // WRITE CODE HERE TO HANDLE 
     payload.userName=payload.userName.toUpperCase();
     payload.password = this._userAuth.encryptPassword(payload.password);
     payload.confirmPassword = this._userAuth.encryptPassword(payload.confirmPassword);

    //  this._router.navigate(["prelogin-space","entry-shell","onboarding","result-page"]);
    return payload;
    
  }
  
  
 public override postDataFetchInterceptor(payload: Obapplicantprofile){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if(this.serviceCodeRoute == 'RETAILSELFREG' || this.serviceCodeRoute == 'RETAILMIGRATEDUSER' ){
      if (response.success) {
        let res = response.success?.body?.obapplicantprofile;
        routingInfo.setQueryParams({
          response: res
        });

      } else if (response.error) {
        routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
      }

    }else{
      if (response.success) {
        routingInfo.setQueryParams({
          response: response.success?.body?.obapplicantprofile,
          transRef: response.success?.body?.obapplicantprofile.userName,
          status: "success",
        });
        this._appConfig.setData('applicantId', response.success?.body?.obapplicantprofile.applicantId)
        this._appConfig.setData('processId', response.success?.body?.obapplicantprofile.processId)    
        // this._router.navigate(["prelogin-space","entry-shell","onboarding","result-page"]);
      } else if (response.error) {
        routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
      }
    }

   
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
