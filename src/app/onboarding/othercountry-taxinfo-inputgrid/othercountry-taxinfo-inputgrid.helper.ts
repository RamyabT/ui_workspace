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
export class othercountrytaxinfoState extends BaseFpxGridComponentState {
// showSuggestion : boolean = false;
   }

@Injectable()
export class othercountrytaxinfoHelper extends BaseFpxGridHelper<BaseFpxGridComponentState> {
  constructor() {
    super(new othercountrytaxinfoState());
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
  }  
 
  
}


 
 
