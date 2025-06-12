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
import { childreqdocdtlHelper,childreqdocdtlState} from './childreqdocdtl.helper';
 
@Component({
 selector: 'app-childreqdocdtl',
  templateUrl: './childreqdocdtl.component.html',
  styleUrls: ['./childreqdocdtl.component.scss'],
  providers : [ childreqdocdtlHelper,
      {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() =>  childreqdocdtlComponent),
      multi: true,
    },
    {
      provide : NG_VALIDATORS,
      useExisting :  childreqdocdtlComponent,
      multi : true
    }
     ],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class childreqdocdtlComponent extends BaseFpxGridComponent<childreqdocdtlHelper, childreqdocdtlState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public childreqdocdtlHelper: childreqdocdtlHelper,
    private changeDetectorRef : ChangeDetectorRef
  ) {
    super(formBuilder, controlContainer, router, childreqdocdtlHelper,changeDetectorRef);
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
  //    this.addFormControl('inventoryNumber', '',[ ],[],'blur',1);  
	// this.addElement('inventoryNumber_column');  
  //   this.addElement('inventoryNumber_column_header');
  		  	 
  //    this.addFormControl('sInventoryNumber', '',[ ],[],'blur',1);  
	// this.addElement('sInventoryNumber_column');  
  //   this.addElement('sInventoryNumber_column_header');
  		  	 
  //    this.addFormControl('mode', '',[ ],[],'blur',1);  
	// this.addElement('mode_column');  
  //   this.addElement('mode_column_header');
  		  	 
     this.addFormControl('docInvNumber', '',[ ],[],'blur',1);  
	this.addElement('docInvNumber_column');  
    this.addElement('docInvNumber_column_header');
  		  	 
  //    this.addFormControl('tenantId', '',[ ],[],'blur',1);  
	// this.addElement('tenantId_column');  
  //   this.addElement('tenantId_column_header');
  		  	 
     this.addFormControl('fileName', '',[ ],[],'blur',1);  
	this.addElement('fileName_column');  
    this.addElement('fileName_column_header');
  		  	 
     this.addFormControl('serialNo', '',[ ],[],'blur',1);  
	this.addElement('serialNo_column');  
    this.addElement('serialNo_column_header');
  			 
	    // this.setGridColumnWidth([15,40,40,40,40,40,40,40,15]);
        // this.setGridWidth(100);
  
   //this.enableRow();
  }
 

}
