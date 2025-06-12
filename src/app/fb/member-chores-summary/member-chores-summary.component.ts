import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality } from '@fpx/core';
import { FbSummaryService } from '../fb-summary-service/fb-summary.service';
 
@Component({
  selector: 'app-member-chores-summary',
  templateUrl: './member-chores-summary.component.html',
  styleUrls: ['./member-chores-summary.component.scss']
})
export class MemberChoresSummaryComponent extends BaseFpxFunctionality implements OnInit {
 

 
    strokeDashoffset: any;
    progress: any;
  completedstatus: any;
  totalGoal: any;
  goalData: any;
  goalDataDisplay: boolean = false;
  pendingtaskList: any;
  totalChore: any;
  onTrack: any;
  choreDataDisplay: boolean = false;
  childrenData: any;
    
    constructor(
       private _router: Router,
       public appConfig: AppConfigService,
       private _goalService : FbSummaryService
    ) { 
      super();

    }
  
    ngOnInit(): void {

      this.childrenData =  JSON.parse(this.appConfig.getData('childrenData'));
 
       if(this.childrenData?.totalTasks && this.childrenData?.totalTasks != "0"){
        this.choreDataDisplay = true
      }else{
        this.choreDataDisplay = false
      }  

    
      this.totalChore =  this.childrenData?.totalTasks;
      this.onTrack =   this.childrenData?.totalPendingTasks;
     let  decimalPercentage = ((this.onTrack/this.totalChore) * 100);
     this.progress =   Math.ceil(decimalPercentage); 
      this.setProgress(this.progress);
    
     }
    setProgress(percent:any) {
      const circumference = 2 * Math.PI * 40;  
  
      const offset:any = circumference - (percent / 100) * circumference;
      this.strokeDashoffset = offset;  
    }
    takeAction(id:any){
      let servicePath:any = this.appConfig.getServiceDetails(id).servicePath;
        this._router.navigate(servicePath);
    }

 
    ngAfterViewInit(){
    }

 
    addchores(){
      let service = this.appConfig.getServiceDetails('RETAILTASKINFO');
      this._router.navigate(service.servicePath);
    }

    viewchores(){
      let service = this.appConfig.getServiceDetails('RETAILFBVIEWCHORE');
      this._router.navigate(service.servicePath);
     }
     

}

