import { ChangeDetectorRef, Inject, Injectable, Renderer2 } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup, Validators } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal,
  CriteriaQuery,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { EtransfercontactlogService } from '../etransfercontactlog-service/etransfercontactlog.service';
import { Etransfercontactlog } from '../etransfercontactlog-service/etransfercontactlog.model';
import { APPCONSTANTS } from "@dep/constants";
import { EtransfercontactService } from "../etransfercontact-service/etransfercontact.service";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { AppConfigService, LanguageService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { ETransferConfirmationReceiptFormComponent } from "../etransfer-confirmation-receipt-form/etransfer-confirmation-receipt-form.component";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PhoneBookService } from "@dep/native";
import { Contact } from "@ionic-native/contacts/ngx";

export class RetailEtransfercontactlogFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  mode: any;
  beneId: any;
  serviceCode: any;
  firstName: any;
  emailId: any;
  phoneNumber: any;
  notificationPreference: any;
  preferredLang: any;
  contactId: any
  contact: any;
  reviewMode: boolean = false;
  dateTime: any
  createContact: any;
}


@Injectable()
export class RetailEtransfercontactlogFormHelper extends BaseFpxFormHelper<RetailEtransfercontactlogFormState> {


  constructor(private retailEtransfercontactlogFormService: EtransfercontactlogService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private EtransfercontactService: EtransfercontactService,
    private _appConfig: AppConfigService,
    public device: DeviceDetectorService,
    private momentService: MomentService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,
    private _phoneBookService: PhoneBookService,
    private cd: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
    private renderer2: Renderer2,
    private _languageService: LanguageService
  ) {
    super(new RetailEtransfercontactlogFormState());
    activeRoute.queryParams.subscribe((params: any) => {
      if (params && params.refreshAddContact) {
        this.backToEntryMode();
        this.formGroup.reset();
        this.state.mode = '';
        this.state.beneId = '';
        this.state.contactId = '';
        this.state.contact = '';
        this.state.firstName = '';
        this.state.emailId = '';
        this.state.phoneNumber = '';
        this.state.notificationPreference = '';
        this.state.preferredLang = '';
        this.state.reviewMode = false;
        this.state.createContact = null;
        this.setServiceCode("RETAILETRANSFERMANAGECONTACT");
        this.state.beneId = this.getRoutingParam('beneId') || this._appConfig.getData('selectedContactQueryParams')?.beneId;
        this.state.mode = this.getRoutingParam('mode') || this._appConfig.getData('selectedContactQueryParams')?.mode;
        this._appConfig.removeData('selectedContactQueryParams');
        this.handleFormOnLoad();
        let navBack = this.device.isMobile() ? ['etransfers-space'] : ['etransfers-space/etransfers/etransfers-home'];
        this._appConfig.setData('navBack', navBack);
      }
    });
  }

  override doPreInit(): void {
    this.state.mode = '';
    this.state.beneId = '';
    this.state.contactId = '';
    this.state.contact = '';
    this.state.firstName = '';
    this.state.emailId = '';
    this.state.phoneNumber = '';
    this.state.notificationPreference = '';
    this.state.preferredLang = '';
    this.state.reviewMode = false;
    this.state.createContact = null;
    this.setServiceCode("RETAILETRANSFERMANAGECONTACT");
    this.state.beneId = this.getRoutingParam('beneId') || this._appConfig.getData('selectedContactQueryParams')?.beneId;
    this.state.mode = this.getRoutingParam('mode') || this._appConfig.getData('selectedContactQueryParams')?.mode;
    // this._appConfig.removeData('selectedContactQueryParams');
  }

