import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailAccountNicknameFormHelper, RetailAccountNicknameFormState } from './retail-account-nickname-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { AccountnicknameService } from '../accountnickname-service/accountnickname.service';
import { Accountnickname } from '../accountnickname-service/accountnickname.model';



@Component({
  selector: 'app-retail-account-nickname-form',
  templateUrl: './retail-account-nickname-form.component.html',
  styleUrls: ['./retail-account-nickname-form.component.scss'],
  providers: [RetailAccountNicknameFormHelper]
})

export class RetailAccountNicknameFormComponent extends BaseFpxFormComponent<RetailAccountNicknameFormHelper, RetailAccountNicknameFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailAccountNicknameFormHelper: RetailAccountNicknameFormHelper,
    public accountnicknameService: AccountnicknameService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailAccountNicknameFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('accountNumber', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('nickName', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('clearNickname', '', [], [], 'change', 1, false, 0);
    this.setDataService(this.accountnicknameService);
    this.setServiceCode("RETAILACCNICKNAME");
    this.addFormControl('nicknameFlag', '', [Validators.required, Validators.min(1), Validators.max(1)], [], 'change');
    this.addElement('delete-nickname');
  }


  protected override doPostInit(): void {

  }

}
