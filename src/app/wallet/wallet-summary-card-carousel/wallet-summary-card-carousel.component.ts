import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService, LanguageService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { wallet } from '../wallet-summary-service/walletsummary.model';
import { WalletsummaryService } from '../wallet-summary-service/walletsummary.service';

@Component({
  selector: 'app-wallet-summary-card-carousel',
  templateUrl: './wallet-summary-card-carousel.component.html',
  styleUrls: ['./wallet-summary-card-carousel.component.scss']
})
export class WalletSummaryCardCarouselComponent implements OnInit {

  @Input('summary') summary!: wallet[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard:EventEmitter<any> = new EventEmitter();
  
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  slideConfig: any;

  constructor(
    private _appConfig: AppConfigService,
    private _laguageService: LanguageService,
    private _walletService : WalletsummaryService
  ) { }

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: 1, 
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: false,
      rtl: this._laguageService.isRtl
    }
  }

  ngAfterViewInit(){
    let index = this.summary.findIndex((obj) => obj.walletAccountNumber == this._activeSpaceInfoService.getAccountNumber());
    console.log("index", index, this._activeSpaceInfoService.getAccountNumber());
    this.slickModal.slickGoTo(index);
  }

  onCarouselInit($event:any){}

  onCardChanged($event: any){
    let currentCard = this.summary[$event.currentSlide];
    this.onSelectCard.emit(currentCard);
    console.log("walletcurrentCard",currentCard)
    this._appConfig.setData('walletID' ,currentCard?.walletId);
    this._walletService.walletSummaryLoad$.next("load");
  }



}