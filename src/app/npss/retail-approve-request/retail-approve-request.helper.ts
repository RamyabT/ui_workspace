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
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { NpsssendmoneyService } from "../npsssendmoney-service/npsssendmoney.service";
import { Npsssendmoney } from "../npsssendmoney-service/npsssendmoney.model";
import { AppConfigService } from "@dep/services";
import { NpssMainService } from "../npss-service/npss-main.service";
import { TransferService } from "src/app/foundation/validator-service/transfers-service";
export class RetailApproveRequestState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  transactionAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  accountBalance: any;
  totalAmount:any;
  noOfPerson:any;
  splitAmount:any;
  senderMobileNumber: any;
  currency: any;
  remarks: any;
  individualAmount:any;
  senderName:any;
  reqToPay: any;
  firstName:string='';
  lastName:string='';
  receiverIban:any;
  senderInitial:any;
  scanDetails:any;
  recipientMobile:any
}


@Injectable()
export class RetailApproveRequestHelper extends BaseFpxFormHelper<RetailApproveRequestState>{
  

  constructor(private nPSSSendMoneyService: NpsssendmoneyService,
    private _httpProvider: HttpProviderService, private _router: Router,
    protected _appConfig: AppConfigService,
  private _npssMainService:NpssMainService,
  private _transferService: TransferService) {
    super(new RetailApproveRequestState
      ());
  }

  override doPreInit(): void {
    this.removeShellBtn('RESET');
    this.addShellButton('Decline Request', 'DECLINE', 'primary', 'ENTRY', 'button');
    this.setShellBtnMethod('DECLINE', this.declineQueue.bind(this));
    let debitAccountDetails = this._appConfig.getData('npssDetails');
    this.state.recipientMobile=debitAccountDetails.customerDetails.mobileNumber
    this.state.scanDetails = this._appConfig.getData('scanDetails');
    this.state.receiverIban =this.state.scanDetails.iban;

    this.state.remarks = this.state.scanDetails.remarks;
    this._npssMainService.fetchSplitBillDetails(this.state.scanDetails.reqToPay).subscribe({
      next:(res:any)=>{
          console.log("Response from splitbillDetails",res);
          this.state.firstName = res.splitBillDetails.senderFirstName;
          this.state.lastName = res.splitBillDetails.senderLastName;
          this.state.senderName = res.splitBillDetails.senderFirstName +' '+ res.splitBillDetails.senderLastName;
          this.state.senderInitial = res.splitBillDetails.senderFirstName?.charAt(0) + res.splitBillDetails.senderLastName?.charAt(0);
          this.state.senderMobileNumber = res.splitBillDetails.senderMobileNumber;
          // this.state.reqToPay = reqToPay;
          this.state.splitAmount = res.splitBillDetails.splitAmount;
          this.state.currency = res.splitBillDetails.currency;
          this.setValue('transactionAmount',{amount:this.state.splitAmount,currencyCode:this.state.currency})
          this.setReadonly('transactionAmount',true);
      },
      error:(err)=>{
        console.log("Error occurred",err);
      }
    })
    
}

   declineQueue(payload:any){
    
      this._transferService
      .fetchDeclineQueue(this.state.scanDetails.reqToPay,this.state.recipientMobile)
      .subscribe((res:any) => {
        console.log("decline click button working",res)
      })
      
    }

  handleFormOnLoad() {
    // this.state.remarks = this._appConfig.getData('remarks');

  }

 

  public handleTransactionAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
  }


  public override doPostInit(): void {
    this.addValueChangeHandler('transactionAmount', this.handleTransactionAmountOnvalueChange);
    this.handleFormOnLoad();
   
  }

  handleFormOnPresubmit(payload: any) {
    let npssSendMoney = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobileNumber: this.state.senderMobileNumber,
      transactionAmount: this.state.splitAmount,
      currency: this.state.currency,
      remarks:this.state.remarks,
      iban: this.state.receiverIban,
      senderIban: this.state.receiverIban,
      accounNumber:this.state.receiverIban
    }
    this._appConfig.setData('npssApprovedReq',npssSendMoney);
    this._router.navigate([
      "npss-space",
      "entry-shell",
      "npss",
      "retail-send-amount-confirmation"],
      {
        queryParams: {
          serviceCode: "RETAILAPPROVEREQ",
        },
      })
  }


  public override preSubmitInterceptor(payload: Npsssendmoney): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Npsssendmoney) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo()
    routingInfo.setNavigationURL('confirmation')
    if (response.success) {
      let res = response.success?.body?.npsssendmoney
      routingInfo.setQueryParams({
        response: res
      })
    } else if (response.error) {
      let error = response.error.error
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode,
        }
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


