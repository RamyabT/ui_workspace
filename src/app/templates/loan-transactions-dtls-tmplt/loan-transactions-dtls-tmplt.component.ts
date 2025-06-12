import { Component, Input, OnInit } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal } from '@fpx/core';
import { ViewChequeImageComponent } from 'src/app/accounts/view-cheque-image/view-cheque-image.component';
import { Merchant, TranCat } from 'src/app/dep/services/app-config-service/app-config.service';

@Component({
  selector: 'app-loan-transactions-dtls-tmplt',
  templateUrl: './loan-transactions-dtls-tmplt.component.html',
  styleUrls: ['./loan-transactions-dtls-tmplt.component.scss']
})
export class LoanTransactionsDtlsTmpltComponent extends BaseFpxFunctionality implements OnInit {

  @Input ('selectedData') selectedData:any;
  protected appConsatance:any = APPCONSTANTS;
  
  constructor(
    private _appConfig: AppConfigService
  ) { 
    super();
  }

  ngOnInit(): void {
    console.log(this.selectedData)
  }

  getChequeImage(data:any){

  }

  viewChequeImage(data:any){

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

    return icon || "transactions/LOAN.svg";
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

}
