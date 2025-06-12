import { Injectable } from "@angular/core";
import { FpxFormControlErrorMessage, ContextMenuModel } from "@fpx/core";

@Injectable({
  providedIn : 'root'
})
export class CustomErrorMessageService extends FpxFormControlErrorMessage {
  constructor(){
    super();
  }
}
