import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { obvirtualcardselectionHelper,obvirtualcardselectionState} from './ob-virtualcardselection-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { VirtualcardselectionService } from '../virtualcardselection-service/virtualcardselection.service';
import { Virtualcardselection } from '../virtualcardselection-service/virtualcardselection.model';

 
 
@Component({
 selector: 'app-ob-virtualcardselection-form',
  templateUrl: './ob-virtualcardselection-form.component.html',
  styleUrls: ['./ob-virtualcardselection-form.component.scss'],
  providers : [ obvirtualcardselectionHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => obvirtualcardselectionComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => obvirtualcardselectionComponent)
  }]
  })

export class obvirtualcardselectionComponent extends  BaseFpxFormComponent<obvirtualcardselectionHelper, obvirtualcardselectionState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public obvirtualcardselectionHelper: obvirtualcardselectionHelper,
    public virtualcardselectionService: VirtualcardselectionService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, obvirtualcardselectionHelper);
    this.setServiceCode("OBVIRTUALCARDSELECTION");  
}
   protected override doPreInit(): void {
  this.setDataService(this.virtualcardselectionService);
      this.addFormControl('isskipped', '',[ ]   ,[],'blur',1,false);			   		 
	this.addElement('virtualCardTemplate'); 
	this.setServiceCode("OBVIRTUALCARDSELECTION");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

