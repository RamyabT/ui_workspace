import { Inject, Injectable } from "@angular/core";
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
  FpxModal,
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { ServicerequestadhocService } from '../servicerequestadhoc-service/servicerequestadhoc.service';
import { Servicerequestadhoc } from '../servicerequestadhoc-service/servicerequestadhoc.model';

export class RetailCreateServiceRequestFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;

   termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
 show:any;
}


@Injectable()
export class RetailCreateServiceRequestFormHelper extends BaseFpxFormHelper<RetailCreateServiceRequestFormState>{
  SubCategory! : FormGroup;
  
   constructor( private retailCreateServiceRequestFormService: ServicerequestadhocService, private _httpProvider : HttpProviderService,private _router: Router,
    ) 
    {
        super(new RetailCreateServiceRequestFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILSERVICEADHOCREQ");
 }
   

  public override doPostInit(): void {
    this.handleFormOnLoad();
    this.addValueChangeHandler("responseRequired", this.handleResponseRequiredOnvalueChange);
    this.addValueChangeHandler("contactMethod", this.handleContactMethodOnvalueChange);
    this.addResetHandler('reset', this._reset);
    let mode=this.getRoutingParam('mode');
    if(mode=='V'){
      let SubCategory=this.getValue('SubCategory');
      let Category=this.getValue('Category');
      let requestTypes=this.getValue('requestTypes');
      let servicerequestadhocdtls=this.getValue('servicerequestadhocdtls');
      this.setValue('SubCategory',SubCategory?.subCategory);
      this.setValue('Category',Category?.categoryCode);
      this.setValue('requestTypes',requestTypes);
    }
  }
  public handleFormOnLoad() {
    // this.addShellButton('RetailCreateServiceRequestForm.Back', 'BACK', 'secondary', 'DISPLAY', 'button');
    //   this.setShellBtnMethod('BACK', this.onClick.bind(this));
    if(this.formMode == "ADD"){
      this.setHidden('mobileNumber',true);
      this.setHidden('returnCallTiming',true);
      this.setValue('Category', '1');
      this.setValue('requestTypes', '1');
      this.setValue('responseRequired', '1');
      this.setValue('contactMethod', '1');
      this.showSpinner();
      this.state.show=1;
      let httpRequest = new HttpRequest();
      httpRequest.setMethod("GET");
      httpRequest.setResource("/customer");
      httpRequest.setContextPath('Customers');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCUSTOMERDETAILS');
      this._httpProvider.invokeRestApi(httpRequest).pipe(map((res: IHttpSuccessPayload<any>) => { return res; })).subscribe({
        next: (res) => {
          this.hideSpinner();
          this.setValue('email', res.body.customer.emailId);
          this.setValue('mobileNumber', res.body.customer.mobileNumber);
  
        },
        error: () => {
          this.hideSpinner();
        },
        complete: () => { },
      });

    }
  }

  private _reset = () => {
    this.handleFormOnLoad();
    this.reset('message');
    this.reset('SubCategory');
    this.reset('servicerequestadhocdtls');
  }

  public handleResponseRequiredOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value==1){
      this.setHidden('contactMethod',false);
      if(this.formGroup.controls['contactMethod']?.value === "1"){
        this.setHidden('email',false);
        this.setReadonly('email',true);
        this.setHidden('mobileNumber',true);
        this.setHidden('returnCallTiming',true);
        this.state.show=1;
      }
      else{
        this.setHidden('email',true);
        this.setHidden('mobileNumber',false);
        this.setHidden('returnCallTiming',false);
        this.state.show='';
      }
    }
    else{
      this.setHidden('contactMethod',true);
      this.setHidden('email',true);
      this.setHidden('mobileNumber',true);
      this.setHidden('returnCallTiming',true);
      this.state.show='';
    }
  }

  public handleContactMethodOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value==1){
      this.setHidden('email',false);
      this.setHidden('mobileNumber',true);
      this.setHidden('returnCallTiming',true);
      this.state.show=1;
    }
    else{
      this.setHidden('email',true);
      this.setHidden('mobileNumber',false);
      this.setHidden('returnCallTiming',false);
      this.state.show='';
    }
  }
  backNavigate(){
    this._router.navigate(['service-request-space']);   
  }
 
  public override preSubmitInterceptor(payload: Servicerequestadhoc):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Servicerequestadhoc){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.servicerequestadhoc,
        // status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
