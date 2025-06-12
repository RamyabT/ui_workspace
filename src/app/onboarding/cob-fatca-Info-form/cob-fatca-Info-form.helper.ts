
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
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
// import { ProcessShellService } from "src/app/process-shell/services/process-shell.service";
import { FatcaInfoService } from "../fatcaInfo-service/fatcaInfo.service";
import { FatcaInfo } from "../fatcaInfo-service/fatcaInfo.model";
import { Othercountrytaxinfo } from "../othercountry-taxinfo-inputgrid/othercountry-taxinfo-inputgrid.model";
import { DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
// import {  Othercountrytaxinfo } from '../../foundation/othercountry-taxinfo-inputgrid/othercountry-taxinfo-inputgrid.model';

export class COBFatcaInfoFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  taxDetails: any = {
    text: "Please fill your tax information",
  };
  taxDetails1: any = {
    text: "(* indicates mandatory)",
  };
  HeadlblcountryOfTax: any = {
    text: "In Which Jurisdictions have you been paying tax in the previous calendar year?"
  };
}

@Injectable()
export class COBFatcaInfoFormHelper extends BaseFpxFormHelper<COBFatcaInfoFormState> {
  nvalue: any;
  othercountrytaxinfo!: FormArray;
  taxDetails: any = {
    text: "Please fill your tax information",
  };
  taxDetails1: any = {
    text: "(* indicates mandatory)",
  };
  HeadlblcountryOfTax: any = {
    text: "In Which Jurisdictions have you been paying tax in the previous calendar year?"
  };

  constructor(
    private cOBFatcaInfoFormService: FatcaInfoService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    public _deviceDetectorService: DeviceDetectorService,
    public _appConfig: AppConfigService
  ) {
    super(new COBFatcaInfoFormState());
    this.addValueChangeHandler(
      "countryOfBirth",
      this.handlecountryOfBirthOnvalueChange
    );
    this.addValueChangeHandler(
      "usResident",
      this.handleUsResidentOnvalueChange
    );
    this.addValueChangeHandler(
      "taxPayerIdAvailable",
      this.handleTaxPayerIdAvailableOnvalueChange
    );
    this.addValueChangeHandler(
      "investmentSchemaFlag",
      this.handleinvestmentSchemaFlagOnvalueChange
    );
    this.addValueChangeHandler(
      "countryOfTax",
      this.handlecountryOfTaxOnvalueChange
    );
    this.addValueChangeHandler(
      "reasonForNoTin",
      this.handlereasonForNoTinOnvalueChange
    );

  }

