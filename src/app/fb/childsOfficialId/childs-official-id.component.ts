import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { childsOfficialIdHelper,childsOfficialIdState} from './childs-official-id.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ChildreqdocdtlService } from '../childreqdocdtl-service/childreqdocdtl.service';
import { Childreqdocdtl } from '../childreqdocdtl-service/childreqdocdtl.model';

 
 
@Component({
 selector: 'app-childs-official-id',
  templateUrl: './childs-official-id.component.html',
  styleUrls: ['./childs-official-id.component.scss'],
  providers : [ childsOfficialIdHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => childsOfficialIdComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => childsOfficialIdComponent)
  }]
  })

export class childsOfficialIdComponent extends  BaseFpxFormComponent<childsOfficialIdHelper, childsOfficialIdState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public childsOfficialIdHelper: childsOfficialIdHelper,
    public childreqdocdtlService: ChildreqdocdtlService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, childsOfficialIdHelper);
    this.setServiceCode("childsOfficialId");  
}
   protected override doPreInit(): void {
  this.setDataService(this.childreqdocdtlService);
      this.addFormControl('fileName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("childsOfficialId");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

