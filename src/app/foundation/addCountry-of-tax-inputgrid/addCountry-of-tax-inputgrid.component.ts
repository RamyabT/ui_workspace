import {ChangeDetectionStrategy, ChangeDetectorRef, forwardRef,Optional} from '@angular/core';
import {Component} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxGridComponent } from '@fpx/core'; 
import { AddCountryOfTaxInputGridHelper,AddCountryOfTaxInputGridState} from './addCountry-of-tax-inputgrid.helper';
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';
import { CobTaxDetailsFormHelper } from 'src/app/onboarding/cob-tax-details-form/cob-tax-details-form.helper';
import { CobtaxdetailsService } from 'src/app/onboarding/cobtaxdetails-service/cobtaxdetails.service';
 
@Component({
 selector: 'app-addCountry-of-tax-inputgrid',
  templateUrl: './addCountry-of-tax-inputgrid.component.html',
  styleUrls: ['./addCountry-of-tax-inputgrid.component.scss'],
  providers : [ AddCountryOfTaxInputGridHelper, CobTaxDetailsFormHelper, CobtaxdetailsService, 
      {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() =>  AddCountryOfTaxInputGridComponent),
      multi: true,
    },
    {
      provide : NG_VALIDATORS,
      useExisting :  AddCountryOfTaxInputGridComponent,
      multi : true
    }
     ],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class AddCountryOfTaxInputGridComponent extends BaseFpxGridComponent<AddCountryOfTaxInputGridHelper, AddCountryOfTaxInputGridState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public addCountryOfTaxInputGridHelper: AddCountryOfTaxInputGridHelper,
    private changeDetectorRef : ChangeDetectorRef, 
    private _appConfig: AppConfigService ) {
    super(formBuilder, controlContainer, router, addCountryOfTaxInputGridHelper,changeDetectorRef);
  }

  protected override doPreInit(): void {
    //this.addRow();
  }

   protected override setGridDefinition(): void {
   console.log('adding row');
   this.addElement('addRowAction');
   this.addElement('deleteAction');
   this.addElement('actions_column');
   this.addElement('actions_column_header'); 
	this.addElement('country_column');  
    this.addElement('country_column_header');
  		  	 
     this.addFormControl('taxPayerId', '',[Validators.required, ],[],'blur',1);  
     this.addFormControl('countryOfTax', '',[Validators.required, ],[],'blur',1);  

	this.addElement('taxPayerId_column');  
    this.addElement('taxPayerId_column_header');

    this.duplicateValidationControls(['countryOfTax']);
  			 
	    // this.setGridColumnWidth([15,40,40,15]);
        // this.setGridWidth(100);
       
   //this.enableRow();
  }
  addMoreCountry(){
    if(this.addCountryOfTaxInputGridHelper.countryAdded<2 && this.formArray.valid){
     this.addSubFormGroup();
     this.addCountryOfTaxInputGridHelper.countryAdded +=1;
     this._appConfig.setData("countryAddedCount",this.addCountryOfTaxInputGridHelper.countryAdded);
    }
  }
  deleteAddedCountry(i:number){
    this.deleteSubFormGroup(i);
    this.addCountryOfTaxInputGridHelper.countryAdded -=1;
    this._appConfig.setData("countryAddedCount",this.addCountryOfTaxInputGridHelper.countryAdded);
  }
 

}
