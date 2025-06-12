import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { BaseFpxFunctionality } from '@fpx/core';
import { AppConfigService } from '@dep/services';
import { PfmSummaryService } from '../pfm-summary-service/pfm-summary.service';

@Component({
  selector: 'app-finance-summary-board-carousel',
  templateUrl: './finance-summary-board-carousel.component.html',
  styleUrls: ['./finance-summary-board-carousel.component.scss']
})
export class financeSummaryBoardCarouselComponent extends BaseFpxFunctionality implements OnInit {

  // @Input('summary') summary!: budgetSummary[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard: EventEmitter<string> = new EventEmitter();

  slideConfig: any = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    infinite: false,
  }
  slideWidth: number = 230;
  hasContextMenu: boolean = true;
  contextmenuConfig = [true, false, true];
  summary: any = [];
  budgetSummary: any;
  goalsSummary: any;
  constructor(
    public appConfig: AppConfigService,
    public pfmSummaryService: PfmSummaryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.hasContextMenu = true;
  }

  onCardChanged(event: any) {
    this.hasContextMenu = this.contextmenuConfig[event.currentSlide];
    this.onSelectCard.emit(event);
  }
  ngAfterViewInit() {
    let activeDepositCarousel: any = this.appConfig.getData('activeDepositCarousel');
    if (activeDepositCarousel) {
      setTimeout(() => {
        this.slickModal.slickGoTo(activeDepositCarousel);
      }, 100);
    }
  }

  onCardEventHandler($event: any) {
    let serviceCode: string = "";
    if ($event.name == 'create') {
      if ($event.data.type == 'budget') {
        serviceCode = "RETAILPFMADDBUDGET";
      } else if ($event.data.type == 'goal') {
        serviceCode = "RETAILPFMADDGOAL";
      }

      let serviceDetails = this.appConfig.getServiceDetails(serviceCode);
      this._angularRouter.navigate(serviceDetails.servicePath);
    }
  }

}

