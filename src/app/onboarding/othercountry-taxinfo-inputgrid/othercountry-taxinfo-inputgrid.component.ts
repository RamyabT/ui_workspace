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
import { othercountrytaxinfoHelper,othercountrytaxinfoState} from './othercountry-taxinfo-inputgrid.helper';
 
@Component({
 selector: 'app-othercountry-taxinfo-inputgrid',
  templateUrl: './othercountry-taxinfo-inputgrid.component.html',
  styleUrls: ['./othercountry-taxinfo-inputgrid.component.scss'],
  providers : [ othercountrytaxinfoHelper,
      {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() =>  othercountrytaxinfoComponent),
      multi: true,
    },
    {
      provide : NG_VALIDATORS,
      useExisting :  othercountrytaxinfoComponent,
      multi : true
    }
     ],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class othercountrytaxinfoComponent extends BaseFpxGridComponent<othercountrytaxinfoHelper, othercountrytaxinfoState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public othercountrytaxinfoHelper: othercountrytaxinfoHelper,
    private changeDetectorRef : ChangeDetectorRef
  ) {
    super(formBuilder, controlContainer, router, othercountrytaxinfoHelper,changeDetectorRef);
  }


  protected override doPreInit(): void {
    //this.addRow();
  }

   protected override setGridDefinition(): void {
   console.log('adding row');
   this.addFormControl('serial', 1,[Validators.required]);	
   this.addFormControl('taxPayerIdAvailable', '1',[Validators.required]);	
   this.addFormControl('country', '',[Validators.required]);	
  		  	 
  		this.addFormControl('taxPayerId', '',[]);	
  			 
	    // this.setGridColumnWidth([15,40,40,15]);
        // this.setGridWidth(100);
  
   //this.enableRow();
  }
 

}
