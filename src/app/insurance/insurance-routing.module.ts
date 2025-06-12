import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceContainerComponent } from '../insurance-space/insurance-container/insurance-container.component';
import { RetailInsuranceDetailsFormComponent } from './retail-insurance-details-form/retail-insurance-details-form.component';
import { InsuranceContextMenuComponent } from './insurance-context-menu/insurance-context-menu.component';
import { RetailPayInsuranceComponent } from './retail-pay-insurance/retail-pay-insurance.component';
import { InsuranceConfirmationReceiptFormComponent } from './insurance-confirmation-receipt-form/insurance-confirmation-receipt-form.component';
const routes: Routes = [
   {
      path: '',
      pathMatch:'prefix',
      redirectTo:'retail-insurance-details-form'
   },
   {
      path: 'retail-insurance-details-form',
      component: RetailInsuranceDetailsFormComponent,
      data: { title: "RetailInsuranceDetailsForm.title" , module:'InsuranceModule' }
   },
   {
      path: 'app-insurance-context-menu',
      component: InsuranceContextMenuComponent,
   },
   {
      path: 'insurance-space',
      loadChildren: () =>
        import('../insurance-space/insurance-space.module').then(m => m.InsuranceSpaceModule)
    },
     {
      path: 'retail-pay-insurance',
      component: RetailPayInsuranceComponent,
      data:{ title: "RetailPayInsurance.title",module:"InsuranceModule"}
    },
    {
       path: "insurance-confirmation-receipt",
       component: InsuranceConfirmationReceiptFormComponent,
     data: { title: "confirmationReceiptForm.title" },
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
export class InsuranceRoutingModule { }
