import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal,
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, CustomFileUploadService, UserAuthService } from "@dep/services";
import { RetailServiceRequestDetailsFormComponent } from "../retail-service-request-details-form/retail-service-request-details-form.component";
import { RetailCreateServiceRequestFormComponent } from "../retail-create-service-request-form/retail-create-service-request-form.component";
import { workflowHistoryService } from "../workflow-history-service/workflow-history.service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { ServicerequestattachmentService } from "../servicerequestattachment-service/servicerequestattachment.service";
import { ServicerequestlogService } from "../servicerequestlog-service/servicerequestlog.service";

export class RetailServiceRequestTrackerFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  isFavourite: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" }
  }
  disclaimer: any = {
    text: " <div><span>Disclaimer: Lorem Ipsum content needs to be shared by the team</span></div>"
  }
  beneficiaryDetails: any = {
    bankDescription: "",
    branchCode: "",
    bankAddress: ""
  }
  visibilityChange: boolean = false;
  autoComplete: boolean = false;
  requestDetails: any;
  requestDetailsHistory: any;
  serviceReqComments: any;
  userId: any;
  commentsAllowed: boolean = true;
  defaultStages = [
    {
      'id': 0,
      'stageName': "Initiated"
    },
    {
      'id': 1,
      'stageName': "Inprogress"
    }, {
      'id': 2,
      'stageName': "Completed"
    }
  ]
}


@Injectable()
export class RetailServiceRequestTrackerFormHelper extends BaseFpxFormHelper<RetailServiceRequestTrackerFormState> {

  accordionOpen: boolean = true;
  shellType: any;
  segments: { type: string; count: number }[] = [];
  activeSegmentIndex: number = 0;
  messageInbox: any = {
    "servicerequestattachment": [
      {
        "serviceRequestNumber": "21136612",
        "stage": "New",
        "messageContent": "We have received your request. Your reference number is 4657834, and it will be addressed by November.",
        "updatedOn": "2024-10-17 06:03:42",
        "commentedBy": "U00015702",
        "applnCode": "DEPRETAIL",
        "servicereqcommentsattachement": [
          {
            "docInvNumber": "20240308112539014604",
            "serialNo": 0,
            "fileName": "Docreq.pdf"
          }
        ]
      },
      {
        "serviceRequestNumber": "21136612",
        "stage": "New",
        "messageContent": "We have received your request. Your reference number is 4657834, and it will be addressed by November.",
        "updatedOn": "2024-10-17 06:03:42",
        "commentedBy": "U8410101",
        "applnCode": "DEPRETAIL",
        "servicereqcommentsattachement": [
          {
            "docInvNumber": "20240308112539014604",
            "serialNo": 0,
            "fileName": "Docreq.pdf"
          }
        ]
      },
      {
        "commentedByName": "Karthi raja",
        "inventoryNumber": "20241107104225021301",
        "serviceRequestNumber": "20241111174824066657",
        "stage": "In progress",
        "applnCode": "DEPRETAIL",
        "tenantId": "10001",
        "updatedOn": "2024-11-11 18:02:02",
        "commentedBy": "U00015702",
        "messageContent": "We have received your request. Your reference number is 4657834, and it will be addressed by November 28."
      }
    ]
  }
  showScreen: string = '';

  groupedMsgs: any = [];

  private _gridData: any;
  inventoryNumber: any;
  hideElement: boolean = false;



  constructor(
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _workflowHistoryService: workflowHistoryService,
    private _activeSpace: ActiveSpaceInfoService,
    private _serviceReqAttachmentService: ServicerequestattachmentService,
    private _userAuthService: UserAuthService,
    private _fileUploadService: CustomFileUploadService,
    private _serviceRequestlogService: ServicerequestlogService,
    public _device: DeviceDetectorService,
  ) {
    super(new RetailServiceRequestTrackerFormState());
  }

