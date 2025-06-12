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
import { ApplicantsService } from '../applicants-service/applicants.service';
import { Applicants } from '../applicants-service/applicants.model';
import { MomentService } from 'src/app/foundation/validator-service/moment-service';
import { AppConfigService } from "@dep/services";
export class CobApplicantInfoFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  dob: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }

  terms: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  terms2: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  terms3: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
}


@Injectable()
export class CobApplicantInfoFormHelper extends BaseFpxFormHelper<CobApplicantInfoFormState> {

   constructor( private cobApplicantInfoFormService: ApplicantsService,  private moment: MomentService, private _appConfig: AppConfigService,private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new CobApplicantInfoFormState());
    }
   
  override doPreInit(): void {
    this.setServiceCode("CASAONBOARDING");

    this.addValueChangeHandler('terms', this.handleTermsFlagOnvalueChange);
    this.addValueChangeHandler('terms2', this.handleTermsFlagOnvalueChangeTwo);
    this.addValueChangeHandler('terms3', this.handleTermsFlagOnvalueChangeThree);
  }

  public handleFormOnDestroy() {
    // WRITE CODE HERE TO HANDLE
  }
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.setValue('terms',null);
    this.setValue('terms2',null);
    this.setValue('terms3',null);
    this.setValue('productselection', this._appConfig.getData('cobproductdls').productId);
    this.setReadonly('productselection', true);
    this.setHidden('productselection', true);
    this.state.dob.maxDate = this.moment.getInstance().subtract(18, 'years').format('yyyy-MM-DD');
    this.state.dob.minDate = this.moment.getInstance().subtract(150, 'years').format('yyyy-MM-DD');


    // this.setValue('iSOCodeList', '+91');
    // this.formGroup.get('iSOCodeList')?.patchValue('+91');
  }
  public handleFormOnPresubmit(payload:any){
	 // WRITE CODE HERE TO HANDLE
 let productdtls:any=this._appConfig.getData('cobproductdls');
   payload.productselection= {       productSegment : productdtls.productSegment,       product: {         productCode : productdtls.productId       }     };
    return payload;
	}

  public override doPostInit(): void {

    this.handleFormOnLoad();
  }

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('terms',null)
    }
  }

  public handleTermsFlagOnvalueChangeTwo: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('terms2',null)
    }
  }

  public handleTermsFlagOnvalueChangeThree: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('terms3',null)
    }
  }

  public override preSubmitInterceptor(payload: Applicants): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Applicants) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      this._appConfig.setData('applicantId', response.success?.body?.applicants.applicantId);
      this._appConfig.setData('processId',response.success?.body?.applicants.processId)
      routingInfo.setQueryParams({
        response: response.success?.body?.applicants,
        transRef: response.success?.body?.applicants.applicantId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ 
        response: response.error?.error,
        errMsg: response.error?.error?.ErrorMessage, 
        status: "failed" 
      });
    }
    this._appConfig.removeData('cobproductdls');
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


