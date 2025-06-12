import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AppConfigService, CustomMenuService } from "@dep/services";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { Beneinternal } from "src/app/transfers/beneinternal-service/beneinternal.model";
import { ManageBeneTransferListComponent } from "src/app/transfers/manage-bene-transfer-list/manage-bene-transfer-list.component";

export class TransfersNavigationFormState extends BaseFpxComponentState {
  casaAccounts: Casaaccount[] = [];
  accountNumber: string = '';
  selectedAccount: any = undefined;
  accountsList: Casaaccount[] = [];
  resetActiveMenu: boolean = false;
  beneficiaryList:Beneinternal[] = [];
  beneAccounts:Beneinternal[] = [];
}

@Injectable()
export class TransfersNavigationFormHelper extends BaseFpxFormHelper<TransfersNavigationFormState>{
  showViewAll: boolean = false;
  quickMenus: any[] = [];

  constructor(
    private _appConfig: AppConfigService,
    private _device: DeviceDetectorService,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _menuService: CustomMenuService,
  ) {
    super(new TransfersNavigationFormState())
  }

  override doPreInit(){ 
    if(!this._device.isMobile()){
      this._appConfig.getData('moduleRefresh$').observable.subscribe(
        (res:any) => {
          if(res.event == 'onFormClose'){
            this.state.resetActiveMenu = true;
            setTimeout(()=>{
              this.state.resetActiveMenu = false;
            });
          }
        }
      );
    }
  }

  override doPostInit() {
    if(this.getRoutingParam().routeFrom != 'otherModule') {
      this._activeSpaceInfoService.setActiveModule('transfers');
    }

    this.getQuickActions();
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
    this.state.beneAccounts = this._accountsSpaceMgr.getBeneficiaryList();
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    if (!accountNumber) {
      accountNumber = this.state.casaAccounts[0].accountNumber;
    }

    this.state.accountNumber = accountNumber;

    let selectedAccount = this.state.casaAccounts.filter((item) => item.accountNumber === this.state.accountNumber);
    this.state.selectedAccount = selectedAccount[0];
    this.state.accountsList = this.state.casaAccounts;
    this.state.beneficiaryList = this.state.beneAccounts;

    this._appConfig.setData('CASAACCOUNTSLIST', this.state.accountsList)
    this._appConfig.setData('BENEACCOUNTSLIST', this.state.beneficiaryList)

    if (this.state.accountsList.length > 1) {
      this.showViewAll = true;
    }
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
    this.getQuickActions();

    // if (this.getRoutingParam().routeFrom != 'otherModule') {
    //   let rid: number = Math.floor(Math.random() * 99999999);
    //   this._angularRouter.navigate(['transfers-space', 'transfers'],
    //     {
    //       queryParams: {
    //         rid: rid
    //       }
    //     }
    //   );
    // }
  }

  getQuickActions() {
    console.log(this.state.selectedAccount);
    let contextMenu = this._menuService.getMenuList("TRANSFERS");
    let serviceMenus = (contextMenu && contextMenu.length) ? contextMenu : [];
    this.quickMenus = serviceMenus[0].menus || [];
    console.log(this.quickMenus);
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

  openbeneficiaryLists() {
    let modal = new FpxModal();
    modal.setComponent(ManageBeneTransferListComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'accounts-list-popup-back-drop']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Selected Account',
      beneficiaryList: this.state.beneficiaryList,
      selectedAccount: this.state.selectedAccount
    });
    modal.setAfterClosed(this.beneficiarySelectedAfterClose);
    this.openModal(modal)
  }
  beneficiarySelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload.action === 1) {
      this.state.selectedAccount = payload.data;
      // this.setValue('accountNumber', payload.data.accountNumber);
    }
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload.action === 1) {
      this.state.selectedAccount = payload.data;
      this.setValue('accountNumber', payload.data.accountNumber);
      if (this._appConfig.hasData('accountDropdownChange$')) {
        this._appConfig.getData('accountDropdownChange$').subject.next({ action: 'ACCOUNTSDROPDOWN', data: { accountNumber: payload.data.accountNumber } });
      }
    }
  }
}
