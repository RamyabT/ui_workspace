import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { eDocumentNavigationFormHelper, eDocumentNavigationFormState } from './edocument-navigation-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'edocument-navigation-form',
  templateUrl: './edocument-navigation-form.component.html',
  styleUrls: ['./edocument-navigation-form.component.scss'],
  providers: [eDocumentNavigationFormHelper]
})
export class eDocumentNavigationFormComponent extends BaseFpxFormComponent<eDocumentNavigationFormHelper, eDocumentNavigationFormState>{
  @Input('highlightMenu') highlightMenu: string='';
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    casaNavigationFormHelper: eDocumentNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, casaNavigationFormHelper);
  }

  protected override doPreInit(){
    // this.addFormControl('accountNumber', '', [], [], 'change', 0, false);
  }

}
