import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transfers-info-form',
  templateUrl: './transfers-info-form.component.html',
  styleUrls: ['./transfers-info-form.component.scss'],
})
export class TransfersInfoFormComponent implements OnInit {

  details!: any;
  fields: string[] = ['sourceAccount', 'beneId', 'paymentStatus', 'serviceCode', 'paymentId','nextPaymentDate'];
  fieldsFormat: string[] = ["text", "text", "text", "text", "text"];
  doViewCheque: boolean = false;
  chequeImage: string = "";

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _shareInfo:ShareInfo,
    protected translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.details = this._dialogData.transactionData;
    console.log(this.details);
  }

  closePopup() {
    this._dialogRef.close();
  }

  viewCheque(instrumentId:string) {
    this.doViewCheque = true;
   

  }
  hideCheque() {
    this.doViewCheque = false;
  }

  dataShare(){
    let transferInfo: string = "Debit Account: " + this.details.sourceAccount + "\n" +
    "Beneficiary Account Number: " + this.details.beneId + "\n" +
    "Status: " + this.details.paymentStatus + "\n" +
    "Payment Option: " + this.details.serviceCode + "\n" +
    "Reference Number: " + this.details.paymentId + "\n" +
    "Next Payment Date: " + this.details.nextPaymentDate + "\n" ;
    this._shareInfo.shareInfo(transferInfo, this.translate.instant('CASASUMMARYCARD.shareSuccess'));
  }


}
