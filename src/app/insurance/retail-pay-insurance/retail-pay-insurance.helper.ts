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
  FpxModal,
  CriteriaQuery,
  FpxCurrenyFormatterPipe,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PayinsuranceService } from "../payinsurance-service/payinsurance.service";
import { Payinsurance } from "../payinsurance-service/payinsurance.model";
import { AppConfigService } from "@dep/services";
import { CardsSpaceManager } from "src/app/cards-space/cards-space.manager";
import { CreditcardService } from "../creditcard-service/creditcard.service";
import { Creditcard } from "src/app/credit-cards/creditcard-service/creditcard.model";
import { SchautopayreqService } from "../schautopayreq-service/schautopayreq.service";
import { formatDate } from "@angular/common";
export class RetailPayInsuranceState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  private _appConfig: AppConfigService = inject(AppConfigService);
  paymentAmount: any = {
    isCurrEditable: true,
    CurrencyList: [
      { id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency },
    ],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  };
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  };
  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: "",
    defaultFetch: false,
  };
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  charges: any;
  creditcards: Creditcard[] = [];
  debitcardRefNum: string = "";
  creditcardRefNum: string = "";
  cardData: any;
  paymentMethod: any;
  exchangeDetails: any = {
    creditAmount: "",
    debitAmount: "",
    exchangeRate: "",
  };
  payeeInsuranceDetails: any = {
    amount: "",
    currency: "",
    date: "",
    insuranceId:"",
    policyNum:""
  };
  exchangeRateValue: any;
  // BalanceError :any = {
  //   availableBal:"",
  //   methodName:""
  // }
}

@Injectable()
export class RetailPayInsuranceHelper extends BaseFpxFormHelper<RetailPayInsuranceState> {
  constructor(
    private retailPayInsuranceService: PayinsuranceService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _creditcardService: CreditcardService,
    private _cardsSpaceManager: CardsSpaceManager,
    private _schautopayreqService: SchautopayreqService
  ) {
    super(new RetailPayInsuranceState());
  }

  override doPreInit(): void {}

  public override doPostInit(): void {
    // this.addValueChangeHandler("BalanceError",
    //   this.handlebalanceErrorOnvalueChange
    // )
    this.addValueChangeHandler(
      "paymentMethod",
      this.handlepaymentMethodOnvalueChange
    );
    this.addValueChangeHandler(
      "creditcardRefNum",
      this.handlecreditcardRefNumOnvalueChange
    );
    this.addControlEventHandler(
      "walletIdDataReceived",
      this.walletIdDataReceived
    );
    this.addControlEventHandler(
      "accountNumDataReceived",
      this.accountNumDataReceived
    );
    this.addControlEventHandler(
      "chargesAmounteDataReceived",
      this.onChargesRateDataReceived
    );
    this.addControlEventHandler(
      "exchangeRateReceived",
      this.onExchangeRateDataReceived
    );
    this.handleFormOnLoad();
  }
 
  onOpenClick() {
    this._router.navigate([
      "insurance-space",
      "display-shell",
      "insurance",
      "retail-insurance-details-form",
    ],{
      queryParams:{
         insuranceId: this.state.payeeInsuranceDetails.insuranceId
      }
    });
  }
  public handleFormOnLoad() {
    let insuranceDetails = this._appConfig.getData('insuranceDetails');
    console.log('insuranceDetails: ' ,insuranceDetails);
    this.state.payeeInsuranceDetails.date = formatDate(insuranceDetails.dueDate, 'yyyy-MM-dd','en-US');
    this.state.payeeInsuranceDetails.amount = insuranceDetails.insuredAmount;
    this.state.payeeInsuranceDetails.insuranceId = insuranceDetails.insuranceId;
    this.state.payeeInsuranceDetails.policyNum = insuranceDetails.policyNumber;
    this.state.payeeInsuranceDetails.currency = insuranceDetails.currency;
    this.setValue("chargesBorneBy", "1");
    this.setHidden("chargesBorneBy", true);
    this.setHidden("debitcardRefNum", true);
    this.setHidden("creditcardRefNum", true);
    this.setHidden("walletId", true);
    this.setHidden("accountNum", true);
    this.setHidden("exchangeDetails", true);
    this.state.paymentAmount.amount = this.state.payeeInsuranceDetails.amount;
    this.state.toCurrencyVariable = this.state.payeeInsuranceDetails.currency;
    this.setVariable("toCurrencyVariable", this.state.toCurrencyVariable);
    this.setValue("paymentAmount", {
      amount: this.state.paymentAmount.amount,
      currencyCode: this.state.toCurrencyVariable,
    });
    this.setReadonly("paymentAmount", true);
    this.setValue("paymentDate", this.state.payeeInsuranceDetails.date);
    this.setReadonly("paymentDate", true);
  }

