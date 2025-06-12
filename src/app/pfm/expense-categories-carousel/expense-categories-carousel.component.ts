import { Component, EventEmitter, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ExpenseCategoriesCarouselHelper, ExpenseCategoriesCarouselState } from './expense-categories-carousel.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-expense-categories-carousel',
  templateUrl: './expense-categories-carousel.component.html',
  styleUrls: ['./expense-categories-carousel.component.scss'],
  providers: [ExpenseCategoriesCarouselHelper]
})
export class ExpenseCategoriesCarouselComponent extends BaseFpxFormComponent<ExpenseCategoriesCarouselHelper, ExpenseCategoriesCarouselState> {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @ViewChild('expenseCategoriesCarousel') expenseCategoriesCarousel!: any;
  @ViewChild('widgetCarousel') widgetCarousel!: any;
  @Output('onSelectCard') onSelectCard:EventEmitter<string> = new EventEmitter();

  slideConfig: any = {
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: false,
  }
  constructor(
    _formBuilder: FormBuilder, 
    _route: Router, 
    @Optional() _controlContainer: ControlContainer,
    _ExpenseCategoriesCarouselHelper: ExpenseCategoriesCarouselHelper,
  ) { 
    super(_formBuilder, _route, _controlContainer, _ExpenseCategoriesCarouselHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('expenseCategoriesMonth', '', [], [], 'change');
  }
  protected override doPostInit(): void {
    // let elwidth=this.expenseCategoriesCarousel.nativeElement.clientWidth;
    // this.widgetCarousel.nativeElement.clientWidth=elwidth;
    this.state.dummyEl = this.expenseCategoriesCarousel;
  }
  onCardChanged(event:any){
    this.onSelectCard.emit(event);
  }
}
