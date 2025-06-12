import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BaseFpxFunctionality, FpxCurrenyFormatterPipe, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { Loans } from '../loans-service/loans.model';
import { LoanContextMenuComponent } from '../loan-context-menu/loan-context-menu.component';
import { formatDate } from '@angular/common';
import { LoansService } from '../loans-service/loans.service';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'loan-summary-card',
  templateUrl: './loan-summary-card.component.html',
  styleUrls: ['./loan-summary-card.component.scss']
})
export class LoanSummaryCardComponent extends BaseFpxFunctionality implements OnInit {

  @Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any|null>();
  @Input('contextmenuBtn') contextmenuBtn:boolean = false;
  @Input('cardData') cardData!: Loans;
  protected _appConfig: AppConfigService = inject(AppConfigService);

  constructor(
    private _shareInfo:ShareInfo,
    protected translate: TranslateService,
    private _commonService: CommonService,
    private _currencyFormatter:FpxCurrenyFormatterPipe,
    private _loanService: LoansService
  ) {
    
    super();
  }

  ngOnInit(): void {
  }

  notifyContextMenuClick(){
    this.contextmenu.emit();
    let modal = new FpxModal();
    modal.setComponent(LoanContextMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setDisableClose(false);
    modal.setData({
      cardData: this.cardData
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

  // dataShare(){
  //   this._loanService.shareAccountInfo(this.cardData);
  //   // if(this.cardData.nextDueDate){
  //   // let accountInfo: string = 
  //   // "Loan Account Number: " + this.cardData.loanAccountNumber + "\n" +
  //   // "Loan Account Type: " + this.cardData.productDesc + "\n" +
  //   // "Outstanding Balance: "+ this.cardData.currency+" "+ this._currencyFormatter.transform(this.cardData.loanAmount,this.cardData.currency) + "\n" +
  //   // "EMI Amount: "+ this.cardData.currency+" "+ this._currencyFormatter.transform(this.cardData.payOffAmount,this.cardData.currency) 
  //   // + "\n" +
  //   // "Next Payment Date: "  + formatDate(this.cardData.nextDueDate,'dd-MM-YYYY','en-us') + "\n"+
  //   // "Branch: "+ this.cardData.branchDesc +"\n";
  //   // this._shareInfo.shareInfo(accountInfo, this.translate.instant('CASASUMMARYCARD.shareSuccess'));

  //   // }
  //   // else{
  //   //   let accountInfo: string = 
  //   //   "Loan Account Number: " + this.cardData.loanAccountNumber + "\n" +
  //   //   "Loan Account Type: " + this.cardData.productDesc + "\n" +
  //   //   "Outstanding Balance: "+ this.cardData.currency+" "+ this._currencyFormatter.transform(this.cardData.loanAmount,this.cardData.currency) + "\n" +
  //   //   "EMI Amount: "+ this.cardData.currency+" "+ this._currencyFormatter.transform(this.cardData.payOffAmount,this.cardData.currency) 
  //   //   + "\n"+
  //   //   "Branch: "+ this.cardData.branchDesc +"\n";
  //   //   this._shareInfo.shareInfo(accountInfo, this.translate.instant('CASASUMMARYCARD.shareSuccess'));
  //   // }
  // }

  dataShare(){
    this._loanService.shareAccountInfo(this.cardData);
 }
  getServiceRestriction(accountNumber: string) {
    this._commonService.fetchServiceRestriction(accountNumber).subscribe({
      next: (res) => {
        console.log("fetchServiceRestriction: ", res);
        this._commonService.casaServiceRestriction.set(accountNumber, res);
      },
      error: (reason) => {
        console.log("fetch service restriction error");
      }
    });
  }

}
