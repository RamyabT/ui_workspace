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
  FpxModal,
  FpxIHttpOption
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { ApplicantsService } from '../applicants-service/applicants.service';
import { Applicants } from '../applicants-service/applicants.model';
import { ProductSelectionService } from "../product-selection-service/product-selection.service";
import { AppConfigService } from "@dep/services";
import moment from "moment";

export class ApplicantsFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   terms:any={
    textPosition:"after",
    ckValues:{checked:"Y",unchecked:"N"}
 }
 dob:any={
    minDate:"",
      maxDate:"",
    }
}


@Injectable()
export class ApplicantsFormHelper extends BaseFpxFormHelper<ApplicantsFormState>{

   constructor( private applicantsFormService: ApplicantsService,private _httpProvider : HttpProviderService,private _router: Router,
    private _productSelectionService: ProductSelectionService,
    private _appConfig: AppConfigService) 
    {
        super(new ApplicantsFormState());
    }
   
  override doPreInit(): void {
    this.setServiceCode("CASAONBOARDING");
    console.log(this.getAllRoutingParam());
    // this.formGroup.get('productId')?.patchValue(this.getRoutingParam('productId'));
    // this.formGroup.get('productSegment')?.patchValue(this.getRoutingParam('productSegment'));
    // this.formGroup.get('kfsFlag')?.patchValue(this.getRoutingParam('kfsFlag'));
   
    
 }
 


//  private mobileNumberValidationOnvalueChange: BaseFpxChangeHandler = (
//   name: string,
//   status: FormControlStatus,
//   value: any,
//   formGroup: FormGroup,
//   httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()
// ) => {
//   this.applicantsFormService.mobile({ mobileNumber: value })().subscribe((res)=>{
// if(res.body.status != 0){
//   this.setErrors('mobileNum', "mobileDedupe")

// }
//   })
// }
 
// private emailAddressValidationOnvalueChange: BaseFpxChangeHandler = (
//   name: string,
//   status: FormControlStatus,
//   value: any,
//   formGroup: FormGroup,
//   httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()
// ) => {
//   this.applicantsFormService.mobile({ emailAddress: value })().subscribe((res)=>{
// if(res.body.status != 0){
//   this.setErrors('emailAddress', "emailDedupe")

// }
//   })
// }


  public override doPostInit(): void {
    // this.addValueChangeHandler(
    //   "mobileNum",
    //   this.mobileNumberValidationOnvalueChange
    // );
    // this.addValueChangeHandler(
    //   "emailAddress",
    //   this.emailAddressValidationOnvalueChange
    // );
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Applicants):any {
     // WRITE CODE HERE TO HANDLE 
     const prePayload: { applicantId?: string } = {
      ...payload
     }
     delete prePayload['applicantId'];

    return prePayload;
  }
  
  
 public override postDataFetchInterceptor(payload: Applicants){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    // routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.applicants,
        transRef: response.success?.body?.applicants.applicantId,
        status: "success",
      });
      this._appConfig.setData('applicantId',response.success?.body?.applicants.tenantId.applicantId)
      this._appConfig.setData('processId',response.success?.body?.applicants.processId)
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }

  public handleFormOnLoad(){
    this.state.dob.maxDate = moment().subtract(18, 'years').format('yyyy-MM-DD');
    this.state.dob.minDate = moment().subtract(150, 'years').format('yyyy-MM-DD');
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
