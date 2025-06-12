import { Injectable } from '@angular/core';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable } from 'rxjs';


@Injectable()
export class ReturnCallTimingListControlHelper extends BaseFpxControlHelper{
constructor() 
    {
        super();
     
    }

    override doPreInit(): void {
    }
   
   
     public override doPostInit(): void {
     }


}