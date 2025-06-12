import { Route } from "@angular/router";
import { CobResumebackFormComponent } from "./onboarding/cob-resumeback-form/cob-resumeback-form.component";
import { VerifyOtpFormComponent } from "./onboarding/verify-otp-form/verify-otp-form.component";
import { shellRoutingExtension } from "./shell-routing-extension";

export const shellRouting: Route[] = [
  ...shellRoutingExtension,
  {
    path: 'staging',
    loadChildren: () => import('./staging/staging.module').then((m) => m.StagingModule),
    data: { space:'welcome', module: "staging" }
  },
  {
    path: "accounts",
    loadChildren: () =>
      import("./accounts/accounts.module").then((m) => m.AccountsModule),
    data: { module: "accounts", headerRequired: false, footerMenuRequired: false },
  },
  {
    path: "foundation",
    loadChildren: () => import("./foundation/foundation.module").then((m) => m.FoundationModule),
    data: { headerRequired: false, footerMenuRequired: false },
  },
  {
    path: "onboarding",
    loadChildren: () => import("./onboarding/onboarding.module").then((m) => m.OnboardingModule),
    data: { module: "onboarding" }
  },
  {
    path: "prelogin",
    loadChildren: () => import("./prelogin/prelogin.module").then((m) => m.PreloginModule),
  },
  {
    path: "deposits",
    loadChildren: () => import("./deposits/deposits.module").then((m) => m.DepositsModule),
    data: {
      module: "deposits",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: "loans",
    loadChildren: () =>
      import("./loans/loans.module").then((m) => m.LoansModule),
    data: {
      module: "loans",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "transfers",
    loadChildren: () =>
      import("./transfers/transfers.module").then((m) => m.TransfersModule),
    data: {
      module: "transfers",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: "smb",
    loadChildren: () =>
      import("./smb/smb.module").then((m) => m.SmbModule),
    data: {
      module: "smb",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: "rp",
    loadChildren: () =>
      import("./registeredproducts/registeredproducts.module").then((m) => m.RegisteredproductsModule),
    data: {
      module: "registeredproducts",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: "payments",
    loadChildren: () =>
      import("./payments/payments.module").then((m) => m.PaymentsModule),
    data: {
      module: "payments",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: "resume-back",
    component: CobResumebackFormComponent,
    data: { title: "CobResumebackForm.title", module: "onboarding" },
  },
  {
    path: "verify-tfa",
    component: VerifyOtpFormComponent,
    data: { title: "verifyTfa.title", module: "onboarding" },
  },
  {
    path: "credit-cards",
    loadChildren: () =>
      import("./credit-cards/credit-cards.module").then(
        (m) => m.CreditCardsModule
      ),
      data: {
        module: "credit-card",
        headerRequired: false,
        footerMenuRequired: false,
      }
  },
  {
    path: "debit-card",
    loadChildren: () =>
      import("./debit-card/debitcard.module").then((m) => m.DebitcardModule),
    data: {
      module: "debit-card",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: "prepaidcard",
    loadChildren: () =>
      import("./prepaidcard/prepaidcard.module").then((m) => m.PrepaidcardModule),
    data: {
      module: "prepaid-card",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: "npss",
    loadChildren: () => import("./npss/npss.module").then((m) => m.NpssModule),
    data: {
      module: "npss",
      headerRequired: false,
      footerMenuRequired: false
    }
  },
  {
    path: "service-request",
    loadChildren: () =>
      import("./service-request/service-request.module").then((m) => m.ServiceRequestModule),
    data: {
      module: "servicerequest",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: "settings",
    loadChildren: () => import("./settings/settings.module").then((m) => m.SettingsModule),
    data: {
      module: "settings",
      headerRequired: false,
      footerMenuRequired: false,
    }
  },
  {
    path: 'other-request',
    loadChildren: () => import('./other-request/other-request.module').then((m) => m.OtherRequestModule),
    data: {
      module: "other-request",
      headerRequired: false,
      footerMenuRequired: false,
    }
  },
  {
    path: "http-status",
    loadChildren: () => import("./http-status/http-status.module").then((m) => m.HttpStatusModule),
    data: {
      module: "http-status",
      headerRequired: true,
      footerMenuRequired: false,
    }
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    data: {
      module: "home",
      headerRequired: true,
      footerMenuRequired: false,
    }
  },
  {
    path: "tools-calculator",
    loadChildren: () => import("./tools-calculator/tools-calculator.module").then((m) => m.ToolsCalculatorModule),
    data: {
      module: "tools-calculator",
      headerRequired: false,
      footerMenuRequired: false,
    }
  },
  {
    path: "etransfers",
    loadChildren: () =>
      import("./etransfers/etransfers.module").then((m) => m.ETransfersModule),
    data: {
      module: "etransfers",
      headerRequired: false,
      footerMenuRequired: false,
    },
  },
  {
    path: 'workflow',
    loadChildren: () => import('./workflow/workflow.module').then((m) => m.WorkflowModule),
    data: {
      module: "workflow",
      headerRequired: false,
      footerMenuRequired: false,
    }
  },
  {
    path: "pfm",
    loadChildren: () => import("./pfm/pfm.module").then((m) => m.PfmModule),
    data: {
      module: "pfm",
      headerRequired: false,
      footerMenuRequired: false
    }
  },
  {
    path: "fb",
    loadChildren: () => import("./fb/fb.module").then((m) => m.FbModule),
    data: {
      module: "fb",
      headerRequired: false,
      footerMenuRequired: false
    }
  },
  {
    path: "insurance",
    loadChildren: () => import("./insurance/insurance.module").then((m) => m.InsuranceModule),
    data: {
      module: "insurance",
      headerRequired: false,
      footerMenuRequired: false
    }
  },
  {
    path: "wallet",
    loadChildren: () => import("./wallet/wallet.module").then((m) => m.WalletModule),
    data: {
      module: "wallet",
      headerRequired: false,
      footerMenuRequired: false
    }
  },
  {
    path: "rewards",
    loadChildren: () => import("./rewards/rewards.module").then((m) => m.RewardsModule),
    data: {
      module: "rewards",
      headerRequired: false,
      footerMenuRequired: false
    }
  },
];
