import { ChangeDetectorRef, Component, OnInit, Renderer2 } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { Beneficiaries } from "src/app/transfers/beneficiaries-service/beneficiaries.model";
import { Router } from "@angular/router";
import { FavouriteBeneficiariesValidator } from "src/app/transfers/favouriteBeneficiaries-validator.service";
import { DepConfirmationComponent } from "../../dep-confirmation/dep-confirmation.component";
import { CriteriaQuery, FpxModal, FpxModalAfterClosed, HttpProviderService, HttpRequest, IHttpSuccessPayload } from "@fpx/core";
import { BeneficiariesService } from "src/app/transfers/beneficiaries-service/beneficiaries.service";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { AppConfigService, UserAuthService } from "@dep/services";
import { DepAlertComponent } from "../../dep-alert/dep-alert.component";
import { map, Observable } from "rxjs";
import { Delegateuser } from "src/app/smb/delegateuser-service/delegateuser.model";
import { DelegateuserService } from "src/app/smb/delegateuser-service/delegateuser.service";

declare let $: any;

@Component({
  selector: "app-retail-manage-delegate-template",
  templateUrl: "./retail-manage-delegate-template.component.html",
  styleUrls: ["./retail-manage-delegate-template.component.scss"],
})
export class RetailManageDelegateTemplateComponent
  extends DepPanningComponent
  implements OnInit {
  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService,
    public userAuth: UserAuthService,
    // private _delegateservice:DelegateuserService
    

  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.setLeftActionBtnCount(1);
    this.setRightActionBtnCount(2);
    this.selectedData.beneficiaryName = this.selectedData.firstName+' '+this.selectedData.lastName;
  }

  // editRowData($event:any, selectedData: Beneficiaries) {
  //   $event.stopPropagation();
  //   this._router.navigate(
  //     [
  //       "transfers-space",
  //       "entry-shell",
  //       "transfers",
  //       "retail-bene-internal-form",
  //     ],
  //     {
  //       queryParams: {
  //         serviceCode: selectedData.serviceCode,
  //       },
  //     }
  //   );
  // }
  setPermissionRowData($event:any, selectedData: Beneficiaries) {
    $event.stopPropagation();
    this._router.navigate(
      [
        "smb-delegat-space",
        "entry-shell",
        "smb",
        "retail-setpermissions-form",
      ],
      {
        queryParams: {
          operationMode: selectedData.userId ? 'M' : 'A',
          userId: selectedData.userId,
          customerCode: selectedData.customerCode,
          delegateInvNo: selectedData.delegateId
        },
      }
    );
  }
  
  deleteRowData($event:any, selectedData: Delegateuser) {
    $event.stopPropagation();
    let routePath;
    let tenId = this.userAuth.getAuthorizationAttr('TenantId');
    let queryParam: any = {
      userName: selectedData["userName"],
      mode: "D",
      action: "ADD",
      tenantId: tenId
    };
    routePath = [
      "smb-delegat-space",
      "entry-shell",
      "smb",
      "retail-delegateuserreq-form"
    ].flat();
    console.log(selectedData);
    this._router.navigate(routePath, {
      queryParams: {
        ...queryParam,
      },
    });
    // $event.stopPropagation();
    //   this.selectedData = selectedData;
    //   const fpxModal = new FpxModal();
    //   fpxModal.setComponent(DepConfirmationComponent);
    //   fpxModal.setDisableClose(false);
    //   fpxModal.setPanelClass("dep-alert-popup");
    //   fpxModal.setBackDropClass("dep-popup-back-drop");
    //   fpxModal.setData({
    //     title: "DELETE_DELEGATE_DIALOG.title",
    //     message:"DELETE_DELEGATE_DIALOG.message",
    //     okBtnLbl: "DELETE_DELEGATE_DIALOG.okBtnLbl",
    //     cancelBtnLbl: "DELETE_DELEGATE_DIALOG.cancelBtnLbl",
    //   });
    //   fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    //   this.openModal(fpxModal);

    
   
      }

      contextmenuModelAfterClose: FpxModalAfterClosed = (flag) => {
        console.log("model closed...", flag);
      
        if(flag==1){
          // let userName = this.selectedData.userName;
          // let payload: any = {
          //   userName:userName,
          //   operationMode: "A"
          // }
          // this._delegateservice.deleteDelegate(payload).subscribe((res:any) => {
          //   this._delegateservice.refreshManageDelegate(this.selectedData);
          // });
          this.deleteOnOK();
          // this.triggerSubmit();
        }
        else {
          this.doReverseAction();
        }
      
        
      
    }

      deleteOnOK(){
        let userName = this.selectedData.userName;
          const httpRequest = new HttpRequest();
          httpRequest.setMethod('POST');
          httpRequest.setContextPath('Common');
          httpRequest.setResource('/delegateuserreq');
          httpRequest.addHeaderParamter("serviceCode",'RETAILDELEUSER');
          let bodyContent = {
            "delegateuserreq": {
              "userName": userName,
              "operationMode": 'D',
              "customerName": this.selectedData.customerName,
              "enabled": this.selectedData.enabled,
              "firstName": this.selectedData.firstName,
              "lastName": this.selectedData.lastName,
              "initial": this.selectedData.initial,
              "emailAddress": this.selectedData.emailAddress,
              "mobileNumber": this.selectedData.mobileNumber,
              "address": this.selectedData.address,
              "status": this.selectedData.status,
              "remarks": this.selectedData.remarks,
              "nationality": this.selectedData.nationality,
              "accessLevel": this.selectedData.accessLevel
              }
          };
          httpRequest.setBody(bodyContent);
          this._httpProvider.invokeRestApi(httpRequest).subscribe({
            next:(res:any)=>{
              
              this._router.navigate(['smb-delegat-space', 'entry-shell','smb','smb-confirmation-receipt-form']);          
              
              return res.body || [];

            },
            error: (err: any) => {
            console.log(err);
            }
            
          });

      }


    
    
     modifyRowData($event:any, selectedData: Delegateuser) {
    $event.stopPropagation();
    let routePath;
    let tenId = this.userAuth.getAuthorizationAttr('TenantId');
    let queryParam: any = {
      userName: selectedData["userName"],
      mode: "M",
      action: "ADD",
      tenantId: tenId
    };
    routePath = [
      "smb-delegat-space",
      "entry-shell",
      "smb",
      "retail-delegateuserreq-form"
    ].flat();
    console.log(selectedData);
    this._router.navigate(routePath, {
      queryParams: {
        ...queryParam,
      },
    });
  }

  onClickRowData($event:any, selectedData: Delegateuser) {
    $event.stopPropagation();
    let routePath;
    let tenId = this.userAuth.getAuthorizationAttr('TenantId');
    let queryParam: any = {
      userName: selectedData["userName"],
      mode: "V",
      action: "VIEW",
      tenantId: tenId
    };
    routePath = [
      "smb-delegat-space",
      "display-shell",
      "smb",
      "retail-delegateuserreq-form"
    ].flat();
    console.log(selectedData);
    this._router.navigate(routePath, {
      queryParams: {
        ...queryParam,
      },
    });
  }

  // unFavouriteRowData($event:any, selectedData: Beneficiaries) {
  //   $event.stopPropagation();
  //   let inventoryNumber = this.selectedData.inventoryNumber;
  //   // this.FavouriteBeneficiariesValidator
  //   //   .unFavouriteBeneficiaries(inventoryNumber)
  //   //   .subscribe((res) => {
  //   //     console.log("Response", res)
  //   //   });
  // }

  // onClickFavourite($event:any, selectedData: Beneficiaries) {
  //   $event.stopPropagation();
  //   this.selectedData = selectedData;
  //   const fpxModal = new FpxModal();
  //   fpxModal.setComponent(DepConfirmationComponent);
  //   fpxModal.setDisableClose(false);
  //   fpxModal.setPanelClass("dep-alert-popup");
  //   fpxModal.setBackDropClass("dep-popup-back-drop");
  //   fpxModal.setData({
  //     title: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.confirm",
  //     message:(this.selectedData.isFavourite == "1" ? "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.unFavmessage" : "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.favmessage"),
  //     okBtnLbl: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.okBtnLbl",
  //     cancelBtnLbl: "REMOVE_FAV_TRANSFER_CONFIRM_DIALOG.cancelBtnLbl",
  //   });
  //   fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
  //   this.openModal(fpxModal);
  // }
  getUserName(firstName:string,lastName:string): string{
    return firstName+' '+lastName;
  }

  unFavouriteRowData($event:any, selectedData: Beneficiaries) {
    $event.stopPropagation();
    let inventoryNumber = this.selectedData.inventoryNumber;
    // this.FavouriteBeneficiariesValidator
    //   .unFavouriteBeneficiaries(inventoryNumber)
    //   .subscribe((res) => {
    //     console.log("Response", res)
    //   });
  }

  // contextmenuModelAfterClose: FpxModalAfterClosed = (
  //   payload: any,
  //   addtionalData: any
  // ) => {
  //   console.log("model closed...", payload);
  //   let paymentId = this.selectedData.paymentId;
  //   if (payload == 1 && this.selectedData.isFavourite == "1") {
  //     let inventoryNumber = this.selectedData.inventoryNumber;
  //   //   this.FavouriteBeneficiariesValidator.unFavouriteBeneficiaries(
  //   //     inventoryNumber
  //   //   ).subscribe((res) => {
  //   //     this._beneficiariesService.refreshManageBeneficiary(this.selectedData);
  //   //   });
  //   } else if (payload == 1 && this.selectedData.isFavourite == "0") {
  //     let inventoryNumber = this.selectedData.inventoryNumber;
  //   //   this.FavouriteBeneficiariesValidator.markAsfavouriteBeneficiaries(
  //   //     inventoryNumber
  //   //   ).subscribe((res) => {
  //   //     this._beneficiariesService.refreshManageBeneficiary(this.selectedData);
  //   //   });
  //   } else {
  //     this.doReverseAction();
  //   }
  // };
}

// const routes = {
//   RETAILBENEDOMESTIC: ["transfers", "retail-bene-dom-req"],
//   RETAILBENEINTERNAL: ["transfers", "retail-bene-internal-form"],
//   RETAILBENECC: ["transfers", "retail-bene-cc-req-form"],
//   RETAILBENEINTL: ["transfers", "retail-bene-International-req-form"],
//   RETAILBENECBAED: ["transfers", "retail-beneaedreq-form"],
// };
