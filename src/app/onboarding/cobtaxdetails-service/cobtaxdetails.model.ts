import { IHttpErrorPayload } from '@fpx/core';
  
export interface CobtaxdetailsMaintanence {
  cobtaxdetails?: Cobtaxdetails[],
  totalRowCount?:number
  data?: Cobtaxdetails[],
  
}
export interface Cobtaxdetails  {
         authOn:string, 
         taxPayerIdAvailable:string, 
         createdOn:string, 
	     othercountrytaxinfo:any, 
         investmentSchemaFlag:string, 
         cityOfBirth:string, 
         authBy:string, 
         modifiedOn:string, 
	     countryOfBirth:any, 
         createdBy:string, 
         taxPayerId:string, 
	     countryOfTax:any, 
         tenantId:string, 
         modifiedBy:string, 
         applicantId:string, 
	     reasonForNoTin:any, 
         otherResidentJurisdictionsFlag:string, 
         remarks:string, 
         addCountryOfTax:[
          {
            serial: number
            tenantId:string,
            applicantId:string,  
          }
         ]
  }
  
  
 export interface CobtaxdetailsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
