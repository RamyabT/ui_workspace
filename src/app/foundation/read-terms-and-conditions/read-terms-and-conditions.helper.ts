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
import { ReadtermsandconditionsService } from '../readtermsandconditions-service/readtermsandconditions.service';
import { Readtermsandconditions } from '../readtermsandconditions-service/readtermsandconditions.model';
export class ReadTermsAndConditionsState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   termscondition:any={
    textPosition:"after",
    ckValues:{checked:"Y",unchecked:"N"}
 }
}


@Injectable()
export class ReadTermsAndConditionsHelper extends BaseFpxFormHelper<ReadTermsAndConditionsState>{
  SavingAccounts:boolean=true;
  invalid:boolean=true;

   constructor( private readTermsAndConditionsService: ReadtermsandconditionsService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new ReadTermsAndConditionsState());
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
 this.setServiceCode("readtermsandconditions");
 this.setDisabled("termscondition",true);
 
 }
   

  public override doPostInit(): void {
    this.setDisabled("termscondition",true);
    
  
  }
  
  enableCheckbox(event:any) {
    if(Math.abs(event.target.scrollHeight-event.target.offsetHeight - event.target.scrollTop) <=20) {
      this.setDisabled("termscondition",false)
      // this.setValue("termscondition","Y");
      // this.invalid=false;
      
      
      
    }
  }

 
  public override preSubmitInterceptor(payload: Readtermsandconditions):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Readtermsandconditions){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.readtermsandconditions,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
