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
import { RpaddressinfoService } from '../rpaddressinfo-service/rpaddressinfo.service';
import { Rpaddressinfo } from '../rpaddressinfo-service/rpaddressinfo.model';
import { AppConfigService } from "@dep/services";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
export class RetailRPAddressInfoState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable({
  providedIn: 'root'
})
export class RetailRPAddressInfoHelper extends BaseFpxFormHelper<RetailRPAddressInfoState>{

   constructor( private retailRPAddressInfoService: RpaddressinfoService, 
    private userService:CustomerService,
    private _httpProvider : HttpProviderService,private _router: Router,private _appConfig: AppConfigService) 
    {
        super(new RetailRPAddressInfoState());
    }
   
  override doPreInit(): void {
//  this.setServiceCode("RETAILRPADDRESS");
 this.setServiceCode(this._appConfig.getData('serviceCode'));
 this.setHidden('pobox', true);
 this.addValueChangeHandler('rpaddressType', this.handleAddressTypeChange)
//  this.userService
//   .fetchCustomer(sessionStorage.getItem('customerCode'))
//   .subscribe((res) => {
//     if(res) {
//       console.log(res);
//       this.formGroup.controls['rpaddressType'].setValue(res?.addresses?.[0]?.addressType || "2");
//       this.formGroup.controls['street'].setValue(res?.addresses?.[0]?.street);
//       this.formGroup.controls['city'].setValue(res?.addresses?.[0]?.city);
//       this.formGroup.controls['country'].setValue(res?.addresses?.[0]?.country);
//       this.formGroup.controls['postalCode'].setValue(res?.addresses?.[0]?.pincode);
//     }
//   });
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Rpaddressinfo):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Rpaddressinfo){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.rpaddressinfo.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
  public handleAddressTypeChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    this.reset('pobox', "");
    if(value == "1") this.setHidden('pobox', false);
    else this.setHidden('pobox', true);
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

