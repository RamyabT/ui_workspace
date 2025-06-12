import { Injectable } from "@angular/core";
import { BaseFpxFormHelper } from "@fpx/core";

export class AssetsBreakdownWidgetState{
    assetsInfo:any = [];
  
}

@Injectable()
export class AssetsBreakdownWidgetHelper extends BaseFpxFormHelper<AssetsBreakdownWidgetState> {
    
    constructor(){
        super(new AssetsBreakdownWidgetState());
    }
    override doPreInit(): void {}

   
    override doPostInit(){
        this.state.assetsInfo=[
            {
                id:'LIQUID',
                desc:'Liquid Assets',
                value:'22000'
            },
            {
                id:'NON-LIQUID',
                desc:'Non Liquid Assets',
                value:'62000'
            },
            {
                id:'LIABILITIES',
                desc:'liabilties',
                value:'41000'
            }
        ]
    }
  
}