import { Component, ComponentRef, ElementRef, inject, OnInit, Optional, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { BaseFpxFormComponent, FpxAppConfig, FpxModal, FpxModalAfterClosed, ValidatorService } from '@fpx/core';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { RetailSetpermissionsFormHelper, RetailSetpermissionsFormState } from './retail-setpermissions-form.helper';
import { RetailUserccrestrictionreqInputGridComponent } from '../retail-usercasarestrictionreq-input-grid/retail-usercasarestrictionreq-input-grid.component';
import { UserrestrictionreqService } from '../userrestrictionreq-service/userrestrictionreq.service';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { APPCONSTANTS } from '@dep/constants';

@Component({
  selector: 'app-retail-setpermissions-form',
  templateUrl: './retail-setpermissions-form.component.html',
  styleUrls: ['./retail-setpermissions-form.component.scss'],
  providers: [RetailSetpermissionsFormHelper]
})
export class RetailSetpermissionsFormComponent extends  BaseFpxFormComponent<RetailSetpermissionsFormHelper, RetailSetpermissionsFormState>  {
  // @ViewChild("RetailMultiBillRequestInputGrid") RetailMultiBillRequestInputGrid: ComponentRef<RetailUserccrestrictionreqInputGridComponent> | any;
  @ViewChild('entryForm', { read: ElementRef }) entryForm!: ElementRef;

  protected footerWidth : number = 0;
  showFooter: boolean = false;
  appConstant: any;
  // activeTab: number = 0;
  mycount: number = 0;
  isMaker: boolean = false;

  
  tabDetails: any[] = [
    {
      name: 'Accounts'
    },
    {
      name: 'Deposits'
    },
    {
      name: 'Loan'
    },
    {
      name: 'Credit Card'
    },
    {
      name: 'Debit Card'
    },
    {
      name: 'Prepaid Card'
    }];

  quickLinks: any;
  favBenes: any;
  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);

  //external filter config.
  filterComponentMap: Map<number, any> = new Map<number, any>();
  gridCriteriaMap: Map<number, any> = new Map<number, any>();
  isFilterOpened: boolean = false;
  
  tabList = ["RETAILCASADELEGATE", "RETAILDEPDELEGATE", "RETAILLOANDELEGATE", "RETAILCCDELEGATE","RETAILDCDELEGATE","RETAILPCDELEGATE"];

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailSetpermissionsFormHelper: RetailSetpermissionsFormHelper,
    public userrestrictionreqService: UserrestrictionreqService,
    private validatorService: ValidatorService,
    private _activedRouter: ActivatedRoute,
    private _appConfig: AppConfigService
  ) {
    super(formBuilder, router,controlContainer, retailSetpermissionsFormHelper);
    this.setServiceCode("RETAILDELEGATEUSER");
    _activedRouter.queryParams.subscribe((params:any) => {
    });
  }

  protected override doPreInit(): void {
    this.appConstant = APPCONSTANTS;
    this.setDataService(this.userrestrictionreqService);
    this.addFormControl('hiddenField', '1',  []    ,[],'change',1,false,0);	

    this.addFormControl('customerCode', '',  []    ,[],'blur',1,false,);		
    this.addFormControl('userId', '',  []    ,[],'blur',1,false,);		
    this.addFormControl('delegateInvNo', '',  []    ,[],'blur',1,false,);		
    this.addFormControl('operationMode', '',  []    ,[],'blur',1,false,);		

    this.addFormControl('usercasarestriction', '',  []    ,[],'blur',1,false,);		
    this.addFormControl('userdeprestriction', '',  []    ,[],'blur',1,false,);		
    this.addFormControl('userloanrestriction', '',  []    ,[],'blur',1,false,);		
    this.addFormControl('userdcrestriction', '',  []    ,[],'blur',1,false,);	
    this.addFormControl('userccrestriction', '',  []    ,[],'blur',1,false,);		
    this.addFormControl('userpcrestriction', '',  []    ,[],'blur',1,false,);		
	
    this.setServiceCode("RETAILDELEGATEUSER");

  }


  protected override doPostInit(): void {
    this.footerWidth = this.entryForm?.nativeElement?.clientWidth;
  }

  showFooterSection(event: any) {
    this.showFooter = event;
    this.formGroup.updateValueAndValidity();
    // this._helper.reCheckForm();
  }

  onCancelClick() {
    // this.RetailMultiBillRequestInputGrid.onCancel();
  }
  
  //set InputAction for respective Tabs
  setUpCommonInput(action: string) {
   
  }

  tabChanged(event: any) {
    // this.activeTab = event.index;
  }

  currGridData() {
    // if (this.activeTab == 0) return "CORPTRANCOMPLETED";
    // else if (this.activeTab == 1) return "PENDINGTRAN";
    // else if (this.activeTab == 2) return "SCHEDULETRAN";
    // else if (this.activeTab == 3) return "REJECTEDTRAN";
    // else return console.log("invalid data");
  }

  
  _onAfterQuickLinksModalClose: FpxModalAfterClosed = (payload: any) => {

  }
  quickRoutes(route: any) {
    let serviceCode = route.id;
    let service = this._serviceCodeDetails.getServiceDetails(serviceCode);
    this.router.navigate(service.servicePath, {
      queryParams: {
        ...service.queryParams,
      }
    });
  }

  submitForm(){

  }
  

}
