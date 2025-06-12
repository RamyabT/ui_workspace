import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppConfigService, UserAuthService } from '@dep/services';
import gsap from 'gsap';
import { PortfolioSummaryComponent } from '../portfolio-summary/portfolio-summary.component';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { BehaviorSubject, combineLatest, forkJoin } from 'rxjs';
import { DeviceDetectorService } from '@dep/core';
import { CustomerService } from 'src/app/foundation/validator-service/customer.service';
import { UserrestrictionsService } from 'src/app/foundation/userrestrictions-service/userrestrictions.service';
import { BaseFpxFunctionality, FpxModal } from '@fpx/core';
import { RetailUserRestrictionsFormComponent } from 'src/app/foundation/retail-user-restrictions-form/retail-user-restrictions-form.component';
import { SkinManager } from '@dep/ui';

@Component({
  selector: 'overview-header',
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.scss']
})
export class OverviewHeaderComponent extends BaseFpxFunctionality implements OnInit  {
  @ViewChild('summaryContainer', {read: ElementRef}) summaryContainer!: ElementRef;

  helloText: string = "";
  userFullName:string = "";
  private _timeline: any;
  protected _showSummary:boolean = false;
  accountSummary: any;
  cardSummary: any;
  accountSummaryFetching: boolean = false;
  imageData:string='';
  customerCode!: string;
  privacyToggle:boolean = false;

  constructor(
    private _userrestrictionsService:UserrestrictionsService,
    private _appConfig: AppConfigService,
    private _commonService: CommonService,
    public userAuth: UserAuthService,
    protected device: DeviceDetectorService,
    protected _customerService:CustomerService,
    protected skinManager:SkinManager
  ) { 
    super()
  }

  ngOnInit(): void {
    this. helloText = this._appConfig.helloText();
    this.customerCode = this.userAuth.getAuthorizationAttr('CustomerCode')
    this.userFullName = this.userAuth.getUserAdditionalDetails()?.fullName;
    let overviewHeaderActionPublisher$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('overviewHeaderActionPublisher$', {
      "observable": overviewHeaderActionPublisher$.asObservable(),
      "subject": overviewHeaderActionPublisher$
    });
  }

  ngAfterViewInit(){
    if(this.device.isMobile()) this.setupHeaderAnimation();
    // else this.fetchSummary();
    this.fetchSummary();
  }

  setupHeaderAnimation(){
    // const el = this.summaryContainer.nativeElement;

    // this._timeline = gsap.timeline({
    //   reversed: true,
    //   paused: true,
    //   ease: "power1.inOut",
    //   smoothChildTiming: false
    // });

    // this._timeline.eventCallback("onComplete", () => { });

    // this._timeline.fromTo(el, {
    //   css: {height:0, opacity:0, pointerEvents:'none'}
    // },{
    //   css: {height: 'auto', opacity:1, pointerEvents:'all'},
    //   immediateRender: true, duration:0.3
    // }, 0);
  }
  togglePrivacy(){
    this.privacyToggle=!this.privacyToggle;
    if (this._appConfig.hasData('overviewHeaderActionPublisher$')) {
      this._appConfig.getData('overviewHeaderActionPublisher$').subject.next(
        { action: 'TOGGLEPRIVACY'
        });
    }
  }
  toggleCardView(){
    if (this._appConfig.hasData('overviewHeaderActionPublisher$')) {
      this._appConfig.getData('overviewHeaderActionPublisher$').subject.next(
        { action: 'TOGGLECARDVIEW'
        });
    }
    this._showSummary = !this._showSummary;
  }

  fetchSummary(){
    if(!this.accountSummary && !this.cardSummary && !this._showSummary){
      this.accountSummaryFetching = true;
      let accountSummary$ = this._commonService.fetchAccountSummary();
      let cardSummary$ = this._commonService.fetchCardSummary();
  
      combineLatest([accountSummary$, cardSummary$]).subscribe({
        next: ([_accountSummary, _cardSummary]) => {
          this.accountSummary = _accountSummary;
          this.cardSummary = _cardSummary;
          
          this.accountSummaryFetching = false;
          // this._showSummary = true;
          // this.playAnimation();
        },
        error: (reason:any) => {
          console.error("DEP: Summary fetch error");
        }
      });
    } else{
      this.accountSummaryFetching = false;
      // this._showSummary = !this._showSummary;
      // this.playAnimation();
    }
  }

  playAnimation(){
    if(this.device.isMobile()) {
      if(this._showSummary){
        this._timeline.play();
      } else{
        this._timeline.reverse();
      }
    }
  }

  toggleProfile(){
    this._customerService.showUserProfile = !this._customerService.showUserProfile;
  }

  swapAccount(){
    let modal = new FpxModal();
    modal.setComponent(RetailUserRestrictionsFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    // modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      title: "RetailUserRestrictionsForm.linkedCustomerTitle",
    });
    this.openModal(modal);
  }
}
