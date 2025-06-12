import { Inject, Injectable } from "@angular/core";
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
    FpxActionMap,
    CriteriaQuery,
    FpxHttpOptions,
    FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";

export class SplitBillsFormState extends BaseFpxComponentState {
    showSuggestion: boolean = false;
    splitBillsList: any =[];
    
}

@Injectable()
export class SplitBillsFormHelper extends BaseFpxFormHelper<SplitBillsFormState>{
    addressInfo!: FormGroup;
    accountNumber: any;
    showTransferHistory: boolean = false;

    constructor(
        private _router: Router,
        private _appConfig: AppConfigService,
    ) {
        super(new SplitBillsFormState());
    }

    override doPreInit(): void {
        this.removeShellBtn('BACK');
        this.state.splitBillsList = [
            {
                serviceCode: "RETAILSPLITREQTOPAY"
            },
            {
                serviceCode: "RETAILSPLITQRCODE"
            }  
        ];
    }

    public handleFormOnLoad() {
        // WRITE CODE HERE TO HANDLE
        
    }

    public override doPostInit(): void {
        this.handleFormOnLoad();
    }

    openLink(item:any) {
        let service = this._appConfig.getServiceDetails(item?.serviceCode);
        if(item?.serviceCode=="RETAILSPLITREQTOPAY"){
            this._appConfig.setData('controlFlag','0')

        }
        else if(item?.serviceCode=="RETAILSPLITQRCODE"){
            this._appConfig.setData('controlFlag','1')

        }
        this._router.navigate(service.servicePath);
    }

    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
}