import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup, FormControlStatus  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxChangeHandler, BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NpsscontactviewingService } from '../npsscontactviewing-service/npsscontactviewing.service';
import { Npsscontactviewing } from '../npsscontactviewing-service/npsscontactviewing.model';
import { NPSSContactViewingHelper, NPSSContactViewingState } from './npss-request-money-contact.helper';

 
 
@Component({
 selector: 'app-npss-request-money-contact',
  templateUrl: './npss-request-money-contact.component.html',
  styleUrls: ['./npss-request-money-contact.component.scss'],
  providers : [ NPSSContactViewingHelper]
  })

export class NPSSRequestContactViewingComponent extends  BaseFpxFormComponent<NPSSContactViewingHelper, NPSSContactViewingState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public nPSSContactViewingHelper: NPSSContactViewingHelper,
    public npsscontactviewingService: NpsscontactviewingService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, nPSSContactViewingHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.npsscontactviewingService);
  this.addElement('contactList'); 
  this.addFormControl('searchText', '', [], [], 'change');
	this.setServiceCode("NPSSREQUESTCONTACT");

  }
  

 
  
}
