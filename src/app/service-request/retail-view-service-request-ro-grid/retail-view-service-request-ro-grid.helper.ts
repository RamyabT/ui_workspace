import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseFpxRoGridHelper,
  BaseFpxRoGridHandleAction,
  ToolBar,
  GridTransformFn,
  ToolGroup,
  Tools,
  HttpRequest,
  HttpProviderService,
  CriteriaQuery,
} from "@fpx/core";
import { Servicerequestlog } from '../servicerequestlog-service/servicerequestlog.model';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailViewServiceRequestRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    public appConfigService: AppConfigService) {
    super();
    this.addHandleActions('onclick', this.retailViewServiceRequestRoGridView);
    this.addHandleActions('modify', this.retailViewServiceRequestRoGridModify);
    this.addHandleActions('add', this.retailViewServiceRequestRoGridEntry);
  }

  displayTab: string = "";
  offerData: any;
  messagesOffersGroupedData: any;

  public getGridColumnWidth(): number[] {
    return [3,];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    toolBar.push({ type: 'icon', key: 'add', name: 'add', hoverText: 'Add ' });
    toolBar.push({ type: 'icon', key: 'edit', name: 'modify', hoverText: 'Modify ' });
    toolBar.push({ type: 'icon', key: 'refresh', name: 'refresh', hoverText: 'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    return _isSortSearch;
  }


  private retailViewServiceRequestRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: any
  ) => {
    //WRITE YOUR CODE HERE 

    let showScreen = "";

    if (data.serviceRequestType.code === "1") {
      showScreen = "inbox"
    } else if (data.serviceRequestType.code === "2") {
      showScreen = "tracker"
    } else if (data.serviceRequestType.code === "3") {
      showScreen = "offer"
    } else if (data.serviceRequestType.code === "5" || data.serviceRequestType.code === "6") {
      showScreen = "notification"
    }

    let requestDetails: any = {
      category: data.serviceCategory.description,
      subject: data.subject,
      sourceReference: data.sourceReference,
      status: data.status,
      date: data.initOn,
      serviceCode: data.serviceCode,
      serviceRequestType: data.serviceRequestType,
      serviceSubCategory: data.serviceSubCategory,
      message: data.message,
      offerImage: data?.offerImage
    }


    this.appConfigService.setData('serviceRequestDetails', requestDetails);
    this._router.navigate(["service-request-space",
      "display-shell",
      "service-request",
      "service-request-tracker"], {
      queryParams: {
        screen: showScreen,
        sourceReference: data.sourceReference,
        inventoryNumber: data.inventoryNumber
      }
    });
  };
  private retailViewServiceRequestRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Servicerequestlog
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailViewServiceRequestRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Servicerequestlog
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;

  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    this.initialLoad = false;
    this.setNgTemplateName('mailboxMessagesTmplt');
    this.setNgTemplateClass('view-service-request-tmplt');
  }


  override doPostInit(): void {
  }
  override postFindallInterceptor = (payload: any) => {

    let modifiedPayload = payload;

    if (payload.criteriaQuery._filterCriteria[0].searchType === 'lessThanEquals' && payload.criteriaQuery._paginationCriteria.Offset === '1') {
      if (this.appConfigService.hasData('mailBoxOffersData$')) {
        this.appConfigService.getData('mailBoxOffersData$').observable.subscribe(
          (res: any) => {
            if (res?.action === 'RECEIVEDMAILBOXOFFERS' && res.mailBoxOfferData !== null && res.mailBoxOfferData.length > 0) {
              this.offerData = res;

              for (let i = 0; i < res.mailBoxOfferData.length; i++) {
                let offObj = {
                  "sourceReference": res.mailBoxOfferData[i]?.contentId,
                  "serviceRequestType": {
                    "code": "3",
                    "description": "",
                    "id": "",
                    "applicationCode": ""
                  },
                  "entityCode": "",
                  "initOn": res.mailBoxOfferData[i]?.createdOn,
                  "requestType": "3",
                  "serviceCode": "",
                  "subject": "",
                  "customerCode": "",
                  "initBy": "",
                  "message": res.mailBoxOfferData[i]?.subTitle,
                  "offerImage": res.mailBoxOfferData[i]?.image,
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
                modifiedPayload.data.push(offObj)
              }

              this.gridOutputEvent.next({
                name: 'afterDataFetch',
                payload: modifiedPayload
              });
            } else {
              this.gridOutputEvent.next({
                name: 'afterDataFetch',
                payload: modifiedPayload
              });
            }
          }
        );
        return modifiedPayload;
      } else {
        this.gridOutputEvent.next({
          name: 'afterDataFetch',
          payload: payload
        });
        return payload;
      }
    } else {
      this.gridOutputEvent.next({
        name: 'afterDataFetch',
        payload: payload
      });
      return payload;
    }
  }

}




