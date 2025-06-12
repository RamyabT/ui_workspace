import { Injectable } from "@angular/core";

import { HttpProviderService } from "@fpx/core";

@Injectable({
  providedIn :'root'
})
export class PaymentsService {
  upcomingBillData:any
  constructor(private _httpProvider: HttpProviderService){
  } 
}