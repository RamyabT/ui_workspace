import { RetailRPContractInfoComponent } from './retailRPContractInfo/retail-rp-contract-info-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailProductSelectionFormComponent } from './retail-product-selection-form/retail-product-selection-form.component';
import { RetailAccountDetailsFormComponent } from '../accounts/retail-account-details-form/retail-account-details-form.component';
import { retailrpContainerFormComponent } from './retail-rp-container-form/retail-rp-container-form.component';
import { RetailRpExistingContractFormComponent } from './retail-rp-existing-contract-form/retail-rp-existing-contract-form.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { RetailDepositDetailsFormComponent } from '../deposits/retail-deposit-details-form/retail-deposit-details-form.component';

const routes: Routes = [
   {
      path: '',
      redirectTo: 'retail-rp-deposit-details-form',
      pathMatch: 'prefix'
   },
   {
      path: 'retail-rp-deposit-details-form',
      component: RetailDepositDetailsFormComponent,
      data: { title: "RetailDepositDetailsForm.title", serviceCode: 'RETAILREGSITEREDPRODUCTS', module: "deposits" }
   },
   {
      path: 'retail-rp-contractinfo-form',
      component: RetailRPContractInfoComponent,
      data: { title: "RetailRPContractInfoForm.title", module: "deposits", serviceCode: "RETAILRPCONTRACTINFO" }
   },
   {
      path: 'retail-rp-container-form',
      component: retailrpContainerFormComponent,
      data: { title: "RetailRPContractInfoForm.title", module: "deposits" }
   },
   {
      path: 'RetailRPContractInfo',
      component: RetailRPContractInfoComponent
   },
   {
      path: 'retail-product-selection',
      component: RetailProductSelectionFormComponent,
      data: { title: "RetailRPContractInfoForm.title", module: "deposits" }
   },
   {
      path: 'retail-selection-rp-contractinfo-form',
      component: retailrpContainerFormComponent,
      data: { title: "RetailRPContractInfoForm.title", module: "deposits" }
   },
   {
      path: 'retail-rp-open-sa',
      component: RetailRpExistingContractFormComponent,
      data: { title: "RetailRpExistingContractForm.title", module: "deposits", serviceCode: "RETAILRPEXISTINGCONTRACTINFO" }
   },
   {
      path: 'retail-rp-open-td',
      component: RetailRpExistingContractFormComponent,
      data: { title: "RetailRpExistingContractForm.title", module: "deposits", serviceCode: "RETAILRPOPENTERMDEPOSIT"  }
   },
   {
      path: 'confirmation-receipt',
      component: ConfirmationReceiptFormComponent,
      data: { title: "RPConfirmationReceiptForm.title" }
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
export class registeredproductsRoutingModule { }
