import { Injectable } from '@angular/core';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable } from 'rxjs';


@Injectable()
export class CasaProductListControlHelper extends BaseFpxControlHelper{
constructor() 
    {
        super();
     
    }

    override doPreInit(): void {
    }
   
   
     public override doPostInit(): void {
     }

     override doPostLookupInterceptor(data: any, key: any) {
       
        data= data.filter((item: { id: string; }) => item.id !== key['productCode']);
        // console.log(data.Data.findByKey[key['productCode']].text);
        
        // console.log(key['productCode']);
        return data;
     }

}