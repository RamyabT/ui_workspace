import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { AppConfigService, CustomMenuService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";

export class eDocumentNavigationFormState extends BaseFpxComponentState {
  casaAccounts: Casaaccount[] = [];
  accountNumber: string = '';
  resetActiveMenu: boolean = false;
  selectedAccount: any = undefined;
  accountsList: Casaaccount[] = [];
}

@Injectable()
export class eDocumentNavigationFormHelper extends BaseFpxFormHelper<eDocumentNavigationFormState> {

  constructor(
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new eDocumentNavigationFormState())
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

    // this.state.casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    // console.log("casaAccounts ", this.state.casaAccounts)
    // let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    // if (!accountNumber) {
    //   accountNumber = this.state.casaAccounts[0].accountNumber;
    // }

    // this.state.accountNumber = accountNumber;

    // let selectedAccount = this.state.casaAccounts.filter((item) => item.accountNumber === this.state.accountNumber);
    // this.state.selectedAccount = selectedAccount[0];
    // this.state.accountsList = this.state.casaAccounts;
    // console.log(this.state.selectedAccount)
    // this.setValue('accountNumber', this.state.accountNumber);
    // this._activeSpaceInfoService.setAccountNumber(this.state.accountNumber);

    // this.addValueChangeHandler('accountNumber', this.handleAccountNumberOnChange);
  }

  // public handleAccountNumberOnChange: BaseFpxChangeHandler = (
  //   name: string,
  //   status: FormControlStatus,
  //   value: any,
  //   formGroup: FormGroup
  // ) => {
  //   const accountNumber = value;
  //   this.state.accountNumber = accountNumber;
  //   this._activeSpaceInfoService.setAccountNumber(this.state.accountNumber);
  //   if (this.getRoutingParam().routeFrom != 'otherModule') {
  //     let rid: number = Math.floor(Math.random() * 99999999);
  //     this._angularRouter.navigate(['accounts-space', 'accounts'],
  //       {
  //         queryParams: {
  //           rid: rid
  //         }
  //       }
  //     );
  //   }
  // }


  // openCasaAccountsLists() {
  //   let modal = new FpxModal();
  //   modal.setComponent(CASAAccountsListComponent);
  //   modal.setPanelClass('dep-alert-popup');
  //   modal.setBackDropClass(['dep-popup-back-drop', 'accounts-list-popup-back-drop']);
  //   modal.setDisableClose(true);
  //   modal.setData({
  //     title: 'Selected Account',
  //     accountsList: this.state.accountsList,
  //     selectedAccount: this.state.selectedAccount
  //   });
  //   modal.setAfterClosed(this.accountSelectedAfterClose);
  //   this.openModal(modal)
  // }

  // accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
  //   console.log(payload)
  //   console.log(addtionalData)
  //   if (payload.action === 1) {
  //     this.state.selectedAccount = payload.data;
  //     this.setValue('accountNumber', payload.data.accountNumber);
  //   }
  // }

}
