import { Injectable } from "@angular/core";
import { FpxAmountConfig } from "@fpx/core";

@Injectable({
    providedIn: 'root',
  })
export class customAmountService extends FpxAmountConfig{
    constructor(){
      super();
        this.setMaxAmount(9999999999999)
    }
  }