  public handleFormOnLoad(modidyDataAvailable: boolean = false) {
    let routingParam: any = this.getRoutingParam();
    this.setHidden('beneId', true);
    this.setHidden('confirmSecurityAnswer', true);
    this.setHidden('securityAnswer', true);
    this.setHidden('securityQuestion', true);
    // this._appConfig.setData('navBack', ['etransfers-space']);
    // if (this.state.mode == 'V') {
    //   this.removeShellBtn('BACK');
    //   this.setReadonly('emailId', true);
    //   this.setReadonly('phoneNumber', true);
    //   if (this.getValue('notificationPreference') == 'P') {
    //     this.formGroup.get('phoneNumber')?.addValidators(Validators.required);
    //     this.formGroup.get('emailId')?.removeValidators(Validators.required);
    //     this.formGroup.get('emailId')?.updateValueAndValidity();
    //     this.formGroup.get('phoneNumber')?.updateValueAndValidity();
    //     this.setLabel('emailId', 'RetailEtransfercontactlogForm.emailId.label1');
    //     this.setLabel('phoneNumber', 'RetailEtransfercontactlogForm.phoneNumber.label');
    //   }
    //   else if (this.getValue('notificationPreference') == 'E') {
    //     this.formGroup.get('emailId')?.addValidators(Validators.required);
    //     this.formGroup.get('phoneNumber')?.removeValidators(Validators.required);
    //     this.formGroup.get('emailId')?.updateValueAndValidity();
    //     this.formGroup.get('phoneNumber')?.updateValueAndValidity();
    //     this.setLabel('emailId', 'RetailEtransfercontactlogForm.emailId.label');
    //     this.setLabel('phoneNumber', 'RetailEtransfercontactlogForm.phoneNumber.label1');
    //   }
    // }
    if (this.state.beneId && this.state.mode) {
      if (this.state.mode == 'D' || this.state.mode == 'M') {
        this.setFormTitle("");
        this.setHidden('addMobileContact', true);
        this.addShellButton('Delete', 'DELETE', 'secondary', 'ENTRY', 'button');
        this.setShellBtnMethod('DELETE', this.deleteContact.bind(this));

        if (this.state.mode == 'M') {
          setTimeout(() => {
            const element: any = document.getElementById('fpx_shell_next_button');
            while (element.firstChild) {
              this.renderer2.removeChild(element, element.firstChild);
            }

            // Create a text node with the label
            const text = this.renderer2.createText(
              this._languageService.getLabel('RetailEtransfercontactlogForm.update')
            );

            // Append the text node to the element
            this.renderer2.appendChild(element, text);
          });
        }

        routingParam.beneId = this.state.beneId;
        if(modidyDataAvailable && this.state.createContact){
          this.patchForm(this.state.createContact);
        }
        else{
          this.retailEtransfercontactlogFormService.findByKey(routingParam)().subscribe((res) => {
            this.patchForm(res);
          })
        }
      };
    }
    else {
      this.setValue('notificationPreference', 'E');
      this.setValue('preferredLanguage', '1');
      this.setHidden('hiddenField', true);
    }
    this.removeShellBtn('RESET');
  }
  patchForm(res: Etransfercontactlog | null) {
    this.state.firstName = res?.firstName;
    this.state.notificationPreference = res?.notificationPreference;
    this.state.emailId = res?.emailId;
    this.state.phoneNumber = res?.phoneNumber;
    this.state.preferredLang = res?.preferredLanguage;
    this.state.contactId = res?.contactId;
    this.state.contact =res;
    if (this.state.mode == 'D' && res) {
      this.setValue('firstName', res.firstName);
      this.setValue('emailId', res.emailId);
      this.setValue('phoneNumber', res.phoneNumber);
      this.setValue('notificationPreference', res.notificationPreference);
      this.setValue('securityQuestion', res.securityQuestion);
      this.setValue('securityAnswer', res.securityAnswer);
      this.setReadonly("firstName", true);
      this.setReadonly("emailId", true);
      this.setReadonly("phoneNumber", true);
      this.setReadonly("notificationPreference", true);
      this.setReadonly("securityQuestion", true);
      this.setReadonly("securityAnswer", true);
      this.setHidden("confirmSecurityAnswer", true);
    }
    else if (this.state.mode == 'M' && res) {
      let modifyContact = ['RetailEtransfercontactlogForm.modifyContact'];
      this.setValue('firstName', res?.firstName);
      this.setValue('notificationPreference', res?.notificationPreference);
      this.setValue('emailId', res?.emailId);
      this.setValue('phoneNumber', res?.phoneNumber);
      this.setValue('preferredLanguage', res?.preferredLanguage);
    }

    setTimeout(() => {
      this.setFormTitle("");
    });
  }
  deleteContact() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
    modal.setDisableClose(true);
    modal.setData({
      title: "Delete contact?",
      message: "RetailEtransfercontactlogForm.deleteContactPopupMsg",
      okBtnLbl: "Yes, delete",
      cancelBtnLbl: "No",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }
  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    if (payload == 0) {
    }
    else {
      this.state.mode ='D';
      this.setHidden('hiddenField',true);
      this.setHidden('emailId',true);
      if(this.device.isMobile()){
        this.triggerSubmit();
      }
      else{
        let payload = this.handleFormOnPresubmit(this.formGroup.value);
        payload.contactId = this.state.contactId;
        this.showSpinner();
        this.retailEtransfercontactlogFormService.create(payload)().subscribe((res)=>{
          this.hideSpinner();
          this.state.dateTime = this.momentService.getInstance().format("YYYY-MM-DD HH:mm:ss");
          this._angularRouter.navigate(['etransfers-space','entry-shell','etransfers','etransfer-confirmation-receipt'],
            {
              queryParams: {
                serviceCode: "RETAILETRANSFERMANAGECONTACT"
              }
            }
          );
          let modal = new FpxModal();
          modal.setComponent(ETransferConfirmationReceiptFormComponent);
          modal.setPanelClass("dep-alert-popup");
          modal.setDisableClose(true);
          modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','etransfers-contacts-backdrop']);
          modal.setAfterClosed(this.contextmenuModelAfterClose1);
          modal.setData({
            _requestServiceCode:"RETAILETRANSFERMANAGECONTACT",
            _requestStatus: "SuccessEnd_D",
            currentDate: this.state.dateTime
          });
          this.openModal(modal);
        })
      }
    }

  }
  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (this.device.isMobile()) {
      this._angularRouter.navigate(['etransfers-space'], {
        queryParams: {
          refresh: "Y"
        }
      });
    } else {
      if (this._appConfig.hasData('closeContactForm$')) {
        this._appConfig.getData('closeContactForm$').subject.next({
          showContactForm: false,
        });
      }
      // this._angularRouter.navigate(['etransfers-space/etransfers/etransfers-home'], {
      //   queryParams: {
      //     refresh: "Y"
      //   }
      // });
    }
    this._dialogRef.close();
  }

  updateContact() {
    let payload = this.handleFormOnPresubmit(this.formGroup.value);
    this.showSpinner();
    if(this.state.mode == 'M'){
      if(payload.notificationType != 'P' && payload.phoneNumber == ''){
        delete payload.phoneNumber;
      }
      else if(payload.notificationType != 'E' && payload.emailId == ''){
        delete payload.emailId;
      }
    }
    this.retailEtransfercontactlogFormService.create(payload)().subscribe((res)=>{
      this.hideSpinner();
      this.state.dateTime = this.momentService.getInstance().format("YYYY-MM-DD HH:mm:ss");
      this._angularRouter.navigate(['etransfers-space','entry-shell','etransfers','etransfer-confirmation-receipt'],
        {
          queryParams: {
            serviceCode: "RETAILETRANSFERMANAGECONTACT"
          }
        }
      );
      let modal = new FpxModal();
      modal.setComponent(ETransferConfirmationReceiptFormComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setDisableClose(true);
      modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','etransfers-contacts-backdrop']);
      modal.setAfterClosed(this.contextmenuModelAfterClose1);
      modal.setData({
        _requestServiceCode:"RETAILETRANSFERMANAGECONTACT",
        _requestStatus: "SuccessEnd_M",
        currentDate: this.state.dateTime
      });
      this.openModal(modal);
    })
  }
  // override onReview(): void {
  //   this.removeShellBtn('BACK');
  // }
  public onNameValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value && value?.includes('')) {
      this.setValue('firstName', value.trim());
    }
    if (value) {
      if (this.state.mode == 'M') {
        this.showSpinner();
        if (value != this.state.firstName) {
          const criteriaQuery: CriteriaQuery = new CriteriaQuery();
          criteriaQuery.addFilterCritertia('firstName', 'String', 'equals', {
            searchText: value
          });
          criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' })
          this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
            next: (res) => {
              this.hideSpinner();
              if (res) {
                for (let i = 0; i <= res.data.length; i++) {
                  if (res?.data[i].firstName == value) {
                    this.setErrors('firstName', 'duplicate');
                  }
                }
              }
            },
            error: (err) => {
              this.hideSpinner();
            },
            complete: () => {
              this.hideSpinner();
            }
          })
        }
        if (this.state.firstName != value ||
          this.state.phoneNumber != this.formGroup.controls['phoneNumber'].value ||
          this.state.emailId != this.formGroup.controls['emailId'].value ||
          this.state.preferredLang != this.formGroup.controls['preferredLanguage'].value ||
          this.state.notificationPreference != this.formGroup.controls['notificationPreference'].value) {
          this.setHidden("hiddenField", true);
        }
        else {
          this.setHidden("hiddenField", false);
        }
      }
      else {
        this.showSpinner();
        const criteriaQuery: CriteriaQuery = new CriteriaQuery();
        criteriaQuery.addFilterCritertia('firstName', 'String', 'equals', {
          searchText: value
        });
        criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' })
        this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
          next: (res) => {
            this.hideSpinner();
            if (res) {
              for (let i = 0; i <= res.data.length; i++) {
                if (res?.data[i]?.firstName == value) {
                  this.setErrors('firstName', 'duplicate');
                }
              }
            }
          },
          error: (err) => {
            this.hideSpinner();
          },
          complete: () => {
            this.hideSpinner();
          }
        })
      }
    }
  }

  public onEmailIdValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (this.state.mode == 'M') {
        if (value != this.state.emailId) {
          this.showSpinner();
          const criteriaQuery: CriteriaQuery = new CriteriaQuery();
          criteriaQuery.addFilterCritertia('emailId', 'String', 'equals', {
            searchText: value
          });
          criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' })
          this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
            next: (res) => {
              this.hideSpinner();
              if (res) {
                for (let i = 0; i <= res.data.length; i++) {
                  if (res?.data[i]?.emailId == value) {
                    this.setErrors('emailId', 'duplicate');
                  }
                }
              }
            },
            error: (err) => {
              this.hideSpinner();
            },
            complete: () => {
              this.hideSpinner();
            }
          })
        }
        if (this.state.firstName != this.formGroup.controls['firstName'].value ||
          this.state.phoneNumber != this.formGroup.controls['phoneNumber'].value ||
          this.state.emailId != value ||
          this.state.preferredLang != this.formGroup.controls['preferredLanguage'].value ||
          this.state.notificationPreference != this.formGroup.controls['notificationPreference'].value) {
          this.setHidden("hiddenField", true);
        }
        else {
          this.setHidden("hiddenField", false);
        }
      }
      else {
        this.showSpinner();
        const criteriaQuery: CriteriaQuery = new CriteriaQuery();
        criteriaQuery.addFilterCritertia('emailId', 'String', 'equals', {
          searchText: value
        });
        criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' })
        this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
          next: (res) => {
            this.hideSpinner();
            if (res) {
              for (let i = 0; i <= res.data.length; i++) {
                if (res?.data[i]?.emailId == value) {
                  this.setErrors('emailId', 'duplicate');
                }
              }
            }
          },
          error: (err) => {
            this.hideSpinner();
          },
          complete: () => {
            this.hideSpinner();
          }
        })
      }
    }
  }
  public onPhoneNumberValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (this.state.mode == 'M') {
        if (value != this.state.phoneNumber) {
          this.showSpinner();
          const criteriaQuery: CriteriaQuery = new CriteriaQuery();
          criteriaQuery.addFilterCritertia('phoneNumber', 'String', 'equals', {
            searchText: value
          });
          criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' })
          this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
            next: (res) => {
              this.hideSpinner();
              if (res) {
                for (let i = 0; i <= res.data.length; i++) {
                  if (res?.data[i]?.phoneNumber == value) {
                    this.setErrors('phoneNumber', 'duplicate');
                  }
                }
              }
            },
            error: (err) => {
              this.hideSpinner();
            },
            complete: () => {
              this.hideSpinner();
            }
          })
        }
        if (this.state.firstName != this.formGroup.controls['firstName'].value ||
          this.state.phoneNumber != value ||
          this.state.emailId != this.formGroup.controls['emailId'].value ||
          this.state.preferredLang != this.formGroup.controls['preferredLanguage'].value ||
          this.state.notificationPreference != this.formGroup.controls['notificationPreference'].value) {
          this.setHidden("hiddenField", true);
        }
        else {
          this.setHidden("hiddenField", false);
        }
      }
      else {
        this.showSpinner();
        const criteriaQuery: CriteriaQuery = new CriteriaQuery();
        criteriaQuery.addFilterCritertia('phoneNumber', 'String', 'equals', {
          searchText: value
        });
        criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' })
        this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
          next: (res) => {
            this.hideSpinner();
            if (res) {
              for (let i = 0; i <= res.data.length; i++) {
                if (res?.data[i]?.phoneNumber == value) {
                  this.setErrors('phoneNumber', 'duplicate');
                }
              }
            }
          },
          error: (err) => {
            this.hideSpinner();
          },
          complete: () => {
            this.hideSpinner();
          }
        })
      }
    }
  }

  public handleFormOnPresubmit(payload: any) {

    // WRITE CODE HERE TO HANDLE
    if (this.state.mode == 'M') {
      payload.operationMode = "M";
      payload.beneId = this.state.beneId;
      payload.contactId = this.state.contactId;
    }
    else if (this.state.mode == 'D') {
      payload.beneId = this.state.beneId;
      payload.operationMode = this.state.mode;
      payload.contactId = this.state.contactId;
    }
    else {
      payload.operationMode = 'A';
    }
    return payload;
  }

  public handlenotificationPreferenceOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (this.state.mode == 'M') {
        if (this.state.firstName != this.formGroup.controls['firstName'].value ||
          this.state.phoneNumber != this.formGroup.controls['phoneNumber'].value ||
          this.state.emailId != this.formGroup.controls['emailId'].value ||
          this.state.preferredLang != this.formGroup.controls['preferredLanguage'].value ||
          this.state.notificationPreference != value) {
          this.setHidden("hiddenField", true);
        }
        else {
          this.setHidden("hiddenField", false);
        }
      }
      if (value) {
        if (value == 'P') {
          this.formGroup.get('phoneNumber')?.addValidators(Validators.required);
          this.formGroup.get('emailId')?.removeValidators(Validators.required);
          // if(this.formGroup.controls['emailId'].status=='INVALID'){
          //   this.reset('emailId');
          //   this.setValue('emailId', this.state.emailId);
          // }
          // if(this.formGroup.controls['phoneNumber'].status=='INVALID'){
          //   this.reset('phoneNumber');
          //   this.setValue('phoneNumber', this.state.phoneNumber);
          // }
          this.setLabel('emailId', 'RetailEtransfercontactlogForm.emailId.label1');
          this.setLabel('phoneNumber', 'RetailEtransfercontactlogForm.phoneNumber.label');
          if (this.getValue('phoneNumber') == '') {
            // this.setValue('phoneNumber', this.state.phoneNumber);
          }
        }
        else if (value == 'E') {
          this.formGroup.get('emailId')?.addValidators(Validators.required);
          this.formGroup.get('phoneNumber')?.removeValidators(Validators.required);
          // if(this.formGroup.controls['emailId'].status=='INVALID'){
          //   this.reset('emailId');
          //   this.setValue('emailId', this.state.emailId);
          // }
          // if(this.formGroup.controls['phoneNumber'].status=='INVALID'){
          //   this.reset('phoneNumber');
          //   this.setValue('phoneNumber', this.state.phoneNumber);
          // }
          
          this.setLabel('emailId', 'RetailEtransfercontactlogForm.emailId.label');
          this.setLabel('phoneNumber', 'RetailEtransfercontactlogForm.phoneNumber.label1');
          if (this.getValue('emailId') == '') {
            // this.setValue('emailId', this.state.emailId);
          }
        }
        let emailHasDuplicateError = this.formGroup.get('emailId')?.errors?.['duplicate'] == 'true'?true:false;
        let phoneHasDuplicateError = this.formGroup.get('phoneNumber')?.errors?.['duplicate'] == 'true'?true:false;
        this.formGroup.get('emailId')?.updateValueAndValidity();
        this.formGroup.get('phoneNumber')?.updateValueAndValidity();

        if(emailHasDuplicateError){
          this.setErrors('emailId', 'duplicate');
        }
        if(phoneHasDuplicateError){
          this.setErrors('phoneNumber', 'duplicate');
        }
      }
    }
  }
  public handlePreferredLanguageOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (this.state.mode == 'M') {
      if (this.state.firstName != this.formGroup.controls['firstName'].value ||
        this.state.phoneNumber != this.formGroup.controls['phoneNumber'].value ||
        this.state.emailId != this.formGroup.controls['emailId'].value ||
        this.state.preferredLang != value ||
        this.state.notificationPreference != this.formGroup.controls['notificationPreference'].value) {
        this.setHidden("hiddenField", true);
      }
      else {
        this.setHidden("hiddenField", false);
      }
    }
  }

  public override doPostInit(): void {
    this.setVariable('serviceCode', "RETAILETRANSFERMANAGECONTACT");
    this.addValueChangeHandler("firstName", this.onNameValueChange);
    this.addValueChangeHandler("notificationPreference", this.handlenotificationPreferenceOnvalueChange);
    this.addValueChangeHandler("emailId", this.onEmailIdValueChange);
    this.addValueChangeHandler("phoneNumber", this.onPhoneNumberValueChange);
    this.addValueChangeHandler("preferredLanguage", this.handlePreferredLanguageOnvalueChange);
    if(this.state.mode != 'M' && this.state.mode != 'D'){
      this.handleFormOnLoad();
    }
    if(this.device.isMobile() && (this.state.mode == 'M' || this.state.mode == 'D')){
      this.state.createContact = this.getRoutingParam('contact') || this._appConfig.getData('selectedContactQueryParams')?.contact;
      this.reintiateForm();
    }
    if (this._appConfig.hasData('showContactForm$')) {
      this._appConfig.getData('showContactForm$').observable.subscribe(
        (res: any) => {
          console.log("selectedScheduleBill", res);
          this.state.createContact = res?.contact;
          if(this.state.createContact) this.reintiateForm();
        }
      );
    }
  }
  reintiateForm() {
    this.formGroup.reset();
    this.state.mode = '';
    this.state.beneId = '';
    this.state.contactId = '';
    this.state.contact = '';
    this.state.firstName = '';
    this.state.emailId = '';
    this.state.phoneNumber = '';
    this.state.notificationPreference = '';
    this.state.preferredLang = '';
    this.state.reviewMode = false;
    this.setServiceCode("RETAILETRANSFERMANAGECONTACT");
    this.state.beneId = this.getRoutingParam('beneId') || this._appConfig.getData('selectedContactQueryParams')?.beneId;
    this.state.mode = this.getRoutingParam('mode') || this._appConfig.getData('selectedContactQueryParams')?.mode;
    // this._appConfig.removeData('selectedContactQueryParams');
    this.handleFormOnLoad(true);
  }

  override onReview(): void {
    this.state.reviewMode = true;
    this.setHidden('contactTitle', true);
    if (!this.getValue('emailId')) {
      this.setHidden('emailId', true);
    }
    if (!this.getValue('phoneNumber')) {
      this.setHidden('phoneNumber', true);
    }
    this.setHidden('addMobileContact', true);

    if (this.state.mode == 'M') {
      setTimeout(() => {
        const element: any = document.getElementById('fpx-submit-shell-btn');
        while (element.firstChild) {
          this.renderer2.removeChild(element, element.firstChild);
        }

        // Create a text node with the label
        const text = this.renderer2.createText(
          this._languageService.getLabel('RetailEtransfercontactlogForm.confirm')
        );

        // Append the text node to the element
        this.renderer2.appendChild(element, text);
      });
    }
  }
  addContactFromMobile() {
    this._phoneBookService.pickContact().then(
      (result: Contact) => {
        console.log("pick contact: ", result?.phoneNumbers?.[0], result?.name, result?.emails?.[0]);
        console.log(result?.name?.formatted);
        this.setValue('firstName', result?.name?.formatted || result?.name?.givenName || '');
        this.setValue('phoneNumber', result?.phoneNumbers?.[0]?.value || '');
        this.setValue('emailId', result?.emails?.[0]?.value || '');
        this.cd.detectChanges();
      }
    ).catch(
      (error: any) => {
        console.log("error: ", error);
      }
    );
  }

  override backToEntryMode(): void {
    this.state.reviewMode = false;
    this.setHidden('contactTitle', false);
    this.setHidden('emailId', false);
    this.setHidden('phoneNumber', false);
    this.setHidden('addMobileContact',false);
  }


  public override preSubmitInterceptor(payload: Etransfercontactlog): any {
    // WRITE CODE HERE TO HANDLE 

    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Etransfercontactlog) {
    // WRITE CODE HERE TO HANDLE
    this.state.serviceCode = payload.serviceCode;
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.etransfercontactlog;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error
      });
    }
    return response;
  }

  closeContactForm() {
    if (this._appConfig.hasData('closeContactForm$')) {
      this._appConfig.getData('closeContactForm$').subject.next({
        showContactForm: false
      });
    }
    if (this._appConfig.hasData('refreshContactGrid$')) {
      this._appConfig.getData('refreshContactGrid$').subject.next();
    }

  }

  override doDestroy(): void {
    this.state.mode = '';
    this.state.beneId = '';
    this.state.contactId = '';
    this.state.contact = '';
    this.state.firstName = '';
    this.state.emailId = '';
    this.state.phoneNumber = '';
    this.state.notificationPreference = '';
    this.state.preferredLang = '';
    this.state.reviewMode = false;
    this._appConfig.removeData('selectedContactQueryParams');
    this.state.createContact = null;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
  public navigateToSendMoney() {
    this.closeContactForm();
    this._router.navigate(['etransfers-space','entry-shell','etransfers','retail-etransfer-form'],
      {
        queryParams: {
          serviceCode: 'ETRANSFERSENDMONEY',
          tranCat: 'C'
        }
      }
    );
  }
  public navigateToRequestMoney() {
    this.closeContactForm();
    this._router.navigate(['etransfers-space','entry-shell','etransfers','retail-etransfer-request-money-form'],
      {
        queryParams: {
          serviceCode: 'ETRANSFERREQUESTMONEY',
          tranCat: 'C'
        }
      }
    );
  }
}


