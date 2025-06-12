import { Component, Input, OnInit } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, HttpProviderService, HttpRequest } from '@fpx/core';
import moment from 'moment';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { ViewChequeImageComponent } from 'src/app/accounts/view-cheque-image/view-cheque-image.component';
import { Merchant, TranCat } from 'src/app/dep/services/app-config-service/app-config.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { ServicerequestlogService } from 'src/app/service-request/servicerequestlog-service/servicerequestlog.service';

@Component({
  selector: 'app-view-msgs-tmplt',
  templateUrl: './view-msgs-tmplt.component.html',
  styleUrls: ['./view-msgs-tmplt.component.scss'],
  providers: [ServicerequestlogService]
})
export class ViewMsgsTmpltComponent extends BaseFpxFunctionality implements OnInit {

  @Input('selectedData') selectedData: any;
  @Input('index') index: any;

  hideElement: boolean = false;

  protected appConsatance: any = APPCONSTANTS;

  constructor(
    private _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService,
    private commonService: CommonService,
    private _servicerequestlogService: ServicerequestlogService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.selectedData.serviceRequestType.code === '3' || this.selectedData.serviceRequestType.code === '5' || this.selectedData.serviceRequestType.code === '6') {
      this.hideElement = true;
    } else this.hideElement = false;


    if (this.selectedData.status.toLowerCase() === 'stop') {
      this.selectedData.status = "Cancelled";
    }


    if (this.selectedData?.initBy) {
      let payload = {
        sourceReferenceNumber: this.selectedData.sourceReference,
        userId: this.selectedData.initBy
      }
      console.log(payload)
      this._servicerequestlogService.fetchReadStatus(payload).subscribe((res: any) => {
        console.log(res);
        this.selectedData.isRead = res.servicerequestnotification.isRead === '0' ? false : true;
      })
    }

  }

}
