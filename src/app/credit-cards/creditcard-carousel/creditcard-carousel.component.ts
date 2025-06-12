import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Creditcard } from '../creditcard-service/creditcard.model';

@Component({
  selector: 'creditcard-carousel',
  templateUrl: './creditcard-carousel.component.html',
  styleUrls: ['./creditcard-carousel.component.scss']
})
export class CreditCardCarouselComponent implements OnInit {

  @Input('summary') summary!: Creditcard[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard:EventEmitter<Creditcard> = new EventEmitter();
  
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
    let index = this.summary.findIndex((obj) => obj.cardRefNumber == this._activeSpaceInfoService.getAccountNumber());
    this.slickModal?.slickGoTo(index);
  }

  onCarouselInit($event:any){
    
  }

  onCardChanged($event: any){
    let creditcard = this.summary[$event.currentSlide];
    this.onSelectCard.emit(creditcard);
  }

}
