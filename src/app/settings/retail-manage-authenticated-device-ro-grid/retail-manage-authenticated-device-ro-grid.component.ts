import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailManageAuthenticatedDeviceRoGridHelper } from './retail-manage-authenticated-device-ro-grid.helper';
import { UserdeviceService } from '../userdevice-service/userdevice.service';
import { Userdevice } from '../userdevice-service/userdevice.model';

@Component({
 selector: 'app-retail-manage-authenticated-device-ro-grid',
  templateUrl: './retail-manage-authenticated-device-ro-grid.component.html',
  styleUrls: ['./retail-manage-authenticated-device-ro-grid.component.scss'],
   providers : [ RetailManageAuthenticatedDeviceRoGridHelper]
 })
export class RetailManageAuthenticatedDeviceRoGridComponent extends BaseFpxROGridComponent< Userdevice, RetailManageAuthenticatedDeviceRoGridHelper> {
 constructor(
    protected retailManageAuthenticatedDeviceRoGridHelper: RetailManageAuthenticatedDeviceRoGridHelper,
    protected userdeviceService: UserdeviceService
  ) {
    super(retailManageAuthenticatedDeviceRoGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.userdeviceService);
    this.setGridTitle('RetailManageAuthenticatedDeviceRoGrid.title');
  }
}
