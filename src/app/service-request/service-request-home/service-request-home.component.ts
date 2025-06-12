import { Component, OnInit, ViewChild, inject } from '@angular/core';
import moment from 'moment';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { BaseFpxFunctionality } from '@fpx/core';
import { RetailViewServiceRequestFormComponent } from '../retail-view-service-request-form/retail-view-service-request-form.component';

@Component({
  selector: 'app-service-request-home',
  templateUrl: './service-request-home.component.html',
  styleUrls: ['./service-request-home.component.scss']
})
export class ServicerequestHomeComponent extends BaseFpxFunctionality implements OnInit {
  protected activeTabIndex: number = 0;
  activeTabId = 0;
  notificationsCount: any;

  @ViewChild(RetailViewServiceRequestFormComponent) childForm!: RetailViewServiceRequestFormComponent;


  constructor(
    protected _device: DeviceDetectorService,
    private _router: Router,
    protected _appConfig: AppConfigService
  ) {
    super();
  }

  ngOnInit(): void {


  }

  ngAfterViewInit() {
    if (this._appConfig.hasData('notificationData$')) {
      this._appConfig.getData('notificationData$').observable.subscribe(
        (res: any) => {
          if (res?.action === 'RECEIVEDNOTIFICATIONS') {
            this.notificationsCount = res.notificationsCount;
          }
        }
      );
    }

    this.activeTabIndex = this.getRoutingParam('fromNotificationScreen') ? 1 : 0;

    if (this.activeTabIndex === 0) {
      this.childForm?.retailViewServiceRequestFormHelper.setMsgCriteria();
    } else {
      this.childForm?.retailViewServiceRequestFormHelper.setNotificationCriteria();
    }
  }

  onTabChanged(event: any) {
    if (event.index === 0) {
      this.childForm?.retailViewServiceRequestFormHelper.setMsgCriteria();
    } else {
      this.childForm?.retailViewServiceRequestFormHelper.setNotificationCriteria();
    }
  }

  close() {
    this._router.navigate(['/home'])
  }

  sendMsg() {
    let service = this._appConfig.getServiceDetails("RETAILSERVICEADHOCREQ");
    console.log(service)
    this._router.navigate(service.servicePath);
  }



}