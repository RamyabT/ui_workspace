import { Component,EventEmitter,Optional, ViewChild} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPromotionsFormHelper,RetailPromotionsFormState} from './retail-promotions-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { VideopublishService } from '../videopublish-service/videopublish.service';
import { Videopublish } from '../videopublish-service/videopublish.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

 
 
@Component({
 selector: 'app-retail-promotions-form',
  templateUrl: './retail-promotions-form.component.html',
  styleUrls: ['./retail-promotions-form.component.scss'],
  providers : [ RetailPromotionsFormHelper]
  })

export class RetailPromotionsFormComponent extends  BaseFpxFormComponent<RetailPromotionsFormHelper, RetailPromotionsFormState>  {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;


  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPromotionsFormHelper: RetailPromotionsFormHelper,
    public videopublishService: VideopublishService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailPromotionsFormHelper);
  }
   protected override doPreInit(): void {
    this.setDataService(this.videopublishService);
    this.setServiceCode("RETAILPROMOTIONS");
  }


  protected override doPostInit(): void {
  }
  
}
