import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal,
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AccountStatementService } from '../accountStatement-service/accountStatement.service';
import { AccountStatement } from '../accountStatement-service/accountStatement.model';
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { ActiveSpaceInfoService } from "@dep/core";
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { DeviceDetectorService } from "@dep/core";
export class RetailAccountEStatementReqFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  gridData: any;
  accounts: any = [];

}


@Injectable()
export class RetailAccountEStatementReqFormHelper extends BaseFpxFormHelper<RetailAccountEStatementReqFormState> {
  private _appConfigservice: any;
  private _appConfig: any;

  accounts: any;
  res: any;
  relationshipNumber: any;
  year: any;
  requestBody: any = {
    relationshipNumber: 0,
    year: 0
  };
  accountDetails: any;
  showaccountDetails = false;
  showRelationshipDetails = false;
  isButtonDisabled=false;
  initialRelationshipNumber: any;
  showDocuments = true;


  constructor(private retailAccountEStatementReqFormService: AccountStatementService, private _activeSpaceInfoService: ActiveSpaceInfoService, private accountsService: AccountsService, private commonService: CommonService, private userService: CustomerService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailAccountEStatementReqFormState());
  }



  override doPreInit(): void {
    this.setServiceCode("ACCOUNTESTATEMENT");
    this.removeShellBtn("RESET");
    this.hideShellActions();
  }

  public handleFormOnLoad() {
    
    this.userService
      .fetchUserRelationshipDetails()
      .subscribe((res) => {
        if(res.relationship){
        let y=new Date().getFullYear();
        this.setValue('relationshipNumber', res.relationship[0].relationshipCode);
        this.setValue('year',y.toString());
        this.onView();
        }
      });
    
    
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
    this.addControlEventHandler("relationshipNumberDataReceived", this.onrelationshipNumberDataReceived);
    this.addValueChangeHandler("relationshipNumber", this.handleRelationshipNumberOnvalueChange);
    this.addValueChangeHandler("year", this.handleYearOnvalueChange);
  }


  public onrelationshipNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    this.accounts = payload.relationship.accounts;
    this.relationshipNumber=payload.relationship.relationshipCode

    this.showRelationshipDetails = true;

  }


  public handleRelationshipNumberOnvalueChange: BaseFpxChangeHandler = (payload: any) => {
    let button = document.getElementById('viewButton');
    if (this.getValue("year") && this.getValue("relationshipNumber")) {
      button?.classList.remove('disabled');
      button?.classList.add('enabled');
    }
    else {
      button?.classList.remove('enabled');
      button?.classList.add('disabled');
    }
  }

  public handleYearOnvalueChange: BaseFpxChangeHandler = (payload: any) => {
    let button = document.getElementById('viewButton');
    if (this.getValue("year") && this.getValue("relationshipNumber")) {
      button?.classList.remove('disabled');
      button?.classList.add('enabled');
    }
    else {
      button?.classList.remove('enabled');
      button?.classList.add('disabled');
    }
  }

  onView() {
    let button=document.getElementById('viewButton');
    if(button?.classList.contains('enabled')){
      button.classList.remove('enabled');
      button.classList.add('disabled');

      // else {
      //   button?.classList.remove('disabled');
      //   button?.classList.add('enabled');
      // }
      this.showaccountDetails = true;
      let payload = {
        "relationshipNumber": this.getValue("relationshipNumber"),
        "year": this.getValue("year")

      }
      this.requestBody.relationshipNumber = this.relationshipNumber;
      this.requestBody.year = this.year;
      this.userService
        .getUserAccountStatement(payload)
        .subscribe((res) => {
          if (res.accountStatement) {
            this.showDocuments = true;
            this.accountDetails = res.accountStatement;
            console.log(this.accountDetails);
          }
          else {
            this.showDocuments = false;
          }
        });
    }
  }

  onDownloadClick(statementReference:string) {
    this.commonService.downloadTaxForm(statementReference).subscribe({
      next: (response: any) => {
        let documentURL = URL.createObjectURL(
          new Blob([response.body], { type: "application/pdf" })

        );
        console.log(documentURL);
        const downloadLink = document.createElement("a");
        downloadLink.href = documentURL;
        const fileName = "Account EStatement.pdf";
        downloadLink.download = fileName;
      }
    });
  }



  public override preSubmitInterceptor(payload: AccountStatement): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: AccountStatement) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  manageStatement() {
    this._router.navigate(['edocument-space/entry-shell/edocuments/retail-estmt-request-form'], {
      queryParams: {
        deregister: true
      }
    })
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.accountStatement,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


