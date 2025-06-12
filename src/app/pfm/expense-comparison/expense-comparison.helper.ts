import { Injectable } from "@angular/core";
import { BaseFpxFormHelper } from "@fpx/core";
import { PfmSummaryService } from "../pfm-summary-service/pfm-summary.service";
import { DeviceDetectorService } from "@dep/core";

export class ExpenseComparisonState {
  showMore: boolean = false;
  expenses: any = [];
}

@Injectable()
export class ExpenseComparisonHelper extends BaseFpxFormHelper<ExpenseComparisonState> {

  constructor(
    private _pfmSummaryService: PfmSummaryService,
    public device: DeviceDetectorService
  ) {
    super(new ExpenseComparisonState());
  }
  override doPreInit(): void {
    if(!this.device.isMobile()){
      this.state.showMore = true;
    }
   }

  showMoreData() {
    this.state.showMore = !this.state.showMore;
    this.updateGridData();
  }
  override doPostInit() {
    this.updateGridData();
  }
  updateGridData() {
    let gridData:any = this.state.expenses;
    if (!this.state.showMore) {
      gridData = this.state.expenses.slice(0, 4);
    }

    this.setGridData('expenseComparisonRoGrid', gridData);
  }
}