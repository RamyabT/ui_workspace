import { IHttpErrorPayload } from "@fpx/core"

export interface  Prepaidcard {
          id: string,
       customerCode:string, 
       cardNumber:string, 
       cardRefNumber:string, 
       cardtype:any, 
       status:string, 
       productCode:string, 
       productDesc:string, 
       cardHolderName:string, 
       primaryCardAccNo:string, 
       branchCode:string, 
       branchDesc:string, 
       cardCategory:string, 
       creditLimit:number, 
       availableCashLimit:number, 
       minPaymentDue:number, 
       outstandingAmount:number, 
       lastPaymentReceived:number, 
       lastStatementBalance:number, 
       overdueAmount:number, 
       unbilledAmount:number, 
       availablePurchaseLimit:number, 
       interestRate:number, 
       accountNumber:string, 
       issueDate:string, 
       validThru:string, 
       billingAddress:string, 
       currency:string, 
       accountType:string , 
        cardType:any, 
       type:string,  
       linkedBankAccount:string,
       eCommStatus:string, 
       blockReason:string, 
       cardReference: string,
       cvv: string,
       otherReason:any,
       multiCurrencySupported:any,
       lastRechargeAmount:any,
       lastTopupdate:any,
       avlBalance:any,
       pinStatus:any
  }
  
 
