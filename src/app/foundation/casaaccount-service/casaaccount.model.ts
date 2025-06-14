export interface Casaaccount {
     preferredAccount: boolean;
     id?: string;
     accountNumber: string,
     accountName: string,
     accountHolderName:string,
     accountCurrency: string,
     accountType: string,
     accountNickname: string,
     availableBalance: number,
     unclearedBalance: number,
     closingBalance: number,
     currentBalance: number,
     lienAmount: number,
     creditInterestFrequency: string,
     creditInterestRate: number,
     creditNetInterestAccrued: number,
     taxRegistrationNumber: string,
     actualBalance: number,
     holdBalance: number,
     openingBalance: number,
     floatBalance: number,
     email: string,
     mobileNumber: string,
     addressInfo: any,
     address: string,
     mailingAddress: string,
     nomineeDetails: string,
     statementFrequency: string,
     BICCode: string,
     productCode: string,
     productDesc: string,
     accountStatus: string,
     branchCode: string,
     branchName: string,
     customerCode: string,
     openDate: string,
     closeDate: string,
     iban: string,
     routingCode: string,
     accountTypeDesc: string,
     country: any,
     ownership: string,
     institutionNumber: string,
     bankName: string,
     transitNumber: string,
     baseCurrencyAvlBal: number,
     baseCurrencyCurrentBal: number,
     displayContextMenu?: boolean,
     showTooltip?: boolean,
     allowDebit?: boolean
}


