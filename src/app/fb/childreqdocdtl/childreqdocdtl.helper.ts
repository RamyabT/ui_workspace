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
export class childreqdocdtlState extends BaseFpxGridComponentState {
showSuggestion : boolean = false;
   }

@Injectable()
export class childreqdocdtlHelper extends BaseFpxGridHelper<childreqdocdtlState> {
  constructor() {
    super(new childreqdocdtlState());
  }
  
  public getGridWidth(): number {
    return 100;
  }
  		    	 
  		    	 
  	  public docInvNumberOnvalueChange: BaseFpxGridChangeHandler = (
        name: string,
        status: FormControlStatus,
        value: any,
        formGroup: any
      ) => {
      console.log("valueeeeee",value);
      
      }	    	 
  		    	 
  		    	 
  		    	 
  		  	 
  public getGridColumnWidth(): number[] {
    return  [100];
  }
  override doPreInit(): void {
  }
  
  override doPostInit(): void {
    this.addValueChangeHandler("docInvNumber", this.docInvNumberOnvalueChange);
  }  
  //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
  
}

 
 
