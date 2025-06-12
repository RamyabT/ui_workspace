import { ChangeDetectorRef, Component, Renderer2, inject } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { FpxAppConfig, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { FavpaymentsService } from "src/app/transfers/favpayments-service/favpayments.service";
import { Router } from "@angular/router";
import { DepPanningComponent, DeviceDetectorService } from "@dep/core";
import { PaymentsService } from "../payments.service";
import { AppConfigService } from "@dep/services";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { BilleraccountreqService } from "../billeraccountreq-service/billeraccountreq.service";
import { ActionsPanelComponent } from "src/app/foundation/actions-panel/actions-panel.component";

declare let $: any;

@Component({
  selector: "app-retail-saved-biller-template",
  templateUrl: "./retail-saved-biller-template.component.html",
  styleUrls: ["./retail-saved-biller-template.component.scss"],
  providers: [BilleraccountreqService]
})
export class RetailSavedBillerTemplateComponent extends DepPanningComponent {
  isDisplayContextMenu: boolean = false;
  menuOptionBoundingRect: any;
  actions: any;
  constructor(
    private paymentsServices:PaymentsService,
    private renderer2: Renderer2,
    public fpxappConfig: FpxAppConfig,
    private _appConfig: AppConfigService,
    public billeraccountreqService: BilleraccountreqService,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _device: DeviceDetectorService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.setLeftActionBtnCount(1);
    if(this._device.isMobile()){
      // this.setRightActionBtnCount(1);
    }else{
      // this.setRightActionBtnCount(2);

    }
  }


  viewDetail($event:any, selectedData: any) {
    $event.stopPropagation();
    this.navAction(selectedData,'DELETE')
  }

  deleteBiller($event:any, selectedData: any) {
    $event.stopPropagation();
    this.navAction(selectedData,'MODIFY')
  }
  

  payBill($event:any, selectedData: any) {
    $event.stopPropagation();
    // this.navAction(selectedData,'DELETE')
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
    modal.setDisableClose(true);
    modal.setData({
      title: "Are you sure you want to delete" + " " + selectedData?.billerId?.name + "?",
      message: "DeleteBillerPopup.message",
      okBtnLbl: "DeleteBillerPopup.okBtnLbl",
      cancelBtnLbl: "DeleteBillerPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillerReqModelAfterClose);
    this.openModal(modal);
  }

  navAction(selectedData: any, formAction: string) {

    let serviceCode = "RETAILBILLERACCOUNT";
    let queryParams: any = {
      "billerBeneficiaryId": selectedData["billerBeneficiaryId"]
    }
    if (formAction === 'DELETE') {
      queryParams.operationMode = 'D'
      queryParams.serviceCode = 'RETAILDELETEBILLER'
      serviceCode = 'RETAILDELETEBILLER';
    }
    else if(formAction==='MODIFY'){
      queryParams.serviceCode='RETAILEDITBILLER';
      serviceCode = 'RETAILEDITBILLER';
      queryParams.operationMode = 'M';
    }
    else if(formAction === 'PAY'){
      serviceCode = 'RETAILSINGLEPAYMENT';
      queryParams.serviceCode=serviceCode
      queryParams.routeFrom = "SAVEDBILLERGRID";
    }
  let service = this._appConfig.getServiceDetails(serviceCode);
  this._router.navigate(service.servicePath, {
    queryParams: {
      ...service.queryParams,
      ...queryParams
    }
  })
}

savedBillerClick($event:any,selectedData:any){
  $event.stopPropagation();

  let data = this.paymentsServices.upcomingBillData.data.find((x:any)=>x?.billerId?.billerId === selectedData?.billerId?.billerId);
  let serviceCode:string = 'RETAILSINGLEPAYMENT';
  let service:any = this.fpxappConfig.getServiceDetails(serviceCode);
  if(service){
    this._appConfig.setData('billData',data);
    this._router.navigate(service?.servicePath, {
      queryParams: {
        routeFrom:"UPCOMINGGRID",
        serviceCode: serviceCode,
      },
    });
}
}

  DelBillerReqModelAfterClose: FpxModalAfterClosed = (payload) => {
    console.log(payload)
    if (payload == 0) {
      // if (this._appConfig.hasData('billerRefresh$')) {
      //     this._appConfig.getData('billerRefresh$').subject.next({ payload: this.selectedData, deleteRequest: 0 });
      // }
      // this._router.navigate(["payments-space", "entry-shell", "payments", "retail-delete-add-biller-form"]);
    }
    else {
      if (this._appConfig.hasData('billerRefresh$')) {
          this._appConfig.getData('billerRefresh$').subject.next({ payload: this.selectedData, deleteRequest: 1});
      }
      // setTimeout(() => {
      //   let payload: any = this._appConfig.getData('billeraccountreq');
      //   this.billeraccountreqService.create(payload)().subscribe({
      //     next: (res: any) => {
      //       console.log(res);
      //       this._router.navigate(["payments-space", "entry-shell", "payments", "payments-confirmation-receipt"],
      //         {
      //           queryParams: {
      //             serviceCode: 'RETAILBILLERACCOUNT',
      //             status: 'SuccessEnd'
      //           }
      //         }
      //       );
      //     }
      //   })
      //   // this._router.navigate(["accounts-space", "entry-shell", "accounts", "confirmation-receipt"])
      // }
      // );
    }

  }

  /** Display context menu */
  displayContextMenu($event: any): void {
    // console.log($event)
    // console.log(this.selectedData)

    // this._appConfig.setData('selectedBillerDataForModify', this.selectedData);

    // if (this._device.isMobile()) {
    //   let modal = new FpxModal();
    //   modal.setComponent(ActionsPanelComponent);
    //   modal.setPanelClass('context-menu-popup');
    //   modal.setDisableClose(true);
    //   modal.setData({
    //     data: this.selectedData,
    //     menuCode: "RETAILMULTIBILLPAYMENTS",
    //     fromBiller: true,
    //     fromPayeeScreen: true
    //   });
    //   modal.setAfterClosed(this.actionsModalAfterClosed);
    //   this.openModal(modal);
    // }
    // this.isDisplayContextMenu = false;
    $event.preventDefault();
    $event.stopPropagation()
    // this.menuOptionBoundingRect = $event.currentTarget?.getBoundingClientRect();
    // this.getContextMenu();
  }

    getContextMenu() {
      this.hideSpinner();
      this.actions = 'RETAILSAVEDBILLER';
      // this.setMenuPosition();
    }
  
    actionsModalAfterClosed: FpxModalAfterClosed = (payload: any) => {
      console.log(payload)
      if (payload == 'delete') {
        this.deletePopUp(this.selectedData)
      }
      else if(payload == 'edit') {
        this.editMobBiller(this.selectedData)
      }
    }

    editMobBiller( selectedData: any) {
      // $event.stopPropagation();
      this.navAction(selectedData,'MODIFY')
    }


  deletePopUp(selectedData: any) {
    // $event.stopPropagation();
    // this.navAction(selectedData,'DELETE')

    let billerName = selectedData?.nickName || selectedData?.billerId?.name;

    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'delete-bill-backdrop', 'bottom-transparent-overlay', 'backdrop-bill']);
    modal.setDisableClose(true);
    modal.setData({
      title: "Are you sure you want to delete" + " " + billerName + "?",
      message: "DeleteBillerPopup.message",
      okBtnLbl: "DeleteBillerPopup.okBtnLbl",
      cancelBtnLbl: "DeleteBillerPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillerReqModelAfterClose);
    this.openModal(modal);
  }
  
    closeContext() {
      this.isDisplayContextMenu = !this.isDisplayContextMenu;
    }

  desktopEditBiller($event: any, selectedData: any) {
    console.log(selectedData)
    $event.stopPropagation();
    // this._appConfig.setData('selectedBillerDataForModify', selectedData);
    // this.navAction(selectedData, 'MODIFY')
    // this.navAction(selectedData,'MODIFY')
  }

    desktopDeleteBiller($event:any, selectedData:any) {
      console.log(selectedData)
      $event.stopPropagation();
      // this.deletePopUp(this.selectedData)
      // this.deletePopUp(selectedData)
    }
}