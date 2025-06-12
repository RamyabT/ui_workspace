import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { BaseFpxFunctionality, FpxModal, HttpProviderService, HttpRequest } from "@fpx/core";
import { TransfersInfoFormComponent } from "src/app/transfers/transfers-info-form/transfers-info-form.component";
import { DepAlertComponent } from "../../dep-alert/dep-alert.component";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { DcTransactionInfoComponent } from "src/app/debit-card/dc-transaction-info/dc-transaction-info.component";

@Component({
  selector: "app-retail-manage-alert-template",
  templateUrl: "./retail-manage-alert-template.component.html",
  styleUrls: ["./retail-manage-alert-template.component.scss"],
})
export class RetailManageAlertTemplateComponent extends BaseFpxFunctionality implements OnInit {
  @Input() selectedData!: any;
  @Input('index') index!: any;
  
  userAlertsChannel: any = [
    {
      description: "Email",
      channelCode: "Email"
    },
    {
      description: "Push Notification",
      channelCode: "PUSHNOTIFICATION"
    },
    {
      description: "SMS",
      channelCode: "SMS"
    }
  ]
  constructor(
    private _httpProvider: HttpProviderService,
    private _router: Router,
    protected _appConfig: AppConfigService,
    protected _device: DeviceDetectorService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  isChannelEnabled(slectableData: any, chennalCode: string) {
    let isChannelCodeAvl = slectableData?.useralertchannels?.find((x: any) => x.channelCode?.channelCode?.channelCode == chennalCode && x?.enabled == '1')
    return isChannelCodeAvl != null ? true : false;
  }

  channelChange(event: any, channelCode: string, payload: any) {
    const httpRequest = new HttpRequest();
    let data = {
      enabled:event.checked?'1':'0'
    }
    httpRequest.setResource('/useralertchannels/{alertCategory}/{useralertchannels}');
    httpRequest.addPathParameter('alertCategory', payload?.alertCategory?.categoryCode);
    httpRequest.addPathParameter('useralertchannels', channelCode);
    httpRequest.setMethod('PUT');
    let bodyContent = { "useralertchannels": data };
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).subscribe(res => { });
  }

  alertCategoryChange(event: any, payload: any) {
    this.selectedData.enabled = event.checked?'1':'0';
    let data = {enabled:event.checked?'1':'0'}
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/useralertcfg/{alertCategory}');
    httpRequest.addPathParameter('alertCategory', payload?.alertCategory?.categoryCode);
    httpRequest.setMethod('PUT');
    let bodyContent = { "useralertcfg": data };
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).subscribe(res => {

    });
  }

  showMoreClick(selectedData: any) {
    this._appConfig.setData('useralertservicesData', selectedData);
    let service = this._appConfig.getServiceDetails('RETAILMANAGEUSERALERTS');
    this._router.navigate(service.servicePath, {
      queryParams: {
        categoryCode:selectedData?.alertCategory?.categoryCode,
        'serviceCode': 'RETAILMANAGEUSERALERTS',
      }
    });
  }
}
