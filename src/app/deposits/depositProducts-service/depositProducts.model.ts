import { IHttpErrorPayload } from "@fpx/core"

export interface  DepositProducts {
       productCode:string, 
       productDesc:string, 
       productGDesc:string, 
       termType:string, 
       minDepAmount:string, 
       maxDepAmount:string, 
       minDaysAllow:string, 
       interestRate:string, 
       maxDaysAllow:string, 
       depCurrency:string, 
       depositType:string 
  }
  
 
