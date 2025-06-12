import { Injectable } from "@angular/core";
import { FpxAmountConfig } from "@fpx/core";
import { AppConfigService } from "..";

@Injectable({
    providedIn : 'root',
})
export class CustomAmountConfig extends FpxAmountConfig{
    constructor(private _appConfig:AppConfigService){
        super();
        this.setBaseCurrency(this._appConfig.baseCurrency);
    }
}