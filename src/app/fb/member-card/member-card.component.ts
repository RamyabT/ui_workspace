import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality } from '@fpx/core';
import { FbSummaryService } from '../fb-summary-service/fb-summary.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent extends BaseFpxFunctionality implements OnInit {
@Input('cardData') cardData!: any;
  strokeDashoffset: any;
  progress: string='';
  membernamefirstletter: any;
  childerAccNum: any;
  progresspercentage: any;
  memberimg  : boolean = false;
  selectedMember: any;
  constructor(
     private _router: Router,
     public appConfig: AppConfigService,
     protected _device : DeviceDetectorService, private _fbsummaryservice : FbSummaryService
  ) { 
    super();
  }

  ngOnInit(): void {
    let totaltasks = this.cardData?.totalTasks;
    let totalPendingtasks = this.cardData?.totalPendingTasks;
     this.progresspercentage = Number((totalPendingtasks / totaltasks) * 100);
     console.log("this.progresspercentage",this.progresspercentage)
    this.setProgress(this.progresspercentage);
    this.membernamefirstletter = this.cardData?.childNickName?.substring(0,2)    
  }


    setProgress(percent:any) {
    const circumference = 2 * Math.PI * 40; 

    const offset:any = circumference - (percent / 100) * circumference;
    this.strokeDashoffset = offset;  
    // this.progress = percent + "%"; // Update text
  }
  takeAction(id:any){
    let servicePath:any = this.appConfig.getServiceDetails(id).servicePath;
      this._router.navigate(servicePath);
  }

  membercardClicked(){
    console.log("getDeviceInfo()",this._device.isMobile())
    if(this._device.isMobile() == true){
      let service = this.appConfig.getServiceDetails('RETAILFBCHILDDASHBOARD');
      this._router.navigate(service.servicePath);
    }else{
      let service = this.appConfig.getServiceDetails('RETAILFBCHILDDASHBOARDDESKTOP');
      this._router.navigate(service.servicePath);
    }
  }

  radioChange(cardData : any){
       this.selectedMember =  JSON.stringify(cardData);
   this.appConfig.setData('childrenData' ,this.selectedMember);    
   if(this._device.isMobile() == true){
    let service = this.appConfig.getServiceDetails('RETAILFBCHILDDASHBOARD');
    this._router.navigate(service.servicePath);
  }else{
    let service = this.appConfig.getServiceDetails('RETAILFBCHILDDASHBOARDDESKTOP');
    this._router.navigate(service.servicePath);
  }
  }

}
