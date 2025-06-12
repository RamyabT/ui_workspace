import { Component, Input, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ContactsBeneListTmpltHelper, ContactsBeneListTmpltState } from './contacts-bene-list-tmplt.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contacts-bene-list-tmplt',
  templateUrl: './contacts-bene-list-tmplt.component.html',
  styleUrls: ['./contacts-bene-list-tmplt.component.scss'],
  providers: [ContactsBeneListTmpltHelper]

})
export class ContactsBeneListTmpltComponent extends BaseFpxFormComponent<ContactsBeneListTmpltHelper,ContactsBeneListTmpltState> {
  @Input() set selectedData(value:any| undefined ) {
    this.state.selectedData = value;
}
@Input() set index(value:any| undefined ) {
  this.state.index = value;
}

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public contactsBeneListTmpltHelper: ContactsBeneListTmpltHelper,
  ) {
    super(formBuilder, router, controlContainer, contactsBeneListTmpltHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('splitAmount', '',  []    ,[],'change',1,false,0);	
  }
  
  public override doPostInit(): void {
  console.log('getting value of selected data: ',this.selectedData);
  }

}
