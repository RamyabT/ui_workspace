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
import { RetailMultiBillRequestInputGridHelper, RetailMultiBillRequestInputGridState } from './retail-multi-bill-request-input-grid.helper';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { gsap } from "gsap";
import moment from 'moment';

declare let $: any;

@Component({
  selector: 'app-retail-multi-bill-request-input-grid',
  templateUrl: './retail-multi-bill-request-input-grid.component.html',
  styleUrls: ['./retail-multi-bill-request-input-grid.component.scss'],
  providers: [RetailMultiBillRequestInputGridHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RetailMultiBillRequestInputGridComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: RetailMultiBillRequestInputGridComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RetailMultiBillRequestInputGridComponent extends BaseFpxGridComponent<RetailMultiBillRequestInputGridHelper, RetailMultiBillRequestInputGridState> implements OnChanges {
  @Output('showFooter') showFooter: EventEmitter<any> = new EventEmitter<any|null>();
  @Input('billerReceived') billerReceived: any;
  @Input('multiBillSelection') multiBillSelection: boolean = false;
  @Input('formData') formData: any;

  hideBills: boolean = false;
  selectedAccount: boolean = false;
  selectedAccountsList: any[] = [];
  
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailMultiBillRequestInputGridHelper: RetailMultiBillRequestInputGridHelper,
    private changeDetectorRef: ChangeDetectorRef,
    protected device: DeviceDetectorService
  ) {
    super(formBuilder, controlContainer, router, retailMultiBillRequestInputGridHelper, changeDetectorRef);
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
  
  protected override doPostInit(): void {
    // this.accountsAccordionIndexes[0].play(); 
  }

  protected override setGridDefinition(): void {
    console.log('adding row');
    this.addElement('addRowAction');
    this.addElement('deleteAction');
    this.addElement('actions_column');
    this.addElement('actions_column_header');

    this.addFormControl('nickName', '', [], [], 'blur', 1);
    this.addFormControl('billerCreditAccount', '', [], [], 'blur', 1);
    this.addFormControl('billerDescription', '', [], [], 'blur', 1);
    this.addFormControl('billerId', '', [], [], 'blur', 1);

    this.addFormControl('orderSl', '', [], [], 'blur', 1);
    this.addFormControl('billReference', '', [], [], 'blur', 1);
    this.addFormControl('id', '', [], [], 'blur', 1);
    
    this.addFormControl('billerBeneficiaryId', '', [], [], 'blur', 1);
    this.addFormControl('paymentAmount', '', [], [], 'blur', 1);
    this.addFormControl('currency', '', [], [], 'blur', 1);
    this.addFormControl('scheduleType', '', [], [], 'change', 1);
    this.addFormControl('paymentFrequency', '', [], [], 'blur', 1);
    this.addFormControl('numberOfPayments', '', [], [], 'blur', 1);
    this.addFormControl('paymentEndDate', '', [], [], 'blur', 1);


    this.addFormControl('totalBillAmount', '', [Validators.required], [], 'blur', 1);
    this.addElement('totalBillAmount_column');
    this.addElement('totalBillAmount_column_header');
    this.addFormControl('paymentDate', moment().format('YYYY-MM-DD'), [], [], 'blur', 1);
    this.addElement('paymentDate_column');
    this.addElement('paymentDate_column_header');
    this.addFormControl('selectedAccount', false, [], [], 'blur', 1);
    this.addFormControl('hiddenField', '', [], [], 'change', 1);
    this.addFormControl('payNow', true, [], [], 'blur', 1);
    this.addFormControl('payNowAmount', 0, [], [], 'blur', 1);
    this.addFormControl('payLaterAmount', 0, [], [], 'blur', 1);
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
        css: { height:0, paddingBottom: '0px' }
      }, {
        css: { height: 'auto', paddingBottom: '20px' }
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

  toggleAccordion(index:number){
    let animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
    if(this.opnedAccordionIndex == index){

    } else if(this.opnedAccordionIndex >= 0){
      if(this.device.isMobile()) {
        // animation = this.accountsAccordionIndexes[this.opnedAccordionIndex]; 
        // animation.reverse(); 
      }
    }
    animation = this.accountsAccordionIndexes[index];
    animation.reversed() ? animation.play() : animation.reverse();
    if(!animation.reversed()) {
      this.openedAccordian.splice(index, 1, 'accordian');
    }
    else {
      this.openedAccordian.splice(index, 1);
      this.formArray.controls[index].get('totalBillAmount')?.reset("");
      this.formArray.controls[index].get('scheduleType')?.reset("");
      this.formArray.controls[index].get('paymentFrequency')?.reset("");
      this.formArray.controls[index].get('numberOfPayments')?.reset("");
      this.formArray.controls[index].get('paymentEndDate')?.reset("");
    }
    this.formArray.controls[index].get('totalBillAmount')?.updateValueAndValidity();
    this.formArray.controls[index].get('scheduleType')?.updateValueAndValidity();
    this.formArray.controls[index].get('paymentFrequency')?.updateValueAndValidity();
    this.formArray.controls[index].get('numberOfPayments')?.updateValueAndValidity();
    this.formArray.controls[index].get('paymentEndDate')?.updateValueAndValidity();
    if(this.openedAccordian.length > 0) {
      this.showFooter.emit(true);
    }
    else {
      this.showFooter.emit(false);
    }
    this.opnedAccordionIndex = index;
  }

  selectBill(bill: any, index: number) {
    console.log(this.formGroup);
    console.log(this.formArray);
    if (this.formArray.controls[index].get('selectedAccount')?.value) {
      this.formArray.controls[index].get('selectedAccount')?.setValue(false);
    } else {
      this.formArray.controls[index].get('selectedAccount')?.setValue(true);
    }

    this.getSelectedAccountsList();
    console.log(this.formArray.value);
    console.log(bill);
  }

  getSelectedAccountsList() {
    this.selectedAccountsList
      = this.formArray.controls.filter((element: any) => element.get('selectedAccount')?.value);
    console.log(this.selectedAccountsList);
  }

  onCancel() {
    this.formArray.controls.forEach((element: any,index: number) => {
      element.get('totalBillAmount')?.reset("");
      element.get('scheduleType')?.reset("");
      element.get('paymentFrequency')?.reset("");
      element.get('numberOfPayments')?.reset("");
      element.get('paymentEndDate')?.reset("");
      element.get('totalBillAmount')?.updateValueAndValidity();
      element.get('scheduleType')?.updateValueAndValidity();
      element.get('paymentFrequency')?.updateValueAndValidity();
      element.get('numberOfPayments')?.updateValueAndValidity();
      element.get('paymentEndDate')?.updateValueAndValidity();
      this.accountsAccordionIndexes[index].reverse();
    });
    this.openedAccordian = [];
    this.showFooter.emit(false);
  }


}
