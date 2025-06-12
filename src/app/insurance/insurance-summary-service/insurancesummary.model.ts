export interface insuranceSummary{
  productDesc: string;
  insuranceDetails: insurance[];
  productType:any;
  selectedValue:string;
  insuranceId:string;
}

export interface insurance {
    insuranceType: any,
    id: string,
    premiumAmount: string,
    lastName: string,
    country: string,
    policyTerm: string,
    payDuration: string,
    mobileNumber: string,
    dueDate: string,
    policyNumber: string,
    customerCode: string,
    paymentFrequency: string,
    productTypeDesc: string,
    policyDuration: string,
    bonusAmount: string,
    maturityDate: string,
    nextDueDate: string,
    insuranceId: string,
    currency: string,
    insuredAmount: string,
    productType: string,
    email: string,
    totalPaidAmount: string,
    closeDate: string,
    firstName: string,
    dob: string,
    PolicyStatus: string,
    countryName: string,
    applicationCode: string,
    startDate: string,
    status: string,
    vehicleInsurance?: any; 
  travelInsurance?: any;
  homeInsurance?:any
}