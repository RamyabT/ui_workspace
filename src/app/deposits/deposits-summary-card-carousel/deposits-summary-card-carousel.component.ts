import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'deposits-summary-card-carousel',
  templateUrl: './deposits-summary-card-carousel.component.html',
  styleUrls: ['./deposits-summary-card-carousel.component.scss']
})
export class DepositsSummaryCardCarouselComponent implements OnInit {

  @Input('summary') summary:any;

  slideConfig: any = {
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: false,
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  onCardChanged($event:any){

  }

}
