import { IHttpErrorPayload } from '@fpx/core';


export interface ChildDetailsMaintanence {
    ChildDetails?: ChildDetails[],
    totalRowCount?: number
    data?: ChildDetails[],

}
export interface ChildDetails {
    gender: any,
    nickName: any,
    mobileNumber: any,
    fullName: any,
    profileImage: any,
    dob: any,
    relationship: any,
    email: any,
    childOfficialID: any
}


export interface ChildDetailsResponse {
    inventoryNo?: string;
    httpStatus?: number;
    error?: IHttpErrorPayload;
}	
