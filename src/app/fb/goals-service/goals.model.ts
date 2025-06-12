import { IHttpErrorPayload } from "@fpx/core"

export interface GoalData{
     goals : Goals[];
}

export interface  Goals {
       id:string,
       tenantId:string, 
       customerCode:string, 
       inventoryNumber:string, 
       goalName:string, 
       childAcc:any, 
       targetAmt:number, 
       dueDt:string, 
       debitAcc:any, 
       createdBy:string, 
       createdOn:string, 
       authBy:string, 
       authOn:string, 
       modifiedBy:string, 
       modifiedOn:string, 
       contributionAmount:number, 
       operationMode:string, 
       status:string, 
       currency:any ,
       childList:any
  }
  
 
