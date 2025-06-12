import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Debitcard } from '../debitcard-service/debitcard.model';

@Component({
  selector: 'debitcard-carousel',
  templateUrl: './debitcard-carousel.component.html',
  styleUrls: ['./debitcard-carousel.component.scss']
})
export class DebitCardCarouselComponent implements OnInit {

  @Input('summary') summary!: Debitcard[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard:EventEmitter<Debitcard> = new EventEmitter();
  
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
    let debitcard = this.summary[$event.currentSlide];
    this.onSelectCard.emit(debitcard);
  }

}