  creditCardListFetch() {
    let creditcardListArrayExist = this._cardsSpaceManager.getcreditCardList();
    if (creditcardListArrayExist.length > 0) {
      this.state.creditcards = this._cardsSpaceManager.getcreditCardList();
      this.state.creditcardRefNum = this.state.creditcards[0].cardRefNumber;
      this.setValue("creditcardRefNum", this.state.creditcardRefNum);
    } else {
      this._creditcardService.fetchCreditcardSummary().subscribe({
        next: (response) => {
          console.log(response);
          this.state.creditcards = response?.length > 0 ? response : [];
          this._cardsSpaceManager.setCreditCardList(this.state.creditcards);
          this.state.creditcardRefNum = this.state.creditcards[0].cardRefNumber;
          this.setValue("creditcardRefNum", this.state.creditcardRefNum);
        },
      });
    }
  }

  // public handlebalanceErrorOnvalueChange: BaseFpxChangeHandler = (
  //   name: string,
  //   status: FormControlStatus,
  //   value: any,
  //   formGroup: FormGroup
  // ) => { 
  //   console.log(value);

  //    if (value.availableBal < this.state.payeeInsuranceDetails.amount){
  //   this.setErrors(value.methodName, "insufficient_balance_error");
  //    }
  // };

  public handlecreditcardRefNumOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    const creditCardRefNumber = value;
    this.state.creditcardRefNum = creditCardRefNumber;
    this._creditcardService
      .findByKey(creditCardRefNumber)()
      .subscribe((res) => {
        console.log("creditcard service", res);
        this.setValue("creditcardRefNum", this.state.creditcardRefNum);
        if (
          res?.availableCreditLimit < this.state.payeeInsuranceDetails.amount
        ) {
          this.setErrors("creditcardRefNum", "insufficient_balance_error");
        }
        this.state.fromCurrencyVariable = res?.accountCurrency;
        this.setVariable(
          "fromCurrencyVariable",
          this.state.fromCurrencyVariable
        );
        this.setVariable(
          "toCurrencyVariable",
          this.state.payeeInsuranceDetails.currency
        );
        this.setValue("paymentAmount", {
          amount: this.state.payeeInsuranceDetails.amount,
          currencyCode: this.state.toCurrencyVariable,
        });
        if (this.state.toCurrencyVariable != this.state.fromCurrencyVariable) {
          this.setHidden("exchangeDetails", false);
        }
        this.updatePaymentCurrencyList();
      });
  };
  public handlepaymentMethodOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.state.paymentMethod = value;
    this.reset("debitcardRefNum", true);
    this.reset("walletId", true);
    this.reset("accountNum", true);
    this.reset("creditcardRefNum", true);
    this.reset("exchangeDetails", true);
    this.setHidden("exchangeDetails", true);
  
    if (value == 1) {
      this.setHidden("debitcardRefNum", true);
      this.setHidden("walletId", true);
      this.setHidden("accountNum", true);
      this.setHidden("creditcardRefNum", false);

      this.creditCardListFetch();
    } else if (value == 2) {
      this.setHidden("debitcardRefNum", true);
      this.setHidden("walletId", false);
      this.setHidden("accountNum", true);
      this.setHidden("creditcardRefNum", true);
    } else if (value == 3) {
      this.setHidden("debitcardRefNum", true);
      this.setHidden("walletId", true);
      this.setHidden("accountNum", false);
      this.setHidden("creditcardRefNum", true);
    }
  };
  public walletIdDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      // if (payload.availableBalance < this.state.payeeInsuranceDetails.amount) {
      //   this.setErrors("walletId", "insufficient_balance_error");
      // }
      this.state.fromCurrencyVariable = payload.currency;
      this.setVariable("fromCurrencyVariable", payload.currency);
      this.setVariable(
        "toCurrencyVariable",
        this.state.payeeInsuranceDetails.currency
      );
       this.setValue('BalanceError',{
          availableBal:payload.availableBalance,
          methodName:"walletId"
      })
      this.setValue("paymentAmount", {
        amount: this.state.payeeInsuranceDetails.amount,
        currencyCode: this.state.toCurrencyVariable,
      });
      if (this.state.toCurrencyVariable != payload.currency) {
        this.setHidden("exchangeDetails", false);
      }
      this.updatePaymentCurrencyList();
    }
  };

  updatePaymentCurrencyList() {
    let currencyList: any = [];
    let selectCurrency: string = "";
    if (this.state?.fromCurrencyVariable && this.state?.toCurrencyVariable) {
      if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
        currencyList.push({
          id: this.state.toCurrencyVariable,
          text: this.state.toCurrencyVariable,
        });
        selectCurrency = this.state.toCurrencyVariable;
      } else {
        currencyList.push({
          id: this.state.fromCurrencyVariable,
          text: this.state.fromCurrencyVariable,
        });
        currencyList.push({
          id: this.state.toCurrencyVariable,
          text: this.state.toCurrencyVariable,
        });
        selectCurrency = this.state.toCurrencyVariable;
      }
    } else {
      if (this.state?.fromCurrencyVariable) {
        currencyList.push({
          id: this.state.fromCurrencyVariable,
          text: this.state.fromCurrencyVariable,
        });
        selectCurrency = this.state.fromCurrencyVariable;
      } else if (this.state?.toCurrencyVariable) {
        currencyList.push({
          id: this.state.toCurrencyVariable,
          text: this.state.toCurrencyVariable,
        });
        selectCurrency = this.state.toCurrencyVariable;
      }
    }
    this.setAmountCurrencyList("paymentAmount", currencyList);
    this.setValue("paymentAmount", {
      amount: this.state.paymentAmount.amount,
      currencyCode: selectCurrency,
    });

  }
  public accountNumDataReceived: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    if (payload.availableBalance > this.state.payeeInsuranceDetails.amount) {
      // if (payload.availableBalance < this.state.payeeInsuranceDetails.amount) {
      //   this.setErrors("accountNum", "insufficient_balance_error");
      // }
      // if(payload){
      // if (payload.availableBalance > this.state.payeeInsuranceDetails.amount){
      // this.setValue("BalanceError",payload.availableBalance);
      // this.setValue('BalanceError',{
      //     availableBal:payload.availableBalance,
      //     methodName:"accountNum"
      // })
      this.state.fromCurrencyVariable = payload.accountCurrency;
      this.setVariable("fromCurrencyVariable", payload.accountCurrency);
      this.setVariable(
        "toCurrencyVariable",
        this.state.payeeInsuranceDetails.currency
      );
      this.setValue("paymentAmount", {
        amount: this.state.payeeInsuranceDetails.amount,
        currencyCode: this.state.toCurrencyVariable,
      });
      if (this.state.toCurrencyVariable != payload.currency) {
        this.setHidden("exchangeDetails", false);
      }

      this.updatePaymentCurrencyList();
    }
    // else{
    //   // this.setValue("BalanceError",payload.availableBalance);
    //   this.setErrors("accountNum", "insufficient_balance_error");
    // }
  };

    public onChargesRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload.totalChargeAmnBaseCurr) {
      this.setValue('chargesAmount', { amount: payload.totalChargeAmnBaseCurr, currencyCode: payload.baseCurrency });
    }
    else {
      this.setValue('chargesAmount', { amount: 5, currencyCode: this._appConfig.baseCurrency });
    }
    this.setHidden('chargesBorneBy', true);
  }
  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
      this.setHidden("exchangeDetails", true);
    } else if (this.state.fromCurrencyVariable != undefined) {
      this.setHidden("exchangeDetails", false);
      this.setValue("exchangeRate", payload.exchangeRate);
      this.setValue("baseRate", payload.baseRate);
      this.state.exchangeDetails.exchangeRate =
        "1" +
        " " +
        this.state.toCurrencyVariable +
        " = " +
        " " +
        payload.exchangeRate +
        " " +
        this.state.fromCurrencyVariable;
      this.state.exchangeDetails.debitAmount =
        payload.debitAmount + " " + this.state.fromCurrencyVariable;
      this.state.exchangeDetails.creditAmount =
        payload.creditAmount + " " + this.state.toCurrencyVariable;
    }
  };

  public override preSubmitInterceptor(payload: Payinsurance): any {
    // WRITE CODE HERE TO HANDLE
    if (payload) {
      payload.sourceAccount =this.state.payeeInsuranceDetails.insuranceId ;
      payload.policyNumber = this.state.payeeInsuranceDetails.policyNum;
      payload.paymentCurrency = payload.paymentAmount.currencyCode;
      payload.paymentAmount = payload.paymentAmount.amount;
      payload.paymentDate = payload.paymentDate;
      payload.chargesAmount = payload.chargesAmount.amount;
      payload.chargesAmountCurr = payload.chargesAmount.currencyCode;
      payload.fromCurrency = this.state.fromCurrencyVariable;
      payload.toCurrency = this.state.toCurrencyVariable;
      payload.operationMode = "A";
    }
    return payload;
  }

  public override postDataFetchInterceptor(payload: Payinsurance) {
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.payinsurance,
      });
    } else if (response.error) {
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.ErrorMessage,
      });
    }
    return routingInfo;
  }
}
