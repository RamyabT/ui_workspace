import { IHttpErrorPayload } from '@fpx/core';
  
export interface CreditcardMaintanence {
  creditcard?: Creditcard[],
  totalRowCount?:number
  data?: Creditcard[],
}
export interface Creditcard  {
  active?: string,
  id:string, 
  validThru:string, 
  outstandingAmount?:any, 
  cardPresentStatus:string, 
  dueDate:string, 
  customerCode:string, 
  cardCategory:string, 
  validFrom:string, 
  branchDesc:string, 
  rewardPointsRedeemedCurrMonth:number, 
  unbilledAmount:any, 
  lastPaymentDate:string,
  lastPaymentAmount?: any,
  autoDebitPaymentAccount:string, 
  creditLimit:number, 
  pinStatus:string,
  eCommStatus:string, 
  currency:string, 
  accountCurrency: string,
  issueDate:string, 
  primaryCardAccNumber:string, 
  minPaymentDue:number, 
  interestRate:string, 
  rewardPointsClosingBal:number, 
  overdueAmount:any, 
  cardHolderName:string, 
  rewardPointsOpeningBal:number, 
  accountType:string, 
  cardType:any, 
  availablePurchaseLimit:number, 
  productDesc:string, 
  branchCode:string, 
  cardRefNumber:string, 
  productCode:string, 
  rewardPointsEarnedCurrMonth:number, 
  lastStatementBalance:number, 
  creditCardNumber:string, 
  billingAddress:string, 
  availableCashLimit:number, 
  lastPaymentReceived:any, 
  status:string, 
  availableCreditLimit: any,
  cardReference: string,
  cvv: string,
  totalDueAmount:number,
  maxLimit: number,
  minLimit: number
  displayContextMenu?: boolean;
}
  
  
 export interface CreditcardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	

