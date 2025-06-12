import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, CriteriaQuery } from '@fpx/core';
import { FbSummaryService } from '../fb-summary-service/fb-summary.service';
import { GoalsService } from '../goals-service/goals.service';
  
@Component({
  selector: 'app-member-goals',
  templateUrl: './member-goals.component.html',
  styleUrls: ['./member-goals.component.scss']
})
export class MemberGoalsComponent extends BaseFpxFunctionality implements OnInit {
strokeDashoffset: any;
progress: any;
completedStatus: any;
totalGoal: any;
goalData: any;
goalDataDisplay: boolean = false;
pendingStatus: any;
childrenData: any;
completedGoal: any;
    
    constructor(
       private _router: Router,
       public _appConfig: AppConfigService,
       private _goalService : GoalsService
    ) { 
      super();
    }
    
    ngOnInit(): void {
      this.childrenData =  JSON.parse(this._appConfig.getData('childrenData'));
      console.log("this.childrenDatagoal",this.childrenData)
      if(this.childrenData?.totalGoals && this.childrenData?.totalGoals != "0"){
       this.goalDataDisplay = true
     }else{
       this.goalDataDisplay = false
     }  
     this.totalGoal =  this.childrenData?.totalGoals;
     this.completedGoal =   this.childrenData?.totalCompletedGoals;
     let  decimalPercentage = ((this.completedGoal/this.totalGoal) * 100);
     this.progress =   Math.ceil(decimalPercentage); 
     this.setProgress(this.progress);
    }

    setProgress(percent:any) {
      const circumference = 2 * Math.PI * 40;  
      const offset:any = circumference - (percent / 100) * circumference;
      this.strokeDashoffset = offset;  
     }

    takeAction(id:any){
      let servicePath:any = this._appConfig.getServiceDetails(id).servicePath;
        this._router.navigate(servicePath);
    }

    addgoal(){
       let service = this._appConfig.getServiceDetails('RETAILGOALINFO');
      this._router.navigate(service.servicePath);
    }
    
    viewgoal(){
      let service = this._appConfig.getServiceDetails('RETAILFBVIEWGOAL');
      this._router.navigate(service.servicePath);
    }
 

}
