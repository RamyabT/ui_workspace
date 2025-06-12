import { Injectable, inject } from "@angular/core";
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
import { EmploymentInfoService } from '../employmentInfo-service/employmentInfo.service';
import { EmploymentInfo } from '../employmentInfo-service/employmentInfo.model';
import { DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";

export class COBEmploymentInfoFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  monthlyIncome: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }

  title: any = {
    text: "Employment Information"
  }
  hint: any = {
    text: "(* indicates mandatory)"
  }
  companyAddress: any = {
    text: "Company address"
  }
}


@Injectable()
export class COBEmploymentInfoFormHelper extends BaseFpxFormHelper<COBEmploymentInfoFormState>{
  companyaddressInv!: FormGroup;
  nvalue: any;
  title: any;
  constructor(private cOBEmploymentInfoFormService: EmploymentInfoService, private _httpProvider: HttpProviderService, private _router: Router,
    public _deviceDetectorService: DeviceDetectorService,
    public _appConfig: AppConfigService) {
    super(new COBEmploymentInfoFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILEMPLOYMENTINFO");
    // this.addValueChangeHandler("monthlyIncome", this.handleMonthlyIncomeOnvalueChange);
    this.addValueChangeHandler("employmentType", this.handleEmploymentTypeOnvalueChange);
  }


  public override doPostInit(): void {
    this.companyaddressInv = this.formGroup.get("companyaddressInv") as FormGroup;
    this.setValue('country', 'AE');
    this.setValue('previouslyemployed', '0');
    this.setHidden('universityName', true);
    this.setHidden('courseName', true);
    this.setHidden('courseDuration', true);
    this._onLoadCountryOfTax();


  }
  private _onLoadCountryOfTax() {
    const httpRequest = new HttpRequest();
    // httpRequest.setResource('/obapplicantdocuments/20240201060514000703/{documentType}');
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
          let userInfo = paresedInfo.scannedValues.groups.find((item: any) => item.groupKey === 'idInfo');
          let issuingPlace = userInfo.fields.find((item: any) => item.fieldKey === "issuingAuthority")
          let natValue = issuingPlace.value;
          this.nvalue = natValue;
          this._appConfig.setData('IssuingPlace', this.nvalue);
        },
        error: () => {

        },
        complete: () => {

        }
      })

  };

  public handlepreviouslyemployedOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "1") {
      this.setHidden('occupationType', false);
      this.setHidden('companyName', false);
      this.setHidden('designation', false);
      this.setHidden('workingSince', false);
      this.setHidden('addressdetail', false);
      this._appConfig.setData('title', 'Employment Address');
      // this.setHidden('buildingName', false);
      // this.setHidden('nearestLandmark', false);
      // this.setHidden('country', false);
      // this.setHidden('states', false);
      // this.setHidden('city', false);
      // this.setHidden('zipCode', false);
      // this.setHidden('street', false);
      this.setHidden('universityName', true);
      this.setHidden('courseName', true);
      this.setHidden('courseDuration', true);
      // this.setHidden('annualIncome', false);

    }
    else if (value == "0" || value == "") {
      this.setHidden('addressdetail', true);
      // this.setHidden('buildingName', true);
      // this.setHidden('nearestLandmark', true);
      // this.setHidden('country', true);
      // this.setHidden('states', true);
      // this.setHidden('city', true);
      // this.setHidden('zipCode', true);
      // this.setHidden('street', true);
      this.setHidden('annualIncome', true);
      this.setHidden('universityName', true);
      this.setHidden('courseName',  true);
      this.setHidden('courseDuration', true);
    }
  };

  public handleEmploymentTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions}
    if (value == "E") { // Employed
      // this.setHidden('buildingName', false);
      // this.setHidden('nearestLandmark', false);
      // this.setHidden('country', false);
      // this.setHidden('states', false);
      // this.setHidden('city', false);
      // this.setHidden('zipCode', false);
      // this.setHidden('street', false);
      this._appConfig.setData('title', 'Employment Address');
      this.setHidden('addressdetail', false);
      this.setHidden('designation', false);
      this.setHidden('workingSince', false);
      // this.setHidden('occupationType', true);
      this.setHidden('companyName', false);
      // this.setHidden('occupationType', true);
      this.setHidden('empWorkExpDetails', true);
      this.setHidden('lastEmployersName', true);
      this.setHidden('empAddressOfLastYear', true);
      this.setHidden('empbusinesstypes', true);
      this.setHidden('empNameOwnCompany', true);
      this.setHidden('emptypesofentity', true);
      this.setHidden('ownershipPercent', true);
      this.setHidden('empPositionAndTitle', true);
      this.setHidden('empyearofbusiness', true);
      this.setHidden('empAddressOwnCompany', true);
      this.setHidden('monthlyIncome', false);
      this.setHidden('annualIncome', false);
      this.setHidden('previouslyemployed', true);
      this.setHidden('dependentIdNumber', true);
      this.setHidden('dependentName', true);
      this.setHidden('emprelationship', true);
      this.setValue('previouslyemployed', '0');
      this.setHidden('universityName', true);
      this.setHidden('courseName',  true);
      this.setHidden('courseDuration', true);
      // this.reset('buildingName');
      // this.reset('nearestLandmark');
      // this.reset('states');
      // this.reset('city');
      // this.reset('zipCode');
      // this.reset('street');
      this.reset('designation');
      this.reset('workingSince');
      this.reset('companyName');
      this.reset('monthlyIncome');
      this.reset('annualIncome');



    }
    else if (value == "U") { //Unemployed
      this.setHidden('designation', true);
      this.setHidden('workingSince', true);
      this.setHidden('occupationType', true);
      this.setHidden('companyName', true);
      this.setHidden('occupationType', true);
      this.setHidden('empWorkExpDetails', true);
      this.setHidden('lastEmployersName', true);
      this.setHidden('empAddressOfLastYear', true);
      this.setHidden('empbusinesstypes', true);
      this.setHidden('empNameOwnCompany', true);
      this.setHidden('emptypesofentity', true);
      this.setHidden('ownershipPercent', true);
      this.setHidden('empPositionAndTitle', true);
      this.setHidden('empyearofbusiness', true);
      this.setHidden('empAddressOwnCompany', true);
      this.setHidden('monthlyIncome', true);
      this.setHidden('annualIncome', true);
      this.setHidden('dependentIdNumber', true);
      this.setHidden('dependentName', true);
      this.setHidden('emprelationship', true);

      this.setHidden('addressdetail', true);
      this.setHidden('universityName', true);
      this.setHidden('courseName',  true);
      this.setHidden('courseDuration', true);
      // this.setHidden('buildingName', true);
      // this.setHidden('street', true);
      // this.setHidden('country', true);
      // this.setHidden('states', true);
      // this.setHidden('zipCode', true);
      // this.setHidden('city', true);
      // this.setHidden('nearestLandmark', true);
      this.setValue('previouslyemployed', '0');





      this.setHidden('previouslyemployed', false);
      this.addValueChangeHandler(
        "previouslyemployed",
        this.handlepreviouslyemployedOnvalueChange
      );
    }
    else if (value == "D") { //Dependent
      this.setHidden('designation', true);
      this.setHidden('workingSince', true);
      this.setHidden('occupationType', true);
      this.setHidden('companyName', true);
      this.setHidden('occupationType', true);
      this.setHidden('empWorkExpDetails', true);
      this.setHidden('lastEmployersName', true);
      this.setHidden('empAddressOfLastYear', true);
      this.setHidden('empbusinesstypes', true);
      this.setHidden('empNameOwnCompany', true);
      this.setHidden('emptypesofentity', true);
      this.setHidden('ownershipPercent', true);
      this.setHidden('empPositionAndTitle', true);
      this.setHidden('empyearofbusiness', true);
      this.setHidden('empAddressOwnCompany', true);
      this.setHidden('monthlyIncome', false);
      this.setHidden('annualIncome', false);
      this.setHidden('dependentIdNumber', false);
      this.setHidden('dependentName', false);
      this.setHidden('emprelationship', false);
      this.setHidden('previouslyemployed', true);
      this.setHidden('addressdetail', true);
      this.setHidden('universityName', true);
      this.setHidden('courseName',  true);
      this.setHidden('courseDuration', true);
      // this.setHidden('buildingName', true);
      // this.setHidden('nearestLandmark', true);
      // this.setHidden('country', true);
      // this.setHidden('states', true);
      // this.setHidden('city', true);
      // this.setHidden('zipCode', true);
      // this.setHidden('street', true);
      this.setValue('previouslyemployed', '0');

      this.reset('addressdetail');
      this.reset('annualIncome');
      this.reset('dependentIdNumber');
      this.reset('dependentName');
      this.reset('emprelationship');

    }
    else if (value == "S") { //Self Employed
      this._appConfig.setData('title', 'Employment Address');
      this.setHidden('designation', true);
      this.setHidden('workingSince', true);
      this.setHidden('companyName', false);
      this.setHidden('empWorkExpDetails', true);
      this.setHidden('lastEmployersName', true);
      this.setHidden('empAddressOfLastYear', true);
      this.setHidden('occupationType', false);
      this.setHidden('empbusinesstypes', false);
      this.setHidden('empNameOwnCompany', true);
      this.setHidden('emptypesofentity', false);
      this.setHidden('ownershipPercent', false);
      this.setHidden('empPositionAndTitle', false);
      this.setHidden('empyearofbusiness', false);
      this.setHidden('empAddressOwnCompany', true);
      this.setHidden('monthlyIncome', false);
      this.setHidden('annualIncome', false);
      this.setHidden('dependentIdNumber', true);
      this.setHidden('dependentName', true);
      this.setHidden('emprelationship', true);
      this.setHidden('previouslyemployed', true);
      this.setHidden('addressdetail', false);
      this.setHidden('universityName', true);
      this.setHidden('courseName',  true);
      this.setHidden('courseDuration', true);
      // this.setHidden('buildingName', false);
      // this.setHidden('nearestLandmark', false);
      // this.setHidden('country', false);
      // this.setHidden('states', false);
      // this.setHidden('city', false);
      // this.setHidden('zipCode', false);
      // this.setHidden('street', false);
      this.setValue('previouslyemployed', '0');

      // this.reset('buildingName');
      // this.reset('nearestLandmark');
      this.reset('addressdetail');
      // this.reset('states');
      // this.reset('city');
      // this.reset('zipCode');

      this.reset('street');
      this.reset('monthlyIncome');
      this.reset('annualIncome');
      this.reset('occupationType');
      this.reset('empbusinesstypes');
      this.reset('empNameOwnCompany');
      this.reset('emptypesofentity');
      this.reset('ownershipPercent');
      this.reset('empPositionAndTitle');
      this.reset('empyearofbusiness');
    }
    else if (value == "P") { // Professional
      this._appConfig.setData('title', 'College Address');
      this.setHidden('designation', true);
      this.setHidden('workingSince', true);
      this.setHidden('empWorkExpDetails', true);
      this.setHidden('lastEmployersName', true);
      this.setHidden('empAddressOfLastYear', true);
      this.setHidden('companyName', true);
      this.setHidden('occupationType', true);
      this.setHidden('empbusinesstypes', true);
      this.setHidden('empNameOwnCompany', true);
      this.setHidden('emptypesofentity', true);
      this.setHidden('ownershipPercent', true);
      this.setHidden('empPositionAndTitle', true);
      this.setHidden('empyearofbusiness', true);
      this.setHidden('empAddressOwnCompany', true);
      this.setHidden('monthlyIncome', true);
      this.setHidden('annualIncome', true);
      this.setHidden('dependentIdNumber', true);
      this.setHidden('dependentName', true);
      this.setHidden('emprelationship', true);
      this.setHidden('previouslyemployed', true);
      this.setHidden('addressdetail', false);
      // this.setHidden('buildingName', false);
      // this.setHidden('nearestLandmark', false);
      // this.setHidden('country', false);
      // this.setHidden('states', false);
      // this.setHidden('city', false);
      // this.setHidden('zipCode', false);
      // this.setHidden('street', false);  
      this.setValue('previouslyemployed', '0');
      this.setHidden('universityName', false);
      this.setHidden('courseName', false);
      this.setHidden('courseDuration', false);

      this.reset('addressdetail');
    //   this.reset('buildingName');
    //   this.reset('nearestLandmark');
    // this.reset('companyName')
    //   this.reset('states');
    //   this.reset('city');
    //   this.reset('zipCode');
    //   this.reset('street');
      this.reset('monthlyIncome');
      this.reset('annualIncome');
      this.reset('emptypesofentity');
      this.reset('ownershipPercent');
      this.reset('empPositionAndTitle');
      this.reset('empyearofbusiness');
      this.reset('occupationType');
      this.reset('empbusinesstypes');


    }
    else if (value == "R") { // Retired
      this.setHidden('empWorkExpDetails', false);
      this.setHidden('lastEmployersName', false);
      this.setHidden('empAddressOfLastYear', false);
      this.setHidden('occupationType', true);
      this.setHidden('designation', true);
      this.setHidden('workingSince', true);
      this.setHidden('companyName', true);
      this.setHidden('empbusinesstypes', true);
      this.setHidden('empNameOwnCompany', true);
      this.setHidden('emptypesofentity', true);
      this.setHidden('ownershipPercent', true);
      this.setHidden('empPositionAndTitle', true);
      this.setHidden('empyearofbusiness', true);
      this.setHidden('empAddressOwnCompany', true);
      this.setHidden('monthlyIncome', true);
      this.setHidden('annualIncome', true);
      this.setHidden('dependentIdNumber', true);
      this.setHidden('dependentName', true);
      this.setHidden('emprelationship', true);
      this.setHidden('previouslyemployed', true);
      this.setHidden('addressdetail', true);
      this.setHidden('universityName', true);
      this.setHidden('courseName',  true);
      this.setHidden('courseDuration', true);
      // this.setHidden('buildingName', true);
      // this.setHidden('nearestLandmark', true);
      // this.setHidden('country', true);
      // this.setHidden('states', true);
      // this.setHidden('city', true);
      // this.setHidden('zipCode', true);
      // this.setHidden('street', true);
      this.setValue('previouslyemployed', '0');

      this.reset('empWorkExpDetails');
      this.reset('lastEmployersName');
      this.reset('empAddressOfLastYear');
      this.reset('annualIncome');
      // this.reset('buildingName');
      // this.reset('nearestLandmark');
      
      // this.reset('states');
      // this.reset('city');
      // this.reset('zipCode');
      // this.reset('street');

    }
  }
  public handleMonthlyIncomeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      if (value.amount < 10) {
        this.formGroup.get('monthlyIncome')?.setErrors({ "IncomevalminError": true }, { emitEvent: false });
      }
      if (value.amount > 999999999999999) {
        this.formGroup.get('monthlyIncome')?.setErrors({ "IncomevalmaxError": true }, { emitEvent: false });
      }
    }
  }


  public override preSubmitInterceptor(payload: EmploymentInfo): any {
    // WRITE CODE HERE TO HANDLE 
    // payload = {
    //   ...payload,
    //   monthlyIncome: payload['monthlyIncome']['amount']
    //  }
    return payload;
  }


  public override postDataFetchInterceptor(payload: EmploymentInfo) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.employmentInfo,
        transRef: response.success?.body?.employmentInfo.applicantId,
        status: "success",
      });
      this._appConfig.setData('applicantId', response.success?.body?.employmentInfo.applicantId)
      this._appConfig.setData('processId', response.success?.body?.employmentInfo.processId)
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


