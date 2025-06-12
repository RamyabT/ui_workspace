import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { APPCONSTANTS } from "@dep/constants";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
import { BaseFpxGridComponentState, BaseFpxGridHelper } from "@fpx/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  BaseFpxGridChangeHandler,
  HttpRequest,
  SpinnerService,
} from "@fpx/core";
import moment from "moment";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { CommonService } from "src/app/foundation/validator-service/common-service";
export class RetailMultiBillRequestInputGridState extends BaseFpxGridComponentState {
  showSuggestion: boolean = false;
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  }
  totalBillAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: APPCONSTANTS.baseCurrency, text: APPCONSTANTS.baseCurrency }],
    amountInWords: false,
    initCurrency: APPCONSTANTS.baseCurrency,
    defaultFetch: false,
  }
  paymentEndDate: any = {
    minDate: "",
    maxDate: "",
  }
  accountNumber!: string;
  casaAccounts: Casaaccount[] = [];
  selectedAccount?: Casaaccount;
  selectedAccountsList: any[] = [];
  payLaterBills: any[] = [];
  payNowBills: any[] = [];
  totalPayNowPayLaterAmount: any = 0;
}

@Injectable()
export class RetailMultiBillRequestInputGridHelper extends BaseFpxGridHelper<RetailMultiBillRequestInputGridState> {
  totalEnteredAmt: any = 0;
  payLaterBillsAmount: any = 0;
  payNowBillsAmount: any = 0;
  showPayNowPayLater: boolean = false;
  hideDeleteBillIcon: boolean = false;

  constructor(private commonService: CommonService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private route: ActivatedRoute,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _router: Router,
    private _appConfig: AppConfigService,
    public _deviceDetectorService: DeviceDetectorService
  ) {
    super(new RetailMultiBillRequestInputGridState());
    route.queryParams.subscribe((params: any) => {
      if (params && params.rid) this.onParamChange();
    });
  }

  onParamChange() {
    this.state.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    this.state.casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    if (!this.state.accountNumber) {
      this.state.accountNumber = this.state.casaAccounts[0].accountNumber;
    }
    let selectedAccount = this.state.casaAccounts.filter((item) => item.accountNumber === this.state.accountNumber);
    this.state.selectedAccount = selectedAccount[0];
  }
  
  public getGridWidth(): number {
    return 100;
  }
  		    	 
  		  	 
  public getGridColumnWidth(): number[] {
    return [15, 40, 40, 15];
  }
  override doPreInit(): void {
    this.state.paymentDate.minDate = moment().format('YYYY-MM-DD');

  }

  public handleTotalBillAmountOnvalueChange: BaseFpxGridChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray: FormArray,index: number
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let currentFormGroup: any = formArray.controls[index];
    