  override doPreInit(): void {
    this.setServiceCode("RETAILFATCAINFO");
    this.setHidden("remarks", true);
    this.setHidden("reasonForNoTin", true);
    this.setHidden("taxPayerId", true);
    
    // this._onLoadCountryOfTax();
    // this._onLoadCityOfBirth();
  }
  private _onLoadCityOfBirth() {
    const httpRequest = new HttpRequest();
    // httpRequest.setResource('/obapplicantdocuments/20240315213111047502/{documentType}');
    httpRequest.setResource('/obapplicantdocuments/{applicantId}/{documentType}');
    //  httpRequest.addPathParameter('appRef', this.setRoutingParam('appRef'));
    httpRequest.addPathParameter('applicantId', this._appConfig.getData('applicantId'));
    //  httpRequest.addPathParameter('appRef',sessionStorage.getItem('applicantId'));

    httpRequest.addPathParameter('documentType', 'PASSPORT');
    httpRequest.setMethod('GET');
    httpRequest.setContextPath('Customers');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null)).subscribe({
        next: (res: any) => {
          console.log(res)
          let info = res?.obapplicantdocuments?.extractedInfo
          let paresedInfo = JSON.parse(info || '{}')
          let userInfo = paresedInfo.scannedValues.groups.find((item: any) => item.groupKey === 'userInfo');
          let nationality = userInfo.fields.find((item: any) => item.fieldKey === "nationality")
          let natValue = nationality.value;
          // this.setValue('countryOfBirth', natValue);
          this.formGroup.get("cityOfBirth")?.setValue(natValue);


        },
        error: () => {

        },
        complete: () => {

        }
      })

  };
  private _onLoadCountryOfTax() {
    const httpRequest = new HttpRequest();
    // httpRequest.setResource('/obapplicantdocuments/20240315213111047502/{documentType}');
    httpRequest.setResource('/obapplicantdocuments/{applicantId}/{documentType}');
    //  httpRequest.addPathParameter('appRef', this.setRoutingParam('appRef'));
    httpRequest.addPathParameter('applicantId', this._appConfig.getData('applicantId'));
    //  httpRequest.addPathParameter('appRef',sessionStorage.getItem('applicantId'));


    httpRequest.addPathParameter('documentType', 'EMIRATES_ID');
    httpRequest.setMethod('GET');
    httpRequest.setContextPath('Customers');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null)).subscribe({
        next: (res: any) => {
          console.log(res)
          let info = res?.obapplicantdocuments?.extractedInfo
          let paresedInfo = JSON.parse(info || '{}')
          let userInfo = paresedInfo.scannedValues.groups.find((item: any) => item.groupKey === 'userInfo');
          let nationality = userInfo.fields.find((item: any) => item.fieldKey === "nationality")
          let natValue = nationality.value;
          // this.setValue('countryOfBirth', natValue);
          this.formGroup.get("countryOfBirth")?.setValue(natValue);
          this.nvalue = natValue;

        },
        error: () => {

        },
        complete: () => {

        }
      })

  };
  public handlecountryOfBirthOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "AE" && formGroup.controls["countryOfTax"].value == "AE") {
      this.setHidden("investmentSchemaFlag", true);
      this.setHidden("otherResidentJurisdictionsFlag", true);

    }
    else if (value == "US") {
      this.setErrors('countryOfBirth', 'checkcountry');
    }
    else if (value != "AE" && formGroup.controls["countryOfTax"].value == "") {
      this.setHidden("investmentSchemaFlag", true);
      this.setHidden("otherResidentJurisdictionsFlag", true);
      

    }
    else if (value != "AE" && formGroup.controls["countryOfTax"].value != "AE") {
      this.setHidden("investmentSchemaFlag", true);
      this.setHidden("otherResidentJurisdictionsFlag", true);

    }
   
    else {
      this.setHidden("investmentSchemaFlag", true);
      this.setHidden("otherResidentJurisdictionsFlag", true);
    }
  };

  public handlereasonForNoTinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "1") {
      this.setHidden("remarks", true);


    }
    else if (value == "2") {
      this.setHidden("remarks", false);

    }
  };
  public handlecountryOfTaxOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "AE" && formGroup.controls["countryOfBirth"].value != "AE") {
      this.setHidden("investmentSchemaFlag", false);
      this.setHidden("otherResidentJurisdictionsFlag", false);
      
      

    }
    else if (this.nvalue == formGroup.controls["countryOfTax"].value) {
      this.setErrors('countryOfTax', 'checkcountry')
      this.setHidden("investmentSchemaFlag", true);
      
    }
    else if (value == "US") {
      this.setErrors('countryOfTax', 'checkcountry')
      this.setHidden("investmentSchemaFlag", true);
      this.setHidden("otherResidentJurisdictionsFlag", true);
      
      
      
    }
    else {
      this.setHidden("investmentSchemaFlag", true);
      this.setHidden("otherResidentJurisdictionsFlag", true);
      
      
    }
  };
  public handleinvestmentSchemaFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "0" || value == "") {
      this.setHidden("othercountrytaxinfo", true);
    }
    else {
      this.setHidden("othercountrytaxinfo", false);
    }
  };
  public handleUsResidentOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {


  };

  public handleTaxPayerIdAvailableOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "1") {
      this.setHidden("taxPayerId", false);
      this.setHidden("reasonForNoTin", true);
      this.setHidden("remarks", true);
    }
    else if (value == "0") {


      this.reset("taxPayerId", true);
      this.setHidden("taxPayerId", true);
      this.setHidden("reasonForNoTin", false);
    }

  };
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.setValue('usResident', "1");
    //  this.setValue('taxPayerIdAvailable',"1");
  }
  public override doPostInit(): void {
    this.othercountrytaxinfo = this.formGroup.get(
      "othercountrytaxinfo"
    ) as FormArray;
    // this.setHidden("othercountrytaxinfo",true);
    this.handleFormOnLoad();

    
  }

  public override preSubmitInterceptor(payload: FatcaInfo): any {
    // WRITE CODE HERE TO HANDLE
    if (!payload.othercountrytaxinfo) {
      delete payload?.othercountrytaxinfo
    }
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.fatcaInfo,
        transRef: response.success?.body?.fatcaInfo.applicantId,
        status: "success"
      });
    } else if (response.error) {
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.ErrorMessage,
        status: "failed",
      });
    }
    return routingInfo;
  }
}
