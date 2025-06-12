import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal } from '@fpx/core';
import { ViewChequeImageComponent } from 'src/app/accounts/view-cheque-image/view-cheque-image.component';
import { DepPanningComponent } from 'src/app/dep/core/component/dep-panning.component';
import { Merchant } from 'src/app/dep/services/app-config-service/app-config.service';
import { PanningService } from 'src/app/dep/services/panning.service';
import { Investmenttransactionsummary } from 'src/app/deposits/investmenttransactionsummary-service/investmenttransactionsummary.model';
import { InvestmenttransactionsummaryService } from 'src/app/deposits/investmenttransactionsummary-service/investmenttransactionsummary.service';

@Component({
  selector: 'app-deposits-transactions-dtls-tmplt',
  templateUrl: './deposits-transactions-dtls-tmplt.component.html',
  styleUrls: ['./deposits-transactions-dtls-tmplt.component.scss']
})
export class DepositsTransactionsDtlsTmpltComponent extends DepPanningComponent implements OnInit {

   protected appConsatance:any = APPCONSTANTS;
   
   constructor(
     protected _appConfig: AppConfigService,
     private renderer2: Renderer2,
     private changeDetectorRef: ChangeDetectorRef,
     private panningService: PanningService,
     protected _device: DeviceDetectorService,
   ) { 
    super(renderer2, changeDetectorRef, panningService);
   }
  getChequeImage(data:any){
  }
   viewChequeImage(data:any){
      const fpxModal = new FpxModal();
      fpxModal.setComponent(ViewChequeImageComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass("view-cheque-image-popup");
      fpxModal.setBackDropClass(["dep-popup-back-drop"]);
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
