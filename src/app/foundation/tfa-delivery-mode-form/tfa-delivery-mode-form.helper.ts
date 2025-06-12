import { Inject, Injectable } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { BaseFpxComponentState, BaseFpxFormHelper, RoutingInfo } from "@fpx/core"
import { VerifyTFAData } from "../verifytfa-service/verify-tfa.model";

export class TFADeliveryModeFormState extends BaseFpxComponentState {
    isPopup:boolean = false;
}

@Injectable()
export class TFADeliveryModeFormHelper extends BaseFpxFormHelper<TFADeliveryModeFormState>{
    constructor(
        private _dialogRef: MatDialogRef<any>, 
        @Inject(MAT_DIALOG_DATA) private _dialogData : any) {
        super(new TFADeliveryModeFormState());
    }

    override doPostInit(){
        this.setServiceCode("TFADELIVERYMODESELECTION");
        if(this._dialogData && this._dialogData?.reqRef){
            this.state.isPopup = true;
            this._dialogData.title ="tfaDeliveryMode.deliveryMode.title" ;
            this.setValue('reqRef', this._dialogData.reqRef);
        } else {
            this.state.isPopup = false;
            this.setValue('reqRef', this.getRoutingParam('reqRef'));
        }
    }

    public override preSubmitInterceptor(payload: VerifyTFAData): any {
        // WRITE CODE HERE TO HANDLE 
        return payload;
    }

    public override postSubmitInterceptor(response: any): RoutingInfo {
        let routingInfo: RoutingInfo = new RoutingInfo();
        if(response.success){
            let result = response?.success?.body?.tfadeliverymode;

            if(this.state.isPopup){
                this._dialogRef.close({
                    processId: result?.processId
                });
            } else {
                routingInfo.setQueryParams({
                    response: result,
                    transRef: result?.processId,
                    status: "success"
                });
            }
        } else {
            let error = response?.error.error;
            console.log("Error: ", error);
        }

        return routingInfo;
    }
}
