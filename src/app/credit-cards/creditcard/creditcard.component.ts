import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { CasaContextMenuComponent } from 'src/app/accounts/casa-context-menu/casa-context-menu.component';
import { Router } from '@angular/router';
import { Creditcard } from '../creditcard-service/creditcard.model';
import { CreditcardContextMenuComponent } from '../creditcard-context-menu/creditcard-context-menu.component';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.scss']
})
export class CreditCardComponent extends BaseFpxFunctionality implements OnInit, OnDestroy {

  @Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any|null>();
  @Output('showFlashCardDetails') showFlashCardDetails: EventEmitter<any> = new EventEmitter<any|null>();
  @Input('formView') formView:boolean = false;
  @Input('cardData') cardData!: Creditcard;
  @Input('showFlashCardBtn') showFlashCardBtn: boolean = false;
  @Input('startTimer') startTimer: boolean = false;
  @Input('showName') showName: boolean = true;
  @Input('contextmenuBtn') contextmenuBtn:boolean = false;

  protected _device: DeviceDetectorService = inject(DeviceDetectorService);

  timer: number | undefined;
  interval: any;

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
        if(this.timer == 0) this._router.navigate([
          "cards-space",
          "display-shell",
          "credit-cards",
          "retail-cc-details-form"
        ],
        {
         queryParams: {
           cardReference: this.cardData?.cardRefNumber,
         },
       });
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  notifyContextMenuClick(){
    this.contextmenu.emit();
    let modal = new FpxModal();
    modal.setComponent(CreditcardContextMenuComponent);
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
     "Account Number: " + this.cardData.creditCardNumber + "\n" +
    "IBAN: " + this.cardData.creditCardNumber + "\n" +
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
    });
    modal.setAfterClosed(this.flashCardModelAfterClose);
    this.openModal(modal);

  }

  flashCardModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...",payload);
    if(payload==1){
      this.showFlashCardDetails.emit(); 
    }

  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

}
