import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus } from "@angular/forms";
import { BaseFpxGridComponentState, BaseFpxGridHelper } from "@fpx/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  BaseFpxGridChangeHandler,
  HttpRequest,
  SpinnerService,
} from "@fpx/core";
import { CobTaxDetailsFormHelper } from "src/app/onboarding/cob-tax-details-form/cob-tax-details-form.helper";
export class AddCountryOfTaxInputGridState extends BaseFpxGridComponentState {
showSuggestion : boolean = false;
countryOfTax:any;
   }

@Injectable()
export class AddCountryOfTaxInputGridHelper extends BaseFpxGridHelper<AddCountryOfTaxInputGridState> {
countryAdded: number = 0;

  constructor(
    private _cOBTaxDetailsFormHelper:CobTaxDetailsFormHelper
  ) {
    super(new AddCountryOfTaxInputGridState());
  }
  
  public getGridWidth(): number {
    return 100;
  }
  		    	 
  		  	 
  public getGridColumnWidth(): number[] {
    return  [100,100,100,25];
  }
  override doPreInit(): void {
  }
  
  override doPostInit(): void {
    this.addValueChangeHandler("countryOfTax",this.handleCountryOfTaxOnvalueChange);
    this._cOBTaxDetailsFormHelper.getCountryOfTaxTrigger().subscribe(
      (res:any)=>{
           this.state.countryOfTax = res;
      }
    )
  }  
  public handleCountryOfTaxOnvalueChange: BaseFpxGridChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray:FormArray,
    index:number

  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    if(value == this.state.countryOfTax.value){
      this.setError('countryOfTax', index, {'countryErr': true})
    }
      
  };

  
}

 
 
