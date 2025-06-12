import { Injectable } from "@angular/core";
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
  CriteriaQuery,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { ServicerequestlogService } from "../servicerequestlog-service/servicerequestlog.service";
import { DeviceDetectorService } from "@dep/core";
import { BannerAdsService } from "src/app/foundation/banner-ads/banner-ads.service";

export class RetailViewServiceRequestFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  isFavourite: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" },
  };
  disclaimer: any = {
    text: " <div><span>Disclaimer: Lorem Ipsum content needs to be shared by the team</span></div>",
  };
  beneficiaryDetails: any = {
    bankDescription: "",
    branchCode: "",
    bankAddress: "",
  };
  visibilityChange: boolean = false;
  autoComplete: boolean = false;
  totalInquiry: any = '0';
  totalRequest: any = '0';
  totalOffers: any = '0';
  totalStatement: any = '0';
  totalTransaction: any = '0';
  totalMessages: any = '0';
  totalNotifications: any = '0';
  totalReminders: any = '0';
  totalUrgentMsgs: any = '0';
}

@Injectable()
export class RetailViewServiceRequestFormHelper extends BaseFpxFormHelper<RetailViewServiceRequestFormState> {
  accordionOpen: boolean = true;
  shellType: any;
  showMessages = true;
  offersLoaded = false;
  tabsLoaded = false;
  segments: { type: string; count: number }[] = [];
  activeSegmentIndex: number = 0;
  private _gridData: any;
  offerDetails: any;
  displayTab: string = 'messages';

  constructor(
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _servicerequestlogService: ServicerequestlogService,
    public device: DeviceDetectorService,
    private _bannerAdsService: BannerAdsService

  ) {
    super(new RetailViewServiceRequestFormState());
  }

  override doPreInit(): void {
    this.removeShellBtn("BACK");

    if (this.device.isMobile()) {
      let serviceCode = "RETAILMOBDASHBOARD";
      this._bannerAdsService.fetchBannerAds({ serviceCode: serviceCode }).subscribe({
        next: (res: any) => {
          if (this._appConfig.hasData('mailBoxOffersData$')) {
            this._appConfig.getData('mailBoxOffersData$').subject.next({ action: 'RECEIVEDMAILBOXOFFERS', mailBoxOfferData: res });
          }
        }
      });
    }
  }

  getOffersData(shouldConstructMsgGrid = false) {
    if (this._appConfig.hasData('mailBoxOffersData$')) {
      this._appConfig.getData('mailBoxOffersData$').observable.subscribe(
        (offersResult: any) => {
          if (offersResult?.action === 'RECEIVEDMAILBOXOFFERS') {
            this.offerDetails = offersResult?.mailBoxOfferData;
            this.state.totalOffers = this.offerDetails?.length;
            this.state.totalMessages = +this.state.totalInquiry + +this.state.totalRequest + +this.state.totalOffers;
            if (shouldConstructMsgGrid) {
              this.constructMsgGrid();
            } else {
              this.constructNotificationGrid();
            }
          }
        });
    }
  }

  constructMsgGrid() {
    this.activeSegmentIndex = 0;
    this.segments = [
      {
        type: "SERVICEREQUEST.allMessages",
        count: this.state.totalMessages,
      },
      {
        type: "SERVICEREQUEST.generalMsgs",
        count: this.state.totalInquiry,
      },
      {
        type: "SERVICEREQUEST.request",
        count: this.state.totalRequest,
      },
      {
        type: "SERVICEREQUEST.offers",
        count: this.state.totalOffers,
      }
    ]
    this.tabsLoaded = true;
    const criteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia("serviceRequestType", "String", "lessThanEquals", {
      searchText: "2",
    });
    this.showMessages = true;
    this.setGridCriteria("serviceRequest", criteriaQuery);

    if (this._appConfig.hasData('notificationData$')) {
      this._appConfig.getData('notificationData$').subject.next({
        action: 'RECEIVEDNOTIFICATIONS', notificationsCount: {
          totalMessages: this.state.totalMessages,
          totalNotifications: this.state.totalNotifications
        }
      });
    }
  }

  constructNotificationGrid() {
    this.activeSegmentIndex = 0;
    this.segments = [
      {
        type: "SERVICEREQUEST.allNotifications",
        count: this.state.totalNotifications,
      },
      {
        type: "SERVICEREQUEST.financialReminders",
        count: this.state.totalReminders,
      },
      {
        type: "SERVICEREQUEST.urgentMsg",
        count: this.state.totalUrgentMsgs,
      }
    ]
    this.tabsLoaded = true;
    const criteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia("serviceRequestType", "String", "greaterThanEquals", {
      searchText: "5",
    });
    this.setGridCriteria("serviceRequest", criteriaQuery);

    if (this._appConfig.hasData('notificationData$')) {
      this._appConfig.getData('notificationData$').subject.next({
        action: 'RECEIVEDNOTIFICATIONS', notificationsCount: {
          totalMessages: this.state.totalMessages,
          totalNotifications: this.state.totalNotifications
        }
      });
    }
  }

  setMsgCriteria() {
    this.offersLoaded = false;
    this.tabsLoaded = false;
    this._servicerequestlogService.fetchSummary().subscribe({
      next: (res: any) => {
        this.state.totalInquiry = res.totalInquiry;
        this.state.totalTransaction = res.totalTransaction;
        this.state.totalRequest = res.totalRequest;
        this.state.totalStatement = res.totalStatement;
        this.state.totalMessages = res.totalSummary;
        this.state.totalNotifications = res.notifications;
        this.state.totalReminders = res.financialReminder;
        this.state.totalUrgentMsgs = res.urgentMessage;
        this.getOffersData(true);
      }
    });
  }

