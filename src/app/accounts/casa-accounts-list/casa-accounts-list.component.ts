import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { EtransfercustomerService } from 'src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { AccountSharingInformationComponent } from '../account-sharing-information/account-sharing-information.component';
import { TranslateService } from '@ngx-translate/core';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { DepTooltipComponent } from 'src/app/dep/core/component/dep-tooltip/dep-tooltip.component';

@Component({
  selector: 'app-casa-accounts-list',
  templateUrl: './casa-accounts-list.component.html',
  styleUrls: ['./casa-accounts-list.component.scss']
})
export class CASAAccountsListComponent extends BaseFpxFunctionality implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);


  protected title: string = "";
  protected message: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";
  protected confirmationIcon: string = "";
  protected selectedData: any;
  protected unselectedAccounts: any;
  protected CASAAccounts: any;
  protected selectedAccount: any;
  checked: boolean = false;
  enableSaveBtn: boolean = false;
  selectedBillPaymentAccount: any;
  initialPreferredAccount: any;
  fromAccountsModule: boolean = false;
  fromPaymentsModule: boolean = false;
  dormantInfo = 'CASASUMMARYCARD.dormantInfo';
  accountNumber: string = "";
  details: any;
  isSharingInProgress:boolean =false;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _casaAccountService: CasaaccountService,
    private _etransferCustomerService: EtransfercustomerService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _casaAccountsService: CasaaccountService,
    private _translate: TranslateService,
    public device: DeviceDetectorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectedAccount = this._dialogData.selectedAccount;
    this.fromAccountsModule = this._dialogData.fromAccountsModule ? true : false;
    this.fromPaymentsModule = this._dialogData.fromPaymentsModule ? true : false;
    this.okBtnLbl = this._dialogData.okBtnLbl || 'Save changes';
    this.cancelBtnLbl = this._dialogData.cancelBtnLbl || 'Close';
    this.title = this._dialogData.title;
    this.CASAAccounts = this._dialogData.accountsList;
    this.unselectedAccounts = this._dialogData.accountsList?.filter((item: Casaaccount) => item.accountNumber !== this._dialogData.selectedAccount.accountNumber)
    this.setActiveAccount();
  }

  MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    setTimeout(() => {
      if (this.device.isMobile()) {
        this._router.navigate(['/home']);
      }
      else {
        if (this._appConfig.hasData('moduleRefresh$')) {
          this._appConfig.getData('moduleRefresh$').subject.next({ action: 'ACCOUNTSQUICKACTION', data: { serviceCode: null } });
        }
        this._router.navigate(['accounts-space/accounts']);
      }
    });
  }

  // Initialize the active account and preferred account
  setActiveAccount() {
    this.CASAAccounts.forEach((item: any) => {
      if (item.accountNumber === this.selectedAccount.accountNumber) {
        item.active = true;
      } else {
        item.active = false;
      }

      if (item.preferredAccount) {
        item.selectedAsDefaultAccount = true;
        this.initialPreferredAccount = item;
      } else {
        item.selectedAsDefaultAccount = false;
        item.preferredAccount = false;
      }
    });
  }

  close() {
    let payload = {
      action: 0
    }
    this._dialogRef.close(payload);
  }

  // Selection/Non-Selection of default account checkbox
  onChecked(event: any, index: number) {
    this.checked = event.checked;
    this.CASAAccounts.forEach((item: any) => {
      item.selectedAsDefaultAccount = false;
    });
    this.CASAAccounts[index].selectedAsDefaultAccount = event.checked;
    this.selectedBillPaymentAccount = this.CASAAccounts[index];
    console.log(this.selectedBillPaymentAccount)
    this.checkForDefaultAccount(this.CASAAccounts[index]);
  }

  // Check for default account checkbox change to enable/disable save button
  checkForDefaultAccount(item: any) {
    if (this.selectedAccount.accountNumber === item.accountNumber) {
      if (this.selectedAccount.preferredAccount === item.selectedAsDefaultAccount) {
        this.enableSaveBtn = false;
      } else {
        this.enableSaveBtn = true;
      }
    }
  }

  // Select account to be used for bill payment
  selectAccount(selectedAccountData: any, index: number) {

    if (this.fromAccountsModule) {
      console.log(1)

      let payload = {
        action: 1,
        data: selectedAccountData,
        accountsList: this.CASAAccounts
      }
      this._dialogRef.close(payload);
      return;
    }

    console.log(2)

    this.enableSaveBtn = true;

    this.CASAAccounts.forEach((item: any) => {
      item.active = false;
    });

    this.CASAAccounts[index].active = true;
    this.selectedBillPaymentAccount = selectedAccountData;
    console.log(selectedAccountData)

    if (this.selectedAccount.accountNumber === this.selectedBillPaymentAccount.accountNumber) {
      this.checkForDefaultAccount(this.selectedBillPaymentAccount);
    } else {
      this.enableSaveBtn = true;
    }

    console.log(this.enableSaveBtn)
  }

  // Check for default account changes to set preference or close account selection
  checkDefaultAccountChanges() {
    if (this.initialPreferredAccount?.accountNumber === this.selectedBillPaymentAccount.accountNumber) {
      if (!this.selectedBillPaymentAccount.selectedAsDefaultAccount) {
        this.setPreference();
      } else {
        this.closeAccountSelection();
      }
    } else {
      this.CASAAccounts.forEach((item: any) => {
        if (item.active) {
          if (item.selectedAsDefaultAccount) {
            this.setPreference();
          } else {
            this.closeAccountSelection();
          }
        }
      });
    }
  }

  // Set preference for the selected account as default account
  setPreference() {
    this.selectedBillPaymentAccount.preferredAccount = this.selectedBillPaymentAccount.selectedAsDefaultAccount;
    this.CASAAccounts.forEach((item: any) => {
      if (item.accountNumber === this.selectedBillPaymentAccount.accountNumber) {
        item.preferredAccount = this.selectedBillPaymentAccount.selectedAsDefaultAccount;
      } else {
        item.preferredAccount = false;
      }
    });
    console.log(this.selectedBillPaymentAccount)
    let payload = {
      "preferredaccount": {
        "accountNumber": this.selectedBillPaymentAccount.accountNumber,
        "isPreferred": !this.selectedBillPaymentAccount.selectedAsDefaultAccount ? "0" : "1"
      }
    }
    if (this._dialogData.serviceCode == 'INTERAC') {
      this._etransferCustomerService.postPreferredAccount(payload).subscribe((res: any) => {
        console.log(res)
        this.closeAccountSelection();
      });
    }
    else {
      this._casaAccountService.postPreferredAccount(payload).subscribe((res: any) => {
        console.log(res)
        this.closeAccountSelection();
      });
    }
  }

  // Save changes function 
  saveChanges() {
    this.checkDefaultAccountChanges();
  }

  // Close account selection and return the selected account and accounts list
  closeAccountSelection() {
    let payload = {
      action: 1,
      data: this.selectedBillPaymentAccount,
      accountsList: this.CASAAccounts
    }
    this._dialogRef.close(payload);
    console.log("Account set as default")
  }



  newAccount() {

  }

  dataShare(cardData: any, event: any) {
    this.isSharingInProgress = true;
    event.stopPropagation();
    event.preventDefault();

    let keys: any = {
      accountNumber: cardData.accountNumber
    }
    this._casaAccountsService.findByKey(keys)().subscribe({
      next: (res) => {
        let d = res as Casaaccount;
        this.details = d;
        this.details.accountNumber=this.details.accountNumber?.slice(2);
        let modal = new FpxModal();
        modal.setComponent(AccountSharingInformationComponent);
        modal.setPanelClass('dep-alert-popup');
        modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
        modal.setDisableClose(true);
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        modal.setData({
          title: 'Share',
          accountInfo: this.details

        });
        this.openModal(modal);
      },
      error: (error) => {
        this.isSharingInProgress = false;
      }
    })
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
    this.isSharingInProgress = false;
  }


  openDormantInfo($event: any, index: number) {
    if (this._device.isMobile()) {
      $event.stopPropagation();
      $event.preventDefault();
      let modal = new FpxModal();
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(false);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        message: this.dormantInfo,
      });
      this.openModal(modal);
    } else return;
  }

  showDormantInfoDesktop($event: any, index: number) {
    $event.stopPropagation();
    $event.preventDefault();
    this.CASAAccounts.forEach((item: any, i: number) => {
      if (i == index) {
        item.showTooltip = !item.showTooltip;
      }
      else {
        item.showTooltip = false;
      }
    });
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

  ngOnDestroy() {
    this.CASAAccounts?.forEach((item: any) => {
      item.showTooltip = false;
    });
  }

}
