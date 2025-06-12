import { Injectable } from "@angular/core";
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
  FpxModalAfterClosed,
  FpxToastService
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { UpdatedocumentreqService } from '../updatedocumentreq-service/updatedocumentreq.service';
import { Updatedocumentreq } from '../updatedocumentreq-service/updatedocumentreq.model';
import { RetailProfileDocUploadFormComponent } from "../retail-profile-doc-upload-form/retail-profile-doc-upload-form.component";
import { DocumentIdService } from "../controls/documentId-service/documentId.service";
import { AppConfigService, CustomFileUploadService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CustomerdocumentdtlsService } from "../customerdocumentdtls-service/customerdocumentdtls.service";
import { SettingsService } from "src/app/foundation/validator-service/settings.service";
import { ObapplicantsignatureService } from "src/app/onboarding/obapplicantsignature-service/obapplicantsignature.service";
import moment from "moment";

export class RetailUpdateProfileDocFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	expiryDate:any={
	   minDate:"",
       maxDate:"",
     }
     updatedocfrontimg: any = {
      minSize: "10",
      maxSize: "10000024",
      extensions: ".pdf,.jpg,.jpeg,.png"
    }
    updatedocbackimg: any = {
      minSize: "10",
      maxSize: "10000024",
      extensions: ".pdf,.jpg,.jpeg,.png"
    };
  frontDocData: {
    serialNo: number;
    fileName: string;
    docInvNumber: string;
    icon: string;
    frontBaseImg:string;
    fileType:string;
  } = { fileName: "", docInvNumber: "", serialNo: 0, icon: "" ,frontBaseImg:"",fileType:""};
  backDocData: {
    fileName: string;
    docInvNumber: string;
    serialNo: number;
    icon: string;
    backBaseImg:string;
    fileType:string;
  } = { fileName: "", docInvNumber: "", serialNo: 0, icon: "" ,backBaseImg:"",fileType:""};
  documentIdData: any;
  mode: any;
  initialLoad: any;
  blobData:{
    mimeType:any;
    fileName:string;
    imageData:string;
    docInvNo:any;
  }={
    mimeType:'',
    fileName:'',
    imageData:'',
    docInvNo:''
  }
  action: any;
}


@Injectable()
export class RetailUpdateProfileDocFormHelper extends BaseFpxFormHelper<RetailUpdateProfileDocFormState>{

