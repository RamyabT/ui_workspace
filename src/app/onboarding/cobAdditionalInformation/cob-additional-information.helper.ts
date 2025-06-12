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
import { AdditionalInformationService } from '../additionalInformation-service/additionalInformation.service';
import { AdditionalInformation } from '../additionalInformation-service/additionalInformation.model';
import { AppConfigService } from "@dep/services";

export class cobAdditionalInformationState extends BaseFpxComponentState {
  showSuggestion: boolean = false;

  title: any = {
    text: "Additional Information"
  }
}


@Injectable()
export class cobAdditionalInformationHelper extends BaseFpxFormHelper<cobAdditionalInformationState> {
  address!: FormGroup;
  title: any;
  // countryOfTaxResidence!: FormArray;
  countryOfTaxFlag = false;
  occupation: number | undefined;
  grossDebitTurnoverValue = 0;
  salaryAmount = 0;
  otherIncomeAmount = 0;
  localForeignInwardAmount = 0;
  cashDepositAmount = 0;
  outwardClearingAmount = 0;
  avgCashWithdrawAmount = 0;
  localForeignOutwardAmount = 0;
  InwardClearingAmount = 0;
  isAddressRequired = false;
  commonField = [
    'mainSourceOfIncome',
    'dualNationalityHolderFlag',
    'dualNationalityHolder',
    'otherIncome',
    'cashDeposit',
    'localForeignInward',
    'outwardClearing',
    'grossCreditTurnover',
    'avgCashWithdraw',
    'localForeignOutward',
    'grossDebitTurnover',
    // 'countryOfTaxResidence',
    'UDF1',
    'UDF2',
    'UDF3',
    'UDF4',
    'UDF5'
  ]

  employerField = [
    'InwardClearing'
  ];
  selfEmployedField = [];
  retiredField = [];
  studentField = [];

