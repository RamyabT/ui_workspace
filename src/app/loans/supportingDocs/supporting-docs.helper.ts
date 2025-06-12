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
export class supportingDocsState extends BaseFpxGridComponentState {
showSuggestion : boolean = false;
coApplicantImage: any = {
  minSize: "0",
  maxSize: "5000000",
  extensions: ".jpeg,.png,.pdf"
}
   }

@Injectable()
export class supportingDocsHelper extends BaseFpxGridHelper<supportingDocsState> {
  constructor() {
    super(new supportingDocsState());
  }
  
  public getGridWidth(): number {
    return 100;
  }
  		    	 
  		    	 
  		    	 
  		    	 
  		    	 
  		    	 
  		  	 
  public getGridColumnWidth(): number[] {
    return  [15,40,40,40,40,40,40,40,15];
  }
  override doPreInit(): void {
  }
  
  override doPostInit(): void {
  
  }  
  //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
  
}

 
 
