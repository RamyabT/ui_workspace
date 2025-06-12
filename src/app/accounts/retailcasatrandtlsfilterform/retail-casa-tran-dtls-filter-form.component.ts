import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retailcasatrandtlsfilterformHelper,retailcasatrandtlsfilterformState} from './retail-casa-tran-dtls-filter-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailcasatrandtlsfilterformService } from '../retailcasatrandtlsfilterform-service/retailcasatrandtlsfilterform.service';
import { Retailcasatrandtlsfilterform } from '../retailcasatrandtlsfilterform-service/retailcasatrandtlsfilterform.model';

 
 
@Component({
 selector: 'app-retail-casa-tran-dtls-filter-form',
  templateUrl: './retail-casa-tran-dtls-filter-form.component.html',
  styleUrls: ['./retail-casa-tran-dtls-filter-form.component.scss'],
  providers : [ retailcasatrandtlsfilterformHelper]
  })

export class retailcasatrandtlsfilterformComponent extends  BaseFpxFormComponent<retailcasatrandtlsfilterformHelper, retailcasatrandtlsfilterformState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailcasatrandtlsfilterformHelper: retailcasatrandtlsfilterformHelper,
    public retailcasatrandtlsfilterformService: RetailcasatrandtlsfilterformService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailcasatrandtlsfilterformHelper);
  }
  protected readonly transactionDescription_pattern: any = /^[A-Za-z0-9 \s]{0,30}$/;
  protected readonly transactionDescription_maxLength: any = 30;

  protected  readonly chequeNumber_pattern : any = /^[0-9]{3,3}$/;
  protected  readonly chequeNumber_minLength:any = "3";
  protected readonly chequeNumber_maxLength:any ="3";

   protected override doPreInit(): void {

    this.addFormControl('rangeType', '',  [Validators.required ]    ,[],'blur',1,false,0);

    this.addFormControl('transType', '',  [Validators.required ]    ,[],'blur',1,false,0);

    this.addFormControl('fromDate', '',  [Validators.required ]    ,[],'blur',1,false,0);

    this.addFormControl('toDate', '',  [Validators.required ]    ,[],'blur',1,false,0);	

    this.addFormControl('transactionCategoryId', '',  [Validators.required ]    ,[],'blur',1,false,0);

    this.addFormControl('filterSearch', '',  []    ,[],'blur',1,false,0);
    
    this.addFormControl('transactionDescription', '',  [ Validators.required, Validators.maxLength(this.transactionDescription_maxLength)]    ,[],'blur',1,false,0);		
    this.addFormControl('transactionAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);		
    this.addFormControl('chequeNumber', '',  [ Validators.required,Validators.minLength(this.chequeNumber_minLength), Validators.maxLength(this.chequeNumber_maxLength)]    ,[],'blur',1,false,0);		
    this.addFormControl('confirmationNumber', '',  [ Validators.required]    ,[],'blur',1,false,0);		

	this.addElement('download');
	this.addElement('view');
	this.setDataService(this.retailcasatrandtlsfilterformService);
	 this.setServiceCode("RETAILCASATRANDTLSFILTER");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
