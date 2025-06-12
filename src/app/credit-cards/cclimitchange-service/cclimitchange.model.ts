import { IHttpErrorPayload } from '@fpx/core';
  
export interface CclimitchangeMaintanence {
  cclimitchange?: Cclimitchange[],
  totalRowCount?:number
  data?: Cclimitchange[],
  
}
export interface Cclimitchange  {
         increasedLimit:string, 
         limitChange:string, 
         cardHolderName:string, 
	     cardType:any, 
         minLimit:any, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
	     cardRefNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         maxLimit:any, 
         createdBy:string, 
         creditCardNumber:string, 
         modifiedBy:string, 
         decreasedLimit:string, 
         tcFlag:string, 
         remarks:string, 
         cardLimit:any, 
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
         rewardPointsOpeningBal:number, 
         accountType:string, 
         availablePurchaseLimit:number, 
         productDesc:string, 
         branchCode:string, 
         productCode:string, 
         rewardPointsEarnedCurrMonth:number, 
         lastStatementBalance:number, 
         billingAddress:string, 
         availableCashLimit:number, 
         lastPaymentReceived:any, 
         status:string, 
         availableCreditLimit: any,
         cardReference: string,
         cvv: string,
         totalDueAmount:number

  }
  
  
 export interface CclimitchangeResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
