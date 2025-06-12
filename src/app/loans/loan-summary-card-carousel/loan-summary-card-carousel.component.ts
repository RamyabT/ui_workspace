import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Loans } from '../loans-service/loans.model';

@Component({
  selector: 'loan-summary-card-carousel',
  templateUrl: './loan-summary-card-carousel.component.html',
  styleUrls: ['./loan-summary-card-carousel.component.scss']
})
export class LoanSummaryCardCarouselComponent implements OnInit {

  @Input('summary') summary!: Loans[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard:EventEmitter<Loans> = new EventEmitter();
  
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  slideConfig: any = {
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: false,
  }

  constructor(
    private _appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    let index = this.summary.findIndex((obj) => obj.loanAccountNumber == this._activeSpaceInfoService.getAccountNumber());
    console.log("index", index, this._activeSpaceInfoService.getAccountNumber());
    this.slickModal.slickGoTo(index);
  }

  onCarouselInit($event:any){}

  onCardChanged($event: any){
    let currentCard = this.summary[$event.currentSlide];
    this.onSelectCard.emit(currentCard);
  }

}
