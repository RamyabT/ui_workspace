export class Walletsummary {
    wallet?: wallet[]
}

export interface wallet {
    walletId: string,
    country: string,
    walletType: string,
    linkedAccount: string,
    customerCode: string,
    walletAccountNumber: string,
    availableBalance: string,
    closeDate: string,
    walletName: string,
    currency: string,
    countryName: string,
    openingDate: string,
    applicationCode: string,
    status: string,
    mobileNumber: string,
    id:string
}