import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { FpxModal, FpxModalAfterClosed, FpxToastService } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { PanningService } from 'src/app/dep/services/panning.service';
import { Observable } from 'rxjs';
import { EtransferautodepositlogService } from 'src/app/etransfers/etransferautodepositlog-service/etransferautodepositlog.service';
import { DepAlertComponent } from '../../dep-alert/dep-alert.component';
import { RetailEtransferautodepositlogFormComponent } from 'src/app/etransfers/retail-etransferautodepositlog-form/retail-etransferautodepositlog-form.component';

@Component({
  selector: 'app-retail-etransfer-auto-deposit-template',
  templateUrl: './retail-etransfer-auto-deposit-template.component.html',
  styleUrls: ['./retail-etransfer-auto-deposit-template.component.scss']
})
export class RetailEtransferAutoDepositTemplateComponent extends DepPanningComponent implements OnInit {

  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _appConfig: AppConfigService,
    private _fpxToastService: FpxToastService,
    private _translateService: TranslateService,
    protected _device: DeviceDetectorService,
    private EtransferautodepositlogService:EtransferautodepositlogService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }
  public override doPreInit(): void {
    this.setLeftActionBtnCount(0);
    this.setRightActionBtnCount(2);
  }

  onDeleteAutoDeposit($event: any, selectedData: any) {
    $event.stopPropagation();
    this.selectedData = selectedData;
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass('dep-popup-back-drop');
    fpxModal.setData({
      title: "Confirm",
      message: "Are you sure you want to delete the Autodeposit"
    });
    fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(fpxModal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload == 0) {
      return;
    }
    else if (payload == 1) {
      if(this._appConfig.hasData('interacAutoDepositDelete$')) {
        this._appConfig.getData('interacAutoDepositDelete$').subject.next({ payload: this.selectedData, action: 'DELETE' });
      }
    }
  }


  onEditAutoDeposit($event: any, selectedData: any) {
    $event.stopPropagation();
    let serviceCode = selectedData.serviceCode;
    let status:any;
    if(selectedData.autoDepositStatus==0){
        status="Pending";
    }
    else{
      status="Active";
    }
    let queryParam: any = {
      "serviceCode": selectedData["serviceCode"],
      "mode": 'M',
      "status":status
    }
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._appConfig.setData('eTransferAutoDeposit', selectedData);
    this._appConfig.setData('eTransferAutoDepositQueryParam', queryParam);
    if(!this._device.isMobile() && status=="Pending"){
      const fpxModal = new FpxModal();
      fpxModal.setComponent(RetailEtransferautodepositlogFormComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass('dep-alert-popup');
      fpxModal.setBackDropClass(['dep-popup-back-drop', 'auto-deposit-popup']);
      fpxModal.setData({
        title: "RetailEtransferautodepositlogForm.header",
        message: "RetailEtransferautodepositlogForm.message",
        okBtnLbl: "RetailEtransferautodepositlogForm.closeBtn",
      });
      fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
      this.openModal(fpxModal);
    }
    else{
      this._router.navigate(service.servicePath, {
        queryParams: {
        serviceCode: queryParam.serviceCode,
        mode: queryParam.mode,
        status: queryParam.status
      }
      });
    }
  }



}
