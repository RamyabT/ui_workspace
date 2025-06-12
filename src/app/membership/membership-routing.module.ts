import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipHomeComponent } from './membership-home/membership-home.component';
import { RetailMembershipAccountDetailsFormComponent } from './retail-membership-account-details-form/retail-membership-account-details-form.component';
import { RetailMembershipTransactionDtlsROGridComponent } from './retail-membership-transaction-dtls-ro-grid/retail-membership-transaction-dtls-ro-grid.component';
import { ViewMembershipTransactionFormComponent } from './view-membership-transaction-form/view-membership-transaction-form.component';


const routes: Routes = [
   {
      path: '',
      component: MembershipHomeComponent
   },
   {
      path: 'retail-membership-account-details-form',
      component: RetailMembershipAccountDetailsFormComponent,
      data: { title: "RetailMembershipAccountDetailsForm.title" }
   },
   {
      path: 'retail-membership-transaction-dtls-ro-grid',
      component: RetailMembershipTransactionDtlsROGridComponent
   },
    {
      path: 'view-membership-transactions',
      component: ViewMembershipTransactionFormComponent,
      data: { title: "viewMembershipTransactionForm.title" }
   }

];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule
   ]
})
export class MembershipRoutingModule { }
