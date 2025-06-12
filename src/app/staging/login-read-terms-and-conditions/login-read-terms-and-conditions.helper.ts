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
import { AppConfigService, UserAuthService } from "@dep/services";
import { TermspublishService } from "src/app/prelogin/termspublish-service/termspublish.service";
import moment from "moment";
import { LoginReadtermsandconditionsService } from "../loginreadtermsandconditions-service/loginreadtermsandconditions.service";
import { LoginReadtermsandconditions } from "../loginreadtermsandconditions-service/loginreadtermsandconditions.model";
export class LoginReadTermsAndConditionsState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   termsAndConditions: any;
   termscondition:any={
    textPosition:"after",
    ckValues:{checked:"Y",unchecked:"N"}
 }
}


@Injectable()
export class LoginReadTermsAndConditionsHelper extends BaseFpxFormHelper<LoginReadTermsAndConditionsState>{
  SavingAccounts:boolean=true;
  invalid:boolean=true;

   constructor( private readTermsAndConditionsService: LoginReadtermsandconditionsService, 
    private _appConfig : AppConfigService, _httpProvider : HttpProviderService,
    private retailTermsAndConditionsFormService: TermspublishService,
     private userService : UserAuthService ,private _router: Router) 
    {
        super(new LoginReadTermsAndConditionsState());
        this.addValueChangeHandler(
          "termscondition",
          this.handleAcceptvalueChange
        );
    }

    public handleAcceptvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
    ) => {
      if (value == "Y") {
        this.invalid=false;
        
        
      } 
      else {
        this.invalid=true;
        
      }
    };
   
  override doPreInit(): void {
 this.setServiceCode("LOGINREADTERMSANDCONDITIONS");
 let todayDate = new Date();
 let effDate = moment(todayDate).format("YYYY-MM-DD");
 let key: any = {
   applCode: "DEPRETAIL",
   effDate: effDate,
   serviceCode:"LOGINTERMSNDCOND"
 };
 this.retailTermsAndConditionsFormService.findByKey(key)().subscribe({
   next:(res:any)=>{
     this.state.termsAndConditions=res.termsInventoryNumber.description;
   }
 });
//  this.setDisabled("termscondition",true);
 
 }
   

  public override doPostInit(): void {
    // this.setDisabled("termscondition",true);
    
  
  }
  
  enableCheckbox(event:any) {
    if(Math.abs(event.target.scrollHeight-event.target.offsetHeight - event.target.scrollTop) <=20) {
      this.setDisabled("termscondition",false)
      // this.setValue("termscondition","Y");
      // this.invalid=false;
    }
  }

 
  public override preSubmitInterceptor(payload: LoginReadtermsandconditions):any {
     // WRITE CODE HERE TO HANDLE
    payload= {
      reqRef: this._appConfig.getData('reqRef')
    } 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: LoginReadtermsandconditions){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body;
    routingInfo.setQueryParams({
      response: res,
      serviceCode: "LOGINREADTERMSANDCONDITIONS",
    });
  }
  // else if (response.error) {
  //   let error = response.error;
  //   routingInfo.setQueryParams({
  //     result: {
  //       statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
  //       message: error.errorMsg,
  //       description: error.errorDesc,
  //       serviceCode: 'RETAILRESETPASSWORD',
  //     }

  //   });
  // }
  else if (response.error) {
    console.log("Error", response.error?.error);
    return response;
  }
}

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.readtermsandconditions,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  this.userService.accessDenied= false;
  let routingInfo: RoutingInfo = new RoutingInfo();
  this.handleFormOnPostsubmit(response, routingInfo);
  return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
