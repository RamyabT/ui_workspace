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
import { CreditcardStatementService } from '../creditcardStatement-service/creditcardStatement.service';
import { CreditcardStatement } from '../creditcardStatement-service/creditcardStatement.model';
import { CustomerService } from "../../foundation/validator-service/customer.service";
import { CommonService } from "../../foundation/validator-service/common-service";
import { CreditcardService } from "src/app/credit-cards/creditcard-service/creditcard.service";
import { DeviceDetectorService } from "@dep/core";
export class RetailVisaEStatementReqFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}


@Injectable()
export class RetailVisaEStatementReqFormHelper extends BaseFpxFormHelper<RetailVisaEStatementReqFormState> {


  showGrid = false;
  cardDetails: any;
  showcardDetails = false;


  constructor(private retailVisaEStatementReqFormService: CreditcardStatementService, private _httpProvider: HttpProviderService, private _router: Router,
    private userService: CustomerService, private commonService:CommonService,
    private creditCardService: CreditcardService,
    public device: DeviceDetectorService,

  )
   {
    super(new RetailVisaEStatementReqFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCCSTATEMENT");
    this.removeShellBtn("RESET")
    this.hideShellActions();
   
    // this.setValue('cardRefNumber','300000003043');
    // this.setValue('year','2024');
    let payload = {
      "cardRefNumber": this.getValue("cardRefNumber"),
      "year": this.getValue("year")
      
    }
    this.addControlEventHandler("cardRefNumberDataReceived", this.oncardRefNumberDataReceived);
    this.showcardDetails = true;
    console.log("PAYLOAD", payload)
    this.userService
      .getCreditCardStatement(payload)
      .subscribe((res) => {
        this.cardDetails = res.creditcardStatement;
        this.setGridData("RetailVisaEstatementGrid", res.creditcardStatement);
       
        console.log(this.cardDetails)
        let button=document.getElementById('viewButton');
        button?.classList.add('disabled');
      });
      

  }
  public oncardRefNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    // this.setValue('cardRefNumber',payload?.cardRefNumber);
   
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
    this.addValueChangeHandler("cardRefNumber", this.handlecardRefNumberOnvalueChange);
    this.addValueChangeHandler("year", this.handleYearOnvalueChange);
    // this.setGridData("RetailVisaEstatementGrid", data)
    let criteriaQuery: CriteriaQuery = new CriteriaQuery();

    this.setGridCriteria("RetailVisaEstatementGrid", criteriaQuery);
  }

  public handlecardRefNumberOnvalueChange: BaseFpxChangeHandler = (payload: any) => {
   
    let button = document.getElementById('viewButton');
    if (this.getValue("year") && this.getValue("cardRefNumber")) {
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
    if (this.getValue("year") && this.getValue("cardRefNumber")) {
      button?.classList.remove('disabled');
      button?.classList.add('enabled');
    }
    else {
      button?.classList.remove('enabled');
      button?.classList.add('disabled');
    }
  }
  public override preSubmitInterceptor(payload: CreditcardStatement): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: CreditcardStatement) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  handleVisaEstatementGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      console.log($event.payload + "tttttttttttttttttttt");
    }
    console.log("PAYLOAD8765 ", $event.payload)
  }

  public handleFormOnLoad() {
    
    this.creditCardService
      .fetchCreditCardRegistrationStatus()
      .subscribe((res) => {
        if(res.cardregistrationstatus){
        let y=new Date().getFullYear();
        this.setValue('cardRefNumber',res.cardregistrationstatus.cards[0].cardRefNumber);
        this.setValue('year',y.toString());
        this.onSubmit();
        }
      });
    
    
  }

  onSubmit() {
    console.log("hjhjhhjhj");

    let button=document.getElementById('viewButton');
    if(button?.classList.contains('enabled')){
      button.classList.remove('enabled');
      button.classList.add('disabled');
    }
    else{
      button?.classList.remove('disabled');
      button?.classList.add('enabled');
    }
    //this.showcardDetails = true;
    console.log("GET RESPONSE")
    let payload = {
      "cardRefNumber": this.getValue("cardRefNumber"),
      "year": this.getValue("year")

    //  "cardRefNumber": "310004561095",
      // "year": "2024"
      
    }
    console.log("PAYLOAD", payload)
    this.userService
      .getCreditCardStatement(payload)
      .subscribe((res) => {
        if(res.creditcardStatement){
          this.cardDetails = res.creditcardStatement;
          this.showcardDetails = true;
          this.setGridData("RetailVisaEstatementGrid", res.creditcardStatement);
         
          console.log(this.cardDetails);
        }
        else{
          this.showcardDetails =false;
        }
       

      });
  }
   onDownloadClick(statementReference: string) {
    this.commonService.downloadTaxForm(statementReference).subscribe({
      next: (response: any) => {
        let documentURL = URL.createObjectURL(
          new Blob([response.body], { type: "application/pdf" })
         
        );
        console.log(documentURL);
        const downloadLink = document.createElement("a");
        downloadLink.href = documentURL;
        const fileName = "Visa EStatement.pdf";
        downloadLink.download = fileName;
      }
    });
  }

  manageStatement() {
    this._router.navigate(['edocument-space/entry-shell/edocuments/retail-card-estmt-request-form'], {
      queryParams: {
        deregister: true
      }
    })
  }

  public override postSubmitInterceptor(response: any) {
    console.log("RESRESRERS", response.success.body.creditcardStatement);
    this.showGrid = true;

    // this.setGridData("RetailVisaEstatementGrid", response.success.body.creditcardStatement)


    let routingInfo: RoutingInfo = new RoutingInfo();
    console.log(routingInfo)
    // routingInfo.setNavigationURL("confirmation");
    // if (response.success) {
    //   routingInfo.setQueryParams({
    //     transRef: response.success?.body?.creditcardStatement,
    //     status: "success",
    //   });
    // } else if (response.error) {
    //   routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    // }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


