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
import { VirtualcardselectionService } from '../virtualcardselection-service/virtualcardselection.service';
import { Virtualcardselection } from '../virtualcardselection-service/virtualcardselection.model';
export class obvirtualcardselectionState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   FieldId_2:any={
    text:" Sample Text"
   }
}


@Injectable()
export class obvirtualcardselectionHelper extends BaseFpxFormHelper<obvirtualcardselectionState>{
  virtualCardTemplate! : FormArray;
  // virtualCardTemplate: FormArray<any>;

   constructor( private obvirtualcardselectionService: VirtualcardselectionService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new obvirtualcardselectionState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("OBVIRTUALCARDSELECTION");
 
 }
   

  public override doPostInit(): void {
 this.virtualCardTemplate=this.formGroup.get("virtualCardTemplate") as FormArray;
  
  }
  
 
  public override preSubmitInterceptor(payload: Virtualcardselection):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Virtualcardselection){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.virtualcardselection.tenantId.applicantId.templateId,
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
 

