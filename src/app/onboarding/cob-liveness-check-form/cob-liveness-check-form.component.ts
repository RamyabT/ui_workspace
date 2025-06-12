import { Component, OnInit, Optional } from '@angular/core';
import { CobLivenessCheckFormHelper, CobLivenessCheckFormState } from './cob-liveness-check-form.helper';
import { Router } from '@angular/router';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { BaseFpxFormComponent } from '@fpx/core';
import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';
import { LivenessCheckServcie } from '../liveness-check-service/liveness-check-service';

@Component({
  selector: 'app-cob-liveness-check-form',
  templateUrl: './cob-liveness-check-form.component.html',
  styleUrls: ['./cob-liveness-check-form.component.scss'],
  providers: [
    CobLivenessCheckFormHelper, FacetechReqServcie
  ]
})
export class CobLivenessCheckFormComponent extends BaseFpxFormComponent<CobLivenessCheckFormHelper, CobLivenessCheckFormState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    private _cobLivenessCheckFormHelper: CobLivenessCheckFormHelper,
    private _livenessCheckServcie: LivenessCheckServcie
  ) {
    super(formBuilder, router,controlContainer, _cobLivenessCheckFormHelper);
  }

  protected override doPreInit(): void {
    // this.addFormControl('appRef', '', []);
    this.setDataService(this._livenessCheckServcie);
    this.setServiceCode('RETAILLIVENESSCHECK')

  }

}
