import { Injectable } from "@angular/core";
import { BaseFpxFormHelper } from "@fpx/core";
import { PfmSummaryService } from "../../pfm/pfm-summary-service/pfm-summary.service";

export class MemberExpenseComparisonState {
  showMore: boolean = false;
  expenses: any = [];
}

@Injectable()
export class MemberExpenseComparisonHelper extends BaseFpxFormHelper<MemberExpenseComparisonState> {

  constructor(
    private _pfmSummaryService: PfmSummaryService
  ) {
    super(new MemberExpenseComparisonState());
  }
  override doPreInit(): void { }

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