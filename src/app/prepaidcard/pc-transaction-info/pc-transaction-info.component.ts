import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConfigService } from '@dep/services';
import { Pctransactiondtls } from '../pctransactiondtls-service/pctransactiondtls.model';
import { PctransactiondtlsService } from '../pctransactiondtls-service/pctransactiondtls.service';

@Component({
  selector: 'app-pc-transaction-info',
  templateUrl: './pc-transaction-info.component.html',
  styleUrls: ['./pc-transaction-info.component.scss'],
  providers: [PctransactiondtlsService]
})
export class PcTransactionInfoComponent implements OnInit {

  details!: any;
  fields: string[] = ['transactionDescription', 'transRemark', 'transCat'];
  fieldsFormat: string[] = ["text", "text", "text", "text"];
  doViewCheque: boolean = false;
  chequeImage: string = "";

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _pctransactiondtlsService: PctransactiondtlsService,
    protected _appConfig: AppConfigService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.details = this._dialogData.transactionData as Pctransactiondtls;
    this.details.transactionType = this.details.transType == 'D'?'Debit':'Credit';
    this.cd.detectChanges();
  }

  closePopup() {
    this._dialogRef.close();
  }

  viewCheque(instrumentId:string) {
    this.doViewCheque = true;
    if (!this.chequeImage) {
      // this._pctransactiondtlsService.fetchChequeImage(instrumentId).subscribe({
      //   next: (res) => {
      //     this.chequeImage = res;
      //   }
      // });
    }

  }
  hideCheque() {
    this.doViewCheque = false;
  }

}