   constructor(
    private _fpxToastService: FpxToastService,
    public _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    private _settingsService: SettingsService,
    private _fileOpener: FileOpenerService,
    protected customerdocumentdtlsService: CustomerdocumentdtlsService,
    private documentIdService: DocumentIdService,
    private retailUpdateProfileDocFormService: UpdatedocumentreqService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _cobApplicantSignatureFormService: ObapplicantsignatureService,
    private _customFileUploadService:CustomFileUploadService
  ) {
    super(new RetailUpdateProfileDocFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILUPDATEDOC");
    this.addResetHandler('reset', this._onReset);
    this.state.mode = this.getRoutingParam('mode')
    this.state.action = this.getRoutingParam('action')
  }
   
  public override doPostInit(): void {
    this.addValueChangeHandler("id", this.handleIdOnvalueChange);    
    this.handleFormOnLoad();
  }

  public override postDataFetchInterceptor(payload: Updatedocumentreq){
    payload.id = payload?.id?.code
   return payload;
 }

  handleFormOnLoad() {
    this.state.initialLoad = true;

    if (!this.getRoutingParam('inventoryNumber')) {
      this.formGroup?.removeControl('inventoryNumber')
    }
    let id = this.getRoutingParam('id');
    let forceUpdate = this.getRoutingParam("forceUpdate");
    if (forceUpdate) {
      this.setServiceCode("RETAILFORCEUPDATEDOC");
      this.setValue("id", id);
      this.setReadonly("id", true);
    } else if (id && this._settingsService.totalProfileDocCount == 2 && !this.state.mode && !forceUpdate) {
      this.setValue('id', id);
      this.setReadonly('id', true);
    }

    this.state.expiryDate.minDate = this._appConfig.getCBD();
    this.setHidden('frontViewImgGroup', true);
    this.setHidden('frontBtnGroup', false);
    this.setHidden('backViewImgGroup', true);
    this.setHidden('backBtnGroup', false);
    // this.setHidden('uploadType',true);
    this.setValue('uploadType', '1');


    this.documentIdService.lookup('')().subscribe(res => {
      this.state.documentIdData = res;
      if (this.state.mode) {
        if (this.state.action !== 'VIEW') {
          this.setupViewDoc();
        } else {
          this.setupViewDocInServiceReq();
          this.state.initialLoad = false;
        }
      } else {
        this.state.initialLoad = false;
      }
    });

  }

  setUpDoc(res:any,flag:string){
          
    let documentIdData = this.state.documentIdData?.find((response:any)=>response?.id === this.getValue('id'));
    this.state.backDocData.fileName = documentIdData.text+'_Back';
    if(flag === 'SERVICEREQ' ){
      this.state.frontDocData.docInvNumber = this.getValue('updatedocfrontimg')?.[0]?.docInvNumber;
      this.state.backDocData.docInvNumber = this.getValue('updatedocbackimg')?.[0]?.docInvNumber;
    }else{
      this.state.backDocData.docInvNumber = '';
      this.state.frontDocData.docInvNumber = '';
      this.state.backDocData.backBaseImg = res?.backImage;
      this.state.frontDocData.frontBaseImg = res?.frontImage;

    }
      this.state.backDocData.serialNo = 0;
      this.state.backDocData.icon = this.getIcon();
      let splitBackDoc = res?.backImgFileName?.split('.');
      this.state.backDocData.fileType = splitBackDoc?.[splitBackDoc?.length-1]?.toLowerCase();
      this.state.frontDocData.fileName = documentIdData?.text + "_Front";
      this.state.frontDocData.serialNo = 1;
      this.state.frontDocData.icon = this.getIcon();
      let splitFrontDoc = res?.frontImgFileName?.split('.');
      this.state.frontDocData.fileType = splitFrontDoc?.[splitFrontDoc?.length-1]?.toLowerCase();
      this.setHidden("frontViewImgGroup", false);
      this.setHidden("frontBtnGroup", true);
      this.setHidden("backViewImgGroup", false);
      this.setHidden("backBtnGroup", true);
      this.setValue("updatedocfrontimg", this.state.frontDocData);
      this.setValue("updatedocbackimg", this.state.backDocData);
  }

  setupViewDocInServiceReq(){
    let res = {
      id:this.getValue('id'),
      backImgFileName:this.getValue('updatedocbackimg')?.[0]?.fileName,
      frontImgFileName: this.getValue('updatedocfrontimg')?.[0]?.fileName

    }
    this.setUpDoc(res,'SERVICEREQ');
  }

  setupViewDoc(){
    let id = this.getRoutingParam('id');

    this.customerdocumentdtlsService.findByKey({
      id: id,
      expiryDate: "",
      inventoryNumber: "",
      fileName: "",
      docInvNumber: "",
      uploadType: "",
      customerCode: "",
      idNumber: ""
    })().subscribe((res:any)=>{
      this.setValue('id',res?.id);
      this.setReadonly('id',true);
      this.setValue('uploadType',res?.uploadType);
      this.setValue('idNumber',res?.idNumber);
      this.setValue('expiryDate',res?.expiryDate);

      if(this.state.mode !== 'M'){
        this.setUpDoc(res,'NONESERVICEREQ')
          this.formGroup.disable();
        }
        this.state.initialLoad = false;
      });
  }

  public handleIdOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(!this.state.initialLoad){
      this.deleteDoc('BOTH')
      this.reset('idNumber','')
    }
      if(value){
        this.formGroup.get('idNumber')?.clearValidators()
        this.formGroup.get('idNumber')?.addValidators(Validators.required)
        if(value=='0'){
          // emirates id
          // this.formGroup.get('idNumber')?.addValidators(Validators.maxLength(15));
          this.formGroup.get('idNumber')?.addValidators(Validators.pattern(/^[0-9]{15,15}$/))
        } else{
          // passport
          // this.formGroup.get('idNumber')?.addValidators(Validators.maxLength(9));
          this.formGroup.get('idNumber')?.addValidators(Validators.pattern(/^[A-Za-z0-9]{8,9}$/))
        }
        this.formGroup.updateValueAndValidity();
      }
  }

