import { registeredproductsRoutingModule } from './registeredproducts-routing.module';
import { RetailRPContractInfoComponent} from './retailRPContractInfo/retail-rp-contract-info-form.component';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, ThirdPartyModule } from '@dep/core';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { RetailRPSuccessorinfoComponent } from './retailRPSuccessorinfo/retail-rp-successorinfo-form.component';
import { RetailRPBeneficiaryInfoComponent } from './retailRPBeneficiaryInfo/retail-rp-beneficiaryinfo-form.component';
import { RetailRPAddressInfoComponent } from './retailRPAddressInfo/retail-rp-addressinfo-form.component';
import { RetailRPAccountInfoComponent } from './retailRPAccountInfo/retail-rp-contract-accountinfo.component';
import { RpcontractsuccessorinfoService } from './rpcontractsuccessorinfo-service/rpcontractsuccessorinfo.service';
import { RpcontractbeneficiaryinfoService } from './rpcontractbeneficiaryinfo-service/rpcontractbeneficiaryinfo.service';
import { RpaddressinfoService } from './rpaddressinfo-service/rpaddressinfo.service';
import { RpcontractaccountinfoService } from './rpcontractaccountinfo-service/rpcontractaccountinfo.service';
import { CommonModule } from '@angular/common';
import { socialInsuranceNumberControlComponent } from './socialInsuranceNumberControl/app-sin-control.component';
import { rpaddressTypeControlComponent } from './rpaddressTypeControl/rp-addresstype-control.component';
import { SmbRoutingModule } from '../smb/smb-routing.module';
import { rpContactMethodControlComponent } from './rpContactMethodControl/rp-contactmethod-control.component';
import { DepositsModule } from '../deposits/deposits.module';
import { RetailIntendedUseControlComponent } from './retail-intended-use-control/retail-intended-use-control.component';
import { IntendedUseService } from './intendedUse-service/intendedUse.service';
import { retailrpContainerFormComponent } from './retail-rp-container-form/retail-rp-container-form.component';
import { RpcontractinfoService } from './rpcontractinfo-service/rpcontractinfo.service';
import { FoundationModule } from '../foundation/foundation.module';
import { RetailProductSelectionService } from './retail-product-selection-service/retail-product-selection.service';
import { RetailProductSelectionListControlService } from './retail-product-selection-list-service/retail-product-selection-list.service';
import { RetailProductSelectionControlComponent } from './retail-product-selection-control/retail-product-selection-control.component';
import { RetailProductSelectionFormComponent } from './retail-product-selection-form/retail-product-selection-form.component';
import { RetailRpExistingContractFormComponent } from './retail-rp-existing-contract-form/retail-rp-existing-contract-form.component';
import { RetailPlanContractControlComponent } from './retail-plan-contract-control/retail-plan-contract-control.component';
import { UsResidentControlComponent } from './usresident-control/usresident-control.component';
import { UsResidentControlService } from './usresident-control/usresident-control.service';
import { RpexistingcontractinfoService } from './rpexistingcontractinfo-service/rpexistingcontractinfo.service';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { AddAnotherBeneficiaryFormComponent } from './add-another-beneficiary-form/add-another-beneficiary-form.component';
import { rpPlanContractControlComponent } from './rp-plancontract-control/rp-plancontract-control.component';
import { RpcontractsService } from './rpcontracts-service/rpcontracts.service';
// import { BoreportsModule } from '../boreports/boreports.module';

 

  

@NgModule({
  declarations : [
   RetailRPContractInfoComponent,
   RetailRPSuccessorinfoComponent,
   RetailRPBeneficiaryInfoComponent,
   RetailRPAddressInfoComponent,
   RetailRPAccountInfoComponent,
   socialInsuranceNumberControlComponent,
   rpaddressTypeControlComponent,
   rpContactMethodControlComponent,
   RetailIntendedUseControlComponent,
   retailrpContainerFormComponent,
   RetailProductSelectionControlComponent,
   RetailProductSelectionFormComponent,
   RetailRpExistingContractFormComponent,
   RetailPlanContractControlComponent,
  UsResidentControlComponent,
  ConfirmationReceiptFormComponent,
  AddAnotherBeneficiaryFormComponent,
  rpPlanContractControlComponent
],
  
  imports : [
   FoundationModule,
   registeredproductsRoutingModule,
   ReactiveFormsModule,
   FormsModule,
   FpxCoreModule,
   MaterialModule,
   TranslateModule,
   CommonModule,
   MaterialModule,
   ThirdPartyModule
  //  BoreportsModule,
],
  providers : [
   RpcontractinfoService,
   RpcontractsuccessorinfoService,
   RpcontractbeneficiaryinfoService,
   RpaddressinfoService,
   RpcontractaccountinfoService,
   IntendedUseService,
   RetailProductSelectionService,
   RetailProductSelectionListControlService,
   RpexistingcontractinfoService,
   UsResidentControlService,
   RpcontractsService
],
   exports : [
   RetailRPContractInfoComponent,
   RetailRPSuccessorinfoComponent,
   RetailRPBeneficiaryInfoComponent,
   RetailRPAddressInfoComponent,
   RetailRPAccountInfoComponent,
   socialInsuranceNumberControlComponent,
   rpaddressTypeControlComponent,
   rpContactMethodControlComponent,
   RetailIntendedUseControlComponent,
   retailrpContainerFormComponent,
   RetailProductSelectionControlComponent,
   RetailProductSelectionFormComponent,
   RetailRpExistingContractFormComponent,
   RetailPlanContractControlComponent,
  UsResidentControlComponent,
  ConfirmationReceiptFormComponent,
  AddAnotherBeneficiaryFormComponent,
  rpPlanContractControlComponent
]
})
export class RegisteredproductsModule { }

