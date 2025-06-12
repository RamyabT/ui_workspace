import { inject, Injectable } from "@angular/core";
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
import { ApplyloanService } from '../applyloan-service/applyloan.service';
import { Applyloan } from '../applyloan-service/applyloan.model';
import { Applicantaddressinfo } from '../../onboarding/applicantaddressinfo-service/applicantaddressinfo.model';
import { AdditionalEmploymentInfo } from '../additional-employmentInfo/additional-employmentInfo.model';
import { ExpensesDetails } from '../expensesDetails-service/expensesDetails.model';
import { CoApplicantsDetails } from '../coApplicantsDetails/co-applicants-details.model';
import { SupportingDocs } from '../supportingDocs/supporting-docs.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
export class applyPersonalLoanState extends BaseFpxComponentState {
  showSuggestion: boolean = false;

  dob: any = {
    minDate: "",
    maxDate: "",
  }
}


@Injectable()
export class applyPersonalLoanHelper extends BaseFpxFormHelper<applyPersonalLoanState> {
  private _appConfig: AppConfigService = inject(AppConfigService);
  applicantaddressinfo!: FormGroup;
  additionalEmploymentInfo!: FormArray;
  expensesDetails!: FormGroup;
  coApplicantsDetails!: FormArray;
  supportingDocs!: FormArray;
  coAppSupportingDocs: any;
  coApplicantDetails: any;
  additionalEmploymentInf: any;
  coApplicantsDtls: boolean = false;

  constructor(private applyPersonalLoanService: ApplyloanService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new applyPersonalLoanState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILAPPLYHOMELOAN");
  }

  public override doPostInit(): void {
    this.applicantaddressinfo = this.formGroup.get("applicantaddressinfo") as FormGroup;
    this.supportingDocs = this.formGroup.get("supportingDocs") as FormArray;
  }


  public override preSubmitInterceptor(payload: Applyloan): any {
    // WRITE CODE HERE TO HANDLE 
    console.log("payload", payload);

    let supportingDocs: any[] = []

    supportingDocs.push(
      { serialNumber: "0", docCode: "SALARYSLIP", docDesc: "SALARYSLIP", fileInv: payload.documentUpload.salarySlip },
      { serialNumber: "1", docCode: "BANKSTATEMENT", docDesc: "BANKSTATEMENT", fileInv: payload.documentUpload.bankStatement }
    )


    let addressDetail: any[] = []

    addressDetail.push(
      { serialNumber: "0", addressType: "PERSONALADDRESS", addressLine1: payload.loanDetails.addressLine1, addressLine2: payload.loanDetails.addressLine2, zipCode: payload.loanDetails.zipcode, city: payload.loanDetails.city, state: payload.loanDetails.state },
      { serialNumber: "1", addressType: "EMPLOYMENTADDRESS", addressLine1: payload.loanDetails.addressLine1, addressLine2: payload.loanDetails.addressLine2, zipCode: payload.loanDetails.zipcode, city: payload.loanDetails.city, state: payload.loanDetails.state }
    )

    let employmentInfo = {
      "empstatus": payload?.basicDetails?.empstatus,
      "companyName": payload?.basicDetails?.empName,
      "position": payload?.basicDetails?.empPosition,
      "monthlyIncome": payload?.basicDetails?.monthlyIncome?.amount
    }

    let reqData = {
      "firstName": payload?.basicDetails?.firstName,
      "lastName": payload?.basicDetails?.lastName,
      "productCode": "106",
      "mobileNumber": payload?.basicDetails?.mobileNumber,
      "dob": payload?.basicDetails?.dob,
      "emailAddress": payload?.basicDetails?.email,
      "currency": this._appConfig.baseCurrency,
      "downPayment": payload?.loanDetails?.downPayment,
      "tenor": payload?.loanDetails?.tenor,
      "interestRate": payload?.loanDetails?.interestRate,
      "emi": payload?.loanDetails?.emi,
      "interestAmount": payload?.loanDetails?.interestAmount,
      "repaymentAmount": payload?.loanDetails?.repaymentAmount,
      "productselection": "PERSONALLOAN",
      "loanAmount": payload?.loanDetails?.loanAmount,
      "employmentInfo": employmentInfo,
      "supportingDocs": supportingDocs,
      "addressDetails": addressDetail
    }
    console.log("reqDate", reqData)
    return reqData;
  }


  public override postDataFetchInterceptor(payload: Applyloan) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.applyloan;
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


