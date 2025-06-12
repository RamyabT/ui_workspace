import { Component,EventEmitter,Optional, ViewChild} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailViewOffersFormHelper,RetailViewOffersFormState} from './retail-view-offers-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { OfferspublishService } from '../offerspublish-service/offerspublish.service';
import { Offerspublish } from '../offerspublish-service/offerspublish.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

 
 
@Component({
 selector: 'app-retail-view-offers-form',
  templateUrl: './retail-view-offers-form.component.html',
  styleUrls: ['./retail-view-offers-form.component.scss'],
  providers : [ RetailViewOffersFormHelper]
  })

export class RetailViewOffersFormComponent extends  BaseFpxFormComponent<RetailViewOffersFormHelper, RetailViewOffersFormState>  {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
 
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailViewOffersFormHelper: RetailViewOffersFormHelper,
    public offerspublishService: OfferspublishService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailViewOffersFormHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.offerspublishService);
	this.setServiceCode("RETAILVIEWOFFERS");

  }

  protected override doPostInit(): void {
   
  }
  
}
