import { LinkInvestmentReqFormComponent } from "./link-investment-req-form/link-investment-req-form.component"
import { DepositsAsideBarComponent } from "../layout/components/deposits-aside-bar/deposits-aside-bar.component"
import { RetailViewInvestmentHoldingsComponent } from "./retail-view-investment-Holdings/retail-view-investment-Holdings.component"
import { ViewDepositsTransactionFormComponent } from "./view-deposits-transaction-form/view-deposits-transaction-form.component"
import { InvestmentTransactionSummaryGridComponent } from "./investment-transaction-summary-grid/investment-transaction-summary-grid.component"
import { InvestmentTransactionSummaryFilterComponent } from "./investment-transaction-summary-filter/investment-transaction-summary-filter.component"
import { InvestmenttransactionsummaryService } from "./investmenttransactionsummary-service/investmenttransactionsummary.service"
import { InvestmentTransactionSummaryDownloadFilterComponent } from "./investment-transaction-summary-download-filter/investment-transaction-summary-download-filter.component"
import { DepInvestmentSummaryCardComponent } from "./dep-investment-summary-card/dep-investment-summary-card.component"
import { DepositsMobLinkAccountsComponent } from "./deposits-mob-link-accounts-list/deposits-mob-link-accounts-list.component"
import { DepositsMobQuickActionsComponent } from "./deposits-mob-quick-actions/deposits-mob-quick-actions.component"


 export const DepositsRoutingExtension= [
     {
         path: 'retail-linked-investment-req-form',
         component: LinkInvestmentReqFormComponent,
         data: { title: "LinkInvestmentReqForm.title" }
      },
      {
         path: 'view-transactions',
         component: ViewDepositsTransactionFormComponent,
         data: { title: "viewDepositsTransactionForm.title", serviceCode: 'RETAILINVESTMENTTRANSUMMARY' }
      }
 ]
 export const DepositsExtensionServices= [
   InvestmenttransactionsummaryService
 ]
 export const DepositsImportExtension= [
    RetailViewInvestmentHoldingsComponent,
    LinkInvestmentReqFormComponent,
    DepositsAsideBarComponent,
    ViewDepositsTransactionFormComponent,
    InvestmentTransactionSummaryGridComponent,
    InvestmentTransactionSummaryFilterComponent,
    InvestmentTransactionSummaryDownloadFilterComponent,
    DepInvestmentSummaryCardComponent,
    DepositsMobLinkAccountsComponent,
   DepositsMobQuickActionsComponent
 ]
 