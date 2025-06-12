import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable } from 'rxjs';
import { ChildaccountService } from '../childaccount-service/childaccount.service';
import { Childaccount } from '../childaccount-service/childaccount.model';


@Injectable()
export class RetailChildAccountListControlHelper extends BaseFpxControlHelper{
// constructor() 
//     {
//         super();
     
//     }

//     override doPreInit(): void {
//     }
   
   
//      public override doPostInit(): void {
//      }
    selectableDataList$: any;
    childAccountList!: Childaccount[];
    childAccount: string = '';

    constructor(
        private _childaccountService:ChildaccountService,
        private cd: ChangeDetectorRef,
        private _appConfig: AppConfigService
    ) {
        super();
    }

    override doPreInit(): void {}
    public override doPostInit(): void { }




}