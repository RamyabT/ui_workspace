import { Injectable } from '@angular/core';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable } from 'rxjs';


@Injectable()
export class estmtrelationshipHelper extends BaseFpxControlHelper{
constructor() 
    {
        super();
     
    }

    override doPreInit(): void {
    }
   
   
     public override doPostInit(): void {
     }

     override doPostLookupInterceptor(data: any, key: any) {
        
        return data;
     }


}