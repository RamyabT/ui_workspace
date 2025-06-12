import { ChangeDetectorRef, Component,ComponentRef,ElementRef,EventEmitter,Optional,Output,ViewChild,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailMultiBillRequestFormHelper,RetailMultiBillRequestFormState} from './retail-multi-bill-request-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { MultibillrequestService } from '../multibillrequest-service/multibillrequest.service';
import { Multibillrequest } from '../multibillrequest-service/multibillrequest.model';
import { RetailMultiBillRequestInputGridComponent } from '../retail-multi-bill-request-input-grid/retail-multi-bill-request-input-grid.component';
import moment from 'moment';
import { APPCONSTANTS } from '@dep/constants';

 
 
@Component({
 selector: 'app-retail-multi-bill-request-form',
  templateUrl: './retail-multi-bill-request-form.component.html',
  styleUrls: ['./retail-multi-bill-request-form.component.scss'],
  providers : [ RetailMultiBillRequestFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailMultiBillRequestFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailMultiBillRequestFormComponent)
  }]
  })

export class RetailMultiBillRequestFormComponent extends  BaseFpxFormComponent<RetailMultiBillRequestFormHelper, RetailMultiBillRequestFormState>  {
  @ViewChild("RetailMultiBillRequestInputGrid") RetailMultiBillRequestInputGrid: ComponentRef<RetailMultiBillRequestInputGridComponent> | any;
  @ViewChild('entryForm', { read: ElementRef }) entryForm!: ElementRef;

  protected footerWidth : number = 0;
  showFooter: boolean = false;
  appConstant: any;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailMultiBillRequestFormHelper: RetailMultiBillRequestFormHelper,
    public multibillrequestService: MultibillrequestService,
    private validatorService: ValidatorService,
    private cd: ChangeDetectorRef
    
  ) {
    super(formBuilder, router,controlContainer, retailMultiBillRequestFormHelper);
    this.setServiceCode("RETAILMULTIBILLPAYMENT");  
}
   protected override doPreInit(): void {
    this.appConstant = APPCONSTANTS;
    this.setDataService(this.multibillrequestService);
    this.addFormControl('totalBillAmount', 0, [], [], 'blur', 1, false,);
    this.addFormControl('accountType', '1', [], [], 'blur', 1, false,);
    this.addFormControl('debitAccount', '', [], [], 'blur', 1, false,);
    this.addFormControl('accountNickname', '', [], [], 'blur', 1, false,);
    this.addFormControl('initiatedDate', moment().format('YYYY-MM-DD'), [], [], 'blur', 1, false,);
    this.addFormControl('hiddenField', '1', [Validators.required, Validators.minLength(2)], [], 'change', 1, false, 0);
    this.addFormControl('multibillrequestdetail', '', [], [], 'blur', 1, false,);
    this.setServiceCode("RETAILMULTIBILLPAYMENT");
    this.addFormControl('totalPayNowAmount', 0, [], [], 'blur', 1, false,);
    this.addFormControl('totalPayLaterAmount', 0, [], [], 'blur', 1, false,);

  }


  protected override doPostInit(): void {
    this.footerWidth = this.entryForm?.nativeElement?.clientWidth;
  }

  showFooterSection(event: any) {
    this.showFooter = event;
    this.formGroup.updateValueAndValidity();
    this._helper.reCheckForm();
  }

  onCancelClick() {
    this.RetailMultiBillRequestInputGrid.onCancel();
  }
 
}

