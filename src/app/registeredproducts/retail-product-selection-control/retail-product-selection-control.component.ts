import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent, CriteriaQuery } from '@fpx/core';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { RetailProductSelectionListControlService } from '../retail-product-selection-list-service/retail-product-selection-list.service';
import { RetailProductSelectionControlHelper } from './retail-product-selection-control.helper';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { AppConfigService } from '@dep/services';
import { DepositProductsService } from 'src/app/deposits/depositProducts-service/depositProducts.service';
declare const window: any;

@Component({
  selector: 'app-retail-product-selection-control',
  templateUrl: './retail-product-selection-control.component.html',
  styleUrls: ['./retail-product-selection-control.component.scss'],
  providers: [RetailProductSelectionControlHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RetailProductSelectionControlComponent),
      multi: true
    }
  ]
})

export class RetailProductSelectionControlComponent extends BaseFpxControlComponent {
  @Input() readMore: boolean = false;
  @Output() emitChanges: EventEmitter<any> = new EventEmitter<any | null>();
  @Output() emitReadMore: EventEmitter<any> = new EventEmitter<any | null>();
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onCardChanged') onSelectCard: EventEmitter<any> = new EventEmitter();

  slideConfig: any = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
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
  private _depositProductDetails:any;


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
    private _service: RetailProductSelectionListControlService,
    private _depositsProductService: DepositProductsService,
    private _productSelectionControlHelper: RetailProductSelectionControlHelper,
    private _appConfig: AppConfigService,
    private sanitizer: DomSanitizer) {
    super(controlContainer, changeDetectorRef)
    window["RetailProductSelectionControlComponent"] = this;
  }

  override doPreInit() {
    // this.getProduct();
  }
  getProduct() {
    this.currentIndex = 0;
    let criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia("productId:segmentCode", "String", "equals", { searchText: this.segmentCode });
    
    this._service.findAll(criteriaQuery)().subscribe(
      (res) => {
        this.isProductsLoading = false;
        this.selectableList$ = of(res);
        this.data = res;
        this.changeDetectorRef.detectChanges();
        this.currentIndex = 0;
        this.onClickCard(0);
        this._appConfig.setData('rpProductId', this.data[this.currentIndex].productId.productId);
      }
    )

    // if(this._appConfig.getData('contractType') == 'deposit') {
    //   this._depositsProductService.findAll()().subscribe(
    //     (res) => {
    //       this.isProductsLoading = false;
    //       this.selectableList$ = of(res);
    //       this.data = res;
    //       this.changeDetectorRef.detectChanges();
    //       this.currentIndex = 0;
    //       this.onClickCard(0);
    //       this._appConfig.setData('rpProductId', this.data[this.currentIndex].productId.productId);
    //     }
    //   )
    // } else {
    //   this._service.findAll(criteriaQuery)().subscribe(
    //     (res) => {
    //       this.isProductsLoading = false;
    //       this.selectableList$ = of(res);
    //       this.data = res;
    //       this.changeDetectorRef.detectChanges();
    //       this.currentIndex = 0;
    //       this.onClickCard(0);
    //       this._appConfig.setData('rpProductId',this.data[this.currentIndex].productId.productId);
    //     }
    //   )
    // }
  }

  getData(data: any) {
    setTimeout(() => {
      document.querySelectorAll('.slick-slide').forEach((element, i) => {
        if (element.classList.contains('slick-current')) {
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
    document.querySelectorAll('.slick-slide').forEach((element, i) => {
      if (element.classList.contains('slick-current')) {
        element.classList.add('highlight');
        this.currentIndex = i;
      }
      else element.classList.remove('highlight')
    });

    this._appConfig.setData('rpProductId', this.data[this.currentIndex].productId.productId);

    this.formControl.patchValue(this.data[this.currentIndex].productId.productId, { emitModelToViewChange: true, emitEvent: true });
    this.changeDetectorRef.detectChanges();
    this.formControl.updateValueAndValidity();
    this.formControl.parent?.updateValueAndValidity();
    this.formControl.markAsTouched();

    if (this._appConfig.getData('contractType') == 'deposit') {
      this.showSpinner();
      let keys:any = {
        productCode: this.data[this.currentIndex].productId.productId
      }
      this._depositsProductService.findByKey(keys)().subscribe(
        {
          next: (res) => {
            this.hideSpinner();
            this._depositProductDetails = res;
          },
          error: (err) => {
            this.hideSpinner();
            this._depositProductDetails = null;
          }
        }
      );
    }

    this.emitChanges.emit({
      productId: this.data[this.currentIndex].productId.productId,
      segmentId: this.segmentCode,
      productDescription: this.data[this.currentIndex].productId.description,
      productDetails: this._depositProductDetails
    });
  }

  onCardChanged($event: any) {
    this.currentIndex = $event.currentSlide;
    this.onClickCard('');
  }

}
