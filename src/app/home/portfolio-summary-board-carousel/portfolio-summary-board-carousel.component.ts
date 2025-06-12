import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { BaseFpxFunctionality } from '@fpx/core';
import { AppConfigService } from '@dep/services';
import { PfmSummaryService } from 'src/app/pfm/pfm-summary-service/pfm-summary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-summary-board-carousel',
  templateUrl: './portfolio-summary-board-carousel.component.html',
  styleUrls: ['./portfolio-summary-board-carousel.component.scss']
})
export class PortfolioSummaryBoardCarouselComponent implements OnInit {

  // @Input('summary') summary!: budgetSummary[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard:EventEmitter<string> = new EventEmitter();

  slideConfig: any = {
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    infinite: false,
  }
  slideWidth: number = 230;
  hasContextMenu:boolean=true;
  contextmenuConfig=[true,false,true];
  summary:any=[];
  budgetSummary:any;
  goalSummary:any;
  budgetActions:any[]=[
    {
      id: 'RETAILPFMTRACKBUDGET',
      desc: 'Track Budget'
    },
    {
      id: 'RETAILPFMADDBUDGET',
      desc: 'Add Budget'
    }
  ];
  goalActions:any[]=[
    {
      id: 'RETAILPFMTRACKGOAL',
      desc: 'Track Goal'
    },
    {
      id: 'RETAILPFMADDGOAL',
      desc: 'Add Goal'
    }
  ];
  constructor(
  public appConfig: AppConfigService,
  private _pfmSummaryService:PfmSummaryService,
  private _router: Router
) {
   }

  ngOnInit(): void {
    this.hasContextMenu=true;
    this.fetchSummary();
  }

  onCardChanged(event:any){
    this.hasContextMenu=this.contextmenuConfig[event.currentSlide];
    this.onSelectCard.emit(event);
  }
  ngAfterViewInit(){
    let activeDepositCarousel:any=this.appConfig.getData('activeDepositCarousel');
    if(activeDepositCarousel){
      setTimeout(()=>{
        this.slickModal.slickGoTo(activeDepositCarousel);
      },100);
    }
  }
  fetchSummary(){
    this._pfmSummaryService.fetchPortfolioSummary().subscribe({
      next: (res: any) => {
        let budgetProgress: any = Math.ceil((res.data.budget.onTrack / res.data.budget.totalBudget) * 100);
        let goalProgress: any = Math.ceil((res.data.goals.totalSavedAmount / res.data.goals.totalGoalAmount) * 100);
        this.budgetSummary = {
          title: 'Budget',
          progress: budgetProgress,
          target: res.data.budget.totalBudget,
          achieved: res.data.budget.onTrack,
          actions:this.budgetActions
        };
        this.goalSummary = {
          title: 'Goal',
          progress: goalProgress,
          target: res.data.goals.totalGoalAmount,
          achieved: res.data.goals.totalSavedAmount,
          actions:this.goalActions
        }
      }
    });
  }

  navigateTo(serviceCode:string){
    let service = this.appConfig.getServiceDetails(serviceCode);
    this._router.navigate(service.servicePath);

  }
}

