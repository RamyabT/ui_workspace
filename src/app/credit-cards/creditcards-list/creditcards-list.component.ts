import { Component, inject, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
import { BaseFpxFunctionality } from "@fpx/core";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { CreditcardSharedBusinessLogic } from "../creditcard-shared-business-logic/creditcard-shared-business-logic";

@Component({
  selector: 'creditcards-list',
  templateUrl: './creditcards-list.component.html',
  styleUrls: ['./creditcards-list.component.scss']
})
export class CreditCardsListComponent extends BaseFpxFunctionality implements OnInit {
    protected _appConfig: AppConfigService = inject(AppConfigService);

    protected title: string = '';
    protected ccAccounts!: Creditcard[];
    protected selectedCreditCard: any;

    constructor(
        private _dialogRef: MatDialogRef<any>,
        public _device: DeviceDetectorService,
        private _ccBusinessLogic: CreditcardSharedBusinessLogic,
        @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    ){
        super();
    }
   
    

    ngOnInit(): void {
        this.selectedCreditCard = this._dialogData.selectedAccount;
        this.title = this._dialogData.title;
        
        const listOfAccounts = this._dialogData.accountsList;
        this.ccAccounts = listOfAccounts.filter((card: Creditcard) => {
            return !this._ccBusinessLogic.cardHasInactiveAccountStatus(card) && !this._ccBusinessLogic.cardHasDerogatoryAccountStatus(card);
        });

        this.setActiveCreditCard();
    }

    close() {
        let payload = {
            action: 0
        }
        this._dialogRef.close(payload);
    }

    setActiveCreditCard() {
        this.ccAccounts.forEach((item: any) => {
            if (item.cardRefNumber === this.selectedCreditCard.cardRefNumber) {
                item.active = true;
            } else {
                item.active = false;
            }
        });
    }

    selectAccount(selectedCreditCardData: any, index: number) {
        let payload = {
            action: 1,
            data: selectedCreditCardData,
            accountsList: this.ccAccounts
        }

        this._dialogRef.close(payload);
        return;
    }

    getAbsoluteValue(value: number | undefined): number {
        return value ? Math.abs(value) : 0;
    }
}