    if (value) {
      currentFormGroup.controls.paymentAmount.patchValue(value.amount);
      currentFormGroup.controls.currency.patchValue(value.currencyCode);
      currentFormGroup.controls.orderSl.patchValue(index + 1);
      currentFormGroup.updateValueAndValidity();
      this.setMandatoryFields(currentFormGroup, true);
    }
    else {
      currentFormGroup.controls.paymentAmount.patchValue("");
      currentFormGroup.controls.currency.patchValue("");
      currentFormGroup.controls.orderSl.patchValue(index + 1);

      this.setMandatoryFields(currentFormGroup, false);
    }
    this.totalEnteredAmt = 0;
    formArray.controls.forEach((element: any) => {
      if(element.controls.totalBillAmount?.value?.amount) this.totalEnteredAmt = this.totalEnteredAmt + element.controls.totalBillAmount.value.amount;
    });
    if(this.state.selectedAccount && this.state.selectedAccount.availableBalance < this.totalEnteredAmt) {
      this.setError('totalBillAmount',index, {'amountExceed': true});
    }
    else {
      this.setError('totalBillAmount',index, null);
    }
  }

  setMandatoryFields(currentFormGroup: any, valueEntered: boolean) {
    if(valueEntered) {
      if(currentFormGroup.controls.totalBillAmount?.value?.amount 
        // && currentFormGroup.controls.paymentDate.value
      ) {
          currentFormGroup.controls.hiddenField.removeValidators(Validators.required);
      }
      else {
        currentFormGroup.controls.hiddenField?.setValidators([Validators.required]);
      }
    }
    else {
      if(currentFormGroup.controls.totalBillAmount?.value?.amount
        // || currentFormGroup.controls.paymentDate?.value 
      ) {
            currentFormGroup.controls.hiddenField?.setValidators([Validators.required]);
      }
      else {
        currentFormGroup.controls.hiddenField?.removeValidators(Validators.required);
      }
    }
    currentFormGroup.controls.hiddenField.updateValueAndValidity();
    this.formArray.updateValueAndValidity();
  }

  public handlePaymentDateOnvalueChange: BaseFpxGridChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray: FormArray, index: number
  ) => {
    console.log('PAYMENT DATE ON VALUE CHANGE')

    setTimeout(() => {
      this.getPayNowPayLaterDetails();
    }, 100);
    // WRITE CODE HERE TO HANDLE 

  }

  public handleScheduleTypeOnvalueChange: BaseFpxGridChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray: FormArray,index: number
  ) => {
    let currentFormGroup: any = formArray.controls[index];
    if (value) {
      currentFormGroup.controls.paymentFrequency?.setValidators([Validators.required]);
      currentFormGroup.controls.numberOfPayments?.setValidators([Validators.required]);
      currentFormGroup.controls.paymentEndDate?.setValidators([Validators.required]);
      currentFormGroup.controls.paymentDate.reset();
      this.state.paymentDate.minDate = moment().add(1,'days').format('YYYY-MM-DD');
    }
    else {
      currentFormGroup.controls.paymentFrequency?.removeValidators([Validators.required]);
      currentFormGroup.controls.numberOfPayments?.removeValidators([Validators.required]);
      currentFormGroup.controls.paymentEndDate?.removeValidators([Validators.required]);
      this.state.paymentDate.minDate = moment().format('YYYY-MM-DD');
    }
    currentFormGroup.controls.paymentFrequency.updateValueAndValidity();
    currentFormGroup.controls.numberOfPayments.updateValueAndValidity();
    currentFormGroup.controls.paymentEndDate.updateValueAndValidity();
    this.formArray.updateValueAndValidity();
  }

  public handlePaymentAmountOnvalueChange: BaseFpxGridChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray: FormArray, index: number
  ) => {

    setTimeout(() => {
      this.getPayNowPayLaterDetails();
    }, 100);

  }

  getPayNowPayLaterDetails() {
    let currentDate = moment().format('YYYY-MM-DD');
    this.state.payLaterBills = [];
    this.state.payNowBills = [];
    this.payLaterBillsAmount = 0;
    this.payNowBillsAmount = 0;
    this.state.totalPayNowPayLaterAmount = 0;

    this.formArray.value.forEach((element: any, index: number) => {
      this.state.totalPayNowPayLaterAmount = this.state.totalPayNowPayLaterAmount + element.paymentAmount;
      if (element.paymentDate > currentDate) {
        this.formArray.controls[index].value.payNow = false;
        this.state.payLaterBills.push(element);
        this.formArray.controls[index].value.payLaterAmount = element.paymentAmount;
      } else if (element.paymentDate == currentDate) {
        this.formArray.controls[index].value.payNow = true;
        this.state.payNowBills.push(element);
        this.formArray.controls[index].value.payNowAmount = element.paymentAmount;
      }
    });

    console.log(this.formArray.value)
  }

  public handlePaymentFrequencyOnvalueChange: BaseFpxGridChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray: FormArray,index: number
  ) => {
    let currentFormGroup: any = formArray.controls[index];
    if (value) {
      this.setEndDate(currentFormGroup);
    }
  }

  setEndDate(currentFormGroup: any) {
    if(currentFormGroup.controls.paymentDate.value, currentFormGroup.controls.paymentFrequency.value, currentFormGroup.controls.numberOfPayments.value) {
      let paymentEndDateVar: any = this.commonService.caculateEndDate(currentFormGroup.controls.paymentDate.value, currentFormGroup.controls.paymentFrequency.value, currentFormGroup.controls.numberOfPayments.value);
      if (paymentEndDateVar) {
        currentFormGroup.controls.paymentEndDate.patchValue(paymentEndDateVar);
      }
    }
    
  }

  public handleNumberOfPaymentsOnvalueChange: BaseFpxGridChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray: FormArray,index: number
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let currentFormGroup: any = formArray.controls[index];
    // this.setMandatoryFields(currentFormGroup);
    if (value) {
      this.setEndDate(currentFormGroup);
    }
  }

  // public handlePaymentFrequencyOnvalueChange: BaseFpxGridChangeHandler = (
  //   name: string,
  //   status: FormControlStatus,
  //   value: any,
  //   formArray: FormArray,index: number
  // ) => {
  //   // WRITE CODE HERE TO HANDLE 
  //   //tool generated code based on Orchestration Instructions
  //   let currentFormGroup: any = formArray.controls[index];
  //   // this.setMandatoryFields(currentFormGroup);
  //   if (value) {
  //     this.setMandatoryFields(currentFormGroup, true);
  //   }
  //   else {
  //     this.setMandatoryFields(currentFormGroup, false);
  //   }
  // }
  
  override doPostInit(): void {
    this.addValueChangeHandler("totalBillAmount", this.handleTotalBillAmountOnvalueChange);
    this.addValueChangeHandler("paymentDate", this.handlePaymentDateOnvalueChange);
    this.addValueChangeHandler("scheduleType", this.handleScheduleTypeOnvalueChange);

    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);


    this.addValueChangeHandler("paymentFrequency", this.handlePaymentFrequencyOnvalueChange);
    this.addValueChangeHandler("numberOfPayments", this.handleNumberOfPaymentsOnvalueChange);
    // this.addValueChangeHandler("paymentEndDate", this.handlePaymentEndDateOnvalueChange);

    console.log(this.formArray)
    console.log(this.formArray.value)

    this.formArray.value.forEach((element: any, index: number) => {
      this.setReadonly('paymentDate', index, true);
    });
  }

  public closeMultiBills() {
    this._router.navigate(['payments-space/display-shell/payments/retail-saved-biller-list-ro-grid']);
  }

  public continueMultiBills() {
    this.state.selectedAccountsList = [];
    this.formArray.controls.forEach((element: any, index: number) => {
      if (element.controls.selectedAccount.value) {
        this.state.selectedAccountsList.push(element.value);
      }
    });

    this._appConfig.setSelectedAccountsList(this.state.selectedAccountsList);

    let routeServiceCode = 'RETAILMULTIBILLPAYMENT';
    let service = this._appConfig.getServiceDetails(routeServiceCode);
    this._router.navigate(service?.servicePath, {
      queryParams: {
        serviceCode: routeServiceCode,
        routeFrom: "SAVEDBILLERGRID",
        multiBillSelection: true,
      }
    });

  }

  public deleteBill(index: number) {
    console.log(this.formArray.value)
    this.formArray.removeAt(index);
    // this.formArray.controls.forEach((element: any, index: number) => {
    //   element.controls.orderSl.patchValue(index + 1);
    // });
    console.log(this.formArray.value)
    if(this.formArray.value.length == 1) {
      this.hideDeleteBillIcon = true;
    }
    this.formArray.updateValueAndValidity();
  }


  //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
  
}

 
 


