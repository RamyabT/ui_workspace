import { IHttpErrorPayload } from '@fpx/core';

export interface LoansMaintanence {
  loans?: Loans[],
  totalRowCount?: number
  data?: Loans[],

}
export interface Loans {
  displayContextMenu?: boolean;
  id: string
  totalOutstanding: number,
  loanType: string,
  installmentAmount: number,
  otherCharges: number,
  customerCode: string,
  branchDesc: string,
  disbursalAmount: number,
  maturityAmount: number,
  drawDownDate: string,
  maturityDate: string,
  nextDueDate: string,
  lastPaymentDate: string,
  currency: string,
  accountCurrency: string,
  loanCalculationDate: string,
  repaymentFrequency: any,
  tenure: string,
  interestRate: number,
  delinquencyStatus: string,
  noOfInstallments: number,
  noOFInstallmentsPaid: number,
  principalOutstanding: number,
  accountType: string,
  interestAmount: number,
  firstDisbursalDate: string,
  accuredInterest: number,
  loanAmount: number,
  lastDisbursedDate: string,
  productDesc: string,
  branchCode: string,
  remainingInstallments: number,
  productCode: string,
  loanAccountNumber: string,
  loanAccountName: string,
  rePaidAmount: number,
  tenorUnit: string,
  openDate: string,
  loanStartDate: string,
  daysPassedDue: number,
  status: string,
  pendingDisbursalAmount: string
  payOffAmount: number,
  accountTypeDesc: string,
  primaryAccount: string,
  baseCurrencyAvlBal?: number,

}


export interface LoansResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
