import { ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, Optional } from '@angular/core';
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
import { coApplicantsDetailsHelper, coApplicantsDetailsState } from './co-applicants-details.helper';
import { ApplyloanService } from '../applyloan-service/applyloan.service';

@Component({
  selector: 'app-co-applicants-details',
  templateUrl: './co-applicants-details.component.html',
  styleUrls: ['./co-applicants-details.component.scss'],
  providers: [coApplicantsDetailsHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => coApplicantsDetailsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: coApplicantsDetailsComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class coApplicantsDetailsComponent extends BaseFpxGridComponent<coApplicantsDetailsHelper, coApplicantsDetailsState> {
addCoApplicantRadio: boolean = false;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public coApplicantsDetailsHelper: coApplicantsDetailsHelper,
    private changeDetectorRef: ChangeDetectorRef,
    private applyloanService:ApplyloanService,
  ) {
    super(formBuilder, controlContainer, router, coApplicantsDetailsHelper, changeDetectorRef);
  }

  protected override doPreInit(): void {
    //this.addRow();
  }

  protected override setGridDefinition(): void {
    console.log('adding row');
    this.addElement('addRowAction');
    this.addElement('deleteAction');
    this.addElement('actions_column');
    this.addElement('actions_column_header');
    this.addFormControl('tenantId', '', [], [], 'blur', 1);
    this.addElement('tenantId_column');
    this.addElement('tenantId_column_header');

    this.addFormControl('applicantId', '', [], [], 'blur', 1);
    this.addElement('applicantId_column');
    this.addElement('applicantId_column_header');

    this.addFormControl('serialNumber', '', [], [], 'blur', 1);
    this.addElement('serialNumber_column');
    this.addElement('serialNumber_column_header');

    this.addFormControl('relationCode', '', [Validators.required], [], 'blur', 1);
    this.addElement('relationCode_column');
    this.addElement('relationCode_column_header');

    this.addFormControl('relationDesc', '', [], [], 'blur', 1);
    this.addElement('relationDesc_column');
    this.addElement('relationDesc_column_header');

    this.addFormControl('name','',[Validators.required,Validators.pattern(/^[a-zA-Z ]{1,35}$/)],[],'blur',1);
    this.addElement('name_column');
    this.addElement('name_column_header');

    this.addFormControl('idNumber', '', [Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]{1,20}$/)], [], 'blur', 1);
    this.addElement('idNumber_column');
    this.addElement('idNumber_column_header');

    this.addFormControl('addCoApplicant', '', [], [], 'blur', 1);
    this.addElement('addCoApplicant_column');
    this.addElement('addCoApplicant_column_header');
  }

  addMoreCountry() {
    console.log("index",this.formArray.controls.length);
    this.addSubFormGroup();
    let value:any = this.formArray.controls.length
    this.applyloanService.coApplicantsValue.next(value);
    if(this.formArray.controls.length >= 3){
      this.addCoApplicantRadio = true;
    }
    
  }
  deleteAddedCountry(i: number) {
    let value:any = this.formArray.controls.length
    this.applyloanService.coApplicantsValue.next(value);
    this.addCoApplicantRadio = false;
    this.deleteSubFormGroup(i);
  }


}
