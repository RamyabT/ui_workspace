import { Component, EventEmitter, forwardRef, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressDetailFormHelper,AddressDetailFormState} from './address-detail-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { AddressdetailService } from '../addressdetail-service/addressdetail.service';
import { Addressdetail } from '../addressdetail-service/addressdetail.model';

 
 
@Component({
   selector: 'app-address-detail-form',
    templateUrl: './address-detail-form.component.html',
    styleUrls: ['./address-detail-form.component.scss'],
    providers : [ AddressDetailFormHelper,{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressDetailFormComponent),
      multi: true,
      }]
  })

export class AddressDetailFormComponent extends  BaseFpxFormComponent<AddressDetailFormHelper, AddressDetailFormState>  {
    constructor(
      @Optional() controlContainer: ControlContainer,
      formBuilder: FormBuilder,
      private router: Router,
      public addressDetailFormHelper: AddressDetailFormHelper,
      public addressdetailService: AddressdetailService,
      private validatorService: ValidatorService,
      
    ) {
        super(formBuilder, router,controlContainer, addressDetailFormHelper);
    }
     protected override doPreInit(): void {
    this.addFormControl('addressLine1', '', [Validators.required,Validators.minLength(3),Validators.maxLength(35)], [], 'blur', 1, false);
    this.addFormControl('addressLine2', '', [Validators.required,Validators.minLength(3),Validators.maxLength(35)], [], 'blur', 1, false);
    this.addFormControl('addressLine3', '', [Validators.minLength(3),Validators.maxLength(35)], [], 'blur', 1, false);
    this.addFormControl('homeOwnership', '', [], [], 'blur', 1, false);
    this.addFormControl('country', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('region', '', [], [], 'blur', 1, false);
    this.addFormControl('states', '', [], [], 'change', 1, false);
    this.addFormControl('district', '', [], [], 'blur', 1, false);
    this.addFormControl('city', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('town', '', [], [], 'blur', 1, false);
    this.addFormControl('zipCode', '', [Validators.required,Validators.minLength(4),Validators.maxLength(8)], [], 'blur', 1, false);
    this.addFormControl('iSOCodeList', '', [], [], 'blur', 1, false);
    this.addFormControl('landlineNumber', '', [], [], 'blur', 1, false);
    this.addFormControl('extensionNumber', '', [], [], 'blur', 1, false);
    this.addFormControl('udf1', '', [Validators.minLength(3), Validators.maxLength(100)], [], 'blur', 1, false);
    this.addFormControl('udf2', '', [Validators.minLength(3), Validators.maxLength(100)], [], 'blur', 1, false);
    this.addFormControl('udf3', '', [Validators.minLength(3), Validators.maxLength(100)], [], 'blur', 1, false);
    // this.addFormControl('iSOCodeList', '',[ ]   ,[],'blur',1,false);			   		 
    // this.addFormControl('landlineNumber', '',[ ]   ,[],'blur',1,false);			   		 
    // this.addFormControl('extensionNumber', '',[ ]   ,[],'blur',1,false);	
    // this.addFormControl('addressType', '', [], [], 'blur', 1, false);
      
    	this.setDataService(this.addressdetailService);
    	 this.setServiceCode("CASAONBOARDING");
    
    }
    
  
    protected override doPostInit(): void {
       
    }
    
}

