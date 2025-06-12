import { IHttpErrorPayload } from '@fpx/core';
// import {  Casatransactiondtls } from '../corp-deposit-trans-details-ro-grid/corp-deposit-trans-details-ro-grid.model';

export interface DepositsMaintanence {
  deposits?: Deposits[],
  totalRowCount?: number
  data?: Deposits[],
}

export interface DepositsSummary {
  productDesc: string;
  totalReturnPercentage: string;
  accountDetails: Deposits[];
  accountType:any;
  selectedValue:string;
  termDeposits:any;
  deposits: any;
  marketInvestments: any;
  registeredProducts: any;
  accountNumber: any

}

export interface Deposits {
  displayContextMenu?: boolean;
  id?: string,
  confirmationDate: string,
  interestPaymentAccount: string,
  accountName: string,
  linkedAccount: string,
  customerCode: string,
  branchDesc: string,
  maturityAmount: number,
  maturityInstructions: string,
  standardInterestRate: string,
  principalPaidAccount: string,
  maturityDate: string,
  currency: string,
  accountCurrency: string,
  depositAmount: string,
  interestRate: string,
  address: string,
  debitAccountNumber: string,
  accountType: string,
  accountNumber: string,
  depositTerm: string,
  interestFrequency: string,
  branchCode: string,
  productDesc: string,
  productCode: string,
  maturityInsDesc: string,
  subAccountNumber: number,
  openDate: string,
  depositType: string,
  status: string,
  noOfMonthsCompleted: number,
  monthsCompletedPrecentage: number;
  principalPayAccNumber?: string;
  branchDescription?: string;
  productDescription?: string;
  maturityInstruction?: string;
  creditAccountNumber?: string;
  payFreqDesc?: string;
  marketValue:any;
  baseCurrencyAvlBal?: string;
  principalAmount?:string;
  currentBalance?:string;
  totalMarketValue?:string;
  allDeposits1?:string,
  asOfDate?:string
}

export interface DepositsResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	

