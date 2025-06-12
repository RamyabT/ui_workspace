import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailManageAuthenticatedDeviceFormHelper,RetailManageAuthenticatedDeviceFormState} from './retail-manage-authenticated-device-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UserdeviceService } from '../userdevice-service/userdevice.service';
import { Userdevice } from '../userdevice-service/userdevice.model';

 
 
@Component({
 selector: 'app-retail-manage-authenticated-device-form',
  templateUrl: './retail-manage-authenticated-device-form.component.html',
  styleUrls: ['./retail-manage-authenticated-device-form.component.scss'],
  providers : [ RetailManageAuthenticatedDeviceFormHelper]
  })

export class RetailManageAuthenticatedDeviceFormComponent extends  BaseFpxFormComponent<RetailManageAuthenticatedDeviceFormHelper, RetailManageAuthenticatedDeviceFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailManageAuthenticatedDeviceFormHelper: RetailManageAuthenticatedDeviceFormHelper,
    public userdeviceService: UserdeviceService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailManageAuthenticatedDeviceFormHelper);
  }
   protected override doPreInit(): void {
    this.addElement('noManageMyDeviceGridGroup');
    this.addElement('manageMyDeviceGridGroup');
    this.addElement('manageMyDeviceGrid');
	this.setDataService(this.userdeviceService);
	this.setServiceCode("MANAGEAUTHDEVICE");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
