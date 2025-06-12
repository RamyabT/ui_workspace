import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { Loans } from '../loans-service/loans.model';

@Component({
  selector: 'app-loan-accounts-list',
  templateUrl: './loan-accounts-list.component.html',
  styleUrls: ['./loan-accounts-list.component.scss']
})
export class LOANAccountsListComponent implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);


  protected title: string = "";
  protected message: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";
  protected confirmationIcon: string = "";
  protected selectedData: any;
  protected unselectedAccounts: any;
  protected LOANAccounts: any;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) { }

  ngOnInit(): void {
    this.selectedData = this._dialogData.selectedAccount;
    console.log(this._dialogData)

    this.unselectedAccounts = this._dialogData.loansList.filter((item : Loans) => item.loanAccountNumber !== this._dialogData.selectedAccount.loanAccountNumber)
    console.log(this.unselectedAccounts)
  }

  close() {
    let payload = {
      action: 0
    }
    this._dialogRef.close(payload);
  }

  selectAccount(selectedAccountData: Loans) {
    let payload = {
      action: 1,
      data: selectedAccountData
    }
    this._dialogRef.close(payload);
  }

}
