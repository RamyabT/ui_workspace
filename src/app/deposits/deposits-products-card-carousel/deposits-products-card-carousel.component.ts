import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DepositsSummary } from '../deposits-service/deposits.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { AppConfigService, LanguageService } from '@dep/services';
import { ActiveSpaceInfoService } from '@dep/core';

@Component({
  selector: 'deposits-products-card-carousel',
  templateUrl: './deposits-products-card-carousel.component.html',
  styleUrls: ['./deposits-products-card-carousel.component.scss']
})
export class DepositsProductsCardCarouselComponent implements OnInit {

  @Input('summary') summary!: DepositsSummary[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard:EventEmitter<any> = new EventEmitter();
  initialSelectedCard = -1;

  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  // slideConfig: any = {
  //   slidesToShow: 1, 
  //   slidesToScroll: 1,
  //   dots: true,
  //   arrows: false,
  //   infinite: false,
  // }
  slideConfig: any;
  // hasContextMenu:boolean=true;
  // contextmenuConfig=[true,false,true];
  currentCard: any;
  constructor(
    private _appConfig: AppConfigService,
    private _laguageService: LanguageService) {
   }

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

  // onCardChanged(event:any){
  //   let accoutType = this.summary[event.currentSlide].accountType;
  //   if(accoutType.toLocaleLowerCase() != 'aviso'){
  //     this.hasContextMenu = true;
  //   }
  //   // this.hasContextMenu = this.contextmenuConfig[event.currentSlide];
  //   this.onSelectCard.emit({
  //     event: event,
  //     data: this.summary[event.currentSlide]
  //   });
  // }

  onCardChanged($event: any) {
    let currentSlide = $event.currentSlide;
    if (this.initialSelectedCard !== currentSlide) {
      this.currentCard = this.summary[$event.currentSlide];
      this.onSelectCard.emit(this.currentCard);
      this.initialSelectedCard = currentSlide;
    }
    if (this._appConfig.hasData('showInvestmentSecurites$')) {
      this._appConfig.getData('showInvestmentSecurites$').subject.next({
        showInvestmentSecurites: true,
        depositAccount: this.currentCard.accountNumber
      });
    }
  }

  // ngAfterViewInit(){
  //   let activeDepositCarousel:any=this._appConfig.getData('activeDepositCarousel');
  //   if(activeDepositCarousel){
  //     setTimeout(()=>{
  //       this.slickModal.slickGoTo(activeDepositCarousel);
  //     },100);
  //   }
  // }
  ngAfterViewInit(){
    let index = this.summary.findIndex((obj) => obj.accountNumber == this._activeSpaceInfoService.getAccountNumber());
    console.log("index", index, this._activeSpaceInfoService.getAccountNumber());
    this.slickModal.slickGoTo(index);
  }

}

