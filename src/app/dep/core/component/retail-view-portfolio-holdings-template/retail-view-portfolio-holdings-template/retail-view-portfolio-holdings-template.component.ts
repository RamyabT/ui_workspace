import {
    ChangeDetectorRef,
    Component,
    OnInit,
    Renderer2,
  } from "@angular/core";
  import { PanningService } from "src/app/dep/services/panning.service";
  import { DepPanningComponent } from "../../dep-panning.component";
  import { FpxModal } from "@fpx/core";
  import { TransfersInfoFormComponent } from "src/app/transfers/transfers-info-form/transfers-info-form.component";
  import { DepAlertComponent } from "../../dep-alert/dep-alert.component";
  import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
  import { Router } from "@angular/router";
  import { AppConfigService } from "@dep/services";
  import { DeviceDetectorService } from "../../../class/device-detector.service";
  import { PcTransactionInfoComponent } from "src/app/prepaidcard/pc-transaction-info/pc-transaction-info.component";
  
  declare let $: any;
  
  @Component({
    selector: "app-retail-view-portfolio-holdings-template",
    templateUrl: "./retail-view-portfolio-holdings-template.component.html",
    styleUrls: ["./retail-view-portfolio-holdings-template.component.scss"],
  })
  export class RetailViewPortfolioHoldingTemplateComponent extends DepPanningComponent implements OnInit {
  
      constructor(
          private renderer2: Renderer2,
          private changeDetectorRef: ChangeDetectorRef,
          private panningService: PanningService,
          private _router: Router,
          protected _appConfig: AppConfigService,
          protected _device: DeviceDetectorService
        ) {
          super(renderer2, changeDetectorRef,panningService);
        }
    
  
    override ngOnInit(): void {
    }
  }
  