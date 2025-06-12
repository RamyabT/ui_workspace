import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceConfirmationReqComponent } from './balance-confirmation-req-form/balance-confirmation-req-form.component';
import { RetailIBANLetterReqFormComponent } from './retail-iban-letter-req-form/retail-iban-letter-req-form.component';
import { RetailLiabilityLetterFormComponent } from './retail-liability-letter-form/retail-liability-letter.component';
import { RetailNoLiabilityLetterComponent } from './retail-no-liability-letter-form/retail-no-liability-letter-form.component';
import { RetailTaxStatementReqComponent } from './retail-tax-statement-req/retail-tax-statement-req.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { FailureResultFormComponent } from '../foundation/failure-result-form/failure-result-form.component';
import { RetailBusinessDDReqInfoFormComponent } from './retail-business-ddreq-info-form/retail-business-ddreq-info-form.component';
import { RetailBusinessDDReqFormComponent } from './retail-business-ddreq-form/retail-business-ddreq-form.component';
import { RetailIndIndividualsDDReqFormComponent } from './retail-Individual-ddreq-form/retail-Individual-ddreq-form.component';
import { RetailIndividualDDReqInfoFormComponent } from './retail-individual-ddreq-info-form/retail-individual-ddreq-info-form.component';
import { notifygoingoverseasComponent } from './retail-notify-going-overseas/retail-notify-going-overseas.component';

const routes: Routes = [
//   {
//     path : 'retail-adhoc-accStmtReq-form',
//     component : RetailAdhocAccStmtReqFormComponent,
//     data:{
//       title:'Ad Hoc Account Statement'
//     }
//  },
 {
  path : 'retail-iban-letter-req-form',
   component : RetailIBANLetterReqFormComponent,
   data:{
    title:'otherRequestTypeServiceDesc.RETAILIBANLETTER.name',module:'other-request'
  }
}, 
{
 	path : 'retail-notify-going-overseas',
    component : notifygoingoverseasComponent,
    data:{title:"Notify Going Overseas",module:' other-request'}
},

  {
  path : 'retail-liability-letter-form',
   component : RetailLiabilityLetterFormComponent,
   data:{
    title:'otherRequestTypeServiceDesc.RETAILLIABILITY.name',module:'other-request'
  }
},
{
path : 'retail-no-liability-letter-form',
 component : RetailNoLiabilityLetterComponent,
 data:{
  title:"otherRequestTypeServiceDesc.RETAILNOLIABILITY.name",module:'other-request'
}
},
{
path : 'retail-tax-statement-req',
 component : RetailTaxStatementReqComponent,
 data:{title:'otherRequestTypeServiceDesc.RETAILTAXSTMT.name',module:'other-request'
}
},
{
  path : 'balance-confirmation-req-form',
   component : BalanceConfirmationReqComponent,
   data:{title:"BalanceConfirmationReq.title",module:'other-request'}
},
{
  path:'confirmation-receipt',
  component:ConfirmationReceiptFormComponent,
  data:{
    title:'Confirmation Receipt',module:'other-request'
  }
},
{
  path: 'failure-result',
  component: FailureResultFormComponent,
  data: { title: 'FailureResultForm.title',module:'other-request' }
},
{
    path: 'business-dd-req-form',
    component: RetailBusinessDDReqFormComponent,
    data: {
      title: 'RetailBusinessDDReqForm.title'
    }
  },
  {
    path: 'business-dd-req-info-form',
    component: RetailBusinessDDReqInfoFormComponent,
    data: {
      title: 'RetailBusinessDDReqForm.title'
    }
  },
  {
    path: 'individual-dd-req-form',
    component: RetailIndIndividualsDDReqFormComponent,
    data: {
      title: 'RetailIndIndividualsDDReqForm.title'
    }
  },
  {
    path: 'individual-dd-req-info-form',
    component: RetailIndividualDDReqInfoFormComponent,
    data: {
      title: 'RetailIndIndividualsDDReqForm.title'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherRequestRoutingModule { }
