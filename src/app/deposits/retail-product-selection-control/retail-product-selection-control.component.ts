import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent, CriteriaQuery } from '@fpx/core';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { RetailProductSelectionListControlService } from '../retail-product-selection-list-service/retail-product-selection-list.service';
import { RetailProductSelectionControlHelper } from './retail-product-selection-control.helper';
declare const window: any;

@Component({
  selector: 'app-retail-product-selection-control',
  templateUrl: './retail-product-selection-control.component.html',
  styleUrls: ['./retail-product-selection-control.component.scss'],
  providers : [
    {
      provide : NG_VALUE_ACCESSOR,
      useExisting : forwardRef(() => RetailProductSelectionControlComponent ),
      multi : true
    }
  ]
})

export class RetailProductSelectionControlComponent  extends BaseFpxControlComponent {
  @Input() readMore: boolean = false;
  @Output() emitChanges:EventEmitter <any> = new EventEmitter<  any|null>();
  @Output() emitReadMore:EventEmitter <any> = new EventEmitter<  any|null>();

  slideConfig: any = {
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    infinite: false,
    centerMode: true,
    centerPadding: '24px',
    variableWidth: true
  }

  slideWidth: number = 230;
  data: any;
  currentIndex: number = 0;
  isProductsLoading: boolean = true;
  private _segmentCode: string = "";

  fetchProductsInprogress:boolean = true;

  @Input()
  set segmentCode(scode: string) {
    this._segmentCode = scode;
    this.getProduct();
  }
  get segmentCode() {
    return this._segmentCode;
  }

  constructor(
    controlContainer: ControlContainer, 
    changeDetectorRef: ChangeDetectorRef, 
    private _service : RetailProductSelectionListControlService) {
    super(controlContainer,changeDetectorRef);
   }

  override doPreInit() {
    this.getProduct();
  }

  getProduct() {
    this.currentIndex = 0;
    let criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia("productId:segmentCode", "String", "equals", { searchText: this.segmentCode });
    this._service.findAll(criteriaQuery)().subscribe(
      (res) => {
        this.isProductsLoading = false;
        this.fetchProductsInprogress = false;
        this.selectableList$ = of(res);
        this.data = res;
        this.changeDetectorRef.detectChanges();
        this.currentIndex = 0;
        this.onClickCard(0);
      }
    )
  }


   getData(data: any) {
    setTimeout(() => {
      document.querySelectorAll('.slick-slide').forEach((element,i) => {
        if(element.classList.contains('slick-current')) {
          this.currentIndex = i;
        }
      });
    }, 500);
  }

   showModel(i: any) {
    console.log(i)
    this.readMore = !this.readMore;
    this.emitReadMore.emit();
    this.changeDetectorRef.detectChanges();
  }
  
   onClickCard(id: any) {
    document.querySelectorAll('.slick-slide').forEach((element,i) => {
      if(element.classList.contains('slick-current')) {
        element.classList.add('highlight');
        this.currentIndex = i;
      }
      else element.classList.remove('highlight')
    });
    this.formControl.patchValue(this.data[this.currentIndex].productId.productId,{ emitModelToViewChange: true, emitEvent: true });
    this.changeDetectorRef.detectChanges();
    this.formControl.updateValueAndValidity();
    this.formControl.parent?.updateValueAndValidity();
    this.formControl.markAsTouched();
    this.emitChanges.emit();
  }

  onCardChanged($event: any) {
    this.currentIndex = $event.currentSlide;
    this.onClickCard('');
  }

}
