
import { Injectable } from '@angular/core';
import { GooglemapBranchService } from './googlemap-branch.service';
import { BaseFpxComponentState, BaseFpxFormHelper } from '@fpx/core';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

export class GoogleMapBranchState implements BaseFpxComponentState {

}

@Injectable()
export class GoogleMapBranchHelper extends BaseFpxFormHelper<GoogleMapBranchState>{

    constructor(
        private _googleMapBranchService: GooglemapBranchService, public _commonService: CommonService) {
        super(new GoogleMapBranchState());
    }

    override doPreInit(){
        this.removeShellBtn("BACK");
    }

}

