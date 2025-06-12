import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper } from "@fpx/core";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { CardsSpaceManager } from "../cards-space.manager";
import { Debitcard } from "src/app/debit-card/debitcard-service/debitcard.model";
import { AppConfigService } from "@dep/services";
import { DebitcardService } from "src/app/debit-card/debitcard-service/debitcard.service";

export class DebitcardNavigationFormState extends BaseFpxComponentState {
  debitcards: Debitcard[] = [];
  cardRefNumber: string = '';
  currentCard!: Debitcard;
}

@Injectable()
export class DebitcardNavigationFormHelper extends BaseFpxFormHelper<DebitcardNavigationFormState>{

  constructor(
    private _cardsSpaceManager: CardsSpaceManager,
    private _appConfig: AppConfigService,
    private _debitCardService: DebitcardService
  ){
    super(new DebitcardNavigationFormState() )
  }

  override doPreInit(){
    this.addValueChangeHandler('cardRefNumber', this.handleCardRefNumberOnChange);
  }

  override doPostInit(){
    this.state.debitcards = this._cardsSpaceManager.getDebitCardList();
    this.state.cardRefNumber = this.state.debitcards[0].cardRefNumber;
    this.setValue('cardRefNumber', this.state.cardRefNumber);
    this.state.currentCard = this.state.debitcards[0];
  }

  public handleCardRefNumberOnChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    const cardRefNumber = value;
    this.state.cardRefNumber = cardRefNumber;
    this.state.currentCard = this.state.debitcards.find(x=> x.cardRefNumber == cardRefNumber) || this.state.currentCard;
    setTimeout(() => {
      this._debitCardService.updateDebitcard(this.state.currentCard);
    });
    this._appConfig.setData('debitCardData',this.state.currentCard);
    this._angularRouter.navigate(['cards-space','debit-card','debitcard-home']);
  }
}
