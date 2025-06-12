import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { AccountsSpaceManager } from "../accounts-space.manager";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { AppConfigService, CustomMenuService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { Membership } from "src/app/membership/membership-service/membership.model";

export class MembershipNavigationFormState extends BaseFpxComponentState {
  casaAccounts: Membership[] = [];
  accountNumber: string = '';
  resetActiveMenu: boolean = false;
  selectedAccount: any = undefined;
  accountsList: Membership[] = [];
}

@Injectable()
export class MembershipNavigationFormHelper extends BaseFpxFormHelper<MembershipNavigationFormState>{

  shouldResetAction = false;
  showViewAll = false;

  constructor(
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ){
    super(new MembershipNavigationFormState() )
  }

  override doPreInit(){
    
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

    this.state.casaAccounts = this._accountsSpaceMgr.getMembershipAccountsList();
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

    this.shouldResetAction = true;
  }
}
