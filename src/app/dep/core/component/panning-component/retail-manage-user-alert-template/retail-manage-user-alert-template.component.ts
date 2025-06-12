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

@Component({
  selector: "app-retail-user-alert-template",
  templateUrl: "./retail-manage-user-alert-template.component.html",
  styleUrls: ["./retail-manage-user-alert-template.component.scss"],
})
export class RetailManageUserAlertTemplateComponent extends BaseFpxFunctionality implements OnInit {

  @Input() selectedData!: any;
  @Input('index') index!: any;
  
  constructor(
    private _httpProvider: HttpProviderService,
    protected _appConfig: AppConfigService,
    protected _device: DeviceDetectorService
  ) {
    super();
  }

  ngOnInit(): void {
    
  }

  servicesChange(event: any, payload: any) {
    const httpRequest = new HttpRequest();
    let data = {
      enabled:event.checked?'1':'0'
    }
    httpRequest.setResource('/useralertservices/{alertCategory}/{serviceCode}');
    httpRequest.addPathParameter('alertCategory', this.getRoutingParam('categoryCode'));
    httpRequest.addPathParameter('serviceCode', payload?.serviceCode?.serviceCode?.serviceCode);
    httpRequest.setMethod('PUT');
    let bodyContent = { "useralertservices": data };
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).subscribe(res => {

    });
  }
}
