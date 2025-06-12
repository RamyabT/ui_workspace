import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { employmentInfoHelper,employmentInfoState} from './cobemploymentInfo.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { EmploymentInfoService } from '../employmentInfo-service/employmentInfo.service';
import { EmploymentInfo } from '../employmentInfo-service/employmentInfo.model';

 
 
@Component({
 selector: 'app-cobemploymentInfo',
  templateUrl: './cobemploymentInfo.component.html',
  styleUrls: ['./cobemploymentInfo.component.scss'],
  providers : [ employmentInfoHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => employmentInfoComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => employmentInfoComponent)
  }]
  })

export class employmentInfoComponent extends  BaseFpxFormComponent<employmentInfoHelper, employmentInfoState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public employmentInfoHelper: employmentInfoHelper,
    public employmentInfoService: EmploymentInfoService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, employmentInfoHelper);
    this.setServiceCode("RETAILEMPLOYMENTINFO");  
}
   protected override doPreInit(): void {
  this.setDataService(this.employmentInfoService);
      this.addFormControl('employmentType', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('subemptype', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('empstatus', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('companyName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('company_Code', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('occupationType', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('industryCode', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('position', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('designation', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('department', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('natureofbus', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('empsoi', '',[ ]   ,[],'blur',1,false);		
      this.addFormControl('annualIncome', '',[ ]   ,[],'blur',1,false);		
      this.addFormControl('taxIdNumber', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('workingSince', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('OperatingSince', '',[ ]   ,[],'blur',1,false);	   		 
      this.addFormControl('userDefinedField1', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('userDefinedField2', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('userDefinedField4', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('userDefinedField3', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('userDefinedField5', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('addressdetail', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('monthlyIncome', '',[ ]   ,[],'blur',1,false);	 	   		 
	this.setServiceCode("RETAILEMPLOYMENTINFO");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

