import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { AccountsSpaceManager } from "../accounts-space.manager";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { AppConfigService, CustomMenuService } from "@dep/services";
import { Deposits, DepositsSummary } from "src/app/deposits/deposits-service/deposits.model";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { DepositsAccountsListComponent } from "src/app/deposits/deposits-accounts-list/deposits-accounts-list.component";

export class DepositNavigationFormState extends BaseFpxComponentState {
  deposits!: DepositsSummary;
  accountNumber: string = '';
  // accounts!: Deposits[];
  accounts: any
  selectedAccount: any = undefined;
  depositAccounts: Deposits[] = [];
  // depositsList: Deposits[] = [];
  depositsList: any;
  resetActiveMenu: boolean = false;



}

@Injectable()
export class DepositNavigationFormHelper extends BaseFpxFormHelper<DepositNavigationFormState>{
  showViewAll = false;
  shouldResetAction = false;

  constructor(
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
  ){
    super(new DepositNavigationFormState() );
  }

  override doPreInit(){
    this.state.deposits = this._accountsSpaceMgr.getDeposits();
  }

  
  openCasaAccountsLists() {
    let modal = new FpxModal();
    modal.setComponent(DepositsAccountsListComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop', 'all-accounts-list']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Aviso Wealth*',
      depositsList: this.state.deposits,
      selectedAccount: this.state.selectedAccount,
      fromAccountsModule: true
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
 
    if (payload.action === 1) {
      this.state.selectedAccount = payload.data;
      // this.setValue('accountNumber', payload.data.accountNumber);
      this._activeSpaceInfoService.setAccountNumber(this.state.selectedAccount.accountNumber);
      if (this._appConfig.hasData('showInvestmentSecurites$')) {
        this._appConfig.getData('showInvestmentSecurites$').subject.next({
          showInvestmentSecurites: true,
          depositAccount: payload.data.accountNumber
        });
      }
      if (this._appConfig.hasData('showInvestmentAccDetails$')) {
        this._appConfig.getData('showInvestmentAccDetails$').subject.next({
          showInvestmentAccDetails: true,
          depositAccount: payload.data.accountNumber
        });
      }
    }
    this.shouldResetAction = true;
  }


  override doPostInit(){
    if (!this._device.isMobile()) {
      this._appConfig.getData('moduleRefresh$').observable.subscribe(
        (res: any) => {
          if (res?.event == 'onFormClose') {
            this.state.resetActiveMenu = true;
            setTimeout(() => {
              this.state.resetActiveMenu = false;
            });
          }
        }
      );
    }

    this.state.accounts = this.state.deposits;
    this.state.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    this._activeSpaceInfoService.setAccountNumber(this.state.accountNumber);

    let selectedAccount =  this.state.accounts.filter((item:any) => item.accountNumber === this.state.accountNumber);
    // let selectedAccount=this.state.accounts[0];
    this.state.selectedAccount = selectedAccount[0];
    this.state.depositsList = this.state.deposits;
    if (this.state.depositsList.length > 1) {
      this.showViewAll = true;
    }

    
    this.setValue('accountNumber', this.state.accountNumber);
    this._activeSpaceInfoService.setAccountNumber(this.state.accountNumber);
    // this.addValueChangeHandler('accountNumber', this.handleAccountNumberOnChange);
  }

  public handleAccountNumberOnChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    const accountNumber = value;
    this.state.accountNumber = accountNumber;
    this._activeSpaceInfoService.setAccountNumber(this.state.accountNumber);

    let rid = Math.floor(Math.random() * 9999999999);
    // if(this.getRoutingParam().routeFrom && this.getRoutingParam().routeFrom != 'otherModule') {
    //   this._angularRouter.navigate(['accounts-space', 'deposits'], {
    //     queryParams: {
    //       rid: rid
    //     }
    //   });
    // }
  }
}
