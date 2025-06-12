import { Injectable } from "@angular/core";
import { BaseFpxFormHelper } from "@fpx/core";

export class MembersSpendingOverviewState{

}

@Injectable()
export class MembersSpendingOverviewHelper extends BaseFpxFormHelper<MembersSpendingOverviewState> {
    
    constructor(){
        super(new MembersSpendingOverviewState());
    }

    override doPreInit(): void {
        }
   
       override doPostInit(): void {
        this.setValue('spendingflowMonth', 'APR');

       }

}
