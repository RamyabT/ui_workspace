import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
 import { PfmSummaryService } from 'src/app/pfm/pfm-summary-service/pfm-summary.service';
import { FbSummaryService } from '../fb-summary-service/fb-summary.service';
import { CriteriaQuery } from '@fpx/core';
import { TasksService } from '../tasks-service/tasks.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-pending-chores-carousel',
  templateUrl: './pending-chores-carousel.component.html',
  styleUrls: ['./pending-chores-carousel.component.scss']
})
export class PendingChoresCarouselComponent implements OnInit {

@ViewChild('slickModal') slickModal!: SlickCarouselComponent;
 @Input('receivedValue') receivedValue!: any;


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
  summary:any=[];
  budgetSummary:any;
  goalsSummary:any;
  count: any;
  countlen: any;
  pendingcount = "5";
  pendingtaskList: any;
  childrenData: any;
  constructor(
  public _appConfig: AppConfigService,
  public pfmSummaryService:PfmSummaryService,
  protected _device: DeviceDetectorService,
  public _goalService : FbSummaryService,
  public _taskService : TasksService,
  private _router : Router,
  private _fbsummaryservice : FbSummaryService
) {

 

   }

  ngOnInit(): void {    
    this.hasContextMenu=true;
     this.childrenData =  JSON.parse(this._appConfig.getData('childrenData'));
     let accno = this.childrenData?.childAccount;
      if(this.receivedValue == true){
      this.loadchildrentasks(accno);
     }else{
      this.loadrecentchildrentasks();
     }
 
  }

  onCardChanged(event:any){
    this.hasContextMenu=this.contextmenuConfig[event.currentSlide];
    //this.onSelectCard.emit(event);
  }
  ngAfterViewInit(){
    let activeDepositCarousel:any=this._appConfig.getData('activeDepositCarousel');
    if(activeDepositCarousel){
      setTimeout(()=>{
        this.slickModal.slickGoTo(activeDepositCarousel);
      },100);
    }
  }


  loadchildrentasks(accno : any){
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    this._appConfig.setData('childAccNo', accno);
    criteriaQuery.addQueryparam('childAccNo', accno)
    //criteriaQuery.setPageCount(5)
    this._appConfig.setData('taskCount',5);
    this._taskService.findAll(criteriaQuery)().subscribe(
      (res) => {
         if (res?.data) {
          this.pendingtaskList =  res.data;
        }
      }
    );
  }

  loadrecentchildrentasks(){
     this._goalService.fetchtasksummary().subscribe({
      next:(res:any) =>{
         console.log("taskfiveres",res)
        this.pendingtaskList =  res.data.tasks;

        },
      error: (error:any) =>{
  
      }
    })
  }
  
  viewallchores(){
     let service = this._appConfig.getServiceDetails('RETAILFBVIEWCHORE');
    this._router.navigate(service.servicePath);
  }

}
