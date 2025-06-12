import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService, LanguageService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';

@Component({
  selector: 'casa-summary-card-carousel',
  templateUrl: './casa-summary-card-carousel.component.html',
  styleUrls: ['./casa-summary-card-carousel.component.scss']
})
export class CasaSummaryCardCarouselComponent implements OnInit {

  @Input('summary') summary!: Casaaccount[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard:EventEmitter<any> = new EventEmitter();
  @Input('payFromLabel') payFromLabel!: string;

  initialSelectedCard: number = -1;

  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  slideConfig: any;

  constructor(
    private _appConfig: AppConfigService,
    private _laguageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: 1, 
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: true,
      rtl: this._laguageService.isRtl,
    }
  }

  ngAfterViewInit(){
    let index = this.summary.findIndex((obj) => obj.accountNumber == this._activeSpaceInfoService.getAccountNumber());
    console.log("index", index, this._activeSpaceInfoService.getAccountNumber());
    this.slickModal.slickGoTo(index);
  }

  onCarouselInit($event:any){}

  onCardChanged($event: any) {
    let currentSlide = $event.currentSlide;
    console.log("currentSlide", currentSlide);
    if (this.initialSelectedCard !== currentSlide) {
      let currentCard = this.summary[$event.currentSlide];
      this.onSelectCard.emit(currentCard);
      this.initialSelectedCard = currentSlide;
    }
    console.log("initialSelectedCard", this.initialSelectedCard);
  }

}
