import { Injectable } from "@angular/core";
import { Casaaccount } from "../foundation/casaaccount-service/casaaccount.model";
import { Deposits, DepositsSummary } from "../deposits/deposits-service/deposits.model";
import { Loans } from "../loans/loans-service/loans.model";
import { Beneinternal } from "../transfers/beneinternal-service/beneinternal.model";
import { Membership } from "../membership/membership-service/membership.model";
import { Eligibletoaccount } from "../foundation/eligibletoaccount-service/eligibletoaccount.model";

@Injectable({
    providedIn: "root",
})

export class AccountsSpaceManager {
    private _casaAccountList!: Casaaccount[];
    private _eligibleAccounstList!: Eligibletoaccount[];
    private _membershipAccountList!: Membership[];
    private _beneficiaryList!:Beneinternal[];
    private _deposits!: DepositsSummary;
    private _loans!: Loans[];
    private viewAll:boolean=false;
    private navigation:boolean=false;

    public setCasaAccountsList(list:Casaaccount[]){
        list.map((item) => item.id = item.accountNumber);
        this._casaAccountList = list;
    }

    public getCasaAccountsList():Casaaccount[]{
        return this._casaAccountList || [];
    }
    
    public setEligibleAccountsList(list: Eligibletoaccount[]) {
        list?.map((item) => item.id = item.accountNumber);
        this._eligibleAccounstList = list;
    }

    public getEligibleAccountsList(): Eligibletoaccount[] {
        return this._eligibleAccounstList || [];
    }

    public setBeneficiaryList(list:Beneinternal[]){
        list.map((item) => item.id = item.inventoryNumber);
        this._beneficiaryList = list;
    }

    public getBeneficiaryList():Beneinternal[]{
        return this._beneficiaryList || [];
    }

    public setDeposits(list: DepositsSummary){
        // list.deposits.map((item:any) => item.id = item.accountNumber);
        this._deposits = list;
    }
    public setViewAll(viewAll:boolean){
        this.viewAll=viewAll ;
    }
    getViewAll(){
        return this.viewAll;
    }
    public setInvestmentNavigation(navigation:boolean){
        this.navigation=navigation ;
    }
    getInvestmentNavigation(){
        return this.navigation;
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
    public setMembershipAccountsList(list:Membership[]){
        list.map((item) => item.id = item.accountNumber);
        this._membershipAccountList = list;
    }
    public getMembershipAccountsList():Membership[]{
        return this._membershipAccountList || [];
    }
}