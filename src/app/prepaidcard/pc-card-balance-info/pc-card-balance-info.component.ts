import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConfigService } from '@dep/services';
import { Pctransactiondtls } from '../pctransactiondtls-service/pctransactiondtls.model';
import { PctransactiondtlsService } from '../pctransactiondtls-service/pctransactiondtls.service';

@Component({
  selector: 'app-pc-card-balance-info',
  templateUrl: './pc-card-balance-info.component.html',
  styleUrls: ['./pc-card-balance-info.component.scss'],
  providers: [PctransactiondtlsService]
})
export class PcCardBalanceInfoComponent implements OnInit {

  balanceDetails!: any;
  prepaidcard!:any;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    protected _appConfig: AppConfigService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.balanceDetails = this._dialogData.balanceDetails;
    this.prepaidcard = this._dialogData.prepaidcard;
    this.cd.detectChanges();
  }

  closePopup() {
    this._dialogRef.close();
  }

  
}
