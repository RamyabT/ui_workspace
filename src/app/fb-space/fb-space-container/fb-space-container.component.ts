import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BehaviorSubject } from 'rxjs';
import { FbSummaryService } from 'src/app/fb/fb-summary-service/fb-summary.service';
  
@Component({
  selector: 'app-fb-space-container',
  templateUrl: './fb-space-container.component.html',
  styleUrls: ['./fb-space-container.component.scss']
})
export class FbSpaceContainerComponent implements OnInit {

  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;

  protected moduleHeaderTop: number = 0;
  memberlist: any = [];
  selectedStatus : any ; 
  receivedData: any;
  seekingResponse: boolean = true;
  balancesheet: any;
  dashBoardSummary: any;
  bgColor: any =   [{
    cardbgColor : "#1C6EB8",
    progressBg : "#3588D3",
    progressTrack : "#0F497F"
  },{
    cardbgColor : "#CC3D7D",
    progressBg : "#EF569A",
    progressTrack : "#A52760"
  }
  ,{
    cardbgColor : "#FF6F61",
    progressBg : "#FFC0BA",
    progressTrack : "#A9544C"
  },{
    cardbgColor : "#1C6EB8",
    progressBg : "#3588D3",
    progressTrack : "#0F497F"
  },{
    cardbgColor : "#CC3D7D",
    progressBg : "#EF569A",
    progressTrack : "#A52760"
  }]
 
  constructor(protected _device: DeviceDetectorService, private _appConfig: AppConfigService, private _router: Router,private _goalService : FbSummaryService) { }

  ngOnInit(): void {
    this.getDashboardSumarry();

  }
 

  ngAfterViewInit() {
    setTimeout(() => {
      this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop);
    });
 
  }


 


  getDashboardSumarry(){
    this.seekingResponse = true;
    this._goalService.fetchDashboadSummary().subscribe({
      next: (res:any) =>{
        console.log("dashboardres",res)
        this.dashBoardSummary = res.data.childSummary;
        this.memberlist = res.data.childSummary.childInfo;
        this.memberlist.forEach((child:any, index:any) => {
          let colorIndex = index % this.bgColor.length;  
          child.cardbgColor = this.bgColor[colorIndex].cardbgColor;
          child.progressBg = this.bgColor[colorIndex].progressBg;   
          child.progressTrack = this.bgColor[colorIndex].progressTrack; 
        });
        this.seekingResponse = false;
        const dataToSend = this.memberlist;  
           this._appConfig.setData('memberData' ,this.memberlist);

        },
      error: (error:any) =>{
        this.seekingResponse = false;
      }
    })

    let fbActionPublisher$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
        this._appConfig.setData('fbActionPublisher$', {
          "observable": fbActionPublisher$.asObservable(),
          "subject": fbActionPublisher$
        });
  }


  addChild() {
    let service = this._appConfig.getServiceDetails('RETAILCHILDINFO');
    this._router.navigate(service.servicePath);
  }

}
