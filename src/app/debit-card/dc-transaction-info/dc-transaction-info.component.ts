import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dctransactiondtls } from '../dctransactiondtls-service/dctransactiondtls.model';
import { DctransactiondtlsService } from '../dctransactiondtls-service/dctransactiondtls.service';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-dc-transaction-info',
  templateUrl: './dc-transaction-info.component.html',
  styleUrls: ['./dc-transaction-info.component.scss'],
  providers: [DctransactiondtlsService]
})
export class DcTransactionInfoComponent implements OnInit {

  details!: any;
  fields: string[] = ['transactionDescription', 'accountNumber', 'transCat'];
  fieldsFormat: string[] = ["text", "text", "text", "text"];
  doViewCheque: boolean = false;
  chequeImage: string = "";

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dctransactiondtlsService: DctransactiondtlsService,
    protected _appConfig: AppConfigService,
    private cd: ChangeDetectorRef,
    public device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.details = this._dialogData.transactionData as Dctransactiondtls;
    this.details.transactionType = this.details.transType == 'D'?'Debit':'Credit';
    this.cd.detectChanges();
  }

  closePopup() {
    this._dialogRef.close();
  }

  viewCheque(instrumentId:string) {
    this.doViewCheque = true;
    if (!this.chequeImage) {
      // this._dctransactiondtlsService.fetchChequeImage(instrumentId).subscribe({
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
