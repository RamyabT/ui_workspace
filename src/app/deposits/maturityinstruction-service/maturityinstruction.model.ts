import { IHttpErrorPayload } from '@fpx/core';
  
export interface MaturityinstructionMaintanence {
  maturityinstruction?: Maturityinstruction[],
  totalRowCount?:number
  data?: Maturityinstruction[],
  
}
export interface Maturityinstruction  {
	     maturityInstruction:any, 
         termsFlag:string, 
         customerCode:string, 
         updtOn:string, 
         authOn:string, 
	     accountNumber:any, 
	     creditAccountNumber:any, 
         createdOn:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
	     charity:any, 
         tenantId:string, 
         modifiedBy:string, 
         charityPercentage:string, 
         entity:string, 
         remarks:string, 
  }
  
  
 export interface MaturityinstructionResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
