import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTaxFormsFormComponent } from './view-tax-forms-form/view-tax-forms-form.component';
import { ViewLoanDisclosureFormComponent } from './view-loan-disclosure-form/view-loan-disclosure-form.component';
import { RetailAccountEStatementReqFormComponent } from './retailAccountEStatementReqForm/retail-account-estatement-req-form.component';
import { RetailVisaEStatementReqFormComponent } from './retail-visa-estatement-req-form/retail-visa-estatement-req-form.component';
import { RetailVisaEStatementComponent } from './RetailVisaEStatement/retail-visa-estatement-grid.component';
import { RetailEstmtRequestFormComponent } from '../accounts/retail-estmt-request-form/retail-estmt-request-form.component';
import { RegisterCardStatementComponent } from '../accounts/retail-register-card-statement-form/retail-register-card-statement-form.component';
const routes: Routes = [
   {
      path: '',
      component: RetailEstmtRequestFormComponent,
      data: { title: "RetailEstmtRequestForm.title" }
   },
   {
      path: 'retail-account-estatement-req-form',
      component: RetailAccountEStatementReqFormComponent,
      data: { title: 'RetailAccountEStatementReqForm.title', module: ' EdocumentsModule' }
   },
   {
      path: 'view-tax-forms-form',
      component: ViewTaxFormsFormComponent,
      data: { shellHeaderRequired: false}
   },
   {
      path: 'view-loan-disclosure-form',
      component: ViewLoanDisclosureFormComponent,
      data: { shellHeaderRequired: false}
   },
   {
      path: 'retail-visa-estatement-req-form',
      component: RetailVisaEStatementReqFormComponent,
      data: { title: "RetailVisaEStatementReqForm.title", module: ' EdocumentsModule' }
   },
   {
      path: 'retail-estmt-request-form',
      component: RetailEstmtRequestFormComponent,
      data: { title: "RetailEstmtRequestForm.title" }
   },

   {
      path: 'retail-card-estmt-request-form',
      component: RegisterCardStatementComponent,
      data: { title: "RegisterCardStatement.title" }
   },
];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule
   ]
})
export class eDocumentRoutingModule { }
