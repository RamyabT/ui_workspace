import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality } from '@fpx/core';
import { NpssCustomerStatus, NpssMainService } from 'src/app/npss/npss-service/npss-main.service';

@Component({
  selector: 'app-npss-home',
  templateUrl: './npss-home.component.html',
  styleUrls: ['./npss-home.component.scss']
})
export class NpssHomeeComponent extends BaseFpxFunctionality implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);
  protected npssDetails: any = undefined;
  npssDisabled: boolean = false;


  constructor(private _router: Router,
    private _device: DeviceDetectorService,
    private _npssMainService: NpssMainService
  ) { 
    super();
  }

  ngOnInit(): void {
    if(!this._device.isMobile()){
      let isNpssDisabled = this._appConfig.getData('npssDisable');
      if(isNpssDisabled){
        this.showSpinner();
        this._npssMainService.fetchNpssUserStaus().subscribe({
          next: (res: NpssCustomerStatus) => {
            this.hideSpinner();
            this.npssDetails = res;
            this._appConfig.setData('npssDetails', res);
            this._appConfig.setData('senderMobileNumber',this.npssDetails.customerDetails?.mobileNumber);
            if(res.status == 'NR' || res.status == 'I'){
              this._router.navigate(['npss-space','npss', 'npss-get-start']);
            } else {
              this._appConfig.getData('npssModuleRefresh$').subject.next({event: "ENTROL_SUCCESS"});
            }
          },
          error: (err:any) => {
            this.hideSpinner();
            console.log("Fetch npss user status error");
          }
        });

        return;
      }
    }
    
    let res = this._appConfig.getData('npssDetails');
    if(res.status == 'NR' || res.status == 'I'){
      if(this._device.isMobile()) {
        this._router.navigate(['npss-space', 'display-shell', 'npss', 'npss-get-start']);
      }
      else {
        this._router.navigate(['npss-space','npss', 'npss-get-start']);
      }
    }
    else {
      let service = this._appConfig.getServiceDetails('NPSSMANAGEACCOUNTS');
      this._router.navigate(service.servicePath);
    }

  }

}
