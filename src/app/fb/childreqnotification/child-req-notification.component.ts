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
import { childreqnotificationHelper,childreqnotificationState} from './child-req-notification.helper';
 
@Component({
 selector: 'app-child-req-notification',
  templateUrl: './child-req-notification.component.html',
  styleUrls: ['./child-req-notification.component.scss'],
  providers : [ childreqnotificationHelper,
      {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() =>  childreqnotificationComponent),
      multi: true,
    },
    {
      provide : NG_VALIDATORS,
      useExisting :  childreqnotificationComponent,
      multi : true
    }
     ],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class childreqnotificationComponent extends BaseFpxGridComponent<childreqnotificationHelper, childreqnotificationState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public childreqnotificationHelper: childreqnotificationHelper,
    private changeDetectorRef : ChangeDetectorRef
  ) {
    super(formBuilder, controlContainer, router, childreqnotificationHelper,changeDetectorRef);
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
  		  	 
     this.addFormControl('detailSerial', '',[ ],[],'blur',1);  
	this.addElement('detailSerial_column');  
    this.addElement('detailSerial_column_header');
  		  	 
     this.addFormControl('notificationpref', '',[ ],[],'blur',1);  
	this.addElement('notificationpref_column');  
    this.addElement('notificationpref_column_header');

    this.addFormControl('notificationDesc', '',[ ],[],'blur',1);  
	this.addElement('notificationDesc_column');  
    this.addElement('notificationDesc_column_header');
  		  	 
     this.addFormControl('notificationEnabled', '',[ ],[],'blur',1);  
	this.addElement('notificationEnabled_column');  
    this.addElement('notificationEnabled_column_header');
  			 
	    // this.setGridColumnWidth([15,40,40,40,40,15]);
        // this.setGridWidth(100);
  
   //this.enableRow();
  }
 

}
