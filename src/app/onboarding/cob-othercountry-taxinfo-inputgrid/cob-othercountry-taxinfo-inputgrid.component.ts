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
import { COBOtherCountryTaxInfoGridHelper,COBOtherCountryTaxInfoGridState} from './cob-othercountry-taxinfo-inputgrid.helper';
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';
 
@Component({
 selector: 'app-cob-othercountry-taxinfo-inputgrid',
  templateUrl: './cob-othercountry-taxinfo-inputgrid.component.html',
  styleUrls: ['./cob-othercountry-taxinfo-inputgrid.component.scss'],
  providers : [ COBOtherCountryTaxInfoGridHelper,
      {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() =>  COBOtherCountryTaxInfoGridComponent),
      multi: true,
    },
    {
      provide : NG_VALIDATORS,
      useExisting :  COBOtherCountryTaxInfoGridComponent,
      multi : true
    }
     ],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class COBOtherCountryTaxInfoGridComponent extends BaseFpxGridComponent<COBOtherCountryTaxInfoGridHelper, COBOtherCountryTaxInfoGridState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cOBOtherCountryTaxInfoGridHelper: COBOtherCountryTaxInfoGridHelper,
    private changeDetectorRef : ChangeDetectorRef,
    private _appConfig: AppConfigService
  ) {
    super(formBuilder, controlContainer, router, cOBOtherCountryTaxInfoGridHelper,changeDetectorRef);
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
     this.addFormControl('countryOfTax', '',[Validators.required, ],[],'blur',1);  
	this.addElement('countryOfTax_column');  
    this.addElement('countryOfTax_column_header');
  		  	 
     this.addFormControl('taxPayerId', '',[Validators.required, ],[],'blur',1);  
	this.addElement('taxPayerId_column');  
    this.addElement('taxPayerId_column_header');
    this.addFormControl('serial', 1,[Validators.required]);	
    this.addFormControl('taxPayerIdAvailable', '1',[Validators.required]);	
	    // this.setGridColumnWidth([15,40,40,15]);
        // this.setGridWidth(100);
  
   //this.enableRow();
  }
  addMoreCountry(){
    if(this.cOBOtherCountryTaxInfoGridHelper.countryAdded<2 && this.formArray.valid){
     this.addSubFormGroup();
     this.cOBOtherCountryTaxInfoGridHelper.countryAdded +=1;
     this._appConfig.setData("countryAddedCount",this.cOBOtherCountryTaxInfoGridHelper.countryAdded);
    }
  }
  deleteAddedCountry(i:number){
    this.deleteSubFormGroup(i);
    this.cOBOtherCountryTaxInfoGridHelper.countryAdded -=1;
    this._appConfig.setData("countryAddedCount",this.cOBOtherCountryTaxInfoGridHelper.countryAdded);
  }
  
}

