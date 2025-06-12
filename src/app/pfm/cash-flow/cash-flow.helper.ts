import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxFormHelper, CriteriaQuery } from "@fpx/core";
import { PfmSummaryService } from "../pfm-summary-service/pfm-summary.service";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { AppConfigService } from "@dep/services";
export class CashFlowState{
    cashflows: any;
}

@Injectable()
export class CashFlowHelper extends BaseFpxFormHelper<CashFlowState> {
    
    constructor(
        private _pfmSummaryService:PfmSummaryService,
        private _appConfig:AppConfigService
    ){
        super(new CashFlowState());
    }

    override doPostInit(): void {
        this.addValueChangeHandler('cashflowMonth',this.cashflowMonthOnValueChange);
        let currentDate = new Date();
        this.setValue('cashflowMonth', currentDate.getMonth()+1);
    }
     public cashflowMonthOnValueChange: BaseFpxChangeHandler = (
        name: string,
        status: FormControlStatus,
        value: any,
        formGroup: FormGroup
      ) => {
        let criteriaQuery=new CriteriaQuery();
        let today = new Date();
        let currentMonth = today.getMonth()+1;
        let currentYear = today.getFullYear();
        let year = (value > currentMonth) ? currentYear-1 : currentYear;
        let month = value.toString().padStart(2,'0');
        let period = year+'-'+month;
        criteriaQuery.addQueryparam('period',period);
        this.fetchPfmCashflow(criteriaQuery);
    }
    fetchPfmCashflow(criteriaQuery:CriteriaQuery){
        this._pfmSummaryService.fetchPfmCashflow(criteriaQuery).subscribe({
            next:(res:any)=>{
                this.state.cashflows = res;
            }
        })
    }
}