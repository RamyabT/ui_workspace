import { RetailScheduleTransferTemplateComponent } from './retail-schedule-transfer-template/retail-schedule-transfer-template.component';
import { RetailScheduleBillsTemplateComponent } from './retail-schedule-bills-template/retail-schedule-bills-template.component';
import { RetailStopChequeRevokeTemplateComponent } from './retail-stop-cheque-revoke-tmplt/retail-stop-cheque-revoke-template.component';
import { ViewTaxFormsTmpltComponent } from './view-tax-forms-tmplt/view-tax-forms-tmplt.component';
import { ViewLoanDisclosureTmpltComponent } from './view-loan-disclosure-tmplt/view-loan-disclosure-tmplt.component';
import { ViewMsgsTmpltComponent } from './view-msgs-tmplt/view-msgs-tmplt.component';
import { ViewScheduledBillsMobTmpltComponent } from './view-scheduled-bills-mob-tmplt/view-scheduled-bills-mob-tmplt.component';
import { RetailScheduleTransfersTemplateComponent } from './retail-view-schedule-transfers-template/retail-view-schedule-transfers-template.component';
import { RetailScheduleTransfersMobTemplateComponent } from './retail-view-schedule-transfers-mob-template/retail-view-schedule-transfers-mob-template.component';
import { MembershipTranDtlsTmpltComponent } from './membership-tran-dtls-tmplt/membership-tran-dtls-tmplt.component';
import { MembershipAccDtlListTmpltComponent } from './membership-acc-dtl-list-tmplt/membership-acc-dtl-list-tmplt.component';
import { DepositsAccDtlListTmpltComponent } from './deposit-acc-dtl-list-tmplt/deposit-acc-dtl-list-tmplt.component';
import { RetailViewScheduledBillsTemplateComponent } from '../payments/retail-view-scheduled-bills-template/retail-view-scheduled-bills-template.component';
import { ScheduledBillDetailsComponent } from './scheduled-bill-details/scheduled-bills-details.component';
import { BillsAsideBarComponent } from '../layout/components/bills-aside-bar/bills-aside-bar.component';
import { eTransfersAsideBarComponent } from '../layout/components/etransfers-aside-bar/etransfers-aside-bar.component';
import { ETransfersModule } from '../etransfers/etransfers.module';
import { EtransferScheduledTemplateComponent } from '../etransfers/etransfer-scheduled-template/etransfer-scheduled-template.component';


export const TemplatesExtensionComponents = [
    RetailScheduleTransferTemplateComponent,
    RetailScheduleBillsTemplateComponent,
    RetailStopChequeRevokeTemplateComponent,
    ViewTaxFormsTmpltComponent,
    ViewLoanDisclosureTmpltComponent,
    ViewMsgsTmpltComponent,
    ViewScheduledBillsMobTmpltComponent,
    RetailScheduleTransfersTemplateComponent,
    RetailScheduleTransfersMobTemplateComponent,
    MembershipAccDtlListTmpltComponent,
    MembershipTranDtlsTmpltComponent,
    DepositsAccDtlListTmpltComponent,
    RetailViewScheduledBillsTemplateComponent,
    ScheduledBillDetailsComponent,
    BillsAsideBarComponent,
    eTransfersAsideBarComponent,
    EtransferScheduledTemplateComponent
]


 export const TemplatesExtensionServices = [

 ]

 export const TemplatesExtensionModules = [
    ETransfersModule
 ]
 