import { Injectable, inject } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  RoutingInfo,
  BaseFpxChangeHandler,

} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { NpsssendmoneyService } from "../npsssendmoney-service/npsssendmoney.service";
import { AppConfigService } from "@dep/services";
import { NpssMainService } from "../npss-service/npss-main.service";
export class RetailBillSplitTypeState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  splittedAmount: any;
  transactionAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  };
  accountBalance: any;
  totalAmount: any;
  noOfPerson: any;
  splitPersons: any;
  iban: any;
  senderMobileNumber: any;
  currency: any;
  remarks: any;
  individualAmount: any;
  selectedContacMemList: any;
  balanceAmount: any;
  splitBillData: any;
  errorSet:boolean = false;
}

@Injectable()
export class RetailBillSplitTypeHelper extends BaseFpxFormHelper<RetailBillSplitTypeState> {
  constructor(
    protected _appConfig: AppConfigService
  ) {
    super(new RetailBillSplitTypeState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILNPSSSPLITBILLRTP");
    let billAmountPublisher$: BehaviorSubject<any> = new BehaviorSubject<any>(
      null
    );
    this._appConfig.setData("billAmountPublisher$", {
      observable: billAmountPublisher$.asObservable(),
      subject: billAmountPublisher$,
    });
    this.state.splitBillData =this._appConfig.getData('splitBillData');
    this.state.selectedContacMemList = this._appConfig.getData(
      "selectedContactDetail"
    );
    this.setValue("splitTypeControl", "0");
    this.state.splitPersons = this._appConfig.getData("noOfPersonSelected");
    this.state.balanceAmount =this.state.splitBillData.totalAmount;
    let amountMap = new Map();
    if (this._appConfig.hasData("billAmountPublisher$")) {
      this._appConfig
        .getData("billAmountPublisher$")
        .observable.subscribe((res: any) => {
          if (res) {
            if(res?.amount){
              this.state.selectedContacMemList[res?.index].amount =  res?.amount 
            }
            console.log("row data: ", this.state.selectedContacMemList);
            amountMap.set(res.index, res.amount);
            let splitAmt = 0;
            amountMap.forEach((value: any, key: any) => {
              splitAmt += value;
            });
            this.state.balanceAmount = (this.state.splitBillData.totalAmount - splitAmt).toFixed(2);
            this.setValue("balanceAmount", this.state.balanceAmount);
            // if(this.state.balanceAmount < this.state.splitBillData.totalAmount && this.state.balanceAmount!=0 ){
            if(this.state.balanceAmount < 0 ){
              this.state.errorSet = true;
            }
          }
        });
    }
    this.getContactMemData();
  }

  handleFormOnLoad() {

     this.state.currency = this.state.splitBillData.currency;
     this.setAmountCurrencyList('transactionAmount', [{ id: this.state.currency, text: this.state.currency}]);
     this.setValue("transactionAmount", {
      amount: this.state.splitBillData.totalAmount,
      currencyCode: this.state.currency,
    });
    this.setReadonly('transactionAmount',true);
  }

  public override doPostInit(): void {
    this.addValueChangeHandler(
      "splitTypeControl",
      this.handleSplitTypeControlOnvalueChange
    );
    this.handleFormOnLoad();
  }

  public handleSplitTypeControlOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.getContactMemData();
  };

  getContactMemData(){
    let amountEditable: boolean = false;
    let value = this.formGroup.get('splitTypeControl')?.value;
    if (value == '0') {
      amountEditable = true;
      this.state.errorSet = false;
    } else {
      amountEditable = false;
    }
    let baseAmount = Math.floor(this.state.splitBillData.totalAmount/this.state.splitPersons * 100)/100;
    let remAmount = +(this.state.splitBillData.totalAmount - (baseAmount*this.state.splitPersons)).toFixed(2);
    this.state.splittedAmount = +(baseAmount+remAmount).toFixed(2);
    this.state.selectedContacMemList = this.state.selectedContacMemList.map(
      (item: any,index:number) => {
        let amount:any = this.state.splittedAmount;
        if(index==0){
          amount = this.state.splittedAmount;
        }
        else{
          amount = baseAmount;
        }

        return {
          ...item,
          amount: amount,
          readOnly: amountEditable,
        }    
  }
    );
    this.setGridData("billSplitType", this.state.selectedContacMemList);
  }
  
  

  public override preSubmitInterceptor(payload:any) {
    // WRITE CODE HERE TO HANDLE
    let tempPayload: any = {};
    let receipient = this.state.selectedContacMemList;
    tempPayload.totalAmount = payload.transactionAmount?.amount;
    tempPayload.mobileNumber = this._appConfig.getData("mobileNumber");
    tempPayload.currency = this._appConfig.getBaseCurrency();
    (tempPayload.remarks = this._appConfig.getData("remarks")),
      (tempPayload.operationMode = "B"),
      (tempPayload.iban = receipient?.[0].iban);
    delete receipient?.[0];
    tempPayload.splitbillrtprecepients = [];
    receipient?.forEach((item: any, index: number) => {
      tempPayload.splitbillrtprecepients.push({
        mobileNumber: item.mobileNumber,
        detailSerial: index.toString(),
        amount: item.amount,
        currency: this._appConfig.getBaseCurrency(),
        iban: item.iban,
      });
    });
    console.log("Temppayload output: ", tempPayload);
    return tempPayload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.splitbillrtpreq;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {

      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error
      });
    }
    return response;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
