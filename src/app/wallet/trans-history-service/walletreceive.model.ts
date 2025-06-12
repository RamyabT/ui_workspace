 



import { IHttpErrorPayload } from '@fpx/core';

export class Transactionreceivemaintainence {
    walletreceivedinfo?: walletreceivedinfo;
}


export interface walletreceivedinfo {
    walletreceivedinfo?: walletreceivedinfo[]
  totalRowCount?:number
  data?: walletreceivedinfo[]
}



export interface walletreceivedinfo{
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


export interface TransactionreceiveResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