  override doPreInit(): void {
    this.removeShellBtn("BACK");
    let sourceReference = this.getRoutingParam('sourceReference');
    this.inventoryNumber = this.getRoutingParam('sourceReference');
    this.state.requestDetails = this._appConfig.getData('serviceRequestDetails');
    let status = this.state.requestDetails.status.toLowerCase();
    if (status == 'completed' || status == 'rejected') {
      this.state.commentsAllowed = false;
    }
    let loginInfo: any = this._userAuthService.getLoginUserInfo();
    this.state.userId = loginInfo.authorization_details?.[0].UserId;
    this._workflowHistoryService.fetchWorkflowHistory(sourceReference).subscribe({
      next: (res: any) => {

        if (res.body !== null) {
          let workflowDetails = [...res.body?.workflowHistory];
          this._appConfig.setData('serviceRequestDetailsHistory', workflowDetails);


          if (res.body?.workflowHistory.length === 1) {
            res.body?.workflowHistory.push(
              {
                "stage": "",
                "actionOnDate": "",
                "actionBy": "",
                "action": "InProgress",
                "actionOnTime": "",
                "actionOn": ""
              },
              {
                "stage": "",
                "actionOnDate": "",
                "actionBy": "",
                "action": "Completed",
                "actionOnTime": "",
                "actionOn": ""
              }
            )
          } else if (res.body?.workflowHistory.length === 2) {
            res.body?.workflowHistory.push({
              "stage": "",
              "actionOnDate": "",
              "actionBy": "",
              "action": "Completed",
              "actionOnTime": "",
              "actionOn": ""
            })
          }
          this.state.requestDetailsHistory = res.body?.workflowHistory;
        }
      }
    })
    this.fetchServiceRequestComments();
  }
  downloadFile(file: any) {
    this._fileUploadService.download(file.docInvNumber).subscribe({
      next: (res: any) => {
        console.log(res);
      }
    });
  }
  fetchServiceRequestComments() {
    let criteriaQuery = new CriteriaQuery();
    criteriaQuery.addQueryparam('serviceRequestNumber', this.state.requestDetails.sourceReference);
    criteriaQuery.addSortCriteria('updatedOn', 'asc', 'Timestamp');

    criteriaQuery.setPaginationCriteria('1', 50)

    this._serviceReqAttachmentService.findAll(criteriaQuery)().subscribe({
      next: (res: any) => {
        this.state.serviceReqComments = res.data;
        // this.state.serviceReqComments.map((comment:any)=>{
        //   return{
        //     ...comment,
        //     myComment:(comment.commentedBy==this.state.userId)?true:false
        //   };
        // });
        this.state.serviceReqComments.forEach((element: any) => {
          element.myComment = element.commentedBy == this.state.userId;
        });

        let rowData: any = [];
        let _date = "";
        if (this.state.serviceReqComments) {
          this.state.serviceReqComments.forEach((element: any) => {
            let dateStr = new Date(element.updatedOn).toDateString();
            if (_date != dateStr) {
              _date = dateStr;
              let rowGroup: any = {
                rowGroupTitle: _date
              }
              rowData.push(rowGroup);
            }
            rowData.push(element);
          })
        }
        this.groupedMsgs = rowData;

        for (let i = 0; i < this.groupedMsgs.length; i++) {
          if (this.groupedMsgs[i].rowGroupTitle === "") {
            this.groupedMsgs.splice(i, 1)
          }
        }

      }
    })

  }
  showDetails() {
    let serviceCode = this.state.requestDetails.serviceCode;
    let service = JSON.parse(JSON.stringify(this._appConfig.getServiceDetails(serviceCode)));
    service.servicePath.splice(0, 1, 'service-request-space');
    let servicePath = service.servicePath.map((path: string) => { return path.replace('entry-shell', 'display-shell') });
    if (servicePath) {
      this._router.navigate(servicePath, {
        queryParams: {
          inventoryNumber: this.inventoryNumber,
          mode: "V",
          action: 'VIEW',
          routeFrom: 'otherModule'
        }
      });
      setTimeout(() => {
        // this._activeSpace.setActiveSpace('service-request-space');
        this._activeSpace.setActiveModule('servicerequest');
      }, 1000);
    } else {
      console.error("service '" + serviceCode + "' is not configured");
    }
    // let modal = new FpxModal();
    // // modal.setComponent(RetailServiceRequestDetailsFormComponent);
    // modal.setComponent(RetailCreateServiceRequestFormComponent);
    // modal.setPanelClass('dep-info-popup');
    // modal.setDisableClose(false);
    // modal.setData({
    //   title: "Service Request Details"
    // });
    // this.openModal(modal);
  }
  public handleFormOnLoad() {
  }

  cancelReq() {
    this._serviceRequestlogService.stopProcess(this.state.requestDetails.sourceReference.toString()).subscribe((res) => {
      if (res.status === 200) {
        this.state.requestDetails.status = "Cancelled"
      }
    })
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE


  }
  public override doPostInit(): void {
    this.showScreen = this.getRoutingParam('screen');

    if (this.state.requestDetails.serviceRequestType.code === '3' || this.state.requestDetails.serviceRequestType.code === '5' || this.state.requestDetails.serviceRequestType.code === '6') {
      this.hideElement = true;
    } else this.hideElement = false;
    
    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: any) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }



  public handleFormOnPostsubmit(response: any, routingInfo: any) {

    return response;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.beneaedreq;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode,
        }
      });
    }
    return routingInfo;
  }

  goBack() {
    if (this.showScreen === 'notification') {
      this._router.navigate(['service-request-space/servicerequest'], { queryParams: { fromNotificationScreen: true } })
    } else this._router.navigate(['service-request-space/servicerequest'])

  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


