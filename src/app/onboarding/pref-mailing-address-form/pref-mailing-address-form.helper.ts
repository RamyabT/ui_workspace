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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PrefMailingAddressService } from '../prefMailingAddress-service/prefMailingAddress.service';
import { PrefMailingAddress } from '../prefMailingAddress-service/prefMailingAddress.model';
import { AppConfigService } from "@dep/services";
export class PreferedMailingAddressState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  dualNationalityHolder: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  pepDeclaration: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
}


@Injectable()
export class PreferedMailingAddressHelper extends BaseFpxFormHelper<PreferedMailingAddressState> {
  nvalue: any;

  constructor(private preferedMailingAddressService: PrefMailingAddressService, private _httpProvider: HttpProviderService, private _router: Router,
    public _appConfig: AppConfigService) {
    super(new PreferedMailingAddressState());
    this.addValueChangeHandler(
      "dualNationalityHolder",
      this.handledualNationalityHolderOnvalueChange
    );
    this.addValueChangeHandler(
      "otherNationality",
      this.handleotherNationalityOnvalueChange
    );


  }

  private _onLoadCountryOfTax() {
    const httpRequest = new HttpRequest();
    // httpRequest.setResource('/obapplicantdocuments/20240322171053004203/{documentType}');
    httpRequest.setResource('/obapplicantdocuments/{applicantId}/{documentType}');
    //  httpRequest.addPathParameter('appRef', this.setRoutingParam('appRef'));
    httpRequest.addPathParameter('applicantId', this._appConfig.getData('applicantId'));
    //  httpRequest.addPathParameter('appRef',sessionStorage.getItem('applicantId'));

    httpRequest.addPathParameter('documentType', 'EMIRATES_ID');
    httpRequest.setMethod('GET');
    httpRequest.setContextPath('Customers');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null)).subscribe({
        next: (res: any) => {
          console.log(res)
          let info = res?.obapplicantdocuments?.extractedInfo
          let paresedInfo = JSON.parse(info || '{}')
          let userInfo = paresedInfo.scannedValues.groups.find((item: any) => item.groupKey === 'userInfo');
          let nationality = userInfo.fields.find((item: any) => item.fieldKey === "nationality")
          let natValue = nationality.value;
          this.nvalue = natValue;

        },
        error: () => {

        },
        complete: () => {

        }
      })

  };
  public handleotherNationalityOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (this.nvalue == formGroup.controls["otherNationality"].value) {
      this.setErrors("otherNationality", 'checkcountry');


    }

  };

  public handledualNationalityHolderOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "1") {
      this.setHidden("otherNationality", false);


    }
    else if (value == "0") {
      this.setHidden("otherNationality", true);

    }
  };

  public handlepreferredBranchOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    let issuingPlace=this._appConfig.getData('IssuingPlace');
    if(issuingPlace!=null && issuingPlace!="")
    {
    if (issuingPlace == "DUBAI") {
      this.setValue('preferredBranch', "02");
    }
    else if (issuingPlace == "UMM Ll QAIWAIN") {
      this.setValue('preferredBranch', "01");
    }
    else if (issuingPlace == "ABU DHABI") {
      this.setValue('preferredBranch', "03");
    }
    else if (issuingPlace == "AJMAN") {
      this.setValue('preferredBranch', "05");
    }
    else if (issuingPlace == "SHARJAH") {
      this.setValue('preferredBranch', "06");
    }
    else if (issuingPlace == "FUJEIRAH") {
      this.setValue('preferredBranch', "08");
    }
    else if (issuingPlace == "RAS AL KHAIMAH") {
      this.setValue('preferredBranch', "11");
    }
    }

  };

  override doPreInit(): void {
    this.setServiceCode("prefMailingAddress");
    this.setHidden("otherNationality", true);
    this._onLoadCountryOfTax();
    this.addValueChangeHandler(
      "preferredBranch",
      this.handlepreferredBranchOnvalueChange
    );

  }


  public override doPostInit(): void {
    this.setValue('countryOfResidence', 'AE');

  }


  public override preSubmitInterceptor(payload: PrefMailingAddress): any {
    // WRITE CODE HERE TO HANDLE 
    let rolecategoryArray: any[] = [];

    payload?.mainSourceOfIncome?.forEach((element: any, index: number) => {
      rolecategoryArray.push({
        detailSerial: index,
        code: element,
        //  description:payload?.activationDate,
        applicantId: payload.applicantId,
        //  accountType:"1",
        //  accountName:"Savings",
      })
    });


    //  }
    payload['mainSourceOfIncome'] = rolecategoryArray;
    //}
    return payload;

  }



  public override postDataFetchInterceptor(payload: PrefMailingAddress) {
    // WRITE CODE HERE TO HANDLE 
    if (payload.mainSourceOfIncome?.length > 0) {
      for (let i = 0; i < payload.mainSourceOfIncome.length; i++) {
        payload.mainSourceOfIncome[i] = payload.mainSourceOfIncome[i].lovrep.id;
      }
    }
    return payload;

  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");

    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.prefMailingAddress,
        transRef: response.success?.body?.prefMailingAddress.applicantId,
        status: "success",
      });
      this._appConfig.setData('applicantId', response.success?.body?.prefMailingAddress.applicantId)
      this._appConfig.setData('processId', response.success?.body?.prefMailingAddress.processId)
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
}