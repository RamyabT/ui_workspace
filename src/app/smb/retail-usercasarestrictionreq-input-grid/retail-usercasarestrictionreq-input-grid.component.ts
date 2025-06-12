import { ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, forwardRef, inject, Input, OnChanges, Optional, Output, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxGridComponent } from '@fpx/core';
import { RetailUserccrestrictionreqInputGridHelper, RetailUserccrestrictionreqInputGridState } from './retail-usercasarestrictionreq-input-grid.helper';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { gsap } from "gsap";
import moment from 'moment';

declare let $: any;

@Component({
  selector: 'retail-usercasarestrictionreq-input-grid',
  templateUrl: './retail-usercasarestrictionreq-input-grid.component.html',
  styleUrls: ['./retail-usercasarestrictionreq-input-grid.component.scss'],
  providers: [RetailUserccrestrictionreqInputGridHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RetailUserccrestrictionreqInputGridComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: RetailUserccrestrictionreqInputGridComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RetailUserccrestrictionreqInputGridComponent extends BaseFpxGridComponent<RetailUserccrestrictionreqInputGridHelper, RetailUserccrestrictionreqInputGridState> implements OnChanges {
  @Output('showFooter') showFooter: EventEmitter<any> = new EventEmitter<any|null>();
  @Input('billerReceived') billerReceived: any;
  @Input('activeTabIndex') activeTabIndex: number = 0;

  hideBills: boolean = false;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUserccrestrictionreqInputGridHelper: RetailUserccrestrictionreqInputGridHelper,
    private changeDetectorRef: ChangeDetectorRef,
    protected device: DeviceDetectorService 
  ) {
    super(formBuilder, controlContainer, router, retailUserccrestrictionreqInputGridHelper, changeDetectorRef);
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  protected override doPreInit(): void {
    //this.addRow();
  }
  private accountsAccordionIndexes: any = [];
  private opnedAccordionIndex = 0;
  protected _appConfig: AppConfigService = inject(AppConfigService);
  count: number = 0;
  

  protected override setGridDefinition(): void {
    console.log('adding row');
    this.addElement('addRowAction');
    this.addElement('deleteAction');
    this.addElement('actions_column');
    this.addElement('actions_column_header');

    this.addFormControl('accordianOpen', false, [], [], 'change', 1);
    this.addFormControl('hiddenField', '',  []    ,[],'change',1);	
    this.addFormControl('accountTypeDesc', '',  []    ,[],'change',1);	

    this.addFormControl('accountType', '', [], [], 'blur', 1);
    this.addFormControl('accountNumber', '', [], [], 'blur', 1);
    this.addElement('accountNumber_column');
    this.addElement('accountNumber_column_header');

    this.addFormControl('inquiryAllowed', '', [], [], 'blur', 1);
    this.addFormControl('requestAllowed', '', [], [], 'blur', 1);
    this.addFormControl('transactionAllowed', '', [], [], 'blur', 1);
    this.addFormControl('approvalRequired', '', [], [], 'blur', 1);

    		   		 
    // this.setGridColumnWidth([15,40,40,15]);
    // this.setGridWidth(100);

    //this.enableRow();
  }

  setupAccordionAnimation() {
    this.accountsAccordionIndexes = new Array();

    this.formArray.controls.forEach((element: any, i: any) => {
      let accordionAnimation = gsap.timeline({ reversed: true, paused: true });
      let target = ".accordion-item-" + i;

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

      accordionAnimation.fromTo(target + " .list-item-content", {
        css: { height:0, marginBottom: '0px' }
      }, {
        css: { height: 'auto', marginBottom: '11px' }
      }, 0);
      
      // accordionAnimation.fromTo(target + " .btn-accordion-toggle", {
      //   css: { rotationZ: 0 }
      // }, {
      //   css: { rotationZ: -180 }
      // }, 0);

      this.accountsAccordionIndexes[i] = accordionAnimation;

    },0);
  }

  openedAccordian: any =[];

  toggleAccordion(index:number, value:boolean){
    this.formArray.controls[index].get('accordianOpen')?.setValue(value);
    this.formArray.controls[index].get('accordianOpen')?.updateValueAndValidity();
    this.changeDetectorRef.detectChanges();
    // let animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
    // if(this.opnedAccordionIndex == index){

    // } else if(this.opnedAccordionIndex >= 0){
    //   if(this.device.isMobile()) {
    //     // animation = this.accountsAccordionIndexes[this.opnedAccordionIndex]; 
    //     // animation.reverse(); 
    //   }
    // }
    // animation = this.accountsAccordionIndexes[index];
    // animation.reversed() ? animation.play() : animation.reverse();
    // if(!animation.reversed()) {
    //   this.openedAccordian.splice(index, 1, 'accordian');
    // }
    // else {
    //   this.openedAccordian.splice(index, 1);
    //   // this.formArray.controls[index].get('totalBillAmount')?.reset("");
    //   // this.formArray.controls[index].get('scheduleType')?.reset("");
    //   // this.formArray.controls[index].get('paymentFrequency')?.reset("");
    //   // this.formArray.controls[index].get('numberOfPayments')?.reset("");
    //   // this.formArray.controls[index].get('paymentEndDate')?.reset("");
    // }
    // // this.formArray.controls[index].get('totalBillAmount')?.updateValueAndValidity();
    // // this.formArray.controls[index].get('scheduleType')?.updateValueAndValidity();
    // // this.formArray.controls[index].get('paymentFrequency')?.updateValueAndValidity();
    // // this.formArray.controls[index].get('numberOfPayments')?.updateValueAndValidity();
    // // this.formArray.controls[index].get('paymentEndDate')?.updateValueAndValidity();
    // if(this.openedAccordian.length > 0) {
    //   // this.showFooter.emit(true);
    // }
    // else {
    //   // this.showFooter.emit(false);
    // }
    // this.opnedAccordionIndex = index;
  }

  onCancel() {
    // this.formArray.controls.forEach((element: any,index: number) => {
    //   element.get('totalBillAmount')?.reset("");
    //   element.get('scheduleType')?.reset("");
    //   element.get('paymentFrequency')?.reset("");
    //   element.get('numberOfPayments')?.reset("");
    //   element.get('paymentEndDate')?.reset("");
    //   element.get('totalBillAmount')?.updateValueAndValidity();
    //   element.get('scheduleType')?.updateValueAndValidity();
    //   element.get('paymentFrequency')?.updateValueAndValidity();
    //   element.get('numberOfPayments')?.updateValueAndValidity();
    //   element.get('paymentEndDate')?.updateValueAndValidity();
    //   this.accountsAccordionIndexes[index].reverse();
    // });
    this.openedAccordian = [];
    // this.showFooter.emit(false);
  }


}
