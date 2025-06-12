import { Injectable } from '@angular/core';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable } from 'rxjs';


@Injectable()
export class EtransfercontactSearchListControlHelper extends BaseFpxControlHelper{
constructor() 
    {
        super();
     
    }

    override doPreInit(): void {
    }
   
   
     public override doPostInit(): void {
     }
     override doPostLookupInterceptor(data: any[], key: any) {
        let tempArray:any[]=[];
        data.forEach(x=>{
            tempArray.push({id:x.beneId,text:x.firstName})
        })
        return tempArray;
     }


}