  updatePhoto(frontOrBack:string) {
    if(!this.getValue('id')){
      this._fpxToastService.showWarningAlert('Alert', "Please Select ID");
      return;
    }
    let modal = new FpxModal();
    modal.setComponent(RetailProfileDocUploadFormComponent);
    modal.setPanelClass("dep-info-popup");
    modal.setDisableClose(false);


    modal.setData({
      title: "Document Upload",
      subTitle: "Take photo or Upload your Document",
      frontOrBack: frontOrBack,
      fileName:this.getFileName(frontOrBack)
    });
    modal.setAfterClosed(this.popupCloseEvent);
    this.openModal(modal);
  }

  popupCloseEvent: FpxModalAfterClosed = (payload: any) => {
    if(payload){
      let documentIdData = this.state.documentIdData?.find((res:any)=>res.id === this.getValue('id'));
      if(payload?.additionalData?.frontOrBack === 'BACK'){
        this.state.backDocData.fileName = documentIdData.text+'_Back';
        this.state.backDocData.docInvNumber = payload?.docData?.docInvNumber;
        this.state.backDocData.serialNo = 0;
        this.state.backDocData.icon = this.getIcon();
        this.state.backDocData.fileType = payload?.docData.fileName?.split('.')?.[1];

        this.setHidden('backViewImgGroup',false)
        this.setHidden('backBtnGroup',true)
        this.setValue('updatedocbackimg',this.state.backDocData);
        // this.setValue('uploadType',payload?.docData?.docInvNumber);

      }else{
        this.state.frontDocData.fileName = documentIdData.text+'_Front';
        this.state.frontDocData.docInvNumber = payload.docData?.docInvNumber;  
        this.state.frontDocData.serialNo = 1;
        this.state.frontDocData.icon = this.getIcon();
        this.state.frontDocData.fileType = payload?.docData.fileName?.split('.')?.[1];

        this.setHidden('frontViewImgGroup',false)
        this.setHidden('frontBtnGroup',true)
        this.setValue('updatedocfrontimg',this.state.frontDocData);
      }
    }
  }

  getIcon():string{
    if(this.getValue('id') === '0'){
      return 'emirates-id.svg';
    }else{
      return 'passport.svg';
    }
  }

  getFileName(frontOrBack:string):string{
    if (this.getValue("id") === "0") {
       return "Emirates ID_"+frontOrBack;
    } else {
       return "Passport_"+frontOrBack;
    }
  }

