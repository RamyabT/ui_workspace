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
import { DelegateuserreqService } from '../delegateuserreq-service/delegateuserreq.service';
import { Delegateuserreq } from '../delegateuserreq-service/delegateuserreq.model';
import { UserAuthService } from "@dep/services";
import { Delegateuser } from "../delegateuser-service/delegateuser.model";
import { DelegateuserService } from "../delegateuser-service/delegateuser.service";
import { FpxLayoutService } from "@fpx/layout";
export class RetailDelegateuserreqFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class RetailDelegateuserreqFormHelper extends BaseFpxFormHelper<RetailDelegateuserreqFormState>{

   constructor( private retailDelegateuserreqFormService: DelegateuserreqService,
     private _httpProvider : HttpProviderService,
     private _router: Router,
     public userAuth: UserAuthService,
     public _delegateUser:DelegateuserService,
     private fpxLayoutService: FpxLayoutService
    ) 
    {
        super(new RetailDelegateuserreqFormState());
    }
   
  override doPreInit(): void {
    this._delegateUser.getSystemAdminToken().subscribe((res:any)=>{
      console.log(res);
    })
 this.setServiceCode("RETAILDELEUSER");
 let userName = this.getRoutingParam('userName');
 let mode = this.getRoutingParam('mode');
 if (userName && mode == 'V') {
  this.setDataService(this._delegateUser);
}
 }
 public handleFormOnLoad() {
  let mode = this.getRoutingParam('mode');
  if(mode == 'V'){
    this.removeShellBtn('BACK');
  }
  let userName = this.getRoutingParam('userName');
   let action = this.getRoutingParam('action');
  let routingParam: any = this.getRoutingParam();

  if (userName && mode) {
    // this.setDisabled("inventoryNumber", false);
    if (mode == 'M') {
      this.fpxLayoutService.FORMTITLE = 'RetailDelegateuserreqForm.editFormTitle';
      this.removeShellBtn('RESET');
      this.setVariable('formMode', "M");

      this._delegateUser.findByKey(routingParam)().subscribe((res) => {
        console.log("Response", res);
        if (res) {
          this.setValue("initial", res.initial);
          this.setValue("firstName", res.firstName);
          this.setValue("lastName", res.lastName);
          this.setValue("mobileNumber", res.mobileNumber);
          this.setValue("emailAddress", res.emailAddress);
          this.setValue("userName", res.userName);
          this.setValue("nationality", res.nationality);
          this.setValue('remarks', res.remarks);
          this.setValue("accessLevel", res.accessLevel);
          this.setReadonly("accessLevel", true);
          // this.setDisabled('confirmCreditCardNumber', true);
          // this.setDisabled('creditCardNumber', true);
          // this.setDisabled('nickName', true);
          // this.setDisabled('bic', true);
          // this.setDisabled('beneficiaryName', true);
          // this.state.nickNameVar=res.nickName;



        }
      })
    };
    if (mode == 'D') {
      this.removeShellBtn('RESET');
      // this.setVariable('formMode', "V");
      this.setVariable('formMode', "D");
      this._delegateUser.findByKey(routingParam)().subscribe((res) => {
        console.log("Response", res);
        if (res) {
          this.setValue("initial", res.initial);
          this.setValue("firstName", res.firstName);
          this.setValue("lastName", res.lastName);
          this.setValue("mobileNumber", res.mobileNumber);
          this.setValue("emailAddress", res.emailAddress);
          this.setValue("userName", res.userName);
          this.setValue("nationality", res.nationality);
          this.setValue('remarks', res.remarks);
          this.setValue("accessLevel", res.accessLevel);
          this.setReadonly("initial", true);
          this.setReadonly("firstName", true);
          this.setReadonly("lastName", true);
          this.setReadonly("mobileNumber", true);
          this.setReadonly("emailAddress", true);
          this.setReadonly("userName", true);
          this.setReadonly("remarks", true);
          this.setReadonly("accessLevel", true);
          this.setReadonly("nationality", true);
        }
      })
    };
  }

  if (action == 'DECISION') {
    this.setDisabled("userName", false);
    // this.state.beneficiaryDetails.bankCode = bankCodeVar;
    // this.state.beneficiaryDetails.branchCode = branchCodeVar;
    // this.state.beneficiaryDetails.branchAddress = branchAddressVar;
  }
  else {
    // this.setDisabled("userName", true);
    // this.setDisabled("serviceCode",true);
  }

 
 };
 
 public handleFormOnPresubmit(payload: any) {
   let usId = this.userAuth.getAuthorizationAttr('UserId');
    // payload.userId = usId;
    let mode = this.getRoutingParam('mode');
    let userName = this.getRoutingParam('userName');
    if (mode == 'D') {
      payload.operationMode = 'D';
    }
    else if(mode == 'M'){
      payload.operationMode = 'M';
    }
    else{
      payload.operationMode = 'A';
    }
    return payload;
 }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Delegateuserreq):any {
     // WRITE CODE HERE TO HANDLE 
     this.handleFormOnPresubmit(payload);
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Delegateuserreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.delegateuserreq.tenantId.inventoryNumber,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.delegateuserreq;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
      });
    } 
    else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return routingInfo;
  }

 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

