import { Component, EventEmitter, Input, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { addChildAccountHelper, addChildAccountState } from './add-child-account.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ChildlogService } from '../childlog-service/childlog.service';
import { Childlog } from '../childlog-service/childlog.model';



@Component({
  selector: 'app-add-child-account',
  templateUrl: './add-child-account.component.html',
  styleUrls: ['./add-child-account.component.scss'],
  providers: [addChildAccountHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => addChildAccountComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => addChildAccountComponent)
    }]
})

export class addChildAccountComponent extends BaseFpxFormComponent<addChildAccountHelper, addChildAccountState> {
  @Input() selectedData!: any;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public addChildAccountHelper: addChildAccountHelper,
    public childlogService: ChildlogService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, addChildAccountHelper);
    this.setServiceCode("RETAILCHILDINFO");
  }
  protected override doPreInit(): void {
    this.setDataService(this.childlogService);
    this.setTabConfiguration("transparent", true, true, false, false, 'tabGroup', '');

    this.addTab('Child Details', '', false, false, false, 'childDetailsTab', 'tabGroup');
    this.addTab('Account Details', '', false, false, false, 'accountDetailsTab', 'tabGroup');
    this.addTab('Payment Settings', '', false, false, false, 'paymentsettingTab', 'tabGroup');
    this.addTab('Notification & Control', '', false, false, false, 'notificationControlTab', 'tabGroup');

    this.addFormControl('mode', '', [], [], 'blur', 1, false);
    this.addFormControl('fullName', '', [], [], 'blur', 1, false);
    this.addFormControl('nickName', '', [], [], 'blur', 1, false);
    this.addFormControl('dob', '', [], [], 'blur', 1, false);
    this.addFormControl('gender', '', [], [], 'blur', 1, false);
    this.addFormControl('relationship', '', [], [], 'blur', 1, false);
    this.addFormControl('email', '', [], [], 'blur', 1, false);
    this.addFormControl('mobileNumber', '', [], [], 'blur', 1, false);
    this.addFormControl('profileImage', '', [], [], 'blur', 1, false);
    this.addFormControl('childreqdocdtl', '', [], [], 'blur', 1, false);

    this.addFormControl('childDetails', '', [Validators.required], [], 'blur', 1, false,'childDetailsTab');
    this.addFormControl('childreqaccountdtl', '', [Validators.required], [], 'blur', 1, false,'accountDetailsTab');
    this.addFormControl('paymentsetting', '', [Validators.required], [], 'blur', 1, false,'paymentsettingTab');
    this.addFormControl('childreqnotification', '', [Validators.required], [], 'blur', 1, false,'notificationControlTab');

    this.setServiceCode("RETAILCHILDINFO");

  }


  protected override doPostInit(): void {

  }

}

