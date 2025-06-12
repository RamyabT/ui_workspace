import { Injectable } from "@angular/core";
import { BaseFpxFormHelper } from "@fpx/core";
import { PfmSummaryService } from "../../pfm/pfm-summary-service/pfm-summary.service";
import { AppConfigService } from "@dep/services";
import { BehaviorSubject } from "rxjs";
import { FbSummaryService } from "../fb-summary-service/fb-summary.service";
 
export class MemberExpenseCategorizationtionCarouselState{
    pfmSpends: any;
    carouselWidth:number = 300;
    dummyEl:any;
}

@Injectable()
export class MemberExpenseCategorizationtionCarouselHelper extends BaseFpxFormHelper<MemberExpenseCategorizationtionCarouselState> {
    
    constructor(    
        public fbSummaryService:FbSummaryService,
        private _appConfig:AppConfigService
    ){
        super(new MemberExpenseCategorizationtionCarouselState());
    }
    override doPreInit(): void {
     this.fetchExpenses();
    }

    override doPostInit(): void {
        this.setValue('expenseCategoriesMonth', 'APR');
        this.state.carouselWidth = this.state.dummyEl?.nativeElement.clientWidth;
    }

    fetchExpenses(){
        this.fbSummaryService.fetchchildrenSpends().subscribe({
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