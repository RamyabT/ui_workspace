import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { FbSummaryService } from '../fb-summary-service/fb-summary.service';
  
@Component({
  selector: 'app-childer-goal-summary-carousel',
  templateUrl: './childer-goal-summary-carousel.component.html',
  styleUrls: ['./childer-goal-summary-carousel.component.scss']
})
export class ChilderGoalSummaryCarouselComponent implements OnInit {

   @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  pendinggoals: any = [{
    title: "Goals",
    actions: "goal",
    progress: "40",
    totalgoal: "10",
    ontrack: "4",
    viewlbl : "View Goals",
    addlbl : "Add Goals",
    totallabel : "Total Goals"
  }, {
    title: "Chores",
    actions: "chores",
    progress: "60",
    totalgoal: "12",
    ontrack: "6",
    viewlbl : "View Chores",
     addlbl : "Add Chores",
     totallabel : "Total Chores"
  },] ;

  slideConfig: any = {
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: false,
  }
  slideWidth: number = 202;
  hasContextMenu:boolean=true;
  contextmenuConfig=[true,false,true];
  childrenData: any;
  goals: any;
  constructor(  public appConfig: AppConfigService , private _goalService : FbSummaryService) { }

  ngOnInit(): void {
    this.hasContextMenu=true;
  
  }

  onCardChanged(event:any){
    this.hasContextMenu=this.contextmenuConfig[event.currentSlide];
    //this.onSelectCard.emit(event);
  }
  ngAfterViewInit(){
    let activeDepositCarousel:any=this.appConfig.getData('activeDepositCarousel');
    if(activeDepositCarousel){
      setTimeout(()=>{
        this.slickModal.slickGoTo(activeDepositCarousel);
      },100);
    }
  }

}
