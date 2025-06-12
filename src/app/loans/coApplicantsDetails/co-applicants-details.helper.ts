import { inject, Injectable } from "@angular/core";
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
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
export class coApplicantsDetailsState extends BaseFpxGridComponentState {
showSuggestion : boolean = false;
   }

@Injectable()
export class coApplicantsDetailsHelper extends BaseFpxGridHelper<coApplicantsDetailsState> {
  private _appConfig: AppConfigService = inject(AppConfigService);
  constructor() {
    super(new coApplicantsDetailsState());
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
  
}

 
 
