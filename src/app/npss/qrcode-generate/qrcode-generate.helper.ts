import { Inject, Injectable } from "@angular/core";
import { AppConfigService } from "@dep/services";
import {
    BaseFpxComponentState,
    BaseFpxFormHelper,
  
} from "@fpx/core";


export class QrcodeGenerateState extends BaseFpxComponentState {
    qrCodeData: string = '';
    qrData:any;
    senderMobileNumber: any;

}

@Injectable()
export class QrcodeGenerateHelper extends BaseFpxFormHelper<QrcodeGenerateState>{
    constructor(private _appConfig: AppConfigService,){
        
        super(new QrcodeGenerateState());
    }

    override doPreInit(): void {
        this.state.qrData =this._appConfig.getData('reqToPay');
        let npssDetails = this._appConfig.getData('npssDetails');
        let remarks = this._appConfig.getData('splitBillData').remarks;

        let qrdata = {
            reqToPay: this.state.qrData,
            senderMobileNumber : this.state.senderMobileNumber,
            iban: npssDetails.accountDetails[0].iban,
            remarks:remarks
        }
        this.state.qrCodeData = JSON.stringify(qrdata);
        this.removeShellBtn('BACK');
    }

    public handleFormOnLoad() {
        // WRITE CODE HERE TO HANDLE
      
    }

    public override doPostInit(): void {
        this.handleFormOnLoad();
    }
    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
}