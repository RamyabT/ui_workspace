import { Component, inject, Inject, OnInit } from '@angular/core';
import { Casatransactiondtls } from '../casatransactiondtls-service/casatransactiondtls.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CasatransactiondtlsService } from '../casatransactiondtls-service/casatransactiondtls.service';
import { DeviceDetectorService } from '@dep/core';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { FileOpenerService } from '@dep/native';
import { BaseFpxFunctionality } from '@fpx/core';

@Component({
  selector: 'app-casa-transaction-info',
  templateUrl: './casa-transaction-info.component.html',
  styleUrls: ['./casa-transaction-info.component.scss'],
  providers: [CasatransactiondtlsService]
})
export class CasaTransactionInfoComponent extends BaseFpxFunctionality{

  details!: any;
  fields: string[] = ['transactionReference', 'accountNumber', 'transType', 'transactionDescription'];
  fieldsFormat: string[] = ["text", "text", "text", "text"];
  doViewCheque: boolean = false;
  chequeImage: string = "";
  protected device: DeviceDetectorService = inject(DeviceDetectorService);

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _casaTransactionDtlsService: CasatransactiondtlsService,
    private _fileOpener: FileOpenerService,
    private deviceDetectorService: DeviceDetectorService,
    public _commonservice:CommonService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.details = this._dialogData.transactionData as Casatransactiondtls;
  }

  closePopup() {
    this._dialogRef.close();
  }

  viewCheque(chequeNumber:string,accountNumber:any,debitCreditFlag:any) {
    this.doViewCheque = true;
    if (!this.chequeImage) {
      this._casaTransactionDtlsService.fetchChequeImageTran(chequeNumber,this.details?.accountNumber,this.details?.debitCreditFlag).subscribe({
        next: (res) => {
          this.chequeImage = res;
        }
      });
    }

  }
  download(instrumentId:any){
    this.doViewCheque = true;
    this._commonservice.downloadSwiftTransaction(instrumentId).subscribe({
              next: (response: any) => {
                let documentURL = URL.createObjectURL(
                  new Blob([response.body], { type: "application/pdf" })
                );
                const downloadLink = document.createElement("a");
                downloadLink.href = documentURL;
                const fileName = "Swift.pdf";
                downloadLink.download = fileName;
                // downloadLink.click();
              }
            });
  }
  hideCheque() {
    this.doViewCheque = false;
  }
  downloadStatementDetails(){
    this.showSpinner();
    this._commonservice.downloadStatementDetails(this.details?.transactionReference).subscribe({
      next:(res:any)=>{
        if (this.deviceDetectorService.isHybrid()) {
          this.hideSpinner();
          this._fileOpener.openPDF(
            res,
            "application/pdf",
            "AccountsDetails.pdf"
          );
        } else {
          this.hideSpinner();
          let documentURL = URL.createObjectURL(
            new Blob([res.body], { type: "application/pdf" })
          );
          const downloadLink = document.createElement("a");
          downloadLink.href = documentURL;
          const fileName = "Statement.pdf";
          downloadLink.download = fileName;
          // downloadLink.click();
        }
      }
    })
  }
 
}
