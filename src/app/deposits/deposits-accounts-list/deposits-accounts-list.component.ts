import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { Deposits } from '../deposits-service/deposits.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { EtransfercustomerService } from 'src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service';


@Component({
  selector: 'app-deposits-accounts-list',
  templateUrl: './deposits-accounts-list.component.html',
  styleUrls: ['./deposits-accounts-list.component.scss']
})
export class DepositsAccountsListComponent implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);
  protected title: string = "";
  protected message: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";
  protected confirmationIcon: string = "";
  protected selectedAccount: any;
  protected unselectedAccounts: any;
  protected DepositsAccounts: any;
  fromAccountsModule: boolean = false;
  enableSaveBtn: boolean = false;
  selectedBillPaymentAccount: any;
  checked: boolean = false;
  initialPreferredAccount: any;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _casaAccountService: CasaaccountService,
    private _etransferCustomerService: EtransfercustomerService,
  ) { }

  ngOnInit(): void {
    this.selectedAccount = this._dialogData.selectedAccount;
    console.log(this._dialogData)
    this.fromAccountsModule = this._dialogData.fromAccountsModule ? true : false;
    // this.fromPaymentsModule = this._dialogData.fromPaymentsModule ? true : false;
    this.okBtnLbl = this._dialogData.okBtnLbl || 'Save changes';
    this.cancelBtnLbl = this._dialogData.cancelBtnLbl || 'Close';
    this.title = this._dialogData.title;
    this.DepositsAccounts = this._dialogData.depositsList;
    this.unselectedAccounts = this._dialogData.depositsList.filter((item: Deposits) => item.accountNumber !== this._dialogData.selectedAccount.accountNumber)
    this.setActiveAccount();
  }
  setActiveAccount() {
    this.DepositsAccounts.forEach((item: any) => {
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

  selectAccount(selectedAccountData: any, index: number) {

    if (this.fromAccountsModule) {
      console.log(1)

      let payload = {
        action: 1,
        data: selectedAccountData,
        depositsList: this.DepositsAccounts
      }
      this._dialogRef.close(payload);
      return;
    }

    console.log(2)

    this.enableSaveBtn = true;

    this.DepositsAccounts.forEach((item: any) => {
      item.active = false;
    });

    this.DepositsAccounts[index].active = true;
    this.selectedBillPaymentAccount = selectedAccountData;
    console.log(selectedAccountData)

    if (this.selectedAccount.accountNumber === this.selectedBillPaymentAccount.accountNumber) {
      this.checkForDefaultAccount(this.selectedBillPaymentAccount);
    } else {
      this.enableSaveBtn = true;
    }

    console.log(this.enableSaveBtn)
  }
  onChecked(event: any, index: number) {
    this.checked = event.checked;
    this.DepositsAccounts.forEach((item: any) => {
      item.selectedAsDefaultAccount = false;
    });
    this.DepositsAccounts[index].selectedAsDefaultAccount = event.checked;
    this.selectedBillPaymentAccount = this.DepositsAccounts[index];
    console.log(this.selectedBillPaymentAccount)
    this.checkForDefaultAccount(this.DepositsAccounts[index]);
  }
  checkForDefaultAccount(item: any) {
    if (this.selectedAccount.accountNumber === item.accountNumber) {
      if (this.selectedAccount.preferredAccount === item.selectedAsDefaultAccount) {
        this.enableSaveBtn = false;
      } else {
        this.enableSaveBtn = true;
      }
    }
  }
  saveChanges() {
    this.checkDefaultAccountChanges();
  }
  checkDefaultAccountChanges() {
    if (this.initialPreferredAccount?.accountNumber === this.selectedBillPaymentAccount.accountNumber) {
      if (!this.selectedBillPaymentAccount.selectedAsDefaultAccount) {
        this.setPreference();
      } else {
        this.closeAccountSelection();
      }
    } else {
      this.DepositsAccounts.forEach((item: any) => {
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
  setPreference() {
    this.selectedBillPaymentAccount.preferredAccount = this.selectedBillPaymentAccount.selectedAsDefaultAccount;
    this.DepositsAccounts.forEach((item: any) => {
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
  closeAccountSelection() {
    let payload = {
      action: 1,
      data: this.selectedBillPaymentAccount,
      depositsList: this.DepositsAccounts
    }
    this._dialogRef.close(payload);
    console.log("Account set as default")
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

}
