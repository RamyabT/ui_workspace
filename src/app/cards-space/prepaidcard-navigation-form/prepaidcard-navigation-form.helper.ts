import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper } from "@fpx/core";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { CardsSpaceManager } from "../cards-space.manager";
import { AppConfigService } from "@dep/services";
import { Prepaidcard } from "src/app/prepaidcard/prepaidcard-service/prepaidcard.model";
import { PrepaidcardService } from "src/app/prepaidcard/prepaidcard-service/prepaidcard.service";

export class PrepaidcardNavigationFormState extends BaseFpxComponentState {
  prepaidcards: Prepaidcard[] = [];
  cardRefNumber: string = '';
  currentCard!: Prepaidcard;
}

@Injectable()
export class PrepaidcardNavigationFormHelper extends BaseFpxFormHelper<PrepaidcardNavigationFormState>{

  constructor(
    private _cardsSpaceManager: CardsSpaceManager,
    private _appConfig: AppConfigService,
    private _prepaidcardService: PrepaidcardService
  ){
    super(new PrepaidcardNavigationFormState() )
  }

  override doPreInit(){
    this.addValueChangeHandler('cardRefNumber', this.handleCardRefNumberOnChange);
  }

  override doPostInit(){
    this.state.prepaidcards = this._cardsSpaceManager.getprepaidCardList();
    this.state.cardRefNumber = this.state.prepaidcards[0].cardRefNumber;
    this.setValue('cardRefNumber', this.state.cardRefNumber);
    this.state.currentCard = this.state.prepaidcards[0];
  }

  public handleCardRefNumberOnChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value) {
      const cardRefNumber = value;
      this.state.cardRefNumber = cardRefNumber;
      this.state.currentCard = this.state.prepaidcards.find(x=> x.cardRefNumber == cardRefNumber) || this.state.currentCard;
      this._appConfig.setData('prepaidCardData',this.state.currentCard);
      if(this.getRoutingParam().routeFrom != 'otherModule') {
        this._angularRouter.navigate(['cards-space','prepaid-card','prepaidcard-home']);
      }
      setTimeout(() => {
        this._prepaidcardService.updatePrepaidcard(this.state.currentCard);
      });
    }
  }
}
