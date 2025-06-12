import { ChangeDetectorRef, inject, Inject, Injectable, Input } from "@angular/core";
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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed
} from "@fpx/core";
import { BehaviorSubject, Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import moment from "moment";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";

export class RetailViewInvestmentHoldingsComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formValues: any;
  isDataReceived: boolean = false;
  gridData: any;
  viewAll: boolean = false;
  searchDataFound: any
}

@Injectable()
export class RetailViewInvestmentHoldingsComponentHelper extends BaseFpxFormHelper<RetailViewInvestmentHoldingsComponentState> {
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showTransferHistory: boolean = false;
  transcationService: any
  activeAccountNumber: any;
  marketInvestments: any
  securities: any
  showInvestmentSecurites: any
  accountCurrency: any;

  constructor(
    private _router: Router,
    public _appConfig: AppConfigService,
    private changed: ChangeDetectorRef,
    public _device: DeviceDetectorService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    protected _accountSpaceMgr: AccountsSpaceManager,
  ) {
    super(new RetailViewInvestmentHoldingsComponentState());
  }

  override doPreInit(): void {
    this.hideShellActions();

    let showInvestmentSecurites$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('showInvestmentSecurites$', {
      "observable": showInvestmentSecurites$.asObservable(),
      "subject": showInvestmentSecurites$
    });

    if (this._appConfig.hasData('showInvestmentSecurites$')) {
      this._appConfig.getData('showInvestmentSecurites$').observable.subscribe(
        (res: any) => {
          console.log("showInvestmentSecurites", res);
          this.showInvestmentSecurites = res?.showInvestmentSecurites ? true : false;
          if (this.showInvestmentSecurites) {
            this.activeAccountNumber= res.depositAccount
            this.handleFormOnLoad();
          }
        }
      );
    }
       
  }
  public handleFormOnLoad() {
    this.marketInvestments = this._accountSpaceMgr.getDeposits();
    let activeAccountNumber: any
    if(this.activeAccountNumber){
      this.securities= this.marketInvestments.filter((item: any) => this.activeAccountNumber == item.accountNumber);
    }
    else{
      activeAccountNumber= this._activeSpaceInfoService.getAccountNumber();
      this.securities= this.marketInvestments.filter((item: any) => activeAccountNumber == item.accountNumber);
    }
    if(this.securities[0]){
      this.state.isDataReceived=true;
      this.accountCurrency=this.securities[0].accountCurrency;
    }
    if(this.securities[0].securities){
     let tempCasaAccount=this.securities[0].securities;
      tempCasaAccount.forEach((item: any)=>{
        if(!item.accountCurrency){
          item.accountCurrency=this.accountCurrency;
        }
      })
      this.state.gridData= tempCasaAccount;
    }
    else{
      this.state.gridData=null;
    }
  }
  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

  getInvestementTransactions(item: any){
    this._accountSpaceMgr.setInvestmentNavigation(true);
    this._activeSpaceInfoService.setDepositSecurity(item);
    if (this._appConfig.hasData('investmentHoldings$')) {
      this._appConfig.getData('investmentHoldings$').subject.next({
        investmentHoldings: this.securities[0].securities,
        enableInvestmentHoldings: true,
        selectedInvestement: item
      });
    }
    this._router.navigate(['accounts-space', 'display-shell', 'deposits', 'view-transactions'],{
      queryParams:{
        serviceCode:'RETAILINVESTMENTTRANSUMMARY'
      }
    });
  }


  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}