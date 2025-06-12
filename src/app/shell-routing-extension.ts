export const shellRoutingExtension = [
  {
    path: "edocuments",
    loadChildren: () =>
      import("./edocument/edocument.module").then((m) => m.eDocumentModule),
    data: { module: "edocument", headerRequired: false, footerMenuRequired: false },
  },
  {
    path: "transfers",
    loadChildren: () =>
      import("./transfers/transfers.module").then((m) => m.TransfersModule),
    data: {
      module: "transfers",
      headerRequired: false,
      footerMenuRequired: true,
    },
  },
  {
    path: "membership",
    loadChildren: () =>
      import("./membership/membership.module").then((m) => m.MembershipModule),
    data: {
      module: "membership",
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
      footerMenuRequired: true,
      space: "payments-space",
    },
  }
]