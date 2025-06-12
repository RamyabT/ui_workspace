import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus } from "@angular/forms";
import { BaseFpxGridComponentState, BaseFpxGridHelper, CriteriaQuery } from "@fpx/core";
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
import { ChildlogService } from "../childlog-service/childlog.service";
import { NotificationprefService } from "../notificationpref-service/notificationpref.service";
export class childreqnotificationState extends BaseFpxGridComponentState {
showSuggestion : boolean = false;

   }

@Injectable()
export class childreqnotificationHelper extends BaseFpxGridHelper<childreqnotificationState> {
  constructor(public notificationprefService:NotificationprefService) {
    super(new childreqnotificationState());
  }
  
  public getGridWidth(): number {
    return 100;
  }
  		    	 
  		    	 
  		    	 
  		  	 
  public getGridColumnWidth(): number[] {
    return  [70,30];
  }
  override doPreInit(): void {
  }

  // notificationControl(){
  //   this.notificationprefService.findAll()().subscribe({
  //     next: (response) => {
  //       console.log("responce",response);
  //       let notificationRes = response || [];
  //       let list: any = [];
  //       notificationRes.forEach((element: any, index: number) => {
  //         list.push({
  //           "docDescription": element.docDescription,
  //           "documentType": element.documentType,
  //           "isMandatory": "1"
  //         });
  //       });
  //       this.setValue("notificationpref",list);
  //     }
  //   });
  // }
  
  override doPostInit(): void {
  // this.notificationControl();
  }  
  //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
  
}

 
 
