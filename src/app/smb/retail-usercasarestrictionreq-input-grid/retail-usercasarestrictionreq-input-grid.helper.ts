import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { APPCONSTANTS } from "@dep/constants";
import { ActiveSpaceInfoService } from "@dep/core";
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
export class RetailUserccrestrictionreqInputGridState extends BaseFpxGridComponentState {
showSuggestion : boolean = false;
	paymentDate:any={
	   minDate:moment().format('YYYY-MM-DD'),
       maxDate:"",
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
    inquiryAllowed:any={
        textPosition:"after",
        ckValues:{checked:"1",unchecked:"0"}
    }
    requestAllowed:any={
        textPosition:"after",
        ckValues:{checked:"1",unchecked:"0"}
    }
    transactionAllowed:any={
        textPosition:"after",
        ckValues:{checked:"1",unchecked:"0"}
    }
    approvalRequired:any={
        textPosition:"after",
        ckValues:{checked:"1",unchecked:"0"}
    }
   }

@Injectable()
export class RetailUserccrestrictionreqInputGridHelper extends BaseFpxGridHelper<RetailUserccrestrictionreqInputGridState> {
  totalEnteredAmt: any = 0;
  constructor(private commonService: CommonService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _accountsSpaceMgr: AccountsSpaceManager,
  ) {
    super(new RetailUserccrestrictionreqInputGridState());
  }
  
  public getGridWidth(): number {
    return 100;
  }
  
  public getGridColumnWidth(): number[] {
    return  [15,40,40,15];
  }
  override doPreInit(): void {

  }
  
  override doPostInit(): void {
      this.addValueChangeHandler('accordianOpen', this.handleAccountNumberOnChange);
  }  

  public handleAccountNumberOnChange: BaseFpxGridChangeHandler = (   
    name: string,
    status: FormControlStatus,
    value: any,
    formArray:FormArray,
    index:number

  ) => {
    console.log(index,value)
    if(value==true){
      this.setReadonly('inquiryAllowed',index, true);
      this.setValue('inquiryAllowed',index, "1")
    }
  }
  //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
  
}

 
 


