import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailNPSSProxyHelper,RetailNPSSProxyState} from './retail-npss-proxy.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NpssproxyService } from '../npssproxy-service/npssproxy.service';
import { Npssproxy } from '../npssproxy-service/npssproxy.model';

 
 
@Component({
 selector: 'app-retail-npss-proxy',
  templateUrl: './retail-npss-proxy.component.html',
  styleUrls: ['./retail-npss-proxy.component.scss'],
  providers : [ RetailNPSSProxyHelper]
  })

export class RetailNPSSProxyComponent extends  BaseFpxFormComponent<RetailNPSSProxyHelper, RetailNPSSProxyState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailNPSSProxyHelper: RetailNPSSProxyHelper,
    public npssproxyService: NpssproxyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailNPSSProxyHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('email', '',  [Validators.required ]    ,[],'blur',1,false,0);	
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			
     this.addElement('FieldId_1');
     this.addElement('FieldId_2');   		 
	this.setDataService(this.npssproxyService);
	this.setServiceCode("RETAILNPSSPROXY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
