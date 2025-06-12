import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnDestroy,AfterViewInit {

  public form!: FormGroup;
  public dynamicFormGroupList!: FormArray;
  formConfig: any = [];
  @Output() dynamicFormChange: EventEmitter<DynamicFormModel> = new EventEmitter<DynamicFormModel>();
  @Input() dynamicFormActionPublisher: Subject<any> | undefined = undefined;

  private readonly _destroy$ = new Subject<any>();

  @Input() set dynamicFormData(value: any) {
    if (value) {
      this.formConfig = value;
      this.addDynamicFormGroup();
    }
  }

  // returns all form groups under dynamicFormGroup
  get dynamicFormGroup(): FormArray<any> {
    return this.form.get('dynamicFormGroup') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      dynamicFormGroup: this.fb.array([]),
    });

    // set dynamicFormGroupList to this field
    this.dynamicFormGroupList = this.form.get('dynamicFormGroup') as FormArray;
  }

  ngAfterViewInit(): void {
    this._listernActionPublisher()
  }

  // dynamicFormGroup formgroup
  createDynamicFormGroup(): FormGroup {
    var objects: any = {};

    this.formConfig.forEach((control: any) => {
      let validators = [];
      if (control.required) {
        validators.push(Validators.required);
      }
      if (control.minLength && control.dispType==='1') {
        validators.push(Validators.minLength(control.minLength));
      }else if(control.minLength && control.dispType =='2'){
        // validators.push(Validators.min(control.minLength));
      }
      
      if (control.maxLength && control.dispType==='1') {
        validators.push(Validators.maxLength(control.maxLength));
      }else if(control.maxLength && control.dispType =='2'){
        // validators.push(Validators.max(control.maxLength));
      } 

      if (control.pattern) {
        validators.push(Validators.pattern(control.pattern));
      }

      
      objects[control.formControlName] = [(control.defaultValue || ''), validators];
    });
    return this.fb.group(objects);
  }

  // add a dynamicFormGroup form group
  addDynamicFormGroup() {
    this.dynamicFormGroupList?.removeAt(0);
    this.dynamicFormGroupList?.push(this.createDynamicFormGroup());
  }

  // remove dynamicFormGroup from group
  removeDynamicFormGroup(index: number) {
    this.dynamicFormGroupList?.removeAt(index);
  }

  // triggered to change validation of value field type
  changedFieldType(index: number) { }

  // get the formgroup under dynamicFormGroup form array
  getDynamicFormGroup(index: number): FormGroup {
    const formGroup = this.dynamicFormGroupList?.controls[index] as FormGroup;
    return formGroup;
  }

  getFormControl(i: number) {
    return this.formConfig[i].fieldType;
  }

  onSelectionChange(){
    
  }

  onfocus(controlIndex:number) {
    this.formConfig[controlIndex].isFocused = true
  }
  onblur(controlIndex:number) {
    this.formConfig[controlIndex].isFocused = false
  }

  textBoxChange(formGroupIndex:number,currentChangedControlName:string,control?:any,event?:any){
    if(control?.dispType=='3'){
      ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[currentChangedControlName].setValue(event?.checked?"1":"0",{eventEmit:true});
      if(control.required && event?.checked === false){
        ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[currentChangedControlName].setErrors({required:true},{emitEvent:true});
      }else{
        ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[currentChangedControlName].setErrors(null,{emitEvent:true});
      }
    }
    if(control?.dispType=='4'){
      ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[currentChangedControlName].patchValue(event,{eventEmit:false});
    }
      this.dynamicFormChange.emit({
        index:formGroupIndex,
        currentChangedControlName:currentChangedControlName,   
        currentChangedControlValue:this.form?.controls?.["dynamicFormGroup"]?.value?.[0]?.[currentChangedControlName],
        formArray:this.form,
        formArrayValue :this.form.controls?.["dynamicFormGroup"].getRawValue(),
      })
  }


  private _listernActionPublisher() {
    this.dynamicFormActionPublisher
      ?.asObservable()
      ?.pipe(takeUntil(this._destroy$))
      ?.subscribe((res:{action:string,controlName:string,additionalData?:any})=>{
        if(res){
          if(res.action === "SETERROR"){
            if(res?.additionalData?.errorMessage){
              ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[res?.controlName].setErrors({[res.additionalData?.errorMessage]:true});
            } 
          }
          else if(res.action === "CLEARERROR"){
            ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[res?.controlName].setErrors(null);

          }else  if(res.action === "RESET"){
            ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[res?.controlName].reset(res?.additionalData?.resetValue);
            ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[res?.controlName].markAsUntouched()
          }else  if(res.action === "SETVALUE"){
            ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[res?.controlName].setValue(res?.additionalData?.value,{eventEmit:true});
            ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[res?.controlName].markAsTouched()
            setTimeout(() => {
              this.dynamicFormChange.emit({
                index:0,
                currentChangedControlName:res?.controlName,   
                currentChangedControlValue:res?.additionalData?.value,
                formArray:this.form,
                formArrayValue :this.form.controls?.["dynamicFormGroup"].getRawValue(),
              })
            },);
          }
        }
      })
  }

  ngOnDestroy(): void {
    this._destroy$?.next(null);
    this._destroy$?.complete();
  }


  getErrorCode(control:any){
    let errorcodeObject:any = ((this.form?.controls?.["dynamicFormGroup"] as FormGroup)?.controls?.[0]  as FormGroup)?.controls?.[control?.formControlName].errors;
    let errorcode = errorcodeObject && errorcodeObject != null ?Object.keys(errorcodeObject)?.[0]:undefined
    if(errorcode && errorcode != 'pattern' && errorcode != 'required' && errorcode != 'minLength'){
      return errorcode;
    }
    return 'none';
  }

  getErrorMessage(lable:string,errorCode:string){
    if(errorCode==='gbanMisMatchErr'){
        return 'GBAN does not match';
    }else if(errorCode==='uniqueAccountError'){
        return lable+" "+'already exists';
    }else if(errorCode==='invaldAccountError'){
      return "Please enter the valid "+lable;
  }
    return;
  }

}

export interface DynamicFormModel{
  index?:number,
  currentChangedControlName?:string,   
  currentChangedControlValue?:any,
  formArray?:any,
  formArrayValue?:any,
}