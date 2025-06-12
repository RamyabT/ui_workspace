import { IHttpErrorPayload } from '@fpx/core';
  
export interface BillRequestMaintanence {
  billRequest?: BillRequest[],
  totalRowCount?:number
  data?: BillRequest[],
  
}
export interface BillRequest  {
  equiAmount: number;
  debitAmount: any;
  balance?:any;
  hiddenPaymentAmount?:any,
        requestReference:any,
        billReference: any;
         debitAccount:string, 
         billReferenceNo:string, 
	     chargesCurrency:any, 
         accountType:string, 
         customerCode:string, 
         chargesAmount?:any, 
         authOn:string, 
         tranRef?:string, 
         paymentAmount:any, 
         createdOn:string, 
         authBy:string, 
         modifiedOn:string, 
         exchangeRate:number, 
         createdBy:string, 
         equivalentAmount:number, 
         billerBeneficiaryId:any, 
         modifiedBy:string, 
         paymentDate:string, 
	     currencyCode:any, 
         status:string, 
         termsFlag:string,
         scheduleType:any,
         endDate:any,
         paymentType:any,
         contactName:any,
         billerIdDetail:any
         creditCradDebitAccount?:any,
         invoiceNumber?:any,
         baseRateApplied?:Number,
         rateApplied?:Number,
         baseCurrencyAmount:number,
         dueAmount:number,
         invoiceStatus:string,
         dueDate?:string
  }
  
  
 export interface BillRequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
