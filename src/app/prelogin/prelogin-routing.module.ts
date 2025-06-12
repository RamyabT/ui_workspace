import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RetailKillPreviousSessionComponent } from "./retail-kill-previous-session/retail-kill-previous-session.component";
import { RetailChangePasswordSuccessFormComponent } from "./retail-change-password-success-form/retail-change-password-success-form.component";
import { GoogleMapComponent } from "./google-map/google-map.component";
import { RetailSecurityTipsFormComponent } from "./retail-security-tips-form/retail-security-tips-form.component";
import { RetailFaqsFormComponent } from "./retail-faqs-form/retail-faqs-form.component";
import { RetailViewOffersFormComponent } from "./retail-view-offers-form/retail-view-offers-form.component";
import { GooglemapBranchComponent } from "./googlemap-branch/googlemap-branch.component";
import { RetailPromotionsFormComponent } from "./retail-promotions-form/retail-promotions-form.component";
import { RetailContactBankFormComponent } from "./retail-contact-bank-form/retail-contact-bank-form.component";
import { RetailTermsAndConditionsFormComponent } from "./retail-terms-and-conditions-form/retail-terms-and-conditions-form.component";
import { RetailOverrideMpinComponent } from "./retail-override-mpin/retail-override-mpin.component";
import { SelfRegConfirmationReceiptFormComponent } from "../login/self-reg-confirmation-receipt-form/self-reg-confirmation-receipt-form.component";

const routes: Routes = [
  {
    path: "retail-kill-previous-session",
    component: RetailKillPreviousSessionComponent,
    data: { title: "Kill Previous Session" },
  },
  {
    path: "retail-overide-mpin",
    component: RetailOverrideMpinComponent,
    data: { title: "Overide Mpin" },
  },
  {
    path: "retail-change-password-success-form",
    component: RetailChangePasswordSuccessFormComponent,
    data: { title: "Success" },
  },
  {
    path: "atm-finder",
    component: GoogleMapComponent,
    data: { title: "googleMapAtm.title" },
  },
  {
    path: "branch-finder",
    component: GooglemapBranchComponent,
    data: { title: "googleMapBranch.title" },
  },
  {
    path: "security-tips",
    component: RetailSecurityTipsFormComponent,
    data: { title: "RetailContactBankForm.tips" },
  },
  {
    path: "faqs",
    component: RetailFaqsFormComponent,
    data: { title: "RetailContactBankForm.faq" },
  },
  {
    path: "offers",
    component: RetailViewOffersFormComponent,
    data: { title: "RetailContactBankForm.offers" },
  },
  {
    path: "promotions",
    component: RetailPromotionsFormComponent,
    data: { title: "RetailContactBankForm.videos" },
  },
  {
    path: "contact-bank",
    component: RetailContactBankFormComponent,
    data: { title:"RetailContactBankForm.title"}
  },
  {
    path: "terms-and-conditions",
    component: RetailTermsAndConditionsFormComponent,
    data: { title: "RetailContactBankForm.terms" },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreloginRoutingModule {}
