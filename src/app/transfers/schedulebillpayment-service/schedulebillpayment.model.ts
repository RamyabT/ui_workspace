import { IHttpErrorPayload } from '@fpx/core';
  
export interface SchedulebillpaymentMaintanence {
  viewscheduledbills?: Schedulebillpayment[],
  totalRowCount?:number
  data?: Schedulebillpayment[],
  
}
export interface Schedulebillpayment  {
         dueAmount:number, 
         dueDate:string, 
         billerName:string, 
         billRef:string, 
         serviceCode: any,
         serviceCodeDescription: any,
         serviceTypeDescription: any
  }
  
  
 export interface SchedulebillpaymentResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
