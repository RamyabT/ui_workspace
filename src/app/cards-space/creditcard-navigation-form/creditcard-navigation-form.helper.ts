import { EventEmitter, Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { AppConfigService } from "@dep/services";
import { CardsSpaceManager } from "src/app/cards-space/cards-space.manager";
import { Creditcard } from "../../credit-cards/creditcard-service/creditcard.model";
import { CreditcardService } from "../../credit-cards/creditcard-service/creditcard.service";
import { ActiveSpaceInfoService } from "@dep/core";
import { CreditCardsListComponent } from "src/app/credit-cards/creditcards-list/creditcards-list.component";

export class CreditcardNavigationFormState extends BaseFpxComponentState {
  creditcards: Creditcard[] = [];
  cardRefNumber: string = '';
  currentCard!: Creditcard;
}

@Injectable()
export class CreditcardNavigationFormHelper extends BaseFpxFormHelper<CreditcardNavigationFormState>{

  cardSelectedEventEmitter!: EventEmitter<any>;

  shouldResetAction = false;
  
  constructor(
    private _cardsSpaceManager: CardsSpaceManager,
    private _appConfig: AppConfigService,
    private _creditCardService: CreditcardService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
  ){
    super(new CreditcardNavigationFormState() )
  }

  override doPreInit(){
    this.addValueChangeHandler('cardRefNumber', this.handleCardRefNumberOnChange);
    this.cardSelectedEventEmitter.emit(this.state);
  }

  override doPostInit(){
    this.state.creditcards = this._cardsSpaceManager.getcreditCardList();
    if (this.state.creditcards?.length) {
      this.updateSelectedCard();
    }
  }

  public handleCardRefNumberOnChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.updateSelectedCard(value);
  }

    private updateSelectedCard(cardRefNumber?: string) {
    if (!cardRefNumber) {
      const card = this._appConfig.getData('creditCardData') as Creditcard;
      cardRefNumber = card?.cardRefNumber || this._activeSpaceInfoService.getAccountNumber();
      ;
    }
    
    let currentCard = ((cardRefNumber) ? this.state.creditcards.find((card) => card.cardRefNumber === cardRefNumber) : this.state.creditcards[0]) || this.state.creditcards[0];

    if (currentCard !== null && currentCard !== undefined) {
      this.state.cardRefNumber = currentCard!.cardRefNumber;
      this.state.currentCard = currentCard;

      if (this.getRoutingParam().routeFrom != 'otherModule') {
        this._angularRouter.navigate(['cards-space','credit-card','creditcard-home']);
      }
      setTimeout(() => {
        this._creditCardService.updateCreditcard(this.state.currentCard);
      });
    }

  


  }


  openCreditCardList() {
    let modal = new FpxModal();
    modal.setComponent(CreditCardsListComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop', 'all-accounts-list']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Credit Cards',
      accountsList: this.state.creditcards,
      selectedAccount: this.state.currentCard,
      fromAccountsModule: true
    });
    modal.setAfterClosed(this.creditCardSelectedAfterClose);
    this.openModal(modal);
  }
    
  creditCardSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload.action === 1) {
      if (this._appConfig.hasData('creditCardDetailsData$')) {
        this._appConfig.getData('creditCardDetailsData$').subject.next({ action: 'CREDITCARDDETAILSDATA', data: { accountDetails: payload.data } });
      }
      this.state.currentCard = payload.data;
      this.setValue('cardRefNumber', payload.data.cardRefNumber);
      this._activeSpaceInfoService.setAccountNumber(payload.data.cardRefNumber);
      this._appConfig.setData('selectedAccountNicknameDetails', this.state.currentCard);
      this.cardSelectedEventEmitter.emit(this.state);
    }

    this.shouldResetAction = true;
  }

  onCardSelectedEventEmitter(event: EventEmitter<any>) {
    this.cardSelectedEventEmitter = event;
  }

}
