import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RetailmembershiptrandtlsfilterformService } from '../retailmembershiptrandtlsfilterform-service/retailmembershiptrandtlsfilterform.service';
import { retailmembershiptrandtlsfilterformHelper, retailmembershiptrandtlsfilterformState } from '../retailMembershipTranDtlsFilterForm/retail-membership-tran-dtls-filter-form.helper'



@Component({
  selector: 'app-retail-membership-tran-dtls-filter-form',
  templateUrl: './retail-membership-tran-dtls-filter-form.component.html',
  styleUrls: ['./retail-membership-tran-dtls-filter-form.component.scss'],
  providers: [retailmembershiptrandtlsfilterformHelper,
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   multi: true,
    //   useExisting: forwardRef(() => retailmembershiptrandtlsfilterformComponent)
    // },
    // {
    //   provide: NG_VALIDATORS,
    //   multi: true,
    //   useExisting: forwardRef(() => retailmembershiptrandtlsfilterformComponent)
    // }
  ]
})

export class retailmembershiptrandtlsfilterformComponent extends BaseFpxFormComponent<retailmembershiptrandtlsfilterformHelper, retailmembershiptrandtlsfilterformState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailmembershiptrandtlsfilterformHelper: retailmembershiptrandtlsfilterformHelper,
    public retailmembershiptrandtlsfilterformService: RetailmembershiptrandtlsfilterformService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailmembershiptrandtlsfilterformHelper);

  }
  protected override doPreInit(): void {
    this.setDataService(this.retailmembershiptrandtlsfilterformService);
    this.addFormControl('rangeType', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('fromDate', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('toDate', '', [Validators.required], [], 'blur', 1, false);
    this.addElement('view');
    this.setServiceCode("RETAILMEMBERSHIPTRANDTLSFILTER");

  }

  protected override doPostInit(): void {

  }

}

