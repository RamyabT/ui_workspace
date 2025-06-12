import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
 import { PfmSummaryService } from 'src/app/pfm/pfm-summary-service/pfm-summary.service';
import { memberchildInfo } from '../fb-summary-service/fb-summary.model';

@Component({
  selector: 'app-member-card-carousel',
  templateUrl: './member-card-carousel.component.html',
  styleUrls: ['./member-card-carousel.component.scss']
})
export class MemberCardCarouselComponent implements OnInit {


   @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
 @Input('memberData') memberData!: any;
  cardData!: memberchildInfo;
  memberlist : any = []
  slideConfig: any = {
    slidesToShow: 1.5, 
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: false,
  }
  slideWidth: number = 202;
  hasContextMenu:boolean=true;
  contextmenuConfig=[true,false,true];
  summary:any=[];
  budgetSummary:any;
  goalsSummary:any;
  count: any;
  countlen: any;
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
  },
  
];
  slideclicked: boolean = false;
  selectedMember: any;
  constructor(
  public appConfig: AppConfigService,
  public pfmSummaryService:PfmSummaryService,
  private _router:Router,
  protected _device : DeviceDetectorService
) {
   }

  ngOnInit(): void {
    this.hasContextMenu=true;      

    
  }

  onCardChanged(event:any){
    this.hasContextMenu=this.contextmenuConfig[event.currentSlide];
   }

  ngAfterViewInit(){
    let activeDepositCarousel:any=this.appConfig.getData('activeDepositCarousel');
    if(activeDepositCarousel){
      setTimeout(()=>{
        this.slickModal.slickGoTo(activeDepositCarousel);
      },100);
    }
    setTimeout(()=>{
      if(this.appConfig.getData('memberData')){
        let memberData = this.appConfig.getData('memberData');
      //   memberData.forEach((child:any, index:any) => {
      //   let colorIndex = index % this.bgColor.length;  
      //   child.cardbgColor = this.bgColor[colorIndex].cardbgColor;
      //   child.progressBg = this.bgColor[colorIndex].progressBg;   
      //   child.progressTrack = this.bgColor[colorIndex].progressTrack; 
      // });
      this.memberlist = memberData;
      this.countlen = this.memberlist?.length;
      }

   },500);
  }

  addChild() {
    let service = this.appConfig.getServiceDetails('RETAILCHILDINFO');
    this._router.navigate(service.servicePath);
  }

  onSlideClick(card: any, index: number) {
   this.slideclicked = true 
   this.selectedMember =  JSON.stringify(card);
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
