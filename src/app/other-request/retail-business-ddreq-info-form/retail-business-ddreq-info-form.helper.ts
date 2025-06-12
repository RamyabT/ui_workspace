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
import { BusinessddreqService } from '../businessddreq-service/businessddreq.service';
import { Businessddreq } from '../businessddreq-service/businessddreq.model';
export class RetailBusinessDDReqInfoFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   formSubmitted: boolean = false;
	FieldId_1:any={
	 text:" <span>Information</span>"
	}
}


@Injectable()
export class RetailBusinessDDReqInfoFormHelper extends BaseFpxFormHelper<RetailBusinessDDReqInfoFormState>{

   constructor( private retailBusinessDDReqInfoFormService: BusinessddreqService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailBusinessDDReqInfoFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILBUSINESSDDREQINFO");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Businessddreq):any {
     // WRITE CODE HERE TO HANDLE 
     let path = [  "other-request-space","entry-shell","other-request","business-dd-req-form"];
     this._router.navigate(path);
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Businessddreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

public override postSubmitInterceptor(response: any): any {

  let routingInfo: RoutingInfo = new RoutingInfo();
  if (response.success.status == 200) {
   
  } else {
    this.state.formSubmitted = false;
  }

  // WRITE CODE HERE TO HANDLE
  return;
}
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

