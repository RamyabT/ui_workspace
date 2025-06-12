
import { Injectable } from "@angular/core";
import { BaseFpxFormHelper } from "@fpx/core";
import { Input } from "hammerjs";

export class MemberExpenseCategorizationtionState{
  showLegends: boolean = false;
  expenses:any=[
    // {
    //   id:'FOOD',
    //   desc:'Food and Drinks',
    //   utilisesPercentage:'18'
    // },
    // {
    //   id:'GROCERIES',
    //   desc:'Groceries',
    //   utilisesPercentage:'12'
    // },
    // {
    //   id:'MOVIES',
    //   desc:'Movie',
    //   utilisesPercentage:'08'
    // },
    // {
    //   id:'TRAVEL',
    //   desc:'Air Travel',
    //   utilisesPercentage:'11'
    // },
    // {
    //   id:'HOME',
    //   desc:'Home utility',
    //   utilisesPercentage:'09'
    // },
    // {
    //   id:'MEDICINE',
    //   desc:'medicine',
    //   utilisesPercentage:'18'
    // },
    // {
    //   id:'FUEL',
    //   desc:'Fuel',
    //   utilisesPercentage:'18'
    // },
    // {
    //   id:'BILLS',
    //   desc:'Bills',
    //   utilisesPercentage:'18'
    // }
  ];
}

@Injectable()
export class MemberExpenseCategorizationtionHelper extends BaseFpxFormHelper<MemberExpenseCategorizationtionState> {

    constructor(){
        super(new MemberExpenseCategorizationtionState());
    }
    override doPreInit(): void {}

   
    override doPostInit(){

    }
    toggleLegends(){
      if(this.state.showLegends) this.state.showLegends = false;
      else this.state.showLegends = true;
  }
}
