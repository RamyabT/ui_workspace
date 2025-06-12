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
export class applyHomeLoanState extends BaseFpxComponentState {
  showSuggestion: boolean = false;

  dob: any = {
    minDate: "",
    maxDate: "",
  }
}


@Injectable()
export class applyHomeLoanExistingHelper extends BaseFpxFormHelper<applyHomeLoanState> {
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
  loanInitationData: any;

  constructor(private applyHomeLoanService: ApplyloanService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new applyHomeLoanState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILAPPLYHOMELOAN");
    this.setHidden("existingloandetailsTab",true)
  }

  test() {
    console.log(this.formGroup);
  }

  public override doPostInit(): void {
    this.applicantaddressinfo = this.formGroup.get("applicantaddressinfo") as FormGroup;
    this.additionalEmploymentInfo = this.formGroup.get("additionalEmploymentInfo") as FormArray;
    this.expensesDetails = this.formGroup.get("expensesDetails") as FormGroup;
    this.coApplicantsDetails = this.formGroup.get("coApplicantsDetails") as FormArray;
    this.supportingDocs = this.formGroup.get("supportingDocs") as FormArray;
    this.coApplicantsDtls = true;
    this.addValueChangeHandler("coApplicant", this.handlecoApplicantOnvalueChange);
  }
  // override setCurrentActiveTab($event:any){
  //   debugger
  // }

  public handlecoApplicantOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == 0) {
      this.reset("coApplicantDetails", "");
      this.coApplicantsDtls = true;
      let value: any = this.formGroup.value.coApplicantDetails.length
      this.applyHomeLoanService.coApplicantsValue.next(value);
    }
    else {
      this.coApplicantsDtls = false;
      this.setValue(`coApplicantDetails[${0}]serialNumber`, "0");
      let value: any = this.formGroup.value.coApplicantDetails.length
      this.applyHomeLoanService.coApplicantsValue.next(value);
    }
  }


  public override preSubmitInterceptor(payload: Applyloan): any {
    // WRITE CODE HERE TO HANDLE 
    console.log("payload", payload);
    if (payload?.basicDetails?.additionalEmploymentInfo) {
      this.additionalEmploymentInf = payload?.basicDetails?.additionalEmploymentInfo?.map((item: any, index: number) => {
        const additionalEmploymentInfo: any = {
          serialNumber: index + 1,
          companyName: item?.companyName,
          empstatus: item?.empstatus,
          monthlyIncome: item?.monthlyIncome?.amount,
          position: item?.position
        };
        return additionalEmploymentInfo
      });
    }

    if (payload?.coApplicantDetails) {
      this.coApplicantDetails = payload?.coApplicantDetails?.map((item: any, index: number) => {
        const coApplicantDetails: any = {
          serialNumber: index + 1,
          relationCode: item?.relationCode,
          relationDesc: item?.relationDesc,
          name: item?.name,
          idNumber: item?.idNumber
        };
        return coApplicantDetails
      });
    }


    let supportingDocs: any[] = []

    supportingDocs.push(
      { serialNumber: "0", docCode: "SALARYSLIP", docDesc: "SALARYSLIP", fileInv: payload.documentUpload.salarySlip },
      { serialNumber: "1", docCode: "BANKSTATEMENT", docDesc: "BANKSTATEMENT", fileInv: payload.documentUpload.bankStatement },
      { serialNumber: "2", docCode: "ALLOTMENTLETTER", docDesc: "ALLOTMENTLETTER", fileInv: payload.documentUpload.allotmentLetter },
      { serialNumber: "3", docCode: "BUYERAGGREMENT", docDesc: "BUYERAGGREMENT", fileInv: payload.documentUpload.buyerAggrement }
    )

    if (payload?.documentUpload?.coApplicantfile) {
      this.coAppSupportingDocs = payload?.documentUpload?.coApplicantfile?.map((item: any, index: number) => {
        const coAppSupportingDocs: any = {
          serialNumber: index + 4,
          docCode: "COAPPLICANT" + 1,
          docDesc: "COAPPLICANT" + 1,
          fileInv: payload.documentUpload.coApplicantfile[index].coApplicantImage
        };
        return coAppSupportingDocs
      });
      console.log("this.coAppSupportingDocs", this.coAppSupportingDocs);
    }

    if(!this.coAppSupportingDocs){
      this.coAppSupportingDocs = ""
    }

    let supportingDoc = [...supportingDocs, ...this.coAppSupportingDocs];

    console.log("supportingDoc", supportingDoc);


    let expensesDetails = {
      "annualPropertyTax": payload?.basicDetails?.annualPropertyTax?.amount,
      "otherLoanEMI": payload?.basicDetails?.otherLoanEMI?.amount,
      "monthlyExpenses": payload?.basicDetails?.monthlyExpenses?.amount,
      "monthlyCondominiumFees": payload?.basicDetails?.monthlyCondominiumFees?.amount
    }

    let addressDetail: any[] = []

    addressDetail.push(
      { serialNumber: "0", addressType: "PERSONALADDRESS", addressLine1: payload.loanDetails.addressLine1, addressLine2: payload.loanDetails.addressLine2, zipCode: payload.loanDetails.zipcode, city: payload.loanDetails.city, state: payload.loanDetails.state },
      { serialNumber: "1", addressType: "EMPLOYMENTADDRESS", addressLine1: payload.loanDetails.addressLine1, addressLine2: payload.loanDetails.addressLine2, zipCode: payload.loanDetails.zipcode, city: payload.loanDetails.city, state: payload.loanDetails.state },
      { serialNumber: "2", addressType: "PROPERTYADDRESS", addressLine1: payload.loanDetails.addressLine1, addressLine2: payload.loanDetails.addressLine2, zipCode: payload.loanDetails.zipcode, city: payload.loanDetails.city, state: payload.loanDetails.state }
    )

    let employmentInfo = {
      "empstatus": payload?.basicDetails?.empstatus,
      "companyName": payload?.basicDetails?.empName,
      "position": payload?.basicDetails?.empPosition,
      "monthlyIncome": payload?.basicDetails?.monthlyIncome
    }

    let reqData = {
      "firstName": payload?.basicDetails?.firstName,
      "lastName": payload?.basicDetails?.lastName,
      "propertyCost": payload?.loanDetails?.propCost,
      "productCode": "104",
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
      "productselection": "HOMELOAN",
      "coApplicant": payload?.coApplicant,
      "loanAmount": payload?.loanDetails?.loanAmount,
      "employmentInfo": employmentInfo,
      "additionalEmploymentInfo": this.additionalEmploymentInf == undefined ? "" : this.additionalEmploymentInf,
      "expensesDetails": expensesDetails,
      "coApplicantsDetails": this.coApplicantDetails == undefined ? "" : this.coApplicantDetails,
      "supportingDocs": supportingDoc,
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


