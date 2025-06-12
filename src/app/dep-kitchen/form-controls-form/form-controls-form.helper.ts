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
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";

export class FormControlsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  sampleDataList$: any;
  sampleRadioList$: any;
  chicletsRadioList$: any;
  notifyRadioList$: any;
}


@Injectable()
export class FormControlsFormHelper extends BaseFpxFormHelper<FormControlsFormState>{
  addressInfo!: FormGroup;

  constructor(private _httpProvider: HttpProviderService, private _router: Router) {
    super(new FormControlsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("DEPKITCHENFORMCONTROLS");
  }

  override doPostInit() {
    this.state.sampleDataList$ = of([
      {
        id: "IN",
        text: "India"
      },
      {
        id: "US",
        text: "United States"
      },
      {
        id: "UK",
        text: "United Kingdom"
      },
      {
        id: "UA",
        text: "United Arab Emirates"
      }
    ]);
    this.state.sampleRadioList$ = of([
      {
        id: "M",
        text: "Male"
      },
      {
        id: "F",
        text: "Female"
      }
    ]);
    this.state.chicletsRadioList$ = of([
      {
        id: "3",
        text: "3"
      },
      {
        id: "6",
        text: "6"
      },
      {
        id: "12",
        text: "12"
      }
    ]);
    this.state.notifyRadioList$ = of([
      {
        id: "E",
        text: "Email"
      },
      {
        id: "P",
        text: "Mobile"
      },
      {
        id: "B",
        text: "Both"
      }
    ]);
    this.setValue('textBox2', 'I am text box');
    this.setDisabled('textBox2', true);

    this.setDisabled('primary1', true);
    this.setDisabled('secondary1', true);
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


