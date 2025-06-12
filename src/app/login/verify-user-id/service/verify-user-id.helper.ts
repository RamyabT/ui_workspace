import { Injectable } from "@angular/core";
import { BaseFpxComponentState, BaseFpxFormHelper } from "@fpx/core";

export class VerifyUserIdState extends BaseFpxComponentState {

}

@Injectable()
export class VerifyUserIdHelper extends BaseFpxFormHelper<VerifyUserIdState>{

  constructor(){
    super(new VerifyUserIdState() )
  }
}
