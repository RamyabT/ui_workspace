import { RetailStopChequeRequestFormComponent } from "./retail-stop-cheque-request-form/retail-stop-cheque-request-form.component";
import { RetailStopchequeDisplayGridComponent } from "./retail-stopcheque-display-grid/retail-stopcheque-display-grid.component";
import { RetailRevokeStopChequeComponent } from "./retail-revoke-stop-cheque/retail-revoke-stop-cheque.component";
import { RetailStopChequeDisplayFormComponent } from "./retail-stopcheque-display-form/retail-stopcheque-display-form.component";
import { RetailChangeProductReqFormComponent } from "./retail-change-product-req-form/retail-change-product-req-form.component";
import { ApplyLoanComponent } from "../loans/apply-loan/apply-loan.component";
import { Component } from "@angular/core";
import { RetailViewCasaTranDtlsFormComponent } from "./retail-view-casa-tran-dtls-form/retail-view-casa-tran-dtls-form.component";
import { RetailAccountDetailsFormComponent } from "./retail-account-details-form/retail-account-details-form.component";
import { RetailAccountNicknameFormComponent } from "./retail-account-nickname-form/retail-account-nickname-form.component";
import { RetailChqdDepositFormComponent } from "./retail-chqd-deposit-form/retail-chqd-deposit-form.component";

 export const AccountsRoutingExtension= [
    {
        path: 'retail-stop-cheque-request',
        component: RetailStopChequeRequestFormComponent,
        data: { title: "RetailStopChequeRequestForm.title", space: 'accounts-space' }
     },
     {
        path: 'retail-stopcheque-display-grid',
        component: RetailStopChequeDisplayFormComponent,
        data: { title: "RetailStopchequeDisplayGrid.title", space: 'accounts-space' }
     },
     {
        path: 'retail-revoke-stop-cheque',
        component: RetailRevokeStopChequeComponent,
        data: { title: "RetailRevokeStopCheque.title", space: 'accounts-space' }
     },
     {
        path: 'retail-change-product-req-form',
        component: RetailChangeProductReqFormComponent,
        data: { title: 'RetailChangeProductReqForm.title', space: 'accounts-space' }
     },
     {
        path: 'apply-loan',
        component: ApplyLoanComponent,
     },
     {
         path:'view-casa-tran-dtls-form',
         component:RetailViewCasaTranDtlsFormComponent,
         data: {space: 'accounts-space' }
     },
     {
           path: 'retail-account-details',
           component: RetailAccountDetailsFormComponent,
           data: { title: "RetailAccountDetailsForm.title", space: 'accounts-space' }
      },
      {
            path: 'retail-account-nickname',
            component: RetailAccountNicknameFormComponent,
            data: { title: "RetailAccountNicknameForm.title", space: 'accounts-space' }
         },
         {
               path: 'retail-chqd-deposit-form',
               component: RetailChqdDepositFormComponent,
               data: { title: "RetailChqdDepositForm.title", space: 'accounts-space' }
            },
 ]
 