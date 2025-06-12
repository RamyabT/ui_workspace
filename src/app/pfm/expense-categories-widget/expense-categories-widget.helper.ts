import { Injectable } from "@angular/core";
import { DeviceDetectorService } from "@dep/core";
import { BaseFpxFormHelper } from "@fpx/core";
import { Input } from "hammerjs";

export class ExpenseCategoriesWidgetState{
  showLegends: boolean = false;
  expenses:any=[];
}

@Injectable()
export class ExpenseCategoriesWidgetHelper extends BaseFpxFormHelper<ExpenseCategoriesWidgetState> {

    constructor(
      public device: DeviceDetectorService
    ){
        super(new ExpenseCategoriesWidgetState());
    }
    override doPreInit(): void {
      if(!this.device.isMobile()){
        this.state.showLegends=true;
      }
    }

   
    override doPostInit(){

    }
    toggleLegends(){
      if(this.state.showLegends) this.state.showLegends = false;
      else this.state.showLegends = true;
  }
}