import { Injectable } from "@angular/core";
import { Casaaccount } from "../foundation/casaaccount-service/casaaccount.model";
import { wallet } from "../wallet/wallet-summary-service/walletsummary.model";
 

@Injectable({
    providedIn: "root",
})

export class WalletSpaceManager {
    private _walletAccountList!: wallet[];
 

    public setwalletAccountsList(list:wallet[]){
        list.map((item) => item.walletId = item.walletAccountNumber);
        this._walletAccountList = list;
    }

    public getwalletAccountsList():wallet[]{
        return this._walletAccountList || [];
    }

     
}