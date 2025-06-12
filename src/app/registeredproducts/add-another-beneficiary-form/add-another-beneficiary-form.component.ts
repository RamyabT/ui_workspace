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
import { AddAnotherBeneficiaryFormHelper, AddAnotherBeneficiaryFormState } from './add-another-beneficiary-form.helper';
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';

@Component({
  selector: 'app-add-another-beneficiary-form',
  templateUrl: './add-another-beneficiary-form.component.html',
  styleUrls: ['./add-another-beneficiary-form.component.scss'],
  providers: [AddAnotherBeneficiaryFormHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddAnotherBeneficiaryFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AddAnotherBeneficiaryFormComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddAnotherBeneficiaryFormComponent extends BaseFpxGridComponent<AddAnotherBeneficiaryFormHelper, AddAnotherBeneficiaryFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public AddAnotherBeneficiaryFormHelper: AddAnotherBeneficiaryFormHelper,
    private changeDetectorRef: ChangeDetectorRef,
    private _appConfig: AppConfigService) {
    super(formBuilder, controlContainer, router, AddAnotherBeneficiaryFormHelper, changeDetectorRef);
  }

  protected override doPreInit(): void {
    
  }

  protected override setGridDefinition(): void {
    console.log('adding row');
    this.addElement('addRowAction');
    this.addElement('deleteAction');
    this.addElement('actions_column');
    this.addElement('actions_column_header');
    this.addElement('country_column');
    this.addElement('country_column_header');

    this.addFormControl('firstname', '', [Validators.required,], [], 'blur', 0);
    this.addFormControl('lastname', '', [Validators.required,], [], 'blur', 0);
    this.addFormControl('relationship', '', [Validators.required], [], 'blur', 0);
    this.addFormControl('proportion', '', [Validators.required], [], 'blur', 0);
  }
  protected override doPostInit(): void {
    this.addMoreBeneficiary();
  }
  addMoreBeneficiary() {
    if (this.AddAnotherBeneficiaryFormHelper.beneficiaryAdded < 2 && this.formArray.valid) {
      this.addSubFormGroup();
      this.AddAnotherBeneficiaryFormHelper.beneficiaryAdded += 1;
      this._appConfig.setData("beneficiaryAddedCount", this.AddAnotherBeneficiaryFormHelper.beneficiaryAdded);
    }
  }
  deleteAddedBeneficiary(i: number) {
    this.deleteSubFormGroup(i);
    this.AddAnotherBeneficiaryFormHelper.beneficiaryAdded -= 1;
    this._appConfig.setData("beneficiaryAddedCount", this.AddAnotherBeneficiaryFormHelper.beneficiaryAdded);
  }


}
