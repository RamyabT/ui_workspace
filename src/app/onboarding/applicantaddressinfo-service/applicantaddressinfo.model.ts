import { IHttpErrorPayload } from '@fpx/core';
import { Addressdetail } from '../addressdetail-service/addressdetail.model';


export interface ApplicantaddressinfoMaintanence {
  applicantaddressinfo?: Applicantaddressinfo[],
  totalRowCount?:number
  data?: Applicantaddressinfo[],
  
}
export interface Applicantaddressinfo  {
	     communicationAddressInv:Addressdetail, 
         permenantAddressFlag: any, 
	     permenantAddressInv:Addressdetail, 
         applicantId:string, 
  }
  
  
 export interface ApplicantaddressinfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
