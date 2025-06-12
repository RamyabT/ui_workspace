import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from '@dep/core';
import { TranslateService } from '@ngx-translate/core';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';

@Component({
  selector: 'app-account-sharing-information',
  templateUrl: './account-sharing-information.component.html',
  styleUrls: ['./account-sharing-information.component.scss']
})
export class AccountSharingInformationComponent implements OnInit {

  protected title: string = "";
  protected message: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";
  protected confirmationIcon: string = "";
  public accountInfo : any;
  public isCopied:boolean=false;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _casaAccountService: CasaaccountService,
    public _device: DeviceDetectorService,
    private _translate:TranslateService


  ) { }

  ngOnInit(): void {
    console.log("dialog data is",this._dialogData);
    this._dialogData.accountInfo.bankName=this._translate.instant('AccountSharingInformationComponent.bankName');
    this.accountInfo = [
      {
        title: 'AccountsSharingPopup.accountHolder',
        description: this._dialogData.accountInfo.accountHolderName
      },
      {
        title: 'AccountsSharingPopup.accountNumber',
        description: this._dialogData.accountInfo.accountNumber
      },
      {
        title: 'AccountsSharingPopup.accountType',
        description: this._dialogData.accountInfo.accountTypeDesc
      },
      {
        title: 'AccountsSharingPopup.accountBankname',
        description:this._dialogData.accountInfo.bankName,
        format:"description"
      },
      {
        title: 'AccountsSharingPopup.transitNumber',
        description: this._dialogData.accountInfo.transitNumber
      },
      {
        title: 'AccountsSharingPopup.institutionNumber',
        description: this._dialogData.accountInfo.institutionNumber
      },
      {
        title: 'AccountsSharingPopup.BICCode',
        description: this._dialogData.accountInfo.BICCode
      }
    ]
  }

  close() {
    this._dialogRef.close(0);
  }

  copyClick($event: MouseEvent) {
    this.isCopied = true;
    this._casaAccountService.shareAccountInfo(this._dialogData.accountInfo, false);

  }

  cancel() {
    this._dialogRef.close(0);
  }
  share() {
    console.log("share button clicked");
    this._casaAccountService.shareAccountInfo(this._dialogData.accountInfo, false ,true);
  }
}
