import { Component, Input, OnChanges, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { OtherRequestFormHelper, OtherRequestFormState } from './other-request-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-request-form',
  templateUrl: './other-request-form.component.html',
  styleUrls: ['./other-request-form.component.scss'],
  providers: [OtherRequestFormHelper]
})
export class OtherRequestFormComponent extends BaseFpxFormComponent<OtherRequestFormHelper, OtherRequestFormState> implements OnChanges {
  private _highlightMenu: string = '';

  // getter function, called whenever the value is accessed
  get highlightMenu(){
    return this._highlightMenu
  }

  // setter function, called whenever the value is set
  @Input() set highlightMenu(highlightMenu){
    this._highlightMenu = highlightMenu;
    if(this._highlightMenu == 'create-request') {
      this._helper.openLink({
        serviceCode: "RETAILSERVICEADHOCREQ"
      });
    }
  }
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _otherServiceRequestService: OtherRequestFormHelper,
  ) { 
    super(formBuilder, router,controlContainer, _otherServiceRequestService);
  }

  
}
