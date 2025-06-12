import { Component, OnInit, Optional } from '@angular/core';
import { MembersSpendingOverviewHelper, MembersSpendingOverviewState } from './members-spending-overview.helper';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members-spending-overview',
  templateUrl: './members-spending-overview.component.html',
  styleUrls: ['./members-spending-overview.component.scss'],
  providers: [MembersSpendingOverviewHelper]
})
export class MembersSpendingOverviewComponent extends BaseFpxFormComponent<MembersSpendingOverviewHelper, MembersSpendingOverviewState> {

constructor(
    _formBuilder: FormBuilder, 
    _route: Router, 
    @Optional() _controlContainer: ControlContainer,
    _memberSpendingHelper: MembersSpendingOverviewHelper,
  ) { 
    super(_formBuilder, _route, _controlContainer, _memberSpendingHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('spendingflowMonth', '', [], [], 'change');
  }

}
