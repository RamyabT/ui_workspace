import { Injectable } from "@angular/core";
import moment from "moment";


@Injectable({
    providedIn: "root",
})

export class CUUtilityManager {

    constructor() {
    }

    isAllowSIEdit(payload: any): boolean {
        let dateToCheck:any = payload?.paymentDate;
        let allowEdit: boolean = true;
        const givenDate = moment(dateToCheck);
        const today = moment();
        let dateDiff = givenDate.diff(today.format("YYYY-MM-DD"), 'days');
    
        if(dateDiff == 1) {
          let hr:number = parseInt(today.format("HH"));
          if(hr >= 21){
            allowEdit = false;
          }
        } else {
          console.log("fine");
        }
        return allowEdit;
      }
}