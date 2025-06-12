import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup, FormControlStatus  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailAddMembersContactHelper, RetailAddMembersContactState} from './retail-add-members-contact.helper';
import { BaseFpxFormComponent } from '@fpx/core'; 

@Component({
 selector: 'app-retail-add-members-contact',
  templateUrl: './retail-add-members-contact.component.html',
  styleUrls: ['./retail-add-members-contact.component.scss'],
  providers : [ RetailAddMembersContactHelper]
  })

export class RetailAddMembersContactComponent extends  BaseFpxFormComponent<RetailAddMembersContactHelper, RetailAddMembersContactState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailAddMembersContactHelper: RetailAddMembersContactHelper,
    
  ) {
    super(formBuilder, router,controlContainer, retailAddMembersContactHelper);
  }
   protected override doPreInit(): void {
  this.addElement('contactList'); 
  this.addElement('selectedContact');
  this.addFormControl('searchText', '', [], [], 'change');
  this.addFormControl('personsCount', '',  [Validators.min(3)],[],'change',1,false,0);			   		 
	this.setServiceCode("RETAILADDMEMBERSCONTACT");

  }
  

 
  
}