  // usQueriesFlag = [
  //   'dualNationalityHolderFlag',
  //   'dualNationalityHolder',
  //   'countryOfTaxResidence'
  // ]
  maxCountryCount: number = 2;
  constructor(private _appcongif: AppConfigService, public appConfig: AppConfigService, private cobAdditionalInformationService: AdditionalInformationService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new cobAdditionalInformationState());
  }

  override doPreInit(): void {

    this.setServiceCode("COBADDITIONALINFO");

    this.cobAdditionalInformationService.fetchEmployeDetails().subscribe({
      next: (value: any) => {
        let occupationDtl: any[] = []
        if (value) {
          this.cobAdditionalInformationService.fetchOccupationType().subscribe({
            next: (res: any) => {
              occupationDtl = res;
              let occupation: any = []
              occupationDtl.map((res) => {
                if (res.id === value.OCCUPATION_TYPE) occupation = res;
              })
              // this.setValue('position',occupation.text);
              this.occupation = value.OCCUPATION_TYPE;
              this.setValue('occupation', value.OCCUPATION_TYPE);
              this.handleFormOnLoad();
            }
          });
          this._appcongif.setData('addressDtl', value.address);
        }
      }
    })
  }

  // public usQueries() {
  //   this.usQueriesFlag.map((res) => { this.setHidden(res, true) });
  //   this.countryOfTaxFlag = false;
  // }

  public occupationFieldFilter(val: Array<string>, occType: Array<string>, occupation: string) {
    let notRequiredField: Array<string> = [...val];
    const notRequiredFieldFilter = notRequiredField.filter((item, index) => notRequiredField.indexOf(item) === index && !occType.includes(item));
    notRequiredFieldFilter.map((res: any) => {
      this.setDisabled(res, true);
      this.setHidden(res, true);
    });
    let requiredFieldFilter = [...this.commonField, ...occType];
    requiredFieldFilter.map((res: any) => {
      this.setDisabled(res, false);
      this.setHidden(res, false);
      // this.setLabel(res, `cobAdditionalInformation.${occupation}.${res}.label`);
    });
    // this.usQueries();
  }

  public occupationSelection(occupation: any) {
    if (occupation == 'E') {    //Employed
      let notRequiredField: Array<string> = [...this.selfEmployedField, ...this.retiredField, ...this.studentField];
      this.occupationFieldFilter(notRequiredField, this.employerField, 'employerGroup');
    } else if (occupation == 'S') {    //Self Employed
      let notRequiredField: Array<string> = [...this.employerField, ...this.retiredField, ...this.studentField];
      this.occupationFieldFilter(notRequiredField, this.selfEmployedField, 'selfEmplyedGroup');
    } else if (occupation == 'R') {    //Retired
      let notRequiredField: Array<string> = [...this.employerField, ...this.selfEmployedField, ...this.studentField];
      this.occupationFieldFilter(notRequiredField, this.retiredField, 'retiredGroup');
    } else if (occupation == 'P') {    //Student
      let notRequiredField: Array<string> = [...this.employerField, ...this.selfEmployedField, ...this.retiredField];
      this.occupationFieldFilter(notRequiredField, this.studentField, 'houseWifeGroup');
    }
  }
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.occupationSelection(this.occupation);
    this.setReadonly('grossCreditTurnover', true);
    this.setReadonly('grossDebitTurnover', true);
    this.dualNationalityHolder(true);
  }

  public override doPostInit(): void {
    this.addValueChangeHandler("dualNationalityHolderFlag", this.handledualNationalityHolderFlagOnvalueChange);
    this.addValueChangeHandler("mailingAddress", this.handleMailingAddressOnvalueChange);
    this.addValueChangeHandler("otherIncome", this.handleOtherIncomeOnvalueChange);
    this.addValueChangeHandler("cashDeposit", this.handleCashDepositOnvalueChange);
    this.addValueChangeHandler("localForeignInward", this.handleLocalForeignInwardOnvalueChange);
    this.addValueChangeHandler("outwardClearing", this.handleOutwardClearingOnvalueChange);
    this.addValueChangeHandler("avgCashWithdraw", this.handleAvgCashWithdrawOnvalueChange);
    this.addValueChangeHandler("localForeignOutward", this.handleLocalForeignOutwardOnvalueChange);
    this.addValueChangeHandler("InwardClearing", this.handleInwardClearingOnvalueChange);
    this.addValueChangeHandler("occupation", this.handleoccupationOnvalueChange);
    this.address = this.formGroup.get("address") as FormGroup;
    this.setHidden('address.homeOwnership', true)
    this.setHidden('address.udf1', true)
    this.setHidden('address.udf2', true)
    this.setHidden('address.udf3', true)
    // this.countryOfTaxResidence = this.formGroup.get("countryOfTaxResidence") as FormArray;
    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: AdditionalInformation): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: AdditionalInformation) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleoccupationOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.occupation = value;
    this.handleFormOnLoad();
  }

  dualNationalityHolder(value: any) {
    this.setHidden('dualNationalityHolder', value);

  }
  public handledualNationalityHolderFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == 0) {
      this.dualNationalityHolder(false);
      // this.setHidden('dualNationalityHolder', false);
    } else if (value == 1) {
      this.dualNationalityHolder(true);
      // this.setHidden('dualNationalityHolder', true);
    }

  }

  public handleMailingAddressOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == 'HA') {
      this.appConfig.setData('title', 'Home Address');
      this.isAddressRequired = true;
    } else if (value == 'WA') {
      this.appConfig.setData('title', 'Employment Address');
      this.isAddressRequired = true;
    }
  }

  public calGrossCreditTurnover() {
    const amount = this.salaryAmount + this.cashDepositAmount + this.otherIncomeAmount + this.outwardClearingAmount + this.localForeignInwardAmount;
    this.setValue('grossCreditTurnover', amount);
  }

  public calGrossDebitTurnover() {
    const amount = this.avgCashWithdrawAmount + this.localForeignOutwardAmount + this.InwardClearingAmount;
    this.setValue('grossDebitTurnover', amount);
  }


  public handleSalaryOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.salaryAmount = value;
    this.calGrossCreditTurnover()

  }

  public handleOtherIncomeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.otherIncomeAmount = value;
    this.calGrossCreditTurnover();
  }

  public handleLocalForeignInwardOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.localForeignInwardAmount = value;
    this.calGrossCreditTurnover();
  }

  public handleCashDepositOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.cashDepositAmount = value;
    this.calGrossCreditTurnover();
  }


  public handleOutwardClearingOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.outwardClearingAmount = value;
    this.calGrossCreditTurnover();
  }

  public handleAvgCashWithdrawOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.avgCashWithdrawAmount = value;
    this.calGrossDebitTurnover()

  }

  public handleLocalForeignOutwardOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.localForeignOutwardAmount = value;
    this.calGrossDebitTurnover()

  }

  public handleInwardClearingOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.InwardClearingAmount = value;
    this.calGrossDebitTurnover()

  }



  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.additionalInformation,
        transRef: response.success?.body?.additionalInformation.applicantId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({
        response: response.error.error,
        status: "failed"
      });
    }
    this._appcongif.removeData('addressDtl');
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


