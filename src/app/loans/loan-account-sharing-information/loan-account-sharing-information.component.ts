import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loan-account-sharing-information',
  templateUrl: './loan-account-sharing-information.component.html',
  styleUrls: ['./loan-account-sharing-information.component.scss']
})
export class LoanAccountSharingInformationComponent implements OnInit {

  protected title: string = "";
  protected message: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";
  protected confirmationIcon: string = "";
  public accountInfo : any;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) { }

  ngOnInit(): void {
    console.log(this._dialogData)
    this.accountInfo = [
      {
        title: 'AccountsSharingPopup.accountHolder',
        description: this._dialogData.accountInfo.loanAccountName
      },
      {
        title: 'AccountsSharingPopup.accountNumber',
        description: this._dialogData.accountInfo.loanAccountNumber
      },
      {
        title: 'AccountsSharingPopup.accountType',
        description: this._dialogData.accountInfo.accountTypeDesc
      },
      {
        title: 'AccountsSharingPopup.accountBankname',
        description: this._dialogData.accountInfo.bankName
      },
      {
        title: 'AccountsSharingPopup.transitNumber',
        description: this._dialogData.accountInfo.transitNumber
      },
      {
        title: 'AccountsSharingPopup.institutionNumber',
        description: this._dialogData.accountInfo.institutionNumber
      }
      // {
      //   title: 'AccountsSharingPopup.BICCode',
      //   description: this._dialogData.accountInfo.BICCode
      // }
    ]
  }

  close() {
    this._dialogRef.close(0);
  }

}
