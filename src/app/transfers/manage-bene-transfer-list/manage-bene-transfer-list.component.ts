import { AfterViewInit, ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { gsap } from "gsap";
import { Beneinternal } from '../beneinternal-service/beneinternal.model';

declare let $: any;

@Component({
  selector: 'app-manage-bene-transfer-list.component',
  templateUrl: './manage-bene-transfer-list.component.html',
  styleUrls: ['./manage-bene-transfer-list.component.scss']
})
export class ManageBeneTransferListComponent implements OnInit, AfterViewInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);


  protected title: string = "";
  protected message: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";
  protected confirmationIcon: string = "";
  public searchText: string = "";
  protected dataList: any;
  protected serviceList: any;
  public showNoResultsMessage: boolean = false;
  public noData: boolean = false;

  portfolioData: any = [
    {
      category: "homeLayout.beneficiaries",
      type: "banking",
      data: [],
      total: {},
      showHeader: true
    }
    // {
    //   category: "homeLayout.cards",
    //   type: "cards",
    //   data: [],
    //   total: {},
    //   showHeader: true
    // },
    // {
    //   category: "homeLayout.loans",
    //   type: "loans",
    //   data: [],
    //   total: {},
    //   showHeader: true
    // },
    // {
    //   category: "homeLayout.deposits",
    //   type: "deposits",
    //   data: [],
    //   total: {},
    //   showHeader: true
    // },
    // {
    //   category: "homeLayout.membership",
    //   type: "membership",
    //   data: [],
    //   showPanel: true,
    //   total: {},
    //   showHeader: true
    // }
  ]

  private accountsAccordionIndexes: any = [];
  private opnedAccordionIndex = 0;
  count: number = 0;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService,
    private _router: Router,
    private _chnageDetectorRef: ChangeDetectorRef,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) { }
  ngAfterViewInit(): void {
    this.isAllAccountsReceived('accounts');
  }

  ngOnInit(): void {
    console.log(this.portfolioData)
    // if(this.portfolioData[0].data.status=="A"){
    this.portfolioData[0].data = this._dialogData.accountsList;
    this.noData = this.portfolioData[0].data.length === 0 ? true : false;
  // }
    // this.portfolioData[1].data = this._dialogData.accountsList;

  }

  isAllAccountsReceived(event?: any) {
    ++this.count;
    if (this.count == 5) {
      this.setupAccordionAnimation();
      this.accountsAccordionIndexes[0].play();
    }
    if (event == 'accounts') {
      this.setupAccordionAnimation();
      this.accountsAccordionIndexes[0].play();
    }
  }

  setupAccordionAnimation() {
    this.accountsAccordionIndexes = new Array();

    this.portfolioData.forEach((element: any, i: any) => {
      console.log(element)
      let accordionAnimation = gsap.timeline({ reversed: true, paused: true });
      let target = ".accordion-item-" + i;

      console.log(target)

      accordionAnimation.eventCallback("onStart", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onUpdate", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onComplete", () => {
        $(target)[0].classList.add('accordion-content-open');
      });

      accordionAnimation.eventCallback("onReverseComplete", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.fromTo(target + " .panel-body", {
        css: { height: 0 }
      }, {
        css: { height: 'auto' }
      }, 0);

      accordionAnimation.fromTo(target + " .btn-accordion-toggle", {
        css: { rotationZ: 0 }
      }, {
        css: { rotationZ: -180 }
      }, 0);

      this.accountsAccordionIndexes[i] = accordionAnimation;

      console.log(accordionAnimation.getChildren())
    }, 0);
  }

  toggleAccordion(index: number) {
    let animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
    if (this.opnedAccordionIndex == index) {

    } else if (this.opnedAccordionIndex >= 0) {
      if (this._device.isMobile()) {
        animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
        animation.reverse();
      }
    }

    console.log(animation)
    animation = this.accountsAccordionIndexes[index];
    console.log(animation)
    animation.reversed() ? animation.play() : animation.reverse();
    this.opnedAccordionIndex = index;

    console.log(this.opnedAccordionIndex)
  }

  close() {
    let payload = {
      action: 0
    }
    this._dialogRef.close(payload);
  }

  selectAccount(selectedAccountData: Beneinternal) {
    let payload = {
      action: 1,
      data: selectedAccountData,

    }

    this._dialogRef.close(payload);
  }


  onAccountDataReceivedHandler(evt: any) {
    console.log(evt)
  }

  // onFocusSearchText(){

  // }

  doServiceSearch($event: any) {
    this.searchText = $event.target.value
    this.portfolioData[0].data  = this._dialogData.accountsList.filter((item: any) => item.nickName.toLowerCase().match(this.searchText.toLowerCase()));
    this._chnageDetectorRef.detectChanges();
    this.showNoResultsMessage = this.portfolioData[0].data.length === 0 ? true : false;
    // if (_data.length == 0) {
    //   this.setHidden('noFilteredData', false)
    // } else {
    //   // this.setGridData('savedBillersGrid', this.state._gridData);
    //   this.setHidden('noFilteredData', true)
    // }
  }
}
