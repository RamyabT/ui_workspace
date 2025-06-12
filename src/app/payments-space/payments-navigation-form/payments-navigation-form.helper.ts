import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { AppConfigService } from "@dep/services";
import { APPCONSTANTS } from "@dep/constants";

export class PaymentsNavigationFormState extends BaseFpxComponentState {
  casaAccounts: Casaaccount[] = [];
  accountNumber: string = '';
  selectedAccount: any = undefined;
  accountsList: Casaaccount[] = [];
  resetActiveMenu: boolean = false;
}

@Injectable()
export class PaymentsNavigationFormHelper extends BaseFpxFormHelper<PaymentsNavigationFormState>{
  showViewAll: boolean = false;
  appConstant: any = APPCONSTANTS;

  constructor(
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ){
    super(new PaymentsNavigationFormState() )
  }

  override doPreInit(){
  }

  override doPostInit() {
    if(this.getRoutingParam().routeFrom != 'otherModule') {
      this._activeSpaceInfoService.setActiveModule('payments');
    }
    this.addValueChangeHandler('accountNumber', this.handleAccountNumberOnChange);

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
    this.state.accountsList = this.state.casaAccounts;
    if (this.state.accountsList.length > 1) {
      this.showViewAll = true;
    }
    console.log(this.state.selectedAccount)
    this.setValue('accountNumber', this.state.accountNumber);
    this._activeSpaceInfoService.setAccountNumber(this.state.accountNumber);

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
    // if (this.getRoutingParam().routeFrom != 'otherModule') {
    //   let rid: number = Math.floor(Math.random() * 99999999);
    //   this._angularRouter.navigate(['payments-space', 'payments'],
    //     {
    //       queryParams: {
    //         rid: rid
    //       }
    //     }
    //   );
    // }
  }

  preferredAccountChange(accountNumber: any) {
    this.state.accountsList.forEach(element => {
      if(element.accountNumber != accountNumber) element.preferredAccount = false;
    });
  }

  openCasaAccountsLists() {
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsListComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'accounts-list-popup-back-drop']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Selected Account',
      accountsList: this.state.accountsList,
      selectedAccount: this.state.selectedAccount
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)
    console.log(addtionalData)
    if (payload.action === 1) {
      this.state.selectedAccount = payload.data;
      this.setValue('accountNumber', payload.data.accountNumber);
    }
  }
}
