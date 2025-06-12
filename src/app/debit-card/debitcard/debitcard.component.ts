import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { Debitcard } from '../debitcard-service/debitcard.model';
import { Router } from '@angular/router';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DebitcardContextMenuComponent } from '../debitcard-context-menu/debitcard-context-menu.component';

@Component({
  selector: 'debitcard',
  templateUrl: './debitcard.component.html',
  styleUrls: ['./debitcard.component.scss']
})
export class DebitCardComponent extends BaseFpxFunctionality implements OnInit, OnDestroy {

  @Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any|null>();
  @Output('showFlashCardDetails') showFlashCardDetails: EventEmitter<any> = new EventEmitter<any|null>();
  @Input('formView') formView:boolean = false;
  @Input('cardData') cardData!: Debitcard;
  @Input('showFlashCardBtn') showFlashCardBtn: boolean = false;
  @Input('startTimer') startTimer: boolean = false;
  @Input('showName') showName: boolean = false;
  @Input('contextmenuBtn') contextmenuBtn:boolean = false;

  timer: number | undefined;
  interval: any;
  displayCardNumber:boolean=false;

  constructor(
    private _shareInfo:ShareInfo,
    protected translate: TranslateService,
    private _router: Router
  ) {
    
    super();
  }
  
  ngOnInit(): void {
    this.timer = 60;
    if(this.startTimer) {
      this.interval = setInterval(() => {
        this.timer!--;
        this.displayCardNumber=true;
        if(this.timer == 0) this._router.navigate([
          "cards-space",
          "display-shell",
          "debit-card",
          "retail-debitcard-details-form"
       ],
       {
        queryParams: {
          cardReference: this.cardData?.cardRefNumber,
        },
      });
      }, 1000);
    }
    //this.displayCardNumber=false;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  notifyContextMenuClick(){
    this.contextmenu.emit();
    let modal = new FpxModal();
    modal.setComponent(DebitcardContextMenuComponent);
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
  dataShare(){
    let accountInfo: string = "Account Name: " + this.cardData.cardHolderName + "\n" +
    "Account Number: " + this.cardData.accountNumber + "\n" +
    "IBAN: " + this.cardData.accountNumber + "\n" +
    // "Available Balance: " + this.cardData.availableBalance 
    + "\n" ;
    // "Stauts: " + paymentStatus + "\n" +
     //console.log(accountInfo);
    this._shareInfo.shareInfo(accountInfo, this.translate.instant('CASASUMMARYCARD.shareSuccess'));
  }

  onClickFlashCard() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      message: "debitCard.title",
      okBtnLbl: "Okay",
      cancelBtnLbl: "Cancel"
    });
    modal.setAfterClosed(this.flashCardModelAfterClose);
    this.openModal(modal);

  }

  flashCardModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...",payload);
    if(payload==1){
      // this.displayCardNumber=true;
      this.showFlashCardDetails.emit(); 
    }

  }
}