  setNotificationCriteria() {
    this.offersLoaded = false;
    this.tabsLoaded = false;
    this._servicerequestlogService.fetchSummary().subscribe({
      next: (res: any) => {
        this.state.totalInquiry = res.totalInquiry;
        this.state.totalTransaction = res.totalTransaction;
        this.state.totalRequest = res.totalRequest;
        this.state.totalStatement = res.totalStatement;
        this.state.totalMessages = res.totalSummary;
        this.state.totalNotifications = res.notifications;
        this.state.totalReminders = res.financialReminder;
        this.state.totalUrgentMsgs = res.urgentMessage;
        this.getOffersData(false);
      }
    });
  }

  navToCreateRequest() {
    let serviceCode = "RETAILSERVICEADHOCREQ";
    // let serviceCode = "OTHERREQUEST";
    let service = this._appConfig.getServiceDetails(serviceCode);
    if (service) {
      this._router.navigate(service.servicePath);
    } else {
      console.error("service '" + serviceCode + "' is not configured");
    }
  }
  public dosearchTextChangeHandler: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let searchTextVal = value.toLocaleLowerCase();
    let _data = this._gridData?.filter((rowData: any) =>
      Object.values([
        rowData?.initOn,
        rowData?.subject,
        rowData?.inventoryNumber,
        rowData?.sourceReference,
        rowData?.serviceCategory?.description,
        rowData?.status
      ]).some((val: any) => {
        let txt = "";
        if ((val && typeof val === "string") || typeof val === "number") {
          txt = val.toString().toLocaleLowerCase();
          return txt.includes(searchTextVal);
        } else {
          return false;
        }
      })
    );
    this.setGridData("serviceRequest", _data);
  };
  serviceRequestRoGridEvent($event: any) {
    if ($event.eventName == "afterDataFetch") {
      this._gridData = $event.payload.data;
      this.offersLoaded = true;
      this.showMessages = $event.payload.data.length > 0 ? true : false;
    }
  }
  onClickSegment(i: any, segment: any) {

    this.showMessages = true;
    this.offersLoaded = false;
    this.reset("searchText");
    this.activeSegmentIndex = i;


    if (segment.type === "SERVICEREQUEST.generalMsgs") {
      const criteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia("serviceRequestType", "String", "equals", {
        searchText: "1",
      });
      this.setGridCriteria("serviceRequest", criteriaQuery);
    } else if (segment.type === "SERVICEREQUEST.request") {
      const criteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia("serviceRequestType", "String", "equals", {
        searchText: "2",
      });
      this.setGridCriteria("serviceRequest", criteriaQuery);
    }
    else if (segment.type === "SERVICEREQUEST.financialReminders") {
      const criteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia("serviceRequestType", "String", "equals", {
        searchText: "5",
      });
      this.setGridCriteria("serviceRequest", criteriaQuery);
    } else if (segment.type === "SERVICEREQUEST.urgentMsg") {
      const criteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia("serviceRequestType", "String", "equals", {
        searchText: "6",
      });
      this.setGridCriteria("serviceRequest", criteriaQuery);
    } else if (segment.type === "SERVICEREQUEST.allMessages") {
      const criteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia("serviceRequestType", "String", "lessThanEquals", {
        searchText: "2",
      });
      this.setGridCriteria("serviceRequest", criteriaQuery);
    } else if (segment.type === "SERVICEREQUEST.allNotifications") {
      const criteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia("serviceRequestType", "String", "greaterThanEquals", {
        searchText: "5",
      });
      this.setGridCriteria("serviceRequest", criteriaQuery);
    } else if (segment.type === "SERVICEREQUEST.offers") {
      let modifiedPayload = [];
      if (this.offerDetails?.length > 0 && this.offerDetails !== null) {
        for (let i = 0; i < this.offerDetails.length; i++) {
          let offObj = {
            "sourceReference": this.offerDetails[i]?.contentId,
            "serviceRequestType": {
              "code": "3",
              "description": "",
              "id": "",
              "applicationCode": ""
            },
            "entityCode": "",
            "initOn": this.offerDetails[i]?.createdOn,
            "requestType": "3",
            "serviceCode": "",
            "subject": "",
            "customerCode": "",
            "initBy": "",
            "message": this.offerDetails[i]?.subTitle,
            "offerImage": this.offerDetails[i]?.image,
            "uptdOn": "",
            "userId": "",
            "serviceSubCategory": {
              "subCategory": "",
              "description": "",
              "shortDesc": "",
              "categoryCode": "",
              "enabled": ""
            },
            "flowInstanceId": "",
            "serviceCategory": {
              "adapterCode": "",
              "applnCode": "",
              "description": "",
              "shortDesc": "",
              "categoryCode": "",
              "enabled": ""
            },
            "inventoryNumber": "",
            "applnCode": "",
            "serviceStatus": "",
            "isResolved": "",
            "remarks": "",
            "status": ""
          }
          modifiedPayload.push(offObj)
        }
        this.setGridData('serviceRequest', modifiedPayload)
        this.offersLoaded = true;
      } else {
        this.showMessages = false;
      }
    }
  }
  public handleFormOnLoad() { }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
  }
  public override doPostInit(): void {
    // this.getOffersData();
    this.addValueChangeHandler("searchText", this.dosearchTextChangeHandler);
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
        serviceCode: this.serviceCode,
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode,
        },
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
