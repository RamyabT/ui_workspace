import { Injectable } from "@angular/core";
import { Casaaccount } from "../foundation/casaaccount-service/casaaccount.model";
import { Deposits, DepositsSummary } from "../deposits/deposits-service/deposits.model";
import { Loans } from "../loans/loans-service/loans.model";
import { insurance } from "../insurance/insurance-summary-service/insurancesummary.model";

@Injectable({
    providedIn: "root",
})

export class InsuranceSpaceManager {
    setinsuranceAccountsList(insuranceAccountsList: insurance[]) {
      throw new Error('Method not implemented.');
    }
    private _casaAccountList!: Casaaccount[];
    private _deposits!: DepositsSummary;
    private _loans!: Loans[];

    public setCasaAccountsList(list:Casaaccount[]){
        list.map((item) => item.id = item.accountNumber);
        this._casaAccountList = list;
    }

    public getCasaAccountsList():Casaaccount[]{
        return this._casaAccountList || [];
    }

    public setDeposits(list: DepositsSummary){
        list.accountDetails.map((item) => item.id = item.accountNumber);
        this._deposits = list;
    }

    getDeposits():DepositsSummary{
        return this._deposits || null;
    }

    public setLoans(list: Loans[]){
        list.map((item) => item.id = item.loanAccountNumber);
        this._loans = list;
    }

    getLoans():Loans[]{
        return this._loans || null;
    }
}