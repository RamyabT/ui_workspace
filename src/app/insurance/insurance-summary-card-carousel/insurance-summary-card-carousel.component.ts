import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService, LanguageService } from '@dep/services';

import { insurance } from '../insurance-summary-service/insurancesummary.model';
import { InsurancesummaryService } from '../insurance-summary-service/insurancesummary.service';

@Component({
  selector: 'app-insurance-summary-card-carousel',
  templateUrl: './insurance-summary-card-carousel.component.html',
  styleUrls: ['./insurance-summary-card-carousel.component.scss']
})
export class InsuranceSummaryCardCarouselComponent implements OnInit {
  @Input('summary') summary!: insurance[];
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @Output('onSelectCard') onSelectCard: EventEmitter<any> = new EventEmitter();
  @Input('contextmenuBtn') contextmenuBtn:boolean = false;

  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  slideConfig: any;
  slideWidth: number = 230;

  constructor(
    private _appConfig: AppConfigService,
    private _laguageService: LanguageService,
    private _insuranceService: InsurancesummaryService,
    private _route: ActivatedRoute,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: false,
      rtl: this._laguageService.isRtl
    };

    const insuranceIdFromRoute = this._route.snapshot.queryParamMap.get('insuranceId');

    if (insuranceIdFromRoute) {
      this._appConfig.setData('insuranceId', insuranceIdFromRoute);
    }

    this._insuranceService.fetchInsuranceSummary().subscribe({
      next: (res: insurance[]) => {
        const selectedId = this._appConfig.getData('insuranceId');

        if (selectedId) {
          const selectedIndex = res.findIndex(item => item.insuranceId === selectedId);
          if (selectedIndex !== -1) {
            const selected = res.splice(selectedIndex, 1)[0];
            res.unshift(selected);
          }
        }

        this.summary = res;

        setTimeout(() => {
          this.slickModal?.slickGoTo(0);
          this.onSelectCard.emit(this.summary[0]);
          this._appConfig.setData('insuranceId', this.summary[0]?.insuranceId);
        }, 100);
      },
      error: (error: any) => {
        console.error('Error fetching insurance summary:', error);
      }
    });
  }

  onCarouselInit($event: any) {}

  onCardChanged($event: any) {
    const currentCard = this.summary[$event.currentSlide];
    this.onSelectCard.emit(currentCard);
    this._appConfig.setData('insuranceDetails',currentCard);
    this._appConfig.setData('insuranceId', currentCard?.insuranceId);
    if (this._appConfig.hasData('insuranceActionPublisher$')) {
      this._appConfig.getData('insuranceActionPublisher$').subject.next({ action: 'REFRESHCONTAINER', data: currentCard});
    }
    let serviceCode = 'RETAILINSURANCEDETAILS';
    let servicePath: any = this._appConfig.getServiceDetails(serviceCode).servicePath;
    this._router.navigate(servicePath);
  }
}
