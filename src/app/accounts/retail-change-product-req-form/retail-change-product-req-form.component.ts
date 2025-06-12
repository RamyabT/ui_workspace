import { Component, EventEmitter, OnInit, Optional, Output, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailChangeProductReqFormHelper, RetailChangeProductReqFormState } from './retail-change-product-req-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ChangeproductreqService } from '../changeproductreq-service/changeproductreq.service';
import { Changeproductreq } from '../changeproductreq-service/changeproductreq.model';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-retail-change-product-req-form',
  templateUrl: './retail-change-product-req-form.component.html',
  styleUrls: ['./retail-change-product-req-form.component.scss'],
  providers: [RetailChangeProductReqFormHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailChangeProductReqFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailChangeProductReqFormComponent)
    }]
})

export class RetailChangeProductReqFormComponent extends BaseFpxFormComponent<RetailChangeProductReqFormHelper, RetailChangeProductReqFormState> implements OnInit {
  _activeSpaceInfoService: any;
  _router: any;
  productDescription: string = "";
  newProductDescription: string = "";
  accountTypeName: string = "";
  accountNumber: string = "";
  accountType: string = "";
  _appConfig: any;
  labelDesc: string = '';
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailChangeProductReqFormHelper: RetailChangeProductReqFormHelper,
    public changeproductreqService: ChangeproductreqService,
    private validatorService: ValidatorService,
    private _translate: TranslateService

  ) {
    super(formBuilder, router, controlContainer, retailChangeProductReqFormHelper);
  }
  protected override doPreInit(): void {
    this.setDataService(this.changeproductreqService);
    this.addFormControl('accountNumber', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('newProductCode', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('termsFlag', '', [Validators.required,], [], 'blur', 1, false);
    this.addElement('termsBlock');
    this.setServiceCode("RETAILCHANGEPRODUCT");

  }


  protected override doPostInit(): void {
  }

}
