import { Injectable } from "@angular/core";
import { BaseFpxFormHelper } from "@fpx/core";
import { PfmSummaryService } from "../pfm-summary-service/pfm-summary.service";
import { AppConfigService } from "@dep/services";
import { BehaviorSubject } from "rxjs";

export class ExpenseCategoriesCarouselState{
    pfmSpends: any;
    carouselWidth:number = 300;
    dummyEl:any;
}

@Injectable()
export class ExpenseCategoriesCarouselHelper extends BaseFpxFormHelper<ExpenseCategoriesCarouselState> {
    
    constructor(    
        public pfmSummaryService:PfmSummaryService,
        private _appConfig:AppConfigService
    ){
        super(new ExpenseCategoriesCarouselState());
    }
    override doPreInit(): void {
     this.fetchExpenses();
    }

    override doPostInit(): void {
        this.setValue('expenseCategoriesMonth', 'MAR');
        this.state.carouselWidth = this.state.dummyEl?.nativeElement.clientWidth;
    }

    fetchExpenses(){
        this.pfmSummaryService.fetchPfmSpends().subscribe({
            next:(res:any)=>{
                let spendcategory = res?.data?.spendcategory;
                let totalExpenses = res?.data?.totalExpense;

                if(spendcategory){
                    this.state.pfmSpends = spendcategory.map((item:any)=>{
                        return {
                            ...item,
                            utilisedPercentage: Math.ceil((item.tranTotal/totalExpenses)*100),
                            icon: "./assets/pfm/category-icons/" + item.icon + ".svg"
                        }
                    });
                }
            }
          })
    }
   
}