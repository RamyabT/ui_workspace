 



import { IHttpErrorPayload } from '@fpx/core';

export class Transactionrequestemaintainence {
    walletrequestedinfo?: walletrequestedinfo;

}

export interface walletrequestedinfo {
    walletrequestedinfo?: walletrequestedinfo[]
  totalRowCount?:number
  data?: walletrequestedinfo[]
}



export interface walletrequestedinfo{
    toWalletAccount  : string,
amount  :  string,
transactionReference  :  string,
fromWallet  :  string,
mobileNumber  :  string,
toWalletId  :  string,
toWalletCustomerCode  :  string,
payeeName  :  string,
pendingSinceDate  :  string,
fromWalletId  : string,
RequestedDate  :  string,
fromWalletCustomerCode  :  string,
status  :  string,
}


export interface TransactionrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
