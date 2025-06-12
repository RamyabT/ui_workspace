import { Injectable } from "@angular/core";
import { Debitcard } from "../debit-card/debitcard-service/debitcard.model";
import { Creditcard } from "../credit-cards/creditcard-service/creditcard.model";
import { Prepaidcard } from "../prepaidcard/prepaidcard-service/prepaidcard.model";

@Injectable({
    providedIn: "root",
})

export class CardsSpaceManager {
    private _debitCardList!: Debitcard[];

    public setDebitCardsList(list:Debitcard[]){
        list.map((item) => item.id = item.cardRefNumber);
        this._debitCardList = list;
    }

    public getDebitCardList():Debitcard[]{
        return this._debitCardList || [];
    }

    private _creditCardList!: Creditcard[];

    public setCreditCardList(list:Creditcard[]){
        list.map((item) => item.id = item.cardRefNumber);
        this._creditCardList = list;
    }

    public getcreditCardList():Creditcard[]{
        return this._creditCardList || [];
    }

    private _prepaidCardList!: Prepaidcard[];

    public setPrepaidCardList(list:Prepaidcard[]){
        list.map((item) => item.id = item.cardRefNumber);
        this._prepaidCardList = list;
    }

    public getprepaidCardList():Prepaidcard[]{
        return this._prepaidCardList || [];
    }
}