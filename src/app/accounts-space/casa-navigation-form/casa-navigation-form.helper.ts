import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AccountsSpaceManager } from "../accounts-space.manager";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { AppConfigService, CustomMenuService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";

export class CasaNavigationFormState extends BaseFpxComponentState {
  casaAccounts: Casaaccount[] = [];
  accountNumber: string = '';
  resetActiveMenu: boolean = false;
  selectedAccount: any = undefined;
  accountsList: Casaaccount[] = [];
}

@Injectable()
export class CasaNavigationFormHelper extends BaseFpxFormHelper<CasaNavigationFormState> {

  shouldResetAction = false;
  showViewAll = false;
  quickMenus: any[] = [];

  constructor(
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _menuService: CustomMenuService,
  ) {
    super(new CasaNavigationFormState())
  }

  override doPreInit() {

  }

  override doPostInit() {
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

    this.state.casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    console.log("casaAccounts ", this.state.casaAccounts)
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    if (!accountNumber) {
      accountNumber = this.state.casaAccounts[0].accountNumber;
    }

    this.state.accountNumber = accountNumber;

    let selectedAccount = this.state.casaAccounts.filter((item) => item.accountNumber === this.state.accountNumber);
    this.state.selectedAccount = selectedAccount[0];

    if (this._appConfig.hasData('accountDetailsData$')) {
      this._appConfig.getData('accountDetailsData$').subject.next({ action: 'ACCOUNTDETAILSDATA', data: { accountDetails: this.state.selectedAccount } });
    }

    this._appConfig.setData('selectedAccountNicknameDetails', this.state.selectedAccount);

    this.state.accountsList = this.state.casaAccounts;

    if (this.state.accountsList.length > 1) {
      this.showViewAll = true;
    }

    console.log(this.state.selectedAccount)
    this.setValue('accountNumber', this.state.accountNumber);
    this._activeSpaceInfoService.setAccountNumber(this.state.accountNumber);
    this.getQuickActions();
    this.addValueChangeHandler('accountNumber', this.handleAccountNumberOnChange);
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
    if (this._appConfig.hasData('refreshAccountDetails$')) {
      this._appConfig.getData('refreshAccountDetails$').subject.next(true);
    }
    if (this.getRoutingParam().routeFrom != 'otherModule') {
      let rid: number = Math.floor(Math.random() * 99999999);
      this._angularRouter.navigate(['accounts-space', 'accounts'],
        {
          queryParams: {
            rid: rid
          }
        }
      );
    }
    this.getQuickActions();
  }


  openCasaAccountsLists() {
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsListComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop', 'all-accounts-list']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Everyday banking',
      accountsList: this.state.accountsList,
      selectedAccount: this.state.selectedAccount,
      fromAccountsModule: true
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)
    console.log(addtionalData)
    if (payload.action === 1) {
      if (this._appConfig.hasData('accountDetailsData$')) {
        this._appConfig.getData('accountDetailsData$').subject.next({ action: 'ACCOUNTDETAILSDATA', data: { accountDetails: payload.data } });
      }
      this.state.selectedAccount = payload.data;
      this.setValue('accountNumber', payload.data.accountNumber);
      this._activeSpaceInfoService.setAccountNumber(payload.data.accountNumber);
      this._appConfig.setData('selectedAccountNicknameDetails', this.state.selectedAccount);
    }

    this.shouldResetAction = true;
  }

  getQuickActions(){
    let contextMenu = this._menuService.getMenuList(this.getMenuCodeByStatus(this.state.selectedAccount?.accountType?.toLowerCase()));
    if(this.state.selectedAccount?.accountCurrency == 'USD') {
      contextMenu = contextMenu.filter((item: any)=>item.serviceCode != 'RETAILMULTIBILLPAYMENT' && item.serviceCode != 'RETAILETRANSFER')
    }
    let serviceMenus = (contextMenu && contextMenu.length) ? contextMenu : [];
    this.quickMenus = serviceMenus;
  }

  getMenuCodeByStatus(status: string | undefined) {
    let menuCode = '';
    switch (status) {
      case 'sa': menuCode = 'CASAQUICKSA'; break;
      case 'ca': menuCode = 'CASAMENU'; break;
    }
    return menuCode;
  }

  openManageNickname() {
    this._angularRouter.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-account-nickname-form']);
  }

}
