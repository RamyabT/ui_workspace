import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { ViewChequeImageComponent } from 'src/app/accounts/view-cheque-image/view-cheque-image.component';
import { Merchant, TranCat } from 'src/app/dep/services/app-config-service/app-config.service';
import { PanningService } from 'src/app/dep/services/panning.service';

@Component({
  selector: 'app-casa-transactions-dtls-tmplt',
  templateUrl: './casa-transactions-dtls-tmplt.component.html',
  styleUrls: ['./casa-transactions-dtls-tmplt.component.scss']
})
export class CasaTransactionsDtlsTmpltComponent extends DepPanningComponent implements OnInit {

  // @Input ('selectedData') selectedData:any;
  protected appConsatance:any = APPCONSTANTS;
  
  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    private _casaTransacrionDtls: CasatransactiondtlsService,
    protected _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
  ) { 
    super(renderer2, changeDetectorRef, panningService);
  }

  // ngOnInit(): void {
  // }

  getChequeImage(data:any){
    if(this.selectedData.chequeImage){
      this.viewChequeImage(this.selectedData);
    } else {
      this.showSpinner();
      this._casaTransacrionDtls.fetchChequeImage(data).subscribe({
        next: (res:any) => {
          this.hideSpinner();
          this.selectedData.chequeImage = res;
          this.viewChequeImage(this.selectedData);
        },
        error: (err:any) => {
          this.hideSpinner();
        }
      });
    }
  }

  viewChequeImage(data:any){
    const fpxModal = new FpxModal();
    fpxModal.setComponent(ViewChequeImageComponent);
    fpxModal.setDisableClose(true);
    fpxModal.setPanelClass("view-cheque-image-popup");
    fpxModal.setBackDropClass(["dep-popup-back-drop", "view-cheque-image-popup-backdrop"]);
    fpxModal.setData({
      chequeImage: data?.chequeImage,
    });
    this.openModal(fpxModal);
  }

  getTransactionIcon():string{
    let icon:string = "";
    let merchant:Merchant;

    if(this.selectedData.merchantId){
      merchant = this._appConfig.getMerchantById(this.selectedData.merchantId);
      if(merchant?.icon){
        icon = "merchants/" + merchant.icon;

      } else {
        icon = "transactions/" + this.getTranCatIcon();
      }
    } else {
      icon = "transactions/" + this.getTranCatIcon();
    }

    return icon || "transactions/default-tran.svg";
  }

  getTranCatIcon():string{
    let icon:string = "";
    let tranCat = this._appConfig.getTransactionCatById(this.selectedData.transactionCategory);
    if(tranCat?.icon){
      icon = tranCat.icon;
    }

    return icon || "default-tran.svg";
  }

  getTransactionType():string{
    return this._appConfig.getTransactionCatById(this.selectedData.transactionCategory)?.tranDesc || this.selectedData.transactionCategory;
  }

  getXChangeCurrancy(transactionCurrency:string):string{
    return APPCONSTANTS.getExchangeCurrency(transactionCurrency);
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

}
