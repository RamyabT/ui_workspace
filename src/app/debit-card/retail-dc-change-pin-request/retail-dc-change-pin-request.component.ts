import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { dcpinrequestHelper,dcpinrequestState} from './retail-dc-change-pin-request.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DcpinrequestService } from '../dcpinrequest-service/dcpinrequest.service';
import { Dcpinrequest } from '../dcpinrequest-service/dcpinrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-dc-change-pin-request',
  templateUrl: './retail-dc-change-pin-request.component.html',
  styleUrls: ['./retail-dc-change-pin-request.component.scss'],
  providers : [ dcpinrequestHelper]
  })

export class dcpinrequestComponent extends  BaseFpxFormComponent<dcpinrequestHelper, dcpinrequestState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public dcpinrequestHelper: dcpinrequestHelper,
    public dcpinrequestService: DcpinrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, dcpinrequestHelper);
  }
  protected readonly remarks_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly remarks_minLength: any = 3;
  protected readonly remarks_maxLength: any = 100;
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('confirmPin', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('pin', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('reenteredPin', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.minLength(this.remarks_minLength), Validators.maxLength(this.remarks_maxLength)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'change',1,false,0);		
     this.addElement('infoNote');
     this.addElement('line')
      		 
	this.setDataService(this.dcpinrequestService);
	this.setServiceCode("RETAILDCCHANGEPIN");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