  deleteDoc(flag: string) {
    if (flag === "BOTH") {
      this.state.backDocData = {
        fileName: "",
        docInvNumber: "",
        serialNo: 0,
        icon: "",
        backBaseImg:"",
        fileType:""
      };
      this.setHidden("backViewImgGroup", true);
      this.setHidden("backBtnGroup", false);
      this.state.frontDocData = {
        fileName: "",
        docInvNumber: "",
        serialNo: 0,
        icon: "",
        frontBaseImg:"",
        fileType:""
      };
      this.setHidden("frontViewImgGroup", true);
      this.setHidden("frontBtnGroup", false);
      this.setValue("updatedocbackimg", "");
      this.setValue("updatedocfrontimg", "");
    } else if (flag === "BACK") {
      this.state.backDocData = {
        fileName: "",
        docInvNumber: "",
        serialNo: 0,
        icon: "",
        backBaseImg:"",
        fileType:""
      };
      this.setHidden("backViewImgGroup", true);
      this.setHidden("backBtnGroup", false);
      this.setValue("updatedocbackimg", "");
    } else {
      this.state.frontDocData = {
        fileName: "",
        docInvNumber: "",
        serialNo: 0,
        icon: "",
        frontBaseImg:"",
        fileType:""
      };
      this.setHidden("frontViewImgGroup", true);
      this.setHidden("frontBtnGroup", false);
      this.setValue("updatedocfrontimg", "");
    }
  }
  getBlob(flag:string,docInvAvail:boolean):Observable<any>{
    let imageData:string="";
    let fileName:string;
    let mimeType:string="";
    let fileType:string="";
    let blob:any;
    if(flag=="FRONT"){
      fileType=this.state.frontDocData.fileType;
      imageData=this.state.frontDocData.frontBaseImg;
      fileName=this.state.frontDocData.fileName;
      if(this.state.frontDocData.fileType=="png" || "jpeg" || "jpg"){
        mimeType='image/'+this.state.frontDocData.fileType;
      }
      else if(this.state.frontDocData.fileType=="pdf"){
        mimeType='application/'+this.state.frontDocData.fileType;
      }
    }
    else{
      imageData=this.state.backDocData.backBaseImg;
      fileName=this.state.backDocData.fileName;
      fileType=this.state.backDocData.fileType;
      if(this.state.backDocData.fileType=="png" || "jpeg" || "jpg"){
        mimeType='image/'+this.state.backDocData.fileType;
      }
      else if(this.state.backDocData.fileType=="pdf"){
        mimeType='application/'+this.state.backDocData.fileType;
      }
    }
    this.state.blobData.mimeType=mimeType;
    this.state.blobData.fileName=fileName+'.'+fileType;
    if(!docInvAvail){
      imageData='data:'+mimeType+';base64,'+imageData;
      this.state.blobData.imageData=imageData;
      blob = this._cobApplicantSignatureFormService.base64ToBlob(imageData);
      return of(blob);
    }
    else{
      this.showSpinner();
      return this._customFileUploadService.download(this.state.blobData.docInvNo).pipe(map((res: any)=>{
        this.hideSpinner();
        return res?.body;
      }));
    }
  }

  downloadDoc(flag: string) {
    let docInvAvail:boolean=false;
    if(flag=='FRONT'){
      if(this.state.frontDocData.docInvNumber){
        docInvAvail=true;
        this.state.blobData.docInvNo=this.state.frontDocData.docInvNumber;
      }
    }
    else{
      if(this.state.backDocData.docInvNumber){
        docInvAvail=true;
        this.state.blobData.docInvNo=this.state.backDocData.docInvNumber;
      }
    }
    
  this.getBlob(flag,docInvAvail).subscribe((res:any)=>{
    if (this._device.isHybrid()) {
      this._fileOpener.downloadAndOpenPDF(res,this.state.blobData.mimeType,this.state.blobData.fileName);
    } else {
      let documentURL:any='';
      if(!docInvAvail){
      documentURL =this.state.blobData.imageData;
      const downloadLink = document.createElement("a");
      downloadLink.href = documentURL;
      downloadLink.download = this.state.blobData.fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      }
    }
  });
 
  }

  public override preSubmitInterceptor(payload: Updatedocumentreq):any {
     // WRITE CODE HERE TO HANDLE 
    payload.updatedocbackimg.fileName=payload.updatedocbackimg.fileName+'.'+ payload?.updatedocbackimg.fileType;
    payload.updatedocfrontimg.fileName=payload.updatedocfrontimg.fileName+'.'+ payload?.updatedocfrontimg.fileType;
    payload.updatedocfrontimg = [payload.updatedocfrontimg]
    payload.updatedocbackimg = [payload.updatedocbackimg]
    delete(payload.updatedocbackimg[0].fileType);
    delete(payload.updatedocbackimg[0].backBaseImg);
    delete(payload.updatedocfrontimg[0].fileType);
    delete(payload.updatedocfrontimg[0].frontBaseImg);
    payload.idNumber=payload?.idNumber;
    payload.expiryDate=moment(payload?.expiryDate)?.format('YYYY-MM-DD');
    return payload;
  }
  


  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);

   let routingInfo: RoutingInfo = new RoutingInfo();
   this.handleFormOnPostsubmit(response, routingInfo);
   return routingInfo;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.updatedocumentreq;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode?.value
      });
    }
    return response;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n

 private _onReset = () => {
  this.formGroup.reset();
  this.deleteDoc('BOTH')
  this.handleFormOnLoad();
}
}
 
 
