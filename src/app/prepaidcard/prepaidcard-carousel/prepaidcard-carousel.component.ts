import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
// import { Creditcard } from 'src/app/credit-cards/creditcard-service/creditcard.model';
// import { PpCard } from '../ppCard-service/ppCard.model';
// import { PrepaidcardService } from '../prepaidcard-service/prepaidcard.service';
import { Prepaidcard } from '../prepaidcard-service/prepaidcard.model';

@Component({
  selector: 'prepaidcard-carousel',
  templateUrl: './prepaidcard-carousel.component.html',
  styleUrls: ['./prepaidcard-carousel.component.scss']
})
export class PrepaidCardCarouselComponent implements OnInit {

  @Input('summary') summary!: Prepaidcard[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard:EventEmitter<Prepaidcard> = new EventEmitter();
  
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
    let index = this.summary.findIndex((obj) => obj.accountNumber == this._activeSpaceInfoService.getAccountNumber());
    console.log("index", index, this._activeSpaceInfoService.getAccountNumber());
    this.slickModal.slickGoTo(index);
  }

  onCarouselInit($event:any){
    
  }

  onCardChanged($event: any){
    let prepaidcard = this.summary[$event.currentSlide];
    this.onSelectCard.emit(prepaidcard);
  }

}
