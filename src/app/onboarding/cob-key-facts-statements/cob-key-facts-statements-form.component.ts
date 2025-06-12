import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { COBKeyFactsStatementsFormHelper, COBKeyFactsStatementsFormState } from './cob-key-facts-statements-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cob-key-facts-statements-form',
  templateUrl: './cob-key-facts-statements-form.component.html',
  styleUrls: ['./cob-key-facts-statements-form.component.scss'],
  providers: [COBKeyFactsStatementsFormHelper]
})

export class COBKeyFactsStatementsFormComponent extends BaseFpxFormComponent<COBKeyFactsStatementsFormHelper, COBKeyFactsStatementsFormState> {
  SavingCard: boolean=false;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cOBKeyFactsStatementsFormHelper: COBKeyFactsStatementsFormHelper,
    private validatorService: ValidatorService,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) {
    super(formBuilder, router, controlContainer, cOBKeyFactsStatementsFormHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('kfsFlag', '', [Validators.required,Validators.min(1), Validators.max(1)], [], 'change');
    // this.setDataService(this.keyFactsStatementsService);
  }

  // onClickTermsCondition() {
  //   this.cd.detectChanges();
  // }
  

}
