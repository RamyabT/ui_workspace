

import { Injectable } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { BaseFpxComponentState, BaseFpxFormHelper, BaseFpxChangeHandler } from '@fpx/core';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { GoogleMapService } from './google-map.service';


export class GoogleMapState implements BaseFpxComponentState {

}

@Injectable()
export class GoogleMapHelper extends BaseFpxFormHelper<GoogleMapState>{

    constructor(
        private _googleMapService: GoogleMapService, public _commonService: CommonService) {
        super(new GoogleMapState());
        //this.addChangeHandler("currentPass", this.doCurrentPasswordChange);
    }

    override doPreInit(){
        this.removeShellBtn("BACK");
    }